import LinearProgress from '@mui/material/LinearProgress';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

/**
 * A linear progress component with a label showing the percentage value.
 * @param {Object} props - Component properties.
 * @param {number} props.value - The progress value as a percentage (0-100).
 * @returns {JSX.Element} A linear progress component with a percentage label.
 */
const LinearProgressWithLabel = ({ value }) => {
    return (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Box sx={{ width: '100%', mr: 1 }}>
                <LinearProgress
                    variant="determinate"
                    value={value}
                    sx={{
                        height: 10,
                        borderRadius: 5,
                        '& .MuiLinearProgress-bar': {
                            backgroundColor: '#c4171f',
                        },
                    }}
                />
            </Box>
            <Box sx={{ minWidth: 35 }}>
                <Typography variant="body2" color="text.secondary">{`${Math.round(value)}%`}</Typography>
            </Box>
        </Box>
    );
};

export default LinearProgressWithLabel;
