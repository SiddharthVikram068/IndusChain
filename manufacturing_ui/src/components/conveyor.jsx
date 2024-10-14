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
    const belt_speed = generateNormalRandom(1.5, 0.1).toFixed(2);
    const load_weight = (100 + Math.random() * 400).toFixed(2);
    const motor_current = (10+(100 + Math.random() * 400)/50).toFixed(2);
    const belt_tension = (200+(100 + Math.random() * 400)/2).toFixed(2);
    const belt_alignment_offset = generateNormalRandom(0, 0.5).toFixed(2);
    const pulley_rotation_speed = (generateNormalRandom(1.5, 0.1)*60).toFixed(2);
    const ambient_temperature =generateNormalRandom(25, 2).toFixed(2);
    return { data: [parseFloat(belt_speed), parseFloat(load_weight), parseFloat(motor_current), parseFloat(belt_tension), parseFloat(belt_alignment_offset), parseFloat(pulley_rotation_speed), parseFloat(ambient_temperature)] };
};

// Color mapping for prediction categories
const colorMapping = {
    'No Failure': 'blue',
    'Belt Misalignment': 'red',
    'Motor Failure': 'orange',
    'Pulley Wear': 'green',
    'Roller Seizing': 'purple',
    'Tensioner Failure': 'black',
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

    // All variable names
    const variableNames = [
        'Belt Speed',
        'Load Weight',
        'Motor Current',
        'Belt Tension',
        'Belt Alignment Offset',
        'Pulley Rotation Speed',
        'Ambient Temperature',
    ];

    // All combinations of variable pairs
    const combinations = [
        ['Belt Speed', 'Load Weight'],
        ['Belt Speed', 'Motor Current'],
        ['Belt Speed', 'Belt Tension'],
        ['Belt Speed', 'Belt Alignment Offset'],
        ['Belt Speed', 'Pulley Rotation Speed'],
        ['Belt Speed', 'Ambient Temperature'],
        ['Load Weight', 'Motor Current'],
        ['Load Weight', 'Belt Tension'],
        ['Load Weight', 'Belt Alignment Offset'],
        ['Load Weight', 'Pulley Rotation Speed'],
        ['Load Weight', 'Ambient Temperature'],
        ['Motor Current', 'Belt Tension'],
        ['Motor Current', 'Belt Alignment Offset'],
        ['Motor Current', 'Pulley Rotation Speed'],
        ['Motor Current', 'Ambient Temperature'],
        ['Belt Tension', 'Belt Alignment Offset'],
        ['Belt Tension', 'Pulley Rotation Speed'],
        ['Belt Tension', 'Ambient Temperature'],
        ['Belt Alignment Offset', 'Pulley Rotation Speed'],
        ['Belt Alignment Offset', 'Ambient Temperature'],
        ['Pulley Rotation Speed', 'Ambient Temperature']
    ];

    // State for scatter data for each combination
    const [scatterData, setScatterData] = useState(
        combinations.reduce((acc, pair) => {
            acc[pair.join('_')] = []; // Initialize each combination with an empty array
            return acc;
        }, {})
    );

    const predictionCounts = history.reduce((acc, item) => {
        acc[item.prediction] = (acc[item.prediction] || 0) + 1;
        return acc;
    }, {});

    const chartData = {
        labels: Object.keys(predictionCounts),
        datasets: [{
            data: Object.values(predictionCounts),
            backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF6666', '#66FF66', '#FF8C00'],
            hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF6666', '#66FF66', '#FF8C00'],
        }],
    };

    const dataLabels = [
        'Belt Speed',
        'Load Weight',
        'Motor Current',
        'Belt Tension',
        'Belt Alignment Offset',
        'Pulley Rotation Speed',
        'Ambient Temperature',
    ];

    // Fetch prediction from the API
    const fetchPrediction = async (data) => {
        try {
            const response_cnc = await axios.post(
                'https://tanishpathania.us-east-2.aws.modelbit.com/v1/predict_failure_conveyor/latest',
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
        if (latestData.enData) {
            // Update scatter data for each combination
            combinations.forEach((pair) => {
                const key = pair.join('_');
                const [xIndex, yIndex] = pair.map(variable => variableNames.indexOf(variable));
                const newPoint = {
                    x: latestData.enData[xIndex],
                    y: latestData.enData[yIndex],
                    backgroundColor: colorMapping[latestData.prediction] || 'gray', // Default color for unknown predictions
                };
                setScatterData(prevData => ({
                    ...prevData,
                    [key]: [...prevData[key], newPoint], // Append the new point to the scatter data for the corresponding combination
                }));
            });
        }
    }, [latestData]);

    // Create scatter chart data for each combination
    const scatterCharts = combinations.map((pair) => {
        const key = pair.join('_');
        const scatterChartData = {
            datasets: [{
                label: `${pair[0]} vs ${pair[1]}`,
                data: scatterData[key],
                backgroundColor: scatterData[key].map(item => item.backgroundColor),
                pointRadius: 5,
            }],
        };

        return (
            <div key={key} style={{ width: '45%', backgroundColor: 'white', padding: '20px', border: '2px solid orange', marginBottom: '20px' }}>
                <h2 style={{ textAlign: 'center' }}>{`${pair[0]} vs ${pair[1]}`}</h2>
                <Scatter data={scatterChartData} options={{
                    scales: {
                        x: { title: { display: true, text: pair[0] } },
                        y: { title: { display: true, text: pair[1] } },
                    },
                    plugins: {
                        legend: {
                            display: true,
                            labels: {
                                generateLabels: (chart) => {
                                    const { datasets } = chart.data;
                                    const colors = datasets[0].backgroundColor;

                                    // Get unique predictions for labels
                                    const uniquePredictions = [...new Set(scatterData[key].map(item => item.backgroundColor))];

                                    return uniquePredictions.map((color, index) => ({
                                        text: Object.keys(colorMapping).find(key => colorMapping[key] === color) || 'Unknown',
                                        fillStyle: color,
                                        hidden: false,
                                        index,
                                    }));
                                }
                            }
                        }
                    }
                }} />
            </div>
        );
    });

    return (
        <div>
            <LivePredictionDashboard
                latestData={latestData}
                dataLabels={dataLabels}
                chartData={chartData}
                onStart={startFetching}
                onStop={stopFetching}
                isRunning={isRunning}
            />
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '50px', flexWrap: 'wrap' }}>
                {scatterCharts}
            </div>
        </div>
    );
};

export default Cnc;
