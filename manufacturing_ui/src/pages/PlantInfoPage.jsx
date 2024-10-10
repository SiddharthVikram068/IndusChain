import React from 'react';
import Graph from '../components/Graph';
import Sidebar_user from '../components/SIdebar_user';

const PlantInfoPage = () => {
  return (
    <div className="flex min-h-screen bg-gray-100">
    <Sidebar_user />
    <div className="flex-grow">
    <div className="p-8">
      <h2 className="text-2xl font-bold text-orange-600 mb-6">Plant Information</h2>
      
      <div className="bg-white p-6 mb-6 shadow-lg rounded-lg">
        <h3 className="text-xl text-orange-600 mb-4">Energy Consumption</h3>
        <Graph />
      </div>

      <div className="bg-white p-6 shadow-lg rounded-lg">
        <h3 className="text-xl text-orange-600 mb-4">Faulty Equipment</h3>
        <ul className="list-disc pl-5">
          <li>Boiler #3 - Overheating</li>
          <li>Conveyor Belt #2 - Stalled</li>
          <li>Compressor #5 - Low Pressure</li>
        </ul>
      </div>
    </div>
    </div>
    </div>
  );
};

export default PlantInfoPage;
