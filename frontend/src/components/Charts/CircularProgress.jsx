import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

/**
 * A circular progress component with a label in the center displaying the percentage value.
 * @param {Object} props - Component properties.
 * @param {number} props.value - The progress value as a percentage (0-100).
 * @param {number} [props.size=80] - The size of the circular progress.
 * @returns {JSX.Element} A circular progress component with a percentage label.
 */
const CircularProgressWithLabel = ({ value, size = 80 }) => {
    return (
        <Box sx={{ position: 'relative', display: 'inline-flex' }}>
            <CircularProgress variant="determinate" value={value} size={size} />
            <Box
                sx={{
                    top: 0,
                    left: 0,
                    bottom: 0,
                    right: 0,
                    position: 'absolute',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                <Typography variant="caption" component="div" color="text.secondary">
                    {`${Math.round(value)}%`}
                </Typography>
            </Box>
        </Box>
    );
};

export default CircularProgressWithLabel;
