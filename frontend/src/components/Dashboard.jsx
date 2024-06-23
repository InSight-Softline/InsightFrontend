import React, {useEffect, useState} from 'react';
import Paper from '@mui/material/Paper';
import AddIcon from '@mui/icons-material/Add';
import {Link} from 'react-router-dom';
import api from "../api.js";

function Dashboard() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);


    /* fetching data from backend */
    useEffect(() => {
        api.get('/v1/audits') /*relative path, editable in .env files & api.js -*/
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

    if (error) {
        return <p>Fehler: {error.message}</p>;
    }

    /* Styling for the boxes, other styling in theme in App.jsx */
    const paperStyle = {
        width: '100%',
        aspectRatio: '1',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        transition: 'transform 0.7s',
        '&:hover': {
            transform: 'scale(1.12)'
        },
        '& p': {
            fontSize: '1.5rem', // Adjust the font size here
            textAlign: 'center',
            margin: 0
        }
    };

    return (
        <div>
            <div>
                <h1 className="text-center text-4xl m-10">Dashboard</h1>
            </div>


            <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 justify-center">

                {/* First box including plus icon */}
                <Link to="/newAudit" className="flex justify-center items-center h-full mx-16 my-6">
                    <Paper elevation={20} sx={paperStyle}>
                        <AddIcon sx={{fontSize: '40vw', maxWidth: 110, maxHeight: 110}}/>
                    </Paper>
                </Link>

                {/* boxes to perform audit, TODO get the right url */}
                {data.map(audit => (
                    <Link key={audit.id} to={`/audit/${audit.id}`}
                          className="flex justify-center items-center h-full mx-16 my-6">
                        <Paper elevation={20} sx={paperStyle}>
                            <p className="text-center">{audit.name}</p>
                        </Paper>
                    </Link>
                ))}

                {/* example boxes, TODO delete later */}
                {[...Array(6)].map((_, index) => (
                    <Link key={`example-${index}`} to="/"
                          className="flex justify-center items-center h-full mx-16 my-6">
                        <Paper elevation={20} sx={paperStyle}>
                            <p className="text-center">Beispiel</p>
                        </Paper>
                    </Link>
                ))}
            </div>
        </div>
    );
}

export default Dashboard;
