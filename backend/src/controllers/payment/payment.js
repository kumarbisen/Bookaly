
import crypto from 'crypto'
import { Token } from '../../models/index.js';

export const verifyPayment = async (request, reply) => {
    try {
        const {
            razorpay_payment_id,
            razorpay_order_id,
            razorpay_signature,
            pending_token_id 
        } = request.body;

        if (!razorpay_payment_id || !razorpay_order_id || !razorpay_signature || !pending_token_id) {
            return reply.code(400).send({ message: 'Missing payment verification data.' });
        }

        // 1. Cryptographically Verify Signature
        const body_string = razorpay_order_id + "|" + razorpay_payment_id;
        const hmac = crypto.createHmac('sha256', RAZORPAY_KEY_SECRET);
        hmac.update(body_string);
        const generated_signature = hmac.digest('hex');

        if (generated_signature !== razorpay_signature) {
            return reply.code(400).send({ message: 'Payment verification failed: Invalid signature.' });
        }

        // 2. Find and Update Token
        const token = await Token.findById(pending_token_id);
        if (!token) {
            return reply.code(404).send({ message: 'Token not found.' });
        }

        if (token.is_paid) {
            return reply.code(200).send({ message: 'This token has already been paid for.', token });
        }

        
        token.is_paid = true;
        token.status = "Completed"; 
        token.razorpay_payment_id = razorpay_payment_id;
        
        await token.save();

        reply.code(200).send({ message: 'Payment successful! Token is confirmed.', token });

    } catch (error) {
        console.error('Error verifying payment:', error);
        reply.code(500).send({ message: 'An internal server error occurred.' });
    }
};