import React from 'react';
import Typography from '@mui/material/Typography';

const Text = ({ children, variant = "body1", align = "center" }) => (
    <Typography variant={variant} align={align}>
        {children}
    </Typography>
);

export default Text;