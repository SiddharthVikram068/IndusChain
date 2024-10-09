import React from 'react';

const Statistics = () => {
  return (
    <div>
      <div className="flex justify-between">
        <p className="text-gray-600">Total Tasks:</p>
        <p className="text-orange-600 font-bold">10</p>
      </div>
      <div className="flex justify-between mt-2">
        <p className="text-gray-600">Completed:</p>
        <p className="text-orange-600 font-bold">5</p>
      </div>
      <div className="flex justify-between mt-2">
        <p className="text-gray-600">Pending:</p>
        <p className="text-orange-600 font-bold">5</p>
      </div>
    </div>
  );
};

export default Statistics;
