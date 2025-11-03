import {authRoutes} from './auth.js'

const prefix = "/v1"

export const registerRoutes = async(fastify)=>{
    fastify.register(authRoutes,{prefix:prefix});
}