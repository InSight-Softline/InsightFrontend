import { BarChart } from '@mui/x-charts/BarChart';

/**
 * A custom bar chart component displaying a distribution of points.
 * @param {Object} props - Component properties.
 * @param {number[]} props.data - An array of numbers representing the point distribution.
 * @param {string[]} props.colors - An array of color strings used to color the bars.
 * @param {number} [props.width=900] - The width of the chart.
 * @param {number} [props.height=350] - The height of the chart.
 * @returns {JSX.Element} A bar chart component.
 */
const CustomBarChart = ({ data, colors, width = 900, height = 350 }) => {
    return (
        <BarChart
            series={[
                { data: data },
            ]}
            width={width}
            height={height}
            xAxis={[
                {
                    scaleType: 'band',
                    data: [0, 1, 2, 3, 4, 5],
                    colorMap: {
                        type: 'ordinal',
                        values: [0, 1, 2, 3, 4, 5],
                        colors: colors,
                        unknownColor: "#050505",
                    },
                    label: 'erreichte Punkte',
                },
            ]}
            yAxis={[
                {
                    label: 'Anzahl Fragen',
                },
            ]}
        />
    );
};

export default CustomBarChart;
