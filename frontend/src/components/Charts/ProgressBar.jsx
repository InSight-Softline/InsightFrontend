import React from 'react';
import LinearProgress from '@mui/material/LinearProgress';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

/**
 * LinearProgressWithLabel component that displays a progress bar with a percentage label.
 * @param {Object} props - Component properties.
 * @param {number} props.value - The progress value as a percentage (0-100).
 * @returns {JSX.Element} A styled linear progress bar with a label.
 */
function LinearProgressWithLabel({ value }) {
    return (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Box sx={{ width: '100%', mr: 1 }}>
                <LinearProgress
                    variant="determinate"
                    value={value}
                    sx={{
                        height: 10,
                        borderRadius: 5,
                        backgroundColor: 'background.default',
                    }}
                />
            </Box>
            <Box sx={{ minWidth: 35 }}>
                <Typography variant="body2" color="secondary">{`${Math.round(value)}%`}</Typography>
            </Box>
        </Box>
    );
}

export default LinearProgressWithLabel;
