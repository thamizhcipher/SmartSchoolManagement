import Footer from "../components/Footer/Footer"
import { Outlet } from "react-router-dom"
import StudentNavbar from "../components/Navbar/StudentNavbar"

export const StudentLayout = () => {
  return (
    <div>
        <StudentNavbar />
        <main className="p-4 min-h-screen">
            <Outlet />
        </main>
        <Footer />
    </div>
  )
}
