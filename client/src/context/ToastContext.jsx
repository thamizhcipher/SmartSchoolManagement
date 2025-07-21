import { createContext, useCallback, useContext, useState } from "react"

const ToastContext = createContext()

const ToastProvider = ({children}) => {
    const [toast,setToast] = useState(null)

    const showToast = useCallback((message,type = "success")=>{
        setToast({message,type})
        setTimeout(()=>{setToast(null)},3000)
    },[])
    
  return (
    <ToastContext.Provider value={{showToast}}>
        {children}
        {
            toast && (
                <div className={`fixed top-5 right-5 z-50 px-4 py-3 rounded shadow text-white ${toast.type === "error" ? "bg-red-500" : "bg-green-500"}`}>
                    {toast.message}
                </div>
            )
        }
    </ToastContext.Provider>
  )
}
export const useToast = ()=> useContext(ToastContext)

export default ToastProvider