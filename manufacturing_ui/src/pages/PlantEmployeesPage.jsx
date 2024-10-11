import React from 'react'
import Sidebar from '../components/Sidebar'

const PlantEmployeesPage = () => {
  return (
    <div className="flex min-h-screen bg-gray-100">
        <Sidebar />
        <div className="flex-grow">
        <div className="p-4">
          <div className="bg-white shadow-md p-3 rounded-lg">
            <p className="mt-1">Name: Aything</p>
            <p>Email: johndoe@example.com</p>
            <p>Position: Plant Manager</p>
          </div>
        </div>
        </div>
      </div>
  )
}

export default PlantEmployeesPage