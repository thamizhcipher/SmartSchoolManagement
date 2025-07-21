import React, { useEffect, useState } from 'react'
import StatCard from '../../components/Admin/StatCard';
import axios from '../../api/axios'
import MarkChart from '../../components/Admin/MarkChart';
export const AdminDashboard = () => {
  const [stats,setStats] = useState({students:0, teachers:0});
  const [marks,setMarks] = useState([])

  useEffect(()=>{
    const fetchStats = async ()=>{
      try {
        const res = await axios.get('/api/v1/stats')
        setStats(res.data)
      } catch (error) {
        console.log(error);
      }
    }
    const fetchMarks = async ()=>{
      try {
        const res = await axios.get('/api/v1/marks')
        setMarks(res.data)
      } catch (error) {
        console.log(error);
      }
    }
    fetchStats()
    fetchMarks()
  },[])


  return (
    <>
        <div>
          <div className="flex flex-wrap gap-4">
            <StatCard title={"Total Students"} count={stats.students} />
            <StatCard title={"Total Teachers"} count={stats.teachers} />
          </div>
          <MarkChart rawData={marks} />
        </div>
        {/* <div className="">
         <iframe src="http://localhost:3001/d-solo/d9508bbf-ea30-46cb-8782-5a5febd46ab5/attendance?orgId=1&from=1751587200000&to=1752105600000&timezone=browser&var-query0=&editIndex=0&var-attendance_state=Present&theme=light&panelId=1&__feature.dashboardSceneSolo" width="450" height="200" frameborder="0"></iframe>
        </div> */}
    </>
  )
}
