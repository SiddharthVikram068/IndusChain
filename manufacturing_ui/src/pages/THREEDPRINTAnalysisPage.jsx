import React from 'react'
import Sidebar from '../components/Sidebar'
import Threedprint from '../components/threedprint'

const THREEDPRINTAnalysisPage = () => {
return (
    <div className="flex min-h-screen bg-gray-100">
        <Sidebar />
        <div className="flex-grow">
            <div className="p-4">
                <Threedprint />
            </div>
        </div>
    </div>
)
}

export default THREEDPRINTAnalysisPage;