import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { Pie, Scatter } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, PointElement, LinearScale } from 'chart.js';

// Register Chart.js elements
ChartJS.register(ArcElement, Tooltip, Legend, PointElement, LinearScale);

// Function to generate normally distributed random numbers
const generateNormalRandom = (mean, stdDev) => {
    let u1 = Math.random();
    let u2 = Math.random();
    let randStdNormal = Math.sqrt(-2.0 * Math.log(u1)) * Math.sin(2.0 * Math.PI * u2);
    return mean + stdDev * randStdNormal;
};

// Function to generate random data
const generateRandomData = () => {
    const spindle_speed = generateNormalRandom(1200, 100).toFixed(2);
    const feed_rate = (100 + Math.random() * 200).toFixed(2);
    const tool_temperature = generateNormalRandom(200, 5).toFixed(2);
    const vibration_level = generateNormalRandom(1.5, 0.2).toFixed(2);
    const power_consumption = generateNormalRandom(5, 0.5).toFixed(2);
    const tool_wear = Math.max(0, generateNormalRandom(0, 1)).toFixed(2);
    return { data: [parseFloat(spindle_speed), parseFloat(feed_rate), parseFloat(tool_temperature), parseFloat(vibration_level), parseFloat(power_consumption), parseFloat(tool_wear)] };
};

// Color mapping for prediction categories
const colorMapping = {
    'No Failure': 'blue',
    'Overheating': 'red',
    'Vibration Issue': 'orange',
    'Power Fluctuation': 'green',
    'Tool Wear': 'purple',
    'Spindle Failure': 'black',
    'Control System Malfunction': '#8ABFA3',
    'Axi Drive Failure': '#697565'
};

// LivePredictionDashboard Component
const LivePredictionDashboard = ({ latestData, dataLabels, chartData, onStart, onStop, isRunning }) => {
    return (
        <div style={{ display: 'flex', marginTop: '50px', height: '80vh', gap: '20px' }}>
            <div style={{
                backgroundColor: 'white',
                border: '2px solid orange',
                padding: '10px',
                width: '50%',
                height: '100%',
                boxSizing: 'border-box',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
            }}>
                <h2 style={{ textAlign: 'center', fontSize: '2rem', fontWeight: 'bold' }}>Latest Data Point</h2>
                {latestData.enData && latestData.enData.map((value, index) => (
                    <div key={index} style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        marginBottom: '5px',
                        fontSize: '1.5rem',
                        fontWeight: 'bold'
                    }}>
                        <span style={{ textAlign: 'center', fontSize: '1.5rem', fontWeight: 'bold' }}>{dataLabels[index]}</span>
                        <span style={{ textAlign: 'center', fontSize: '1.5rem', fontWeight: 'bold' }}>{value}</span>
                    </div>
                ))}
                <p style={{ textAlign: 'center', fontSize: '1.5rem', fontWeight: 'bold' }}>Prediction: {JSON.stringify(latestData.prediction)}</p>
            </div>

            <div style={{
                backgroundColor: 'white',
                border: '2px solid orange',
                width: '50%',
                height: '100%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                boxSizing: 'border-box',
            }}>
                <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', width: '20%', marginTop: '20px' }}>
                    <button onClick={onStart} disabled={isRunning}
                        style={{
                            marginBottom: '10px',
                            textAlign: 'center',
                            fontSize: '1.5rem',
                            fontWeight: 'bold',
                        }}>
                        Start
                    </button>
                    <button onClick={onStop} disabled={!isRunning}
                        style={{
                            textAlign: 'center',
                            fontSize: '1.5rem',
                            fontWeight: 'bold',
                        }}>
                        Stop
                    </button>
                </div>
                <h2 style={{ textAlign: 'center', position: 'absolute', top: '-40px' }}>Prediction Distribution</h2>
                <div style={{ width: '90%', height: '90%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <Pie data={chartData} />
                </div>
            </div>
        </div>
    );
};

