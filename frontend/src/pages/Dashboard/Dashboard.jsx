import React from 'react';
import { Link } from 'react-router-dom';
import { Add } from '@mui/icons-material';
import useFetchAudits from '../../hooks/useFetchAudits.js';
import './dashboard.css';

function Dashboard() {
    const { data, loading } = useFetchAudits();

    if (loading) {
        return <p>Laden...</p>;
    }

    return (
        <div>
            <div>
                <h1 className="dashboard-title">Dashboard</h1>
            </div>

            <div className="grid-container">
                <Link to="/newAudit" data-cy="new-audit-button" className="add-button">
                    <Add className="add-button-icon" style={{ fontSize: '10vw', maxWidth: 80, maxHeight: 80 }} />
                </Link>

                {data.map(audit => (
                    <Link data-cy="data-buttons" key={audit.id} to={`/performAudit/${audit.id}`} className="audit-button">
                        <p className="text-center">{audit.name}</p>
                    </Link>
                ))}
            </div>
        </div>
    );
}

export default Dashboard;
