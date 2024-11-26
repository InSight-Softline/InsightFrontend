import React from 'react';
import Typography from '@mui/material/Typography';

const Title = ({ children, ...props}) => (
    <Typography variant="h4" align="center" gutterBottom {...props}>
        {children}
    </Typography>
);

export default Title;