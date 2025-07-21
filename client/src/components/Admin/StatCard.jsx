import React from 'react'

const StatCard = ({title,count}) => {
  return (
    <div className="bg-white p-4 shadow-md rounded-lg w-full sm:w-1/2 md:w-1/3 m-auto mt-8">
        <h2 className="text-lg text-center font-semibold text-gray-700">{title}</h2>
        <p className="text-3xl text-center font-bold text-blue-800 mt-2">{count}</p>
  </div>
  )
}

export default StatCard