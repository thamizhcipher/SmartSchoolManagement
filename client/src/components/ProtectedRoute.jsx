import { Navigate } from 'react-router-dom'
import {jwtDecode} from 'jwt-decode'
import { useEffect, useState } from 'react'
import axios from '../api/axios'

const ProtectedRoute = ({children}) => {
    const [loading,setLoading] = useState(true);
    const [validUser,setValidUser] = useState(false)
    useEffect(()=>{
        const verifyUser = async ()=>{
            const token = sessionStorage.getItem('auth_token')
            if(!token)
            {
                setValidUser(false)
                setLoading(false)
                return
            }
            try {
                const res = await axios.get("/api/v1/me")
                if(res.status === 200 )
                    setValidUser(true)
                else
                {
                    setValidUser(false)
                    sessionStorage.removeItem('auth_token')
                }
            } catch (error) {
                console.log(error.message);
                sessionStorage.removeItem('auth_token')
                setValidUser(false)
            }
            finally
            {
                setLoading(false)
            }
        }
        verifyUser()
    },[])
    if(loading)
        return <div className='text-white-500 font-bold text-center mt-10'>Checking authentication</div>
    return validUser ? children : <Navigate to='/login' replace/>
}

export default ProtectedRoute