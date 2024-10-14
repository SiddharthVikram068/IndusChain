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
    const spindle_speed = generateNormalRandom(800, 100).toFixed(2);
    const feed_rate = (0.1 + Math.random() * 0.4).toFixed(2);
    const depth_of_cut = generateNormalRandom(2, 0.5).toFixed(2);
    const tool_wear = Math.max(0, generateNormalRandom(0, 0.1)).toFixed(2);
    const vibration_level = generateNormalRandom(1.2, 0.1).toFixed(2);
    const cutting_force = (generateNormalRandom(800, 100).toFixed(2)*generateNormalRandom(2, 0.5).toFixed(2)).toFixed(2);
    return {data : [parseFloat(spindle_speed), parseFloat(feed_rate), parseFloat(depth_of_cut), parseFloat(tool_wear), parseFloat(vibration_level), parseFloat(cutting_force)]};
};

// Color mapping for prediction categories
const colorMapping = {
    'No Failure': 'blue',
    'Splindle Bearing Failure': 'red',
    'Tool Post Misalignment': 'orange',
    'Gear Box Malfunction': 'green',
    'Chuck Failure': 'purple',
    'Tail Stock Misalignment': 'black',
};

// LivePredictionDashboard Component
const LivePredictionDashboard = ({ latestData, dataLabels, chartData, onStart, onStop, isRunning }) => {
    return (
        <>
        <div style={{ textAlign: 'center', fontSize: '2rem', fontWeight: 'bold' }}>
            LATHE MACHINE
        </div>
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
        </>
    );
};

const Lathe = () => {
    const [latestData, setLatestData] = useState({ enData: null, prediction: null });
    const [history, setHistory] = useState([]);
    const [isRunning, setIsRunning] = useState(false);
    const intervalRef = useRef(null);

    // All variable names
    const variableNames = [
        'Spindle Speed',
        'Feed Rate',
        'Depth of Cut',
        'Tool Wear',
        'Vibration Level',
        'Cutting Force',
    ];

    // All combinations of variable pairs
    const combinations = [
        ['Spindle Speed', 'Feed Rate'],
        ['Spindle Speed', 'Depth of Cut'],
        ['Spindle Speed', 'Tool Wear'],
        ['Feed Rate', 'Depth of Cut'],
        ['Feed Rate', 'Tool Wear'],
        ['Depth of Cut', 'Tool Wear'],
        ['Spindle Speed', 'Vibration Level'],
        ['Feed Rate', 'Vibration Level'],
        ['Depth of Cut', 'Vibration Level'],
        ['Depth of Cut', 'Cutting Force'],
        ['Tool Wear', 'Cutting Force'],
        ['Vibration Level', 'Cutting Force'],
        ['Spindle Speed', 'Cutting Force'],
        ['Feed Rate', 'Cutting Force'],
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
            backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF6666', '#66FF66'],
            hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF6666', '#66FF66'],
        }],
    };

    const dataLabels = [
        'Spindle Speed',
        'Feed Rate',
        'Depth of Cut',
        'Tool Wear',
        'Vibration Level',
        'Cutting Force',
    ];

    // Fetch prediction from the API
    const fetchPrediction = async (data) => {
        try {
            const response_cnc = await axios.post(
                'https://tanishpathania.us-east-2.aws.modelbit.com/v1/predict_failure_lathe/latest',
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
            }, 1500);
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

export default Lathe;
