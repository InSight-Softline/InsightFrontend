import React from 'react';
import { Link } from 'react-router-dom';
import { Add } from '@mui/icons-material';

const Button = ({ to, children, icon }) => (
    <Link to={to} className="flex justify-center w-44 lg:w-52 xl:w-52 items-center aspect-square transition-transform transform hover:scale-105 bg-gray-200 rounded-lg m-4 p-4">
        {icon ? <Add className="text-gray-600" style={{ fontSize: '10vw', maxWidth: 80, maxHeight: 80 }} /> : null}
        {children}
    </Link>
);

export default Button;