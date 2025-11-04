import {
    fetchUser,
    loginCustomer,
    loginProvider,
    refreshToken
} from '../controllers/auth/auth.js'
import {updateUser} from '../controllers/tracking/tracking.js'
import {verifyToken} from '../middleware/auth.js'
    // here we have to use lowercase becoz mongodb  automatically generate model name in lowercase if you doesn't specificed in your schema in uppercase 
export const authRoutes = async(fastify,options)=>{

        fastify.post("/customer/login",loginCustomer)
        fastify.post("/provider/login",loginProvider)
        fastify.post("/refresh-token",refreshToken)
        fastify.get("/user",{preHandler:[verifyToken]},fetchUser)
        fastify.post("/user",{preHandler:[verifyToken]},updateUser)
}