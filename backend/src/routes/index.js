import {authRoutes} from './auth.js'
import { tokenRoutes } from './token.js';

const prefix = "/api"

export const registerRoutes = async(fastify)=>{
    fastify.register(authRoutes,{prefix:prefix});
    fastify.register(tokenRoutes,{prefix:prefix})
}