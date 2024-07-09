import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
    return (
        <div className="w-64 h-[calc(100vh-4rem)] lg:h-[calc(100vh-4rem)] bg-gray-200 p-4 shadow-md fixed top-16 lg:top-16 overflow-y-auto">
            <h2 className="text-2xl font-semibold mb-4">Übersicht</h2>
            <ul>
                <li className="mb-2">
                    <Link data-cy="nav-dashboard" to="/" className="text-gray-700 hover:text-blue-500">Dashboard</Link>
                </li>
                <li className="mb-2">
                    <Link data-cy="nav-newAudit" to="/newAudit" className="text-gray-700 hover:text-blue-500">New Audit</Link>
                </li>
                <li className="mb-2">
                    <Link data-cy="nav-performAudit" to="/performAudit" className="text-gray-700 hover:text-blue-500">Perform Audit</Link>
                </li>
                <li className="mb-2">
                    <Link data-cy="nav-evaluation" to="/evaluation" className="text-gray-700 hover:text-blue-500">Evaluation</Link>
                </li>
            </ul>
        </div>
    );
}

export default Sidebar;  