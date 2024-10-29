import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Add } from '@mui/icons-material';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import Button from '@mui/material/Button';
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
        return (
            <Box display="flex" justifyContent="center" alignItems="center" minHeight="50vh">
                <CircularProgress />
            </Box>
        );
    }

    if (error) {
        return (
            <Typography color="error" align="center" variant="body1">
                Fehler beim Laden der Daten: {error.message}
            </Typography>
        );
    }

    return (
        <Box padding={3}>
            <Typography variant="h4" align="center" marginBottom={3}>
                Dashboard
            </Typography>

            <Box
                display="grid"
                gridTemplateColumns={{
                    xs: 'repeat(1, 1fr)',
                    sm: 'repeat(2, 1fr)',
                    md: 'repeat(3, 1fr)',
                    lg: 'repeat(4, 1fr)',
                    xl: 'repeat(5, 1fr)',
                }}
                gap={3}
                justifyContent="center"
            >
                {/* First box including plus icon */}
                <Button
                    component={Link}
                    to="/newAudit"
                    variant="outlined"
                    startIcon={<Add />}
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        padding: 2,
                        height: '100%',
                        aspectRatio: '1 / 1',
                        transition: 'transform 0.3s',
                        '&:hover': { transform: 'scale(1.05)' },
                    }}
                >
                    Neues Audit
                </Button>

                {/* boxes to perform audit */}
                {data.map(audit => (
                    <Button
                        component={Link}
                        to={`/performAudit/${audit.id}`}
                        key={audit.id}
                        variant="outlined"
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            padding: 2,
                            height: '100%',
                            aspectRatio: '1 / 1',
                            transition: 'transform 0.3s',
                            '&:hover': { transform: 'scale(1.05)' },
                        }}
                    >
                        <Typography variant="body1" align="center">
                            {audit.name}
                        </Typography>
                    </Button>
                ))}
            </Box>
        </Box>
    );
}

export default Dashboard;
