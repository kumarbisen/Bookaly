
import {Provider,Token,Counter} from '../../models/index.js'
import crypto from 'crypto'
import Razorpay from 'razorpay'



// Razorpay configuration
const RAZORPAY_KEY_ID = process.env.RAZORPAY_KEY_ID;
const RAZORPAY_KEY_SECRET = process.env.RAZORPAY_KEY_SECRET;

let razorpay;
if (RAZORPAY_KEY_ID && RAZORPAY_KEY_SECRET) {
    razorpay = new Razorpay({
        key_id: RAZORPAY_KEY_ID,
        key_secret: RAZORPAY_KEY_SECRET
    });
} else {
    console.warn('Razorpay Key ID or Key Secret is not set. Paid bookings will fail.');
}


export const bookToken =async(req,reply)=>{
    try {
        const userId = req.user._id;
        const {providerPublicId} = req.body;

        if(!providerPublicId){
            return reply.code(400).send({message:'Provider Username is required.'})

        }
        const provider = await Provider.findOne({provider_id:providerPublicId.toLowerCase()})
        if(!provider){
            return reply.code(404).send({message:'Provider not found.'})

        }
        // This is critical for daily sequential counter
        const today = new Date();
        today.setUTCHours(0,0,0,0);

        // Automatically incrementation
        const counterId = `${provider._id.toString()}_${today.toISOString().split('T')[0]}`;

        // upsert: true creates the counter if it's the first token of the day.
        const counter = await Counter.findByIdAndDelete(
            counterId,
            {$inc: {seq:1}},
            {new:true, upsert:true}
        )
        // This will be 1,2,3,4
        const newTokenId = counter.seq;


        const expiresAt = new Date(today);
        expiresAt.setUTCHours(23,59,59,999);

        const newToken = new Token({
            token_id:newTokenId,
            queue_date:today,
            user_id:userId,
            provider_id:provider._id,
            fee: provider.booking_fee,
            status:'Completed',
            is_paid:false,
            expires_at:expiresAt,
            is_valid:true,
            validation_key:crypto.randomBytes(32).toString('hex')

        })

        // FREE TOKEN LOGIC
        if (provider.booking_fee === 0) {
            newToken.status = 'Completed';
            newToken.is_paid = false; 

            const freeToken = new Token(newToken);
            await freeToken.save();
            
            
            return reply.code(201).send({
                message: 'Free token booked successfully!',
                is_paid: false,
                token: freeToken
            });
        }

        // Paid Token

         if (provider.booking_fee > 0) {
            if (!razorpay) {
                return reply.code(500).send({ message: 'Payment gateway is not configured for this paid provider.' });
            }
            
            newToken.status = 'Pending';
            newToken.is_paid = false;

            const pendingToken = new Token(newToken);
            await pendingToken.save();

            // Create Razorpay Order
            const options = {
                amount: provider.booking_fee,
                currency: "INR",
                receipt: pendingToken._id.toString()
            };
            const order = await razorpay.orders.create(options);

            // Link order to token
            pendingToken.razorpay_order_id = order.id;
            await pendingToken.save();

            // Booking is NOT complete. Send order details to client.
            return reply.code(200).send({
                message: 'Order created, awaiting payment.',
                is_paid: false,
                razorpay_key_id: RAZORPAY_KEY_ID,
                razorpay_order_id: order.id,
                amount: order.amount,
                pending_token_id: pendingToken._id
            });
        }






 
    } catch (error) {
        if(error.code === 11000){
            return reply.code(500).send({message:'Failed to generate a token try again'})
        }
        console.log("error booking token", error);
        return reply.code(500).send({message:'An internal error occured.'})
        
    }
}

export const validateToken = async(req, reply)=>{
    try {
        const { token_id, queue_date, provider_id, validation_key } = request.body;

         if (!token_id || !queue_date || !provider_id || !validation_key) {
            return reply.code(400).send({ message: 'Incomplete token data for validation.' });
        }

        const provider = await Provider.findOne({ provider_id: provider_id.toLowerCase() });
         if (!provider) {
            return reply.code(404).send({ message: 'Invalid Provider.' });
        }

         const token = await Token.findOne({
            token_id: parseInt(token_id, 10),
            queue_date: new Date(queue_date),
            provider_id: provider._id, 
            validation_key: validation_key
        }).select('+validation_key'); 

        if (!token) {
            return reply.code(404).send({ message: 'Token not found or invalid key.' });
        }

        if (!token.is_valid) {
            // 410 Gone is a good HTTP status for "already used"
            return reply.code(410).send({ message: 'This token has already been used or revoked.', status: token.status });
        }

        token.is_valid = false;
        await token.save();

         reply.code(200).send({ message: 'Token validated successfully.', status: token.status, token_id: token.token_id });

        
    } catch (error) {
        console.error('Error validating token:', error);
        reply.code(500).send({ message: 'An internal server error occurred.' });
    }
}


// i have to write a function for fetch token to update it in provider dashboard and get it using get routes


