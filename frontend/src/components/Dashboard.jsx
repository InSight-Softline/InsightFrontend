import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Add } from '@mui/icons-material';
import api from "../api.js";

function Dashboard() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    /* fetching data from backend */
    useEffect(() => {
        api.get('/v1/audits')
            .then(response => {
                console.log(response);
                setData(response.data);
                setLoading(false);
            })
            .catch(err => {
                console.error('Error fetching data:', err);
                setError(err);
                setLoading(false);
            });
    }, []);

    if (loading) {
        return <p>Laden...</p>;
    }

    return (
        <div>
            <div>
                <h1 className="text-center text-4xl m-6">Dashboard</h1>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-10 justify-center">
                {/* First box including plus icon */}
                <Link to="/newAudit" data-cy="new-audit-button"
                      className="flex justify-center w-44 lg:w-52 xl:w-52 items-center aspect-square transition-transform transform hover:scale-105 bg-gray-200 rounded-lg m-4 p-4">
                    <Add className="text-gray-600" style={{ fontSize: '10vw', maxWidth: 80, maxHeight: 80 }} />
                </Link>

                {/* boxes to perform audit */}
                {data.map(audit => (
                    <Link data-cy="data-buttons" key={audit.id} to={`/audit/${audit.id}`}
                          className="flex justify-center w-44 lg:w-52 xl:w-52 items-center aspect-square transition-transform transform hover:scale-105 bg-gray-200 rounded-lg m-4 p-4">
                        <p className="text-center">{audit.name}</p>
                    </Link>
                ))}
            </div>
        </div>
    );
}

export default Dashboard;
