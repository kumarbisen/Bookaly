
import { appAxios } from './apiInterceptors';


export const booktoken=async(providerPublicId:string)=> {
    try {
        const response = await appAxios.post('/tokens/book', {providerPublicId})
        return response.data
        
    } catch (error) {
        console.log('Booking failed to create');
        return null
    }
}


// get token info  for user(provider,tokenNO)

export const fetchTokens = async()=>{
    try{
        const response = await appAxios.get('/tokens/book');
        return response.data;
        
    }catch(error){
        console.log("Failed to fetch tokens", error);
        return null;
    }
}

// get token for provider