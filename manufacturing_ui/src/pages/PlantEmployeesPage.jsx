import React from 'react'
import Sidebar from '../components/Sidebar'
import PlantManager from '../components/PlantManager'

const PlantEmployeesPage = () => {
return (
    <div className="flex min-h-screen bg-gray-100">
        <Sidebar />
        <div className="flex-grow">
            <div className="p-4">
                <PlantManager />
            </div>
        </div>
    </div>
)
}

export default PlantEmployeesPage
