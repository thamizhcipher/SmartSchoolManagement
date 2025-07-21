import React from 'react'
import axios from '../../api/axios'
import { useNavigate } from 'react-router-dom'

const Navbar = () => {
    const navigate = useNavigate()
    const handleLogout=async()=>
    {
        try {
           await axios.delete("/logout")
           sessionStorage.removeItem('auth_token')
           navigate('/login')
        } catch (error) {
            console.log("Logout failed",error);
            
        }
    }
  return (
    <>
        <nav className="bg-blue-600 text-white p-4 shadow">
            <div className="max-w-7xl mx-auto flex justify-between items-center">
            <h1 className="text-lg font-semibold">School Dashboard</h1>
            <div>
                <a href="/" className="hover:underline">Home</a>
                <button className='bg-yellow-500 rounded-md text-black p-1.5 mx-2' onClick={handleLogout}>Logout</button>
            </div>
            </div>
        </nav>
    </>
  )
}

export default Navbar