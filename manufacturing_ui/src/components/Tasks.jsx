import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const idList = ["M14860", "L47181", "L47182", "H29441", "M14895", "H29452", "L47225", "M14909", "H29466", "L47235"];

const getRandomId = () => {
  const randomIndex = Math.floor(Math.random() * idList.length);
  return idList[randomIndex];
};

const generateRandomData = () => {
  const firstFieldOptions = ["M", "L", "H"];
  const randomFirstField = firstFieldOptions[Math.floor(Math.random() * firstFieldOptions.length)];

  const randomData = [
    randomFirstField,
    Math.floor(Math.random() * 500),
    Math.floor(Math.random() * 500),
    Math.floor(Math.random() * 5000),
    Math.floor(Math.random() * 10),
    Math.floor(Math.random() * 500)
  ];

  return { data: randomData };
};

const Tasks = () => {
  const [failures, setFailures] = useState([]); // Store the list of failures
  const intervalRef = useRef(null);

  const sendRequest = async () => {
    try {
      const randomData = generateRandomData();

      const response = await axios.post(
        'https://tanishpathania.us-east-2.aws.modelbit.com/v1/predict_failure_dp/latest',
        randomData
      );

      if (response.data && response.data.data !== "No Failure") {
        const failureEntry = {
          id: getRandomId(),
          type: response.data.data
        };
        setFailures((prevFailures) => [...prevFailures.slice(-4), failureEntry]); // Keep only the latest 5
      }

    } catch (error) {
      console.error('Error sending request:', error);
    }
  };

  useEffect(() => {
    intervalRef.current = setInterval(sendRequest, 1000);

    return () => clearInterval(intervalRef.current);
  }, []);

  // Group failures by type for pie chart
  const failureCounts = failures.reduce((acc, curr) => {
    acc[curr.type] = (acc[curr.type] || 0) + 1;
    return acc;
  }, {});

  const failureTypes = Object.keys(failureCounts);
  const failureValues = Object.values(failureCounts);

  const data = {
    labels: failureTypes,
    datasets: [
      {
        label: '# of Failures',
        data: failureValues,
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div>
      <h1>Failure Monitor</h1>
      <ul>
        {failures.map((failure, index) => (
          <li
            className={`p-4 mb-2 border rounded-lg shadow-sm ${index < failures.length - 5 ? 'bg-gray-300 opacity-50' : 'bg-orange-50'}`}
            key={index}
          >
            {failure.id}: {failure.type}
          </li>
        ))}
      </ul>

      {failureTypes.length > 0 && (
        <div style={{ width: '400px', margin: 'auto' }}>
          <h2>Failure Distribution</h2>
          <Pie data={data} />
        </div>
      )}
    </div>
  );
};

export default Tasks;
















// import React from 'react';
// import axios from 'axios';
// import { useEffect, useState, useRef } from 'react';

// const idList = ["M14860", "L47181", "L47182",
//                 "H29441", "M14895", "H29452",
//                 "L47225", "M14909", "H29466", "L47235"];

// const getRandomId = () => {
//   const randomIndex = Math.floor(Math.random() * idList.length);
//   return idList[randomIndex];
// };

// const generateRandomData = () => {
//   const firstFieldOptions = ["M", "L", "H"]; // The first field must be one of these values
//   const randomFirstField = firstFieldOptions[Math.floor(Math.random() * firstFieldOptions.length)];

//   // Generate random numbers for the other fields
//   const randomData = [
//     randomFirstField,
//     Math.floor(Math.random() * 500), // Random integer between 0 and 499
//     Math.floor(Math.random() * 500), // Random float between 0 and 500
//     Math.floor(Math.random() * 5000), // Random integer between 0 and 4999
//     Math.floor(Math.random() * 10),  // Random float between 0 and 10
//     Math.floor(Math.random() * 500)   // Random integer between 0 and 499
//   ];

//   console.log({ data: randomData });
//   return { data: randomData };

// };

// const Tasks = () => {
//   const [failures, setFailures] = useState([]); // Store the list of failures
//   const intervalRef = useRef(null); // Ref to store the interval ID

//   const sendRequest = async () => {
//     try {
//       const randomData = generateRandomData(); // Generate random data for the request

//       const response = await axios.post(
//         'https://tanishpathania.us-east-2.aws.modelbit.com/v1/predict_failure_dp/latest',
//         randomData
//       );

//       if (response.data && response.data.data !== "No Failure") {
//         // If the response contains a failure, add it to the list
//         const failureEntry = {
//           id: getRandomId(),               // Select a random ID
//           type: response.data.data         // Failure type from the server response
//         };
//         console.log(failureEntry);
//         setFailures((prevFailures) => [...prevFailures, failureEntry]);
//       }

//     } catch (error) {
//       console.error('Error sending request:', error);
//     }
//   };

//   useEffect(() => {
//     intervalRef.current = setInterval(sendRequest, 3000); // 10 seconds = 10000ms

//     // Cleanup: Clear the interval when the component unmounts
//     return () => clearInterval(intervalRef.current);
//   }, []);



//   return (
//     <div>
//       <h1>Failure Monitor</h1>
//       <ul>
//         {failures.map((failure, index) => (
//           <li className={`p-4 mb-2 border rounded-lg shadow-sm bg-orange-50`}
//           key={index}>{failure.id}: {failure.type}


//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default Tasks;
