import React from 'react';
import Typography from '@mui/material/Typography';

const Title = ({ children, ...props}) => (
    <Typography sx = {{ margin: 2 }} variant="h4" align="center" gutterBottom {...props}>
        {children}
    </Typography>
);

export default Title;