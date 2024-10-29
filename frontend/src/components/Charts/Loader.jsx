import React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import LinearProgress from '@mui/material/LinearProgress';

const Loader = ({ type = 'circular', value = null }) => {
    return (
        <div className="flex justify-center items-center p-4">
            {type === 'circular' ? (
                <CircularProgress value={value} />
            ) : (
                <LinearProgress variant="determinate" value={value} />
            )}
        </div>
    );
};

export default Loader;