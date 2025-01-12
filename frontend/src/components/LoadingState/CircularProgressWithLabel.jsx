import React from "react";
import { CircularProgress, Box, Typography } from "@mui/material";

/**
 * CircularProgressWithLabel
 *
 * A Material-UI CircularProgress component with a percentage label displayed at the center.
 *
 * @param {number} value - The progress value (0-100) for the CircularProgress.
 * @returns {JSX.Element} - A styled CircularProgress component with a label.
 */
export const CircularProgressWithLabel = ({ value }) => {
    return (
        <Box position="relative" display="inline-flex">
            <CircularProgress variant="determinate" value={value} color="error" size={80} thickness={5} />
            <Box
                top={0}
                left={0}
                bottom={0}
                right={0}
                position="absolute"
                display="flex"
                alignItems="center"
                justifyContent="center"
            >
                <Typography variant="caption" component="div" color="textSecondary">
                    {`${Math.round(value)}%`}
                </Typography>
            </Box>
        </Box>
    );
};
