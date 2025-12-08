import { appAxios } from "./apiInterceptors";

export const createToken = async(publicProviderId:any)=>{
    try {
        const response = await appAxios.post(`/tokens/book`,{
            publicProviderId:publicProviderId
        })
        return response.data
        
    } catch (error) {
        console.log("Create Order Error",error);
        return null
        
    }

}