import React from 'react';
import { Link } from 'react-router-dom';
import { Add } from '@mui/icons-material';

/**
 * NewAuditGridItem component renders a grid item with a plus icon
 * for creating a new audit.
 *
 * @returns {JSX.Element} The rendered grid item component.
 * @constructor
 */
export function NewAuditGridItem() {
    return (
        <Link 
            to="/new-audit" 
            data-cy="new-audit-button"
            className="flex justify-center w-44 lg:w-52 xl:w-52 items-center aspect-square transition-transform transform hover:scale-105 bg-gray-200 rounded-xl m-4 p-4 border border-gray-400"
        >
            <Add className="text-gray-600" style={{ fontSize: '10vw', maxWidth: 80, maxHeight: 80 }} />
        </Link>
    );
}