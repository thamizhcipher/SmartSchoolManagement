import { useState } from "react"
import CourseAdminBox from "../../components/Admin/CourseAdminBox"
import EventAdminBox from "../../components/Admin/EventAdminBox"

const Resources = () => {
    const [activeTab,setActiveTab] = useState("courses")
  return (
    <div className="p-10 w-1/2 m-auto mt-20 border-solid border-2 border-white rounded-md shadow-white-600">
        <div className="flex justify-center m-auto">
                    <div className="flex space-x-4 mb-4">
                        <button
                        onClick={()=> setActiveTab("courses")}
                        className={`pb-2 px-4 font-semibold ${ activeTab === "courses" ? "border-b-2 border-blue-600 text-blue-700 rounded-lg" : "text-white"}`}>
                            Courses
                        </button>
                    </div>
                    <div className="flex space-x-4 mb-4">
                        <button
                        onClick={()=> setActiveTab("events")}
                        className={`pb-2 px-4 font-semibold ${ activeTab === "events" ? "border-b-2 border-blue-600 text-blue-700 rounded-lg" : "text-white"}`}>
                            Events
                        </button>
                    </div>
        </div>

        <div className="rounded-lg shadow-md">
            {activeTab === "courses"? <CourseAdminBox /> : <EventAdminBox />}
        </div>

    </div>
  )
}

export default Resources