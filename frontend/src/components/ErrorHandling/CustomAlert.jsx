import React from "react";
import { Alert, Collapse, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

/**
 * CustomAlert
 *
 * A reusable alert component with support for error, success, and custom styles.
 *
 * @param {boolean} show - Whether the alert should be displayed.
 * @param {string} severity - The severity of the alert (e.g., "error", "success").
 * @param {string} message - The message to display inside the alert.
 * @param {function} onClose - Callback function to execute when the alert is closed.
 * @param {object} [sx] - Optional styles for the alert component.
 */
export function CustomAlert({ show, severity, message, onClose, sx }) {
    return (
        <Collapse in={!!show}>
            <Alert
                severity={severity}
                variant="filled"
                sx={{
                    mb: 4,
                    ...sx, // Allows custom styles to be passed
                }}
                action={
                    <IconButton
                        aria-label="close"
                        color="inherit"
                        size="small"
                        onClick={onClose}
                    >
                        <CloseIcon fontSize="inherit" />
                    </IconButton>
                }
            >
                {message}
            </Alert>
        </Collapse>
    );
}
