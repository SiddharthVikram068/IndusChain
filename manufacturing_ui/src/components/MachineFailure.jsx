import React, { useEffect, useState } from 'react';
import axios from 'axios'; // Import axios for making API requests
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

// Helper function for normally distributed random numbers
const generateNormalRandom = (mean, stdDev) => {
  let u1 = Math.random();
  let u2 = Math.random();
  let randStdNormal = Math.sqrt(-2.0 * Math.log(u1)) * Math.sin(2.0 * Math.PI * u2);
  return mean + stdDev * randStdNormal;
};

const generateCumulativeSum = (arr) => {
  let sum = 0;
  return arr.map((value) => (sum += value));
};

// CNC Data Generation
const generateRandomDataForCNC = (numEntries) => {
  return {
    spindle_speed: Array.from({ length: numEntries }, () => generateNormalRandom(1200, 100).toFixed(2)),
    feed_rate: Array.from({ length: numEntries }, () => (100 + Math.random() * 200).toFixed(2)),
    tool_temperature: generateCumulativeSum(Array.from({ length: numEntries }, () => generateNormalRandom(200, 5).toFixed(2))),
    vibration_level: Array.from({ length: numEntries }, () => generateNormalRandom(1.5, 0.2).toFixed(2)),
    power_consumption: Array.from({ length: numEntries }, () => generateNormalRandom(5, 0.5).toFixed(2)),
    tool_wear: generateCumulativeSum(Array.from({ length: numEntries }, () => Math.max(0, generateNormalRandom(0, 1)).toFixed(2))),
  };
};

// Injection Molding Data Generation
const generateRandomDataForINJECTION = (numEntries) => {
  return {
    injection_pressure: Array.from({ length: numEntries }, () => generateNormalRandom(100, 10).toFixed(2)),
    melt_temperature: Array.from({ length: numEntries }, () => (180 + Math.random() * 40).toFixed(2)),
    clamping_force: Array.from({ length: numEntries }, () => generateNormalRandom(50, 5).toFixed(2)),
    cycle_time: Array.from({ length: numEntries }, () => generateNormalRandom(30, 3).toFixed(2)),
    screw_speed: Array.from({ length: numEntries }, () => (50 + Math.random() * 100).toFixed(2)),
    cooling_time: Array.from({ length: numEntries }, () => generateNormalRandom(20, 2).toFixed(2)),
    hydraulic_pressure: Array.from({ length: numEntries }, () => generateNormalRandom(3000, 200).toFixed(2)),
  };
};

// Lathe Data Generation
const generateRandomDataForLATHE = (numEntries) => {
  return {
    spindle_speed: Array.from({ length: numEntries }, () => generateNormalRandom(800, 100).toFixed(2)),
    feed_rate: Array.from({ length: numEntries }, () => (0.1 + Math.random() * 0.4).toFixed(2)),
    depth_of_cut: Array.from({ length: numEntries }, () => generateNormalRandom(2, 0.5).toFixed(2)),
    tool_wear: generateCumulativeSum(Array.from({ length: numEntries }, () => Math.max(0, generateNormalRandom(0, 1)).toFixed(2))),
    vibration_level: Array.from({ length: numEntries }, () => generateNormalRandom(1.2, 0.1).toFixed(2)),
    cutting_force: Array.from({ length: numEntries }, (_, i) => (generateNormalRandom(800, 100) * generateNormalRandom(2, 0.5) * 0.5).toFixed(2)),
  };
};

// 3D Printer Data Generation
const generateRandomDataFor3DPRINTER = (numEntries) => {
  return {
    layer_height: Array.from({ length: numEntries }, () => (0.1 + Math.random() * 0.4).toFixed(2)),
    print_speed: Array.from({ length: numEntries }, () => (30 + Math.random() * 70).toFixed(2)),
    nozzle_temperature: Array.from({ length: numEntries }, () => generateNormalRandom(200, 10).toFixed(2)),
    bed_temperature: Array.from({ length: numEntries }, () => generateNormalRandom(60, 5).toFixed(2)),
    filament_diameter: Array.from({ length: numEntries }, () => generateNormalRandom(1.75, 0.05).toFixed(2)),
  };
};

