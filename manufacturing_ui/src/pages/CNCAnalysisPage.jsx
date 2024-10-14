import React from 'react'
import Sidebar from '../components/Sidebar'
import Cnc from '../components/cnc'

const CNCAnalysisPage = () => {
return (
    <div className="flex min-h-screen bg-gray-100">
        <Sidebar />
        <div className="flex-grow">
            <div className="p-4">
                <Cnc />
            </div>
        </div>
    </div>
)
}

export default CNCAnalysisPage