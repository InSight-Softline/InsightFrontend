import React from "react";
import { Autocomplete, TextField } from "@mui/material";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

export function AuditDropdown({ audits, onAuditSelect }) {
    return (
        <div className="mb-6">
            {/* Autocomplete dropdown for selecting audits */}
            <Autocomplete
                options={audits} // List of audits to display in the dropdown
                getOptionLabel={(option) => option.name} // Defines how each option is displayed
                onChange={(event, value) => onAuditSelect(value)} // Callback when an audit is selected
                renderOption={(props, option) => (
                    <Box
                        component="li"
                        {...props}
                        sx={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            padding: '8px 16px',
                        }}
                    >
                        <Typography sx={{ flex: 1, fontSize: '1rem' }}>
                            {option.name} {/* Audit name */}
                        </Typography>
                        <Typography
                            sx={{
                                flex: 1,
                                textAlign: 'right',
                                fontSize: '0.875rem',
                                color: 'gray',
                            }}
                        >
                            {`${option.customer}, ${new Date(option.createdAt).toLocaleDateString()}`}
                        </Typography>
                    </Box>
                )}
                renderInput={(params) => (
                    <TextField
                        {...params}
                        label="Zweites Audit auswählen" // Label for the input field
                        variant="outlined"
                        fullWidth
                    />
                )}
                clearOnEscape // Allows clearing the input by pressing the Escape key
            />
        </div>
    );
}
