import React, { useState } from 'react'
import axios from '../api/axios'
import { Link, useNavigate } from 'react-router-dom'
import { useToast } from '../context/ToastContext'
const Login = () => {
    const navigate = useNavigate()
    const [form, setForm] = useState({email:"",password:""})
    const [msg,setMsg] = useState("")
    const {showToast} = useToast()
    const handleLogin= async (e)=>{
        e.preventDefault();
        try {
            const res =await axios.post('login',{
                user:{
                    email: form.email,
                    password: form.password
                },
            })
            
            const token = res.headers["authorization"].split(' ')[1]
            // console.log(`token fetched from session storage ${token}`);
            if(token)
            {
                const user = res.data.status.data.user;
                sessionStorage.setItem('auth_token',token)
                sessionStorage.setItem('user_role',user.role)
                setMsg(res.data.status?.message)
                if(user.role === 'admin')
                    navigate('/admin/dashboard')
                else if (user.role === 'student')
                    navigate('/student/dashboard')
                else
                    navigate('/login')
            }
           
        } catch (error) {
            console.log(error);
            showToast(error.response.data.error,"error")
            setForm(
                {
                    email:"",
                    password:""
                }
            )
        }
    }
    return (
    <>
        <form onSubmit={handleLogin} className='space-y-4'>
            <h2 className='text-center font-bold text-3xl mb-10'>Login</h2>
            <div className="inp-lablel">
                <label htmlFor="" className='font-light'>Email</label>
                <input className='text-black w-full px-4 rounded-md py-2 border border-gray-300' type="text" name="" id="email" onChange={(e)=>setForm({...form, email:e.target.value})} value={form.email} placeholder='Enter email' />
            </div>
            <div className="inp-lablel">
                <label htmlFor="" className='font-light'>Password</label>
                <input className=' text-black w-full px-4 rounded-md py-2 border border-gray-300' type="password" name="" id="password" onChange={(e)=>setForm({...form, password:e.target.value})} value={form.password} placeholder='Enter password' />
            </div>
            <button type='submit' className='w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700'>Submit</button>
            {msg && <p className='text-center text-red-500'>{msg}</p>}
        </form>
    </>
  )
}

export default Login