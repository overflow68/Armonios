import { useContext,createContext,useState} from "react";

const dynamicContext = createContext()

export const useDynamic = () =>{
    return useContext(dynamicContext)
}

export function DynamicProvider({children}){
    const [element,setElement] = useState()
    const [values,setValue] = useState()
    const setElem = (el,passValue) =>{
        setValue(passValue)
        setElement(el)
    }
    const value ={
        element,
        setElem,
        values

    }

   
   
    return(
<dynamicContext.Provider value={value}>
    {children}
</dynamicContext.Provider>
    )

}
