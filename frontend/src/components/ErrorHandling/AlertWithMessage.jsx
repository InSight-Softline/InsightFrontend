import React from "react";
import { Alert, AlertTitle, Box } from "@mui/material";

/**
 * AlertWithMessage
 *
 * Displays a Material-UI Alert with a message and optional title.
 *
 * @param {string} severity - The severity of the alert (e.g., "error", "warning", "info", "success").
 * @param {string} title - (Optional) The title of the alert.
 * @param {string} message - The message to display inside the alert.
 */
function AlertWithMessage({ severity, title, message }) {
    return (
        <Box className="w-full p-5">
            <Alert severity={severity}>
                {title && <AlertTitle>{title}</AlertTitle>}
                {message}
            </Alert>
        </Box>
    );
}

export default AlertWithMessage;
