import React from 'react';
import { Link } from 'react-router-dom';

const Card = ({ to, name }) => (
    <Link to={to} className="flex justify-center w-44 lg:w-52 xl:w-52 items-center aspect-square transition-transform transform hover:scale-105 bg-gray-200 rounded-lg m-4 p-4">
        <p className="text-center">{name}</p>
    </Link>
);

export default Card;