import React from 'react';
import Typography from '@mui/material/Typography';

const Text = ({ children, customStyles }) => (
    <Typography variant="body1" className={customStyles}>
        {children}
    </Typography>
);

export default Text;