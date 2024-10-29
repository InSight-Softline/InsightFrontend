import React from 'react';
import Typography from '@mui/material/Typography';

const Title = ({ children, variant = "h4" }) => (
    <Typography variant={variant} align="center" gutterBottom>
        {children}
    </Typography>
);

export default Title;