const Cnc = () => {
    const [latestData, setLatestData] = useState({ enData: null, prediction: null });
    const [history, setHistory] = useState([]);
    const [isRunning, setIsRunning] = useState(false);
    const intervalRef = useRef(null);
    const [scatterData, setScatterData] = useState([]);

    const predictionCounts = history.reduce((acc, item) => {
        acc[item.prediction] = (acc[item.prediction] || 0) + 1;
        return acc;
    }, {});

    const chartData = {
        labels: Object.keys(predictionCounts),
        datasets: [{
            data: Object.values(predictionCounts),
            backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF6666'],
            hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF6666'],
        }],
    };

    const dataLabels = [
        'Spindle Speed (RPM)',
        'Feed Rate (mm/min)',
        'Tool Temperature (°C)',
        'Vibration Level (g)',
        'Power Consumption (kW)',
        'Tool Wear (mm)',
    ];

    // Fetch prediction from the API
    const fetchPrediction = async (data) => {
        try {
            const response_cnc = await axios.post(
                'https://tanishpathania.us-east-2.aws.modelbit.com/v1/predict_failure_cnc/latest',
                data
            );
            return response_cnc.data.data;
        } catch (error) {
            console.error('Error fetching prediction:', error);
            return null; // Return null or a default value in case of an error
        }
    };

    // Start data fetching
    const startFetching = () => {
        if (!isRunning) {
            setIsRunning(true);
            intervalRef.current = setInterval(async () => {
                const data = generateRandomData();
                const prediction = await fetchPrediction(data);

                if (prediction) { // Only update if prediction is valid
                    const enData = data.data;
                    const newEntry = { enData, prediction };
                    setLatestData(newEntry);
                    setHistory((prevHistory) => [...prevHistory, newEntry]);
                }
            }, 1000);
        }
    };

    // Stop data fetching
    const stopFetching = () => {
        if (isRunning) {
            setIsRunning(false);
            clearInterval(intervalRef.current);
        }
    };

    useEffect(() => {
        // Cleanup function to clear the interval on component unmount
        return () => clearInterval(intervalRef.current);
    }, []);

    useEffect(() => {
        // Update scatter plot data based on predictions
        if (latestData.prediction) {
            const spindleSpeed = latestData.enData[0];
            const feedRate = latestData.enData[1];
            const color = colorMapping[latestData.prediction] || 'gray';
            setScatterData((prevScatter) => [
                ...prevScatter,
                { x: spindleSpeed, y: feedRate, backgroundColor: color },
            ]);
        }
    }, [latestData]);

    const scatterChartData = {
        datasets: [{
            label: 'Spindle Speed vs Feed Rate',
            data: scatterData,
            backgroundColor: scatterData.map((point) => point.backgroundColor),
            pointRadius: 5,
        }],
    };

    const renderLegend = () => (
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '10px' }}>
            {Object.entries(colorMapping).map(([fault, color]) => (
                <div key={fault} style={{ display: 'flex', alignItems: 'center', marginRight: '15px' }}>
                    <div style={{
                        width: '15px',
                        height: '15px',
                        backgroundColor: color,
                        marginRight: '5px'
                    }} />
                    <span>{fault}</span>
                </div>
            ))}
        </div>
    );

    return (
        <div style={{ padding: '20px' }}>
            <h1 style={{ textAlign: 'center' }}>CNC Live Prediction</h1>
            <LivePredictionDashboard
                latestData={latestData}
                dataLabels={dataLabels}
                chartData={chartData}
                onStart={startFetching}
                onStop={stopFetching}
                isRunning={isRunning}
            />
            {renderLegend()}
            <div style={{ marginTop: '20px' ,backgroundColor: 'white',border: '2px solid orange',}}>
                <h2 style={{ textAlign: 'center' }}>Scatter Plot: Spindle Speed vs Feed Rate</h2>
                <Scatter data={scatterChartData} />
            </div>
        </div>
    );
};

export default Cnc;
