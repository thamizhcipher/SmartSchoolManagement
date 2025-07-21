import {Outlet} from 'react-router-dom'


const AuthLayout = () => {
  return (
    <>
    <h3 className='tracking-wider text-white text-xl text-center font-bold bg-gray-950 mt-10 '>Welcome to Smart Management </h3>
    <div className='bg-gray-950 flex items-center justify-center'>
        <div className="w-full max-w-md text-white border-2 border-white-900 border-solid rounded-xl shadow-lg shadow-gray-600/50 p-20 mt-14">
            <Outlet />
        </div>
    </div>
    </>
  )
}

export default AuthLayout