// Conveyor Belt Data Generation
const generateRandomDataForCONVEYOR = (numEntries) => {
  return {
    belt_speed: Array.from({ length: numEntries }, () => generateNormalRandom(1.5, 0.1).toFixed(2)),
    load_weight: Array.from({ length: numEntries }, () => (100 + Math.random() * 400).toFixed(2)),
    motor_current: Array.from({ length: numEntries }, (_, i) => (10 + (100 + Math.random() * 400) / 50).toFixed(2)),
    belt_tension: Array.from({ length: numEntries }, (_, i) => (200 + (100 + Math.random() * 400) * 0.5).toFixed(2)),
    belt_alignment_offset: Array.from({ length: numEntries }, () => generateNormalRandom(0, 0.5).toFixed(2)),
    pulley_rotation_speed: Array.from({ length: numEntries }, (_, i) => (generateNormalRandom(1.5, 0.1) * 60).toFixed(2)),
    ambient_temperature: Array.from({ length: numEntries }, () => generateNormalRandom(25, 2).toFixed(2)),
  };
};


const bundled_cnc_data_and_predictions = [];
const bundled_injection_data_and_predictions = [];
const bundled_lathe_data_and_predictions = [];
const bundled_printer_data_and_predictions = [];
const bundled_conveyor_data_and_predictions = [];

