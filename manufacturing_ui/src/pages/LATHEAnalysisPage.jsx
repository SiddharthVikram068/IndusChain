import React from 'react'
import Sidebar from '../components/Sidebar'
import Lathe from '../components/lathe'

const LATHEAnalysisPage = () => {
return (
    <div className="flex min-h-screen bg-gray-100">
        <Sidebar />
        <div className="flex-grow">
            <div className="p-4">
                <Lathe />
            </div>
        </div>
    </div>
)
}

export default LATHEAnalysisPage