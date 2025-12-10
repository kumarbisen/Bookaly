import { createContext, FC, useCallback, useContext, useState } from "react"

interface scanDataprops{
    // A Function (To execute a specific action which takes this data parameters)
    scanedData:(data:string)=> void;
    // To hold data
    providerId:string;
    
}

const scanContext = createContext<scanDataprops | undefined >(undefined);
export const collectData = (): scanDataprops =>{
    const context = useContext(scanContext);
    if(!context){
        throw new Error('Context not found');
        
    }
    return context;
}


const ScanStore:FC<{children:React.ReactNode}> =({children})=>{
        
    const [providerId,setProviderId] = useState<string>('')

    const scanedData= useCallback(
        (data:string)=>{
            setProviderId(data)
            console.log(providerId);
            

        },[]

    )

    return (
        <scanContext.Provider
        value={{
            scanedData
            ,providerId
        }}
        >
            {children}
        </scanContext.Provider>

    )
}
export default ScanStore;