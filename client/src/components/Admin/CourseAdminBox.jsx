import '../../styles/forms.css'
import Modal from '../../components/Modal'
import axios from '../../api/axios'
import { useEffect, useState } from 'react'
import { useToast } from '../../context/ToastContext'

const CourseAdminBox = () => {
    const [courses,setCourses] = useState([])
    const [form,setForm] = useState({title:"",description:"",url:""})
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [editCourse,setEditCourse] = useState({title:"",description:"",url:"",id:""})
    const {showToast} = useToast()

    const handleEdit =(course)=>{
        setEditCourse(course)
        setIsModalOpen(true)
    }

    const fetchCourses =async ()=>{
        try {
            const res =await axios.get("/api/v1/courses")
            setCourses(res.data.courses)
        } catch (error) {
            console.log(error)
            showToast(error.response.data.error,"error")
        }
    }

    const createCourse = async(e)=>{
        e.preventDefault()
        try {
            const res =await axios.post("/api/v1/courses",{
                course:
                {
                    title: form.title,
                    description: form.description,
                    url: form.url
                }
            })
            if(res.data.message)
            {
                fetchCourses()
                showToast("Course created successfully","success")
                setForm({title:"",description:"",url:""})
            }
            
        } catch (error) {
            console.log(error);
            showToast(error.response.data.error,"error")
        }
    }
      
    useEffect(()=>{
        fetchCourses()
    },[])
    const handleUpdate =async ()=>{
        try {
            const res = await axios.put(`/api/v1/courses/${editCourse.id}`,{
                course:
                {
                    title:editCourse.title,
                    description:editCourse.description,
                    url:editCourse.url
                }
            })
            
            if(res.status === 200)
            {
                showToast("course updated successfully","success")
                fetchCourses()
                setIsModalOpen(false)
            }
            
        } catch (error) {
            console.log(error)
            showToast(error.response.data.error,"error")
        }
    }

    const handleDelete =async (id)=>{
        if(!window.confirm("Are you sure you want to delete this course?")) return;
        try {
            await axios.delete(`/api/v1/courses/${id}`)
            showToast("course deleted successfully","success")
        } catch (error) {
            console.log(error);
            showToast(error.response.data.error,"error")
            
        }
    }

  return (
    <>
    <div>
        <div className="add-course">
            <h3 className='text-center text-white text-2xl font-bold mb-2'>Add course</h3>
            <form onSubmit={createCourse}>
                <div className="inp">
                    <label htmlFor="title">Title</label>
                    <input type="text" value={form.title} onChange={(e)=>setForm({...form,title:e.target.value})} name="" id="title" required />
                </div>
                <div className="inp">
                    <label htmlFor="description">Description</label>
                    <input type="text" onChange={(e)=>setForm({...form,description:e.target.value})} value={form.description} name="" id="description" required />
                </div>
                <div className="inp">
                    <label htmlFor="url">URL</label>
                    <input type="text" onChange={(e)=>setForm({...form,url:e.target.value})} value={form.url} name="" id="url" required />
                </div>
                <button type='submit'>Create</button>
            </form>
        </div>
        <div className="manage-course">
            <h3 className='text-center text-2xl font-bold mb-4 text-white'>Manage courses</h3>
            <div className="overflow-x-auto">
                <table className='min-w-full bg-white shadow rounded-lg'>
                    <thead className='bg-gray-200 text-gray-700 text-left'>
                        <tr>
                            <th className='py-2 px-4'>Title</th>
                            <th className='py-2 px-4'>Edit</th>
                            <th className='py-2 px-4'>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {courses.map((course)=>(
                            <tr key={course.id} className=''>
                                <td className='py-2 px-4'>{course.title}</td>
                                <td className='py-2 px-4'>
                                    <button onClick={()=>handleEdit(course)} className='text-blue-600 hover:font-bold'>
                                        Edit
                                    </button>
                                </td>
                                <td className='py-2 px-4'>
                                    <button className='text-blue-600 hover:font-bold' onClick={()=>handleDelete(course.id)}>
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                        {courses.length === 0 && (
                            <tr>
                                <td colSpan={3} className='text-center py-4 text-black'>
                                    No courses found
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    </div>

// MODAL 
    <Modal isOpen={isModalOpen} onClose={()=>setIsModalOpen(false)} title={"Edit course"}>
        <form className='modal-form' onSubmit={(e)=>{
            e.preventDefault()
            handleUpdate()
        }}>
                <div className="inp">
                    <label htmlFor="title" className='text-black'>Title</label>
                    <input type="text" value={editCourse.title} onChange={(e)=>setEditCourse({...editCourse,title:e.target.value})} name="" id="title" required />
                </div>
                <div className="inp">
                    <label htmlFor="description" className='text-black'>Description</label>
                    <input type="text" onChange={(e)=>setEditCourse({...editCourse,description:e.target.value})} value={editCourse.description} name="" id="description" required />
                </div>
                <div className="inp">
                    <label htmlFor="url" className='text-black'>URL</label>
                    <input type="text" onChange={(e)=>setEditCourse({...editCourse,url:e.target.value})} value={editCourse.url} name="" id="url" required />
                </div>
                <div className="flex justify-end gap-2">
                    <button
                        type="button"
                        onClick={() => setIsModalOpen(false)}
                        className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                    >
                        Update
                    </button>
                </div>
        </form>
    </Modal>
    </>
  )
}

export default CourseAdminBox