import {create} from 'zustand'
import {persist,createJSONStorage} from 'zustand/middleware'
import { mmkvStorage,storage,tokenStorage } from './storage'


interface AuthStore{
    user:Record<string,any> | null;
    setUser:(user:any) => void;
    logout:() => void;
}
//Token Ko Locally Store karna baki hai
export const useAuthStore = create<AuthStore>()(
    persist(
        (set,get)=>({
            user:null,
            setUser:(data)=>set({user:data}),
             logout:() => {
                try {
                    // clear tokens from storage
                    tokenStorage.clearAll && tokenStorage.clearAll();
                } catch (e) {
                    // ignore storage clear errors
                    console.log('====================================');
                    console.log("err",e);
                    console.log('====================================');
                }
                set({ user: null, });

            }
        }),
        {
            name:'auth-storage',
            storage:createJSONStorage(()=> mmkvStorage)
        }
    )
)