import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import dayjs from 'dayjs';

/**
 * AuditGridItem component renders a clickable grid item that links to an audit.
 *
 * @param {object} audit - The audit object containing `id` and `name`.
 * @returns {JSX.Element} The rendered grid item component.
 * @constructor
 */
export function AuditGridItem({ audit }) {

    const formattedDate = dayjs(audit.createdAt).format('DD.MM.YYYY');
    return (
        <Link 
            data-cy="data-buttons" 
            to={`/perform-Audit/${audit.id}`} 
            className="flex justify-center w-44 lg:w-52 xl:w-52 items-center aspect-square transition-transform transform hover:scale-105 bg-gray-200 rounded-xl m-4 p-4 border border-gray-400"
        >
            <p className="text-center">{audit.name}</p>
            <p className="absolute bottom-2 right-2 text-sm text-gray-700">{audit.customer}</p>
            <p className="absolute bottom-2 left-2 text-sm text-gray-700">{formattedDate}</p>
        </Link>
    );
}
AuditGridItem.propTypes = {
    audit: PropTypes.shape({
        id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired, // falls ID numerisch oder string sein kann
        name: PropTypes.string.isRequired,
        customer: PropTypes.string.isRequired,
        createdAt: PropTypes.instanceOf(Date),
    }).isRequired,
};