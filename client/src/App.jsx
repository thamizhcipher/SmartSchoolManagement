import { BrowserRouter,Routes,Route } from 'react-router-dom'
import AuthLayout from './layouts/AuthLayout'
import Register from './pages/admin/Register'
import Login from './pages/Login'
import AdminLayout from './layouts/AdminLayout'
import { StudentLayout } from './layouts/StudentLayout'
import Home from './pages/Home'
import ProtectedRoute from './components/ProtectedRoute'
import { AdminDashboard } from './pages/admin/AdminDashboard'
import { StudentDashboard } from './pages/student/StudentDashboard'
import Resources from './pages/admin/Resources'
import StudentCourses from './pages/student/StudentCourses'
import StudentEvents from './pages/student/StudentEvents'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        {/* AUTHORIAZATION SECTION */}
        <Route element={<AuthLayout />}>
            <Route path='/login' element={<Login />} />
        </Route>

        {/* ADMIN SECTION */}
        <Route element={<AdminLayout />}>
            <Route path='/admin/dashboard' element={
              <ProtectedRoute> 
                <AdminDashboard />
              </ProtectedRoute>
            } />
            <Route path='/admin/register' element={
              <ProtectedRoute>
                  <Register />
              </ProtectedRoute>
            }>
            </Route>
            <Route path='/admin/resources' element={
              <ProtectedRoute>
                  <Resources />
              </ProtectedRoute>
            }>
            </Route>
        </Route>

        {/* STUDENT SECTION */}
        <Route element={<StudentLayout />}>
            <Route path='/student/dashboard' element={
              <ProtectedRoute> 
                <StudentDashboard />
              </ProtectedRoute>
            } />
            <Route path='/student/courses' element={
              <ProtectedRoute> 
                <StudentCourses />
              </ProtectedRoute>
            } />
            <Route path='/student/events' element={
              <ProtectedRoute> 
                <StudentEvents />
              </ProtectedRoute>
            } />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
