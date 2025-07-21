import axios from '../../api/axios'
import { useNavigate,Link } from 'react-router-dom'
import ToastProvider, { useToast } from '../../context/ToastContext'
const AdminNavbar = () => {
    const navigate = useNavigate()
    const {showToast} = useToast()
    const handleLogout = async()=>{
        try {
            await axios.delete("/logout")
            sessionStorage.removeItem('auth_token')
            sessionStorage.removeItem('user_role')
            navigate('/login')
        } catch (error) {
            console.log(error);
            showToast(error.response.data.message,"error")   
        }
    }
  return (
    <nav className='flex sticky top-0 z-50 shadow-md bg-white-700 justify-between text-white p-4 items-center'>
        <div className="brand">
            <h4 className='font-bold text-xl text-violet-500'>Smart Management System</h4>
        </div>
        
        <div className="links">
            <Link to='/admin/dashboard' className="hover:font-bold hover:text-violet-500 transition-color duration-200 px-4">Dashboard</Link>
            <Link to='/admin/register' className="hover:font-bold hover:text-violet-500 transition-color duration-200 px-4">Manage Users</Link>
            <Link to='/admin/resources' className="hover:font-bold hover:text-violet-500 transition-color duration-200 px-4">Manage Resources</Link>
            <button className='bg-yellow-500 rounded-md text-black p-1.5 mx-2 hover:bg-orange-700 hover:text-white transition-color duration-200' onClick={handleLogout}>Logout</button>
        </div>
    </nav>
  )
}

export default AdminNavbar