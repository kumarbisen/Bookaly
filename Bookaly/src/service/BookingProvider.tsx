
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


// get token for provider 