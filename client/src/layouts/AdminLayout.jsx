import Footer from "../components/Footer/Footer"
import { Outlet } from "react-router-dom"
import AdminNavbar from "../components/Navbar/AdminNavbar"

const AdminLayout = () => {
  return (
    <div>
        <AdminNavbar />
        <main className="p-4 min-h-screen">
            <Outlet />
        </main>
        <Footer />
    </div>
  )
}

export default AdminLayout