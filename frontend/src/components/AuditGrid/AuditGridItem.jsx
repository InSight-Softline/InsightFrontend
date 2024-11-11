import React from 'react';
import { Link } from 'react-router-dom';

/**
 * AuditGridItem component renders a clickable grid item that links to an audit.
 *
 * @param {object} audit - The audit object containing `id` and `name`.
 * @returns {JSX.Element} The rendered grid item component.
 * @constructor
 */
export function AuditGridItem({ audit }) {
    return (
        <Link 
            data-cy="data-buttons" 
            to={`/performAudit/${audit.id}`} 
            className="flex justify-center w-44 lg:w-52 xl:w-52 items-center aspect-square transition-transform transform hover:scale-105 bg-gray-200 rounded-xl m-4 p-4 border border-gray-400"
        >
            <p className="text-center">{audit.name}</p>
            <p className="absolute bottom-2 right-2 text-sm text-gray-700">{audit.customer}</p>
            <p className="absolute bottom-2 left-2 text-sm text-gray-700">{audit.date}</p>
        </Link>
    );
}