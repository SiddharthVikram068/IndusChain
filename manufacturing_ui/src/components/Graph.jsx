import React from 'react'
import { Line } from 'react-chartjs-2';
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

    const options = {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
          title: {
            display: true,
            text: '',
          },
        },
    };

    const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];


    const data = [2, 5, 1, 6, 7, 3, 7];
    const chartData = {
        labels,
        datasets: [
          {
            label: 'Dataset',
            data: data,
            fill: true,
            borderColor: 'rgba(255,165,0,1)',
            tension: 0.1,
          }
        ],
    };

    return (<Line options={options} data={chartData} />);
}

export default Graph