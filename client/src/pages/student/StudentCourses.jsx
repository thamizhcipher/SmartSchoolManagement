import React, { use, useEffect, useState } from 'react'
import { useToast } from '../../context/ToastContext';
import axios from '../../api/axios';

const StudentCourses = () => {
    const [courses,setCourses] = useState([]);
    const {showToast} = useToast()
    const fetchCourses = async()=>{
        try {
            const res =await axios.get("/api/v1/courses/")
                setCourses(res.data.courses)
                console.log(res.data);
        } catch (error) {
            console.log(error);
            showToast(error.response.data.error,"error")
        }
    }
    useEffect(()=>{
        fetchCourses()
    },[])
  return (
    <>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6 mt-20">
            {
                courses.length === 0 ? 
                (<p className='text-center text-white text-xl mt-10'>
                    No courses to display ! Ask your teacher to add some courses 😉
                </p>):
                (
                    courses.map((course)=>(
                        <div className="bg-white shadow-md rounded-xl p-6 border shadow-silver hover:shadow-lg transition duration-200" key={course.id}>
                                <h2 className='text-xl font-semibold mb-2 text-blue-700'>{course.title}</h2>
                                <p className='text-black mb-4'>{course.description}</p>
                                <a className='inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700' href={course.url} target='_blank'> Visit Course</a>
                        </div>
                    ))
                )
            }
        </div>
    </>
  )
}

export default StudentCourses