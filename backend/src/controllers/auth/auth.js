
import jwt from 'jsonwebtoken'
import {Customer,Provider} from '../../models/user.js'
import "dotenv/config";



const generateTokens = (user)=>{
    const payload = {userId:user._id,role:user.role};
    const accessToken = jwt.sign(
        payload,
        process.env.ACCESS_TOKEN_SECRET,
        {expiresIn:'1d'}
    )

    const refreshToken= jwt.sign(
        payload,
        process.env.REFRESH_TOKEN_SECRET,
        {expiresIn:'7d'}
    )

    return {accessToken,refreshToken}
}



export const loginCustomer = async(req,reply)=>{
    try {
        const {phone}= req.body;
        let customer = await Customer.findOne({phone})
        if(!customer){
            customer = new Customer({
                phone,
                role:'Customer',
                isActivated:true
            })
            await customer.save()
        }
        const {accessToken,refreshToken} = generateTokens(customer);

        return reply.send({
            message:'Login Sucessful',
            accessToken,
            refreshToken,
            customer
        })
    } catch (error) {
        return reply.status(500).send({message:'An error occurred',error})
    }
}

export const loginProvider = async(req,reply)=>{
    try {
    //    Test 01
        // auth = (email || phone);
        const {phone,password} = req.body;
        const provider = await Provider.findOne({phone});

        if(!provider){
            return reply.status(404).send({message: "Provider is not found in database"});
        }
        const isMatch = password === provider.password;
        if(!isMatch){
            return reply.status(400).send({message: "Invalid Credentials"})
        }
        const {accessToken,refreshToken} = generateTokens(provider)

        return reply.send({
            message:'Login Successful',
            accessToken,
            refreshToken,
            provider
        })
    } catch (error) {
        return reply.status(500).send({message:"An error occured",error})
    }
}

export const refreshToken = async(req,reply)=>{
    const {refreshToken} =req.body

    if(!refreshToken){
        return reply.send({message:'Refresh token required'})
    }

    try {
        const decoded = jwt.verify(refreshToken,process.env.REFRESH_TOKEN_SECRET);
        let user;

        if(decoded.role === "Customer"){
            user = await Customer.findById(decoded.userId)
        }else if (decoded.role === "Provider"){
            user = await Provider.findById(decoded.userId);
        } else {
            return reply.status(403).send({message:"Invalid Role"})
        }

        if(!user){
            return reply.status(403).send({message: "User not found"})
        }

    
        const { accessToken, refreshToken: newRefreshToken } = generateTokens(user);

        return reply.send({
            message:"Token Refreshed",
            accessToken,
            refreshToken: newRefreshToken,
        });
    } catch (error) {
        if(error && error.name === 'TokenExpiredError'){
            // 401 Unauthorized
            return reply.status(401).send({message:'Refresh token expired'})
        }
        // 403 Forbidden
        return reply.status(403).send({message:'Invalid Refresh Token'})
    }
}




export const fetchUser =  async(req, reply)=>{
        try {
            const {userId, role} = req.user;
            let user;
            if(role === "Customer"){
                user = await Customer.findById(userId);
            }else if(role === "Provider"){
                        user = await Provider.findById(userId)
            }else{
                return reply.status(403).send({message:"Invalid Role"})
            }

            if(!user){
                return reply.status(404).send({message : "User not found"});
            }

            return reply.send({
                message: "User fetched sucessfully",
            })
        } catch (error) {
            return reply.status(500).send({message: "An error occured",error })
        }
}