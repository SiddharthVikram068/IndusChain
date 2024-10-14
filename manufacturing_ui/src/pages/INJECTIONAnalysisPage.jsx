import React from 'react'
import Sidebar from '../components/Sidebar'
import INJECTION from '../components/injection'

const INJECTIONAnalysisPage = () => {
return (
    <div className="flex min-h-screen bg-gray-100">
        <Sidebar />
        <div className="flex-grow">
            <div className="p-4">
                <INJECTION />
            </div>
        </div>
    </div>
)
}

export default INJECTIONAnalysisPage