import React from 'react';
import axios from 'axios';
import { useEffect, useState, useRef } from 'react';

const idList = ["M14860", "L47181", "L47182", 
  "H29441", 
  "M14895", 
  "H29452", 
  "L47225", 
  "M14909", 
  "H29466", 
  "L47235"];

const getRandomId = () => {
  const randomIndex = Math.floor(Math.random() * idList.length);
  return idList[randomIndex];
};

const generateRandomData = () => {
  const firstFieldOptions = ["M", "L", "H"]; // The first field must be one of these values
  const randomFirstField = firstFieldOptions[Math.floor(Math.random() * firstFieldOptions.length)];

  // Generate random numbers for the other fields
  const randomData = [
    randomFirstField,
    Math.floor(Math.random() * 500), // Random integer between 0 and 499
    Math.floor(Math.random() * 500), // Random float between 0 and 500
    Math.floor(Math.random() * 5000), // Random integer between 0 and 4999
    Math.floor(Math.random() * 10),  // Random float between 0 and 10
    Math.floor(Math.random() * 500)   // Random integer between 0 and 499
  ];

  console.log({ data: randomData });
  return { data: randomData };
  
};

const Tasks = () => {
  const [failures, setFailures] = useState([]); // Store the list of failures
  const intervalRef = useRef(null); // Ref to store the interval ID
  
  const sendRequest = async () => {
    try {
      const randomData = generateRandomData(); // Generate random data for the request

      const response = await axios.post(
        'https://tanishpathania.us-east-2.aws.modelbit.com/v1/predict_failure_dp/latest',
        randomData
      );

      if (response.data && response.data.data !== "No Failure") {
        // If the response contains a failure, add it to the list
        const failureEntry = {
          id: getRandomId(),               // Select a random ID
          type: response.data.data         // Failure type from the server response
        };
        console.log(failureEntry);
        setFailures((prevFailures) => [...prevFailures, failureEntry]);
      }

    } catch (error) {
      console.error('Error sending request:', error);
    }
  };

  useEffect(() => {
    intervalRef.current = setInterval(sendRequest, 30000); // 10 seconds = 10000ms

    // Cleanup: Clear the interval when the component unmounts
    return () => clearInterval(intervalRef.current);
  }, []);

  

  return (
    <div>
      <h1>Failure Monitor</h1>
      <ul>
        {failures.map((failure, index) => (
          <li className={`p-4 mb-2 border rounded-lg shadow-sm bg-orange-50`}
          key={index}>{failure.id}: {failure.type}
          

          </li>
        ))}
      </ul>
    </div>
  );
};

export default Tasks;
