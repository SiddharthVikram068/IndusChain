import React from 'react'
import Sidebar from '../components/Sidebar'
import CONVEYOR from '../components/conveyor'

const CONVEYORAnalysisPage = () => {
return (
    <div className="flex min-h-screen bg-gray-100">
        <Sidebar />
        <div className="flex-grow">
            <div className="p-4">
                <CONVEYOR />
            </div>
        </div>
    </div>
)
}

export default CONVEYORAnalysisPage