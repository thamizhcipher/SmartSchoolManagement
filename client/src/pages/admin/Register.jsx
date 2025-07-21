import {useEffect, useState} from 'react'
import axios from '../../api/axios'
import { useToast } from '../../context/ToastContext';

const Register = () => {

    const [form,setForm] = useState({email:"",password:"",password_confirmation:"",user_name:"",role:"student"})
    const [msg,setMsg] = useState("");
    const {showToast} = useToast()
    useEffect(()=>{
      setMsg("")
    },[])
    const handleSubmit =async (e)=>{
        e.preventDefault();
        try {
          const res = await axios.post('/signup', {
      user: {
        email: form.email,
        password: form.password,
        user_name: form.user_name,
        password_confirmation: form.password_confirmation,
        role: form.role
      }
    },
            {
              headers:{
                "Content-Type":'application/json'
              }
            }
          ); 
          
          showToast("User created successfully")
          setForm(
            {
              email: "",
              password: "",
              user_name: "",
              password_confirmation: ""
            }
          )
        } catch (error) {
          console.log(error);
          showToast(error.response.data.error,"error")
        }
    }
  return (
    <>
        <form onSubmit={handleSubmit} className="mt-2 flex items-center justify-center px-4 py-8">
  <div className="w-full max-w-md rounded-2xl shadow-2xl p-8 space-y-6 border-solid border-2 rounded-xl">
    <h2 className="text-3xl font-extrabold text-center text-white">Register</h2>

    <div className="space-y-4">
      <div className=''>
        <label htmlFor="user_name" className="block text-sm font-medium text-white">
          Name
        </label>
        <input
          id="user_name"
          type="text"
          value={form.user_name}
          onChange={(e) => setForm({ ...form, user_name: e.target.value })}
          required
          className="mt-1 block w-full  px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
        />
      </div>
      <div className=''>
        <label htmlFor="email" className="block text-sm font-medium text-white">
          Email address
        </label>
        <input
          id="email"
          type="email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          required
          className="mt-1 block w-full  px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      <div className='w-full'>
        <label htmlFor="password" className="block text-sm font-medium text-white">
          Password
        </label>
        <input
          id="password"
          type="password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          required
          className="mt-1 block w-full  px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
        />
      </div>
      <div className='w-full'>
        <label htmlFor="password_confirmation" className="block text-sm font-medium text-white">
          Confirm Password
        </label>
        <input
          id="password_confirmation"
          type="password"
          value={form.password_confirmation}
          onChange={(e) => setForm({ ...form, password_confirmation: e.target.value })}
          required
          className="mt-1 block w-full  px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
        />
      </div>
      <div className='w-full'>
        <label htmlFor="role" className="block text-sm font-medium text-white">
          Role
        </label>
        <select name="role" id="role" value={form.role} required className='mt-1 block w-full  px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500' onChange={(e)=> setForm({...form, role:e.target.value})}>
          <option value="student">student</option>
          <option value="teacher">teacher</option>
          <option value="admin">admin</option>
        </select>
      </div>

      <button
        type="submit"
        className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-300 shadow-md"
      >
        Register
      </button>

      {msg && <p className="text-center text-yellow-600 font-medium">{msg}</p>}
    </div>
  </div>
</form>

    </>
  )
}

export default Register