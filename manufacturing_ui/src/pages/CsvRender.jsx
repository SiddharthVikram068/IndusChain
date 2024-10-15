import React from 'react'
import Sidebar from '../components/Sidebar'
import CsvRenderComponent from '../components/CsvRenderComponent'

const CsvRender = () => {
return (
    <div className="flex min-h-screen bg-gray-100">
        <Sidebar />
        <div className="flex-grow">
            <div className="p-4">
                <CsvRenderComponent />
            </div>
        </div>
    </div>
)
}

export default CsvRender