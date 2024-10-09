import React from 'react'
import Graph from '../components/Graph';
import Tasks from '../components/Tasks';
import Statistics from '../components/Statistics';
import Sidebar from '../components/Sidebar';

const OwnerDashboard = () => {
    return (
        <div className="flex min-h-screen bg-white">
          <Sidebar />
          <div className="flex-grow p-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white border border-orange-600 shadow-lg rounded-lg p-6">
                <h2 className="text-xl font-semibold text-orange-600 mb-4">Data Overview</h2>
                <Graph />
              </div>
              <div className="bg-white border border-orange-600 shadow-lg rounded-lg p-6">
                <h2 className="text-xl font-semibold text-orange-600 mb-4">Statistics</h2>
                <Statistics />
              </div>
            </div>
            <div className="mt-6 bg-white border border-orange-600 shadow-lg rounded-lg p-6">
              <h2 className="text-xl font-semibold text-orange-600 mb-4">Tasks</h2>
              <Tasks />
            </div>
          </div>
        </div>
      );
}

export default OwnerDashboard