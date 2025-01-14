import { Radar } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    RadialLinearScale,
    PointElement,
    LineElement,
    Filler,
    Tooltip,
    Legend,
} from 'chart.js';

ChartJS.register(RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend);

/**
 * RadarChart component renders a radar chart with the given data.
 *
 * @component
 * @param {Object} props - The properties passed to the component.
 * @param {Array<string>} props.labels - Array of category names to display on the radar chart.
 * @param {Array<number>} props.currentData - Array of current progress percentages for each category.
 * @param {number} [props.height=400] - The height of the radar chart in pixels.
 * @param {number} [props.width=600] - The width of the radar chart in pixels.
 * @returns {JSX.Element} A radar chart displaying category progress data.
 */
function RadarChart({ labels, currentData, height = 400, width = 600 }) {
    const data = {
        labels,
        datasets: [
            {
                label: 'Current Progress',
                data: currentData,
                backgroundColor: 'rgba(196, 23, 31, 0.2)',
                borderColor: '#c4171f',
                borderWidth: 2,
                pointBackgroundColor: '#c4171f',
                pointBorderColor: '#fff',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: '#c4171f',
            },
        ],
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            r: {
                beginAtZero: true,
                max: 100,
                ticks: {
                    stepSize: 20,
                    color: '#444',
                    font: {
                        size: 14,
                    },
                },
                angleLines: {
                    color: '#888',
                },
                grid: {
                    color: '#ccc',
                },
                pointLabels: {
                    color: '#444',
                    font: {
                        size: 16,
                    },
                },
            },
        },
        plugins: {
            legend: false,
            tooltip: {
                callbacks: {
                    label: function (tooltipItem) {
                        return `${tooltipItem.dataset.label}: ${tooltipItem.raw}%`;
                    },
                },
            },
        },
    };

    return (
        <div
            className="flex justify-center items-center p-4"
            style={{ height: `${height}vh`, width: `${width}vw`, margin: '0 auto' }}
        >
            <Radar data={data} options={options} />
        </div>
    );
}

export default RadarChart;
