import React from 'react';
import {Link} from 'react-router-dom';

const Sidebar = () => {
    return (
        <div className="w-64 h-[calc(100vh-4rem-4.5rem)] bg-gray-200 p-4 shadow-md fixed">
                    <Link data-cy="nav-dashboard" to="/" className="block p-2 mb-4 text-gray-700 hover:text-blue-500 border border-gray-400 rounded text-center">Dashboard</Link>
        </div>
    );
}

export default Sidebar;
  