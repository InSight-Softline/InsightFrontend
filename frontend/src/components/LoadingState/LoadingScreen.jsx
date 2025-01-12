import React from "react";
import { Box, Typography } from "@mui/material";
import { CircularProgressWithLabel } from "./CircularProgressWithLabel";

/**
 * LoadingScreen
 *
 * A full-screen loading component displaying a circular progress with a percentage label.
 *
 * @param {number} progress - The loading progress percentage (0-100).
 * @param {string} message - The message to display under the progress indicator.
 */
function LoadingScreen({ progress = 0, message = "Loading..." }) {
    return (
        <Box
            className="flex items-center justify-center h-screen"
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
        >
            <CircularProgressWithLabel value={progress} />
            <Typography variant="body1" color="error" sx={{ mt: 2 }}>
                {message}
            </Typography>
        </Box>
    );
}

export default LoadingScreen;
