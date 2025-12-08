import { bookToken,validateToken,fetchtoken } from "../controllers/token/token.js";

import {verifyPayment} from '../controllers/payment/payment.js'

export const tokenRoutes = async(fastify,options)=>{
    fastify.post('/tokens/book', bookToken);
    fastify.post('/tokens/verify-payment', verifyPayment);
    fastify.post('/tokens/validate', validateToken);
    fastify.get("/tokens",fetchtoken);

}