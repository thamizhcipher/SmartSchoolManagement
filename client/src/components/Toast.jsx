import React, { useEffect } from 'react'

const Toast = ({message,type="success",onClose}) => {
    useEffect(()=>{
        const timer = setTimeout(()=>{
            onClose();
        },3000)
        return ()=>clearTimeout(timer)
    },[onClose])
    const bgColor = type === "success" ? "bg-green-500" : type === "error" ? "bg-red-500" : "bg-gray-500"
  return (
    <div className={`fixed top-5 right-5 z-50 px-4 py-3 rounded shadow text-white ${bgColor}`}>
        <p>{message}</p>
    </div>
  )
}

export default Toast