function MachineDataGenerator() {
  const [cncData, setCNCData] = useState({});
  const [injectionData, setInjectionData] = useState({});
  const [latheData, setLatheData] = useState({});
  const [printerData, setPrinterData] = useState({});
  const [conveyorData, setConveyorData] = useState({});

  const [failureCountsData_cnc, setFailureCountsData_cnc] = useState(null);
  const [failureCountsData_injection, setFailureCountsData_injection] = useState(null);
  const [failureCountsData_lathe, setFailureCountsData_lathe] = useState(null);
  const [failureCountsData_printer, setFailureCountsData_printer] = useState(null);
  const [failureCountsData_conveyor, setFailureCountsData_conveyor] = useState(null);

  useEffect(() => {
    const numEntries = 10; // Number of data points to generate
    setCNCData(generateRandomDataForCNC(numEntries));
    setInjectionData(generateRandomDataForINJECTION(numEntries));
    setLatheData(generateRandomDataForLATHE(numEntries));
    setPrinterData(generateRandomDataFor3DPRINTER(numEntries));
    setConveyorData(generateRandomDataForCONVEYOR(numEntries));
  }, []);

    const failure_types_cnc = ["No Failure","Tool Wear","Overheating","Spindle Failure","Control System Malfunction","Axis Drive Failure"];
    const failure_types_injection = ["No Failure","Injection Unit Failure","Mold Damage","Hydraulic System Failure","Heater Band Failure","Ejector Pin Failure"];
    const failure_types_lathe = ["No Failure","Spindle Bearing Failure","Tool Post Misalignment","Gearbox Malfunction","Chuck Failure","Tailstock Misalignment"];
    const failure_types_3d_printer = ["No Failure","Nozzle Clogging","Bed Adhesion Failure","Filament Jam","Power Loss","Software Error"];
    const failure_types_conveyor = ["No Failure","Belt Misalignment" ,"Motor Failure" ,"Pulley Wear" ,"Roller Seizing" ,"Tensioner Failure"];


    const sendRequest_cnc = async () => {
        if (!cncData) {
            console.log('No CNC data available');
            return;
        }

        try {
            const predictions_cnc = [];
            for (let i = 0; i < cncData.spindle_speed.length; i++) {
                const input_data_cnc = {
                    data: [
                        parseFloat(cncData.spindle_speed[i]),
                        parseFloat(cncData.feed_rate[i]),
                        parseFloat(cncData.tool_temperature[i]),
                        parseFloat(cncData.vibration_level[i]),
                        parseFloat(cncData.power_consumption[i]),
                        parseFloat(cncData.tool_wear[i]),
                    ],
                };

                const response_cnc = await axios.post(
                    'https://tanishpathania.us-east-2.aws.modelbit.com/v1/predict_failure_cnc/latest',
                    input_data_cnc
                );

                predictions_cnc.push(response_cnc.data.data);
                // console.log('CNC Failure:', response_cnc.data.data);
                bundled_cnc_data_and_predictions.push({ input: input_data_cnc.data, prediction: response_cnc.data.data });
                // console.log('Bundled Data:', bundled_cnc_data_and_predictions[i]);
            }

            const failure_counts = {};
            for (let i = 0; i < predictions_cnc.length; i++) {
                if (failure_counts[predictions_cnc[i]]) {
                    failure_counts[predictions_cnc[i]]++;
                } else {
                    failure_counts[predictions_cnc[i]] = 1;
                }
            }

            const failureCountsData_cnc = {
                labels: Object.keys(failure_counts),
                datasets: [
                  {
                    label: 'CNC Machine Failure Predictions',
                    data: Object.values(failure_counts),
                    backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#6B8E23', '#FF4500', '#8A2BE2'],
                  },
                ],
              };

            setFailureCountsData_cnc(failureCountsData_cnc);

        } catch (error) {
            console.error('Error sending request:', error);
        }
    };

    const sendRequest_injection = async () => {
        if (!injectionData) {
            console.log('No INJECTION data available');
            return;
        }

        try {
            const predictions_injection = [];
            for (let i = 0; i < injectionData.injection_pressure.length; i++) {
                const input_data_injection = {
                    data: [
                        parseFloat(injectionData.injection_pressure[i]),
                        parseFloat(injectionData.melt_temperature[i]),
                        parseFloat(injectionData.clamping_force[i]),
                        parseFloat(injectionData.cycle_time[i]),
                        parseFloat(injectionData.screw_speed[i]),
                        parseFloat(injectionData.cooling_time[i]),
                        parseFloat(injectionData.hydraulic_pressure[i]),
                    ],
                };

                const response_injection = await axios.post(
                    'https://tanishpathania.us-east-2.aws.modelbit.com/v1/predict_failure_injection/latest',
                    input_data_injection
                );

                predictions_injection.push(response_injection.data.data);
                // console.log('INJECTION Failure:', response_injection.data.data);
                bundled_injection_data_and_predictions.push({ input: input_data_injection.data, prediction: response_injection.data.data });
                // console.log('Bundled Data:', bundled_injection_data_and_predictions[i]);
            }

            const failure_counts = {};
            for (let i = 0; i < predictions_injection.length; i++) {
                if (failure_counts[predictions_injection[i]]) {
                    failure_counts[predictions_injection[i]]++;
                } else {
                    failure_counts[predictions_injection[i]] = 1;
                }
            }

            const failureCountsData_injection = {
                labels: Object.keys(failure_counts),
                datasets: [
                  {
                    label: 'Injection Molding Machine Failure Predictions',
                    data: Object.values(failure_counts),
                    backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#6B8E23', '#FF4500', '#8A2BE2'],
                  },
                ],
              };

            setFailureCountsData_injection(failureCountsData_injection);

        } catch (error) {
            console.error('Error sending request:', error);
        }
    };

    const sendRequest_lathe = async () => {
        if (!latheData) {
            console.log('No LATHE data available');
            return;
        }

        try {
            const predictions_lathe = [];
            for (let i = 0; i < latheData.spindle_speed.length; i++) {
                const input_data_lathe = {
                    data: [
                        parseFloat(latheData.spindle_speed[i]),
                        parseFloat(latheData.feed_rate[i]),
                        parseFloat(latheData.depth_of_cut[i]),
                        parseFloat(latheData.tool_wear[i]),
                        parseFloat(latheData.vibration_level[i]),
                        parseFloat(latheData.cutting_force[i]),
                    ],
                };

                const response_lathe = await axios.post(
                    'https://tanishpathania.us-east-2.aws.modelbit.com/v1/predict_failure_lathe/latest',
                    input_data_lathe
                );

                predictions_lathe.push(response_lathe.data.data);
                // console.log('LATHE Failure:', response_lathe.data.data);
                bundled_lathe_data_and_predictions.push({ input: input_data_lathe.data, prediction: response_lathe.data.data });
                // console.log('Bundled Data:', bundled_lathe_data_and_predictions[i]);
            }

            const failure_counts = {};
            for (let i = 0; i < predictions_lathe.length; i++) {
                if (failure_counts[predictions_lathe[i]]) {
                    failure_counts[predictions_lathe[i]]++;
                } else {
                    failure_counts[predictions_lathe[i]] = 1;
                }
            }

            const failureCountsData_lathe = {
                labels: Object.keys(failure_counts),
                datasets: [
                  {
                    label: 'Lathe Machine Failure Predictions',
                    data: Object.values(failure_counts),
                    backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#6B8E23', '#FF4500', '#8A2BE2'],
                  },
                ],
              };

            setFailureCountsData_lathe(failureCountsData_lathe);

        } catch (error) {
            console.error('Error sending request:', error);
        }
    };

    const sendRequest_3d_printer = async () => {
        if (!printerData) {
            console.log('No PRINTER data available');
            return;
        }

        try {
            const predictions_printer = [];
            for (let i = 0; i < printerData.layer_height.length; i++) {
                const input_data_printer = {
                    data: [
                        parseFloat(printerData.layer_height[i]),
                        parseFloat(printerData.print_speed[i]),
                        parseFloat(printerData.nozzle_temperature[i]),
                        parseFloat(printerData.bed_temperature[i]),
                        parseFloat(printerData.filament_diameter[i]),
                    ],
                };

                const response_printer = await axios.post(
                    'https://tanishpathania.us-east-2.aws.modelbit.com/v1/predict_failure_3d_printer/latest',
                    input_data_printer
                );

                predictions_printer.push(response_printer.data.data);
                // console.log('PRINTER Failure:', response_printer.data.data);
                bundled_printer_data_and_predictions.push({ input: input_data_printer.data, prediction: response_printer.data.data });
                // console.log('Bundled Data:', bundled_printer_data_and_predictions[i]);
            }

            const failure_counts = {};
            for (let i = 0; i < predictions_printer.length; i++) {
                if (failure_counts[predictions_printer[i]]) {
                    failure_counts[predictions_printer[i]]++;
                } else {
                    failure_counts[predictions_printer[i]] = 1;
                }
            }

            const failureCountsData_printer = {
                labels: Object.keys(failure_counts),
                datasets: [
                  {
                    label: '3D Printer Machine Failure Predictions',
                    data: Object.values(failure_counts),
                    backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#6B8E23', '#FF4500', '#8A2BE2'],
                  },
                ],
              };

            setFailureCountsData_printer(failureCountsData_printer);

        } catch (error) {
            console.error('Error sending request:', error);
        }
    };

    const sendRequest_conveyor = async () => {
        if (!conveyorData) {
            console.log('No CONVEYOR data available');
            return;
        }

        try {
            const predictions_conveyor = [];
            for (let i = 0; i < conveyorData.belt_speed.length; i++) {
                const input_data_conveyor = {
                    data: [
                        parseFloat(conveyorData.belt_speed[i]),
                        parseFloat(conveyorData.load_weight[i]),
                        parseFloat(conveyorData.motor_current[i]),
                        parseFloat(conveyorData.belt_tension[i]),
                        parseFloat(conveyorData.belt_alignment_offset[i]),
                        parseFloat(conveyorData.pulley_rotation_speed[i]),
                        parseFloat(conveyorData.ambient_temperature[i]),
                    ],
                };

                const response_conveyor = await axios.post(
                    'https://tanishpathania.us-east-2.aws.modelbit.com/v1/predict_failure_conveyor/latest',
                    input_data_conveyor
                );

                predictions_conveyor.push(response_conveyor.data.data);
                // console.log('CONVEYOR Failure:', response_conveyor.data.data);
                bundled_conveyor_data_and_predictions.push({ input: input_data_conveyor.data, prediction: response_conveyor.data.data });
                console.log('Bundled Data', bundled_conveyor_data_and_predictions[i]);
            }

            const failure_counts = {};
            for (let i = 0; i < predictions_conveyor.length; i++) {
                if (failure_counts[predictions_conveyor[i]]) {
                    failure_counts[predictions_conveyor[i]]++;
                } else {
                    failure_counts[predictions_conveyor[i]] = 1;
                }
            }

            const failureCountsData_conveyor = {
                labels: Object.keys(failure_counts),
                datasets: [
                  {
                    label: 'Conveyor Belt Machine Failure Predictions',
                    data: Object.values(failure_counts),
                    backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#6B8E23', '#FF4500', '#8A2BE2'],
                  },
                ],
              };

            setFailureCountsData_conveyor(failureCountsData_conveyor);
            console.log('Failure Counts:', failureCountsData_conveyor);

        } catch (error) {
            console.error('Error sending request:', error);
        }
    };


// return (
//     <div style={{ border: '2px solid orange', padding: '20px' }}>
//         <h1>Machine Data Generator</h1>
//         <select onChange={async (e) => {
//             const selectedMachine = e.target.value;
//             let bundledData = [];
//             switch (selectedMachine) {
//                 case 'CNC':
//                     await sendRequest_cnc();
//                     bundledData = bundled_cnc_data_and_predictions;
//                     break;
//                 case 'INJECTION':
//                     await sendRequest_injection();
//                     bundledData = bundled_injection_data_and_predictions;
//                     break;
//                 case 'LATHE':
//                     await sendRequest_lathe();
//                     bundledData = bundled_lathe_data_and_predictions;
//                     break;
//                 case '3D PRINTER':
//                     await sendRequest_3d_printer();
//                     bundledData = bundled_printer_data_and_predictions;
//                     break;
//                 case 'CONVEYOR':
//                     await sendRequest_conveyor();
//                     bundledData = bundled_conveyor_data_and_predictions;
//                     break;
//                 default:
//                     break;
//             }

//             const generatedInputDiv = document.getElementById('generated-input');
//             const predictionDiv = document.getElementById('prediction');
//             generatedInputDiv.innerHTML = '';
//             predictionDiv.innerHTML = '';

//             bundledData.forEach((data, index) => {
//                 const inputElement = document.createElement('div');
//                 inputElement.innerHTML = `<strong>Data Point ${index + 1}:</strong> ${data.input.join(', ')}`;
//                 generatedInputDiv.appendChild(inputElement);

//                 const predictionElement = document.createElement('div');
//                 predictionElement.innerHTML = `<strong>Prediction ${index + 1}:</strong> ${data.prediction}`;
//                 predictionDiv.appendChild(predictionElement);
//             });
//         }}>
//             <option value="">Select Machine</option>
//             <option value="CNC">CNC</option>
//             <option value="INJECTION">INJECTION</option>
//             <option value="LATHE">LATHE</option>
//             <option value="3D PRINTER">3D PRINTER</option>
//             <option value="CONVEYOR">CONVEYOR</option>
//         </select>
//         <br />
//         <div style={{ marginTop: '20px', border: '2px solid orange', padding: '10px', backgroundColor: 'white' }}>
//             <h2>Generated Input and Prediction </h2>
//             <div id="generated-input"></div>
//             <div id="prediction"></div>
//         </div>
//     </div>
// );

return (
    <div style={{ border: '2px solid orange', padding: '20px', backgroundColor: 'white' }}>
        <h1>Machine Failure Prediction Dashboard</h1>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <button style={{ border: '2px solid orange', backgroundColor: 'white', padding: '10px' }} onClick={sendRequest_cnc}>Fetch CNC Predictions</button>
            <button style={{ border: '2px solid orange', backgroundColor: 'white', padding: '10px' }} onClick={sendRequest_injection}>Fetch Injection Molding Predictions</button>
            <button style={{ border: '2px solid orange', backgroundColor: 'white', padding: '10px' }} onClick={sendRequest_lathe}>Fetch Lathe Predictions</button>
            <button style={{ border: '2px solid orange', backgroundColor: 'white', padding: '10px' }} onClick={sendRequest_3d_printer}>Fetch 3D Printer Predictions</button>
            <button style={{ border: '2px solid orange', backgroundColor: 'white', padding: '10px' }} onClick={sendRequest_conveyor}>Fetch Conveyor Predictions</button>
        </div>
    </div>
);
}
export default MachineDataGenerator;
