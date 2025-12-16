import { bookToken,validateToken,fetchtoken } from "../controllers/token/token.js";
import { verifyToken } from "../middleware/auth.js";
import {verifyPayment} from '../controllers/payment/payment.js'

export const tokenRoutes = async(fastify,options)=>{


    fastify.addHook("preHandler",async(request, reply)=>{
        const isAuthenticated = await verifyToken(request,reply);
        if(!isAuthenticated){
            return reply.code(401).send({message:"Unauthorized"})
        }
    });

    // otherwise i can use onRequest with prehandler verifytoken


    fastify.post('/tokens/book', bookToken);
    
    fastify.get('/tokens',bookToken);
    fastify.post('/tokens/verify-payment', verifyPayment);
    fastify.post('/tokens/validate', validateToken);
    fastify.get("/tokens/fetch",fetchtoken);

}