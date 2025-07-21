import { useEffect, useState } from 'react'
import '../../styles/forms.css'
import { useToast } from '../../context/ToastContext'
import axios from '../../api/axios'
import Modal from '../Modal'

const EventAdminBox = () => {
    const [form,setForm] = useState({title:"",description:"",date:"",location:""})
    const [editEvent,setEditEvent] = useState({title:"",description:"",date:"",location:"",id:""})
    const [isModalOpen,setIsModalOpen] = useState(false)
    const [events,setEvents] = useState([])
    const {showToast} = useToast()

    const createEvent = async ()=>{
        try {
            const res = await axios.post("/api/v1/events",{
                event:{
                    title: form.title,
                    description: form.description,
                    date: form.date,
                    location: form.location
                }
            })
            if(res.status === 200)
            {
                showToast("Event created successfully")
            }
        } catch (error) {
            console.log(error);
            showToast(error.response.data.error,"error")
        }
    }

    const fetchEvents = async ()=>{
        try {
            const res = await axios.get("/api/v1/events")
            
            setEvents(res.data.events)
        } catch (error) {
            console.log(error);
            showToast(error.response.data.error,"error")
        }
    }
    useEffect(()=>{
        fetchEvents()
    },[])

    const handleEdit = (event)=>{
        setIsModalOpen(true)
        setEditEvent(event)
    }

    const handleUpdate =async ()=>{
        try {
            const res = await axios.put(`/api/v1/events/${editEvent.id}`,
                {
                    event:
                    {
                        title: editEvent.title,
                        description: editEvent.description,
                        date: editEvent.date,
                        location: editEvent.location
                    }
                }
            )
            if(res.status === 200)
            {
                fetchEvents()
                showToast("Updated successfully")
                setIsModalOpen(false)
            }
        } catch (error) {
            console.log(error);
            showToast(error.response.data.error,"error")
        }
    }

    const handleDelete =async (id)=>{
        try {
            await axios.delete(`/api/v1/events/${id}`)
            fetchEvents()
            showToast("Deleted successfully")
        } catch (error) {
            console.log(error);
            showToast(error.response.data.error,"error")
        }
    }

  return (
    <>
    <div>
        <div className="add-course">
            <h3 className='text-center text-2xl font-bold mb-4 text-white'>Add Event</h3>
            <form onSubmit={()=>createEvent()}>
                <div className="inp">
                    <label htmlFor="title">Title</label>
                    <input value={form.title} onChange={(e)=>setForm({...form, title:e.target.value})} type="text" name="" id="title" required />
                </div>
                <div className="inp">
                    <label htmlFor="description">Description</label>
                    <input value={form.description} onChange={(e)=>setForm({...form,description:e.target.value})} type="text" name="" id="description" required />
                </div>
                <div className="inp">
                    <label htmlFor="date">Date</label>
                    <input value={form.date} onChange={(e)=>setForm({...form,date:e.target.value})} type="date" name="" id="date" required />
                </div>
                <div className="inp">
                    <label htmlFor="location">Location</label>
                    <input value={form.location} onChange={(e)=>setForm({...form,location:e.target.value})} type="text" name="" id="location"  />
                </div>
                <button type='submit'>Create</button>
            </form>
        </div>
        <div className="manage-course">
            <h3 className='text-center text-2xl font-bold mb-4 text-white'>Manage Events</h3>
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
                        {
                            events.map((event)=>(
                                <tr key={event.id}>
                                    <td className='py-2 px-4'>{event.title}</td>
                                    <td className='py-2 px-4'>
                                        <button onClick={()=>handleEdit(event)} className='text-blue-600 hover:font-bold'>
                                            Edit
                                        </button>
                                    </td>
                                    <td className='py-2 px-4'>
                                        <button onClick={()=>handleDelete(event.id)} className='text-blue-600 hover:font-bold'>
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))
                        }
                        {
                            events.length === 0 && (
                                <tr>
                                    <td colSpan={3} className='text-center py-4 text-black'>No events found</td>
                                </tr>
                            )
                        }
                    </tbody>
                </table>
            </div>
        </div>
    </div>

        {/* MODAL */}

        <Modal isOpen={isModalOpen} onClose={()=>setIsModalOpen(false)} title={"Edit events"}>
        <form className='modal-form' onSubmit={(e)=>{
            e.preventDefault()
            handleUpdate()
        }}>
                <div className="inp">
                    <label htmlFor="title" className='text-black'>Title</label>
                    <input type="text" value={editEvent.title} onChange={(e)=>setEditEvent({...editEvent,title:e.target.value})} name="" id="title" required />
                </div>
                <div className="inp">
                    <label htmlFor="description" className='text-black'>Description</label>
                    <input type="text" onChange={(e)=>setEditEvent({...editEvent,description:e.target.value})} value={editEvent.description} name="" id="description" required />
                </div>
                <div className="inp">
                    <label htmlFor="date" className='text-black'>Date</label>
                    <input type="date" onChange={(e)=>setEditEvent({...editEvent,date:e.target.value})} value={editEvent.date ? editEvent.date.slice(0,10):""} name="" id="date" required />
                </div>
                <div className="inp">
                    <label htmlFor="location" className='text-black'>Location</label>
                    <input type="text" onChange={(e)=>setEditEvent({...editEvent,location:e.target.value})} value={editEvent.location} name="" id="location" required />
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

export default EventAdminBox