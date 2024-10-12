import React, { useState } from 'react';
import { Line } from 'react-chartjs-2';
import axios from 'axios';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

const Graph = () => {
    const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
    const [tempDate, setTempDate] = useState(new Date().toISOString().split('T')[0]);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [data, setData] = useState([]); // State to hold API data

    const handleDateChange = (event) => {
        setTempDate(event.target.value);
    };

    const handleDateAndForecast = async () => {
        setSelectedDate(tempDate); // Confirm the selected date

        try {
            const forecastResponse = await axios.post('https://tanishpathania.us-east-2.aws.modelbit.com/v1/predict/latest', {
                data: tempDate
            });

            // Update chart data with response
            setData(forecastResponse.data.data);
            // setSuccess('Forecast data fetched successfully!');
            setError('');
        } catch (error) {
            setError('Error fetching forecast data');
            setSuccess('');
        }
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Forecast Data',
            },
        },
    };

    const hours = ['00:00:00', '01:00:00', '02:00:00', '03:00:00', '04:00:00', '05:00:00',
        '06:00:00', '07:00:00', '08:00:00', '09:00:00', '10:00:00', '11:00:00',
        '12:00:00', '13:00:00', '14:00:00', '15:00:00', '16:00:00', '17:00:00',
        '18:00:00', '19:00:00', '20:00:00', '21:00:00', '22:00:00', '23:00:00'];

    const chartData = {
        labels: hours,
        datasets: [
            {
                label: 'Forecast',
                data: data, // Using the updated data from the API
                fill: true,
                borderColor: 'rgba(255,165,0,1)',
                tension: 0.1,
            }
        ],
    };

    return (
        <div>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', margin: '10px' }}>
                <div style={{ backgroundColor: 'white', padding: '5px', border: '2px solid orange', borderRadius: '5px', marginBottom: '5px' }}>
                    Select the date you want to see the forecast for
                </div>
                <div style={{ backgroundColor: 'white', padding: '5px', border: '2px solid orange', borderRadius: '5px', marginBottom: '5px' }}>
                    <input
                        type="date"
                        value={tempDate}
                        onChange={handleDateChange}
                    />
                </div>
                <button onClick={handleDateAndForecast} style={{ backgroundColor: 'orange', color: 'white', padding: '5px 10px', border: '2px solid orange', borderRadius: '5px', cursor: 'pointer' }}>
                    Confirm Date & Get Forecast
                </button>
                {error && <div style={{ color: 'red', marginTop: '10px' }}>{error}</div>}
                {success && <div style={{ color: 'green', marginTop: '10px' }}>{success}</div>}
            </div>
            <Line options={options} data={chartData} />
        </div>
    );
};

export default Graph;











