import React from 'react'
import Sidebar from '../components/Sidebar'
import threedprint from '../components/threedprint'

const THREEDPRINTAnalysisPage = () => {
return (
    <div className="flex min-h-screen bg-gray-100">
        <Sidebar />
        <div className="flex-grow">
            <div className="p-4">
                <threedprint />
            </div>
        </div>
    </div>
)
}

export default THREEDPRINTAnalysisPage;