import React from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import {createTheme, ThemeProvider} from '@mui/material/styles';
import Dashboard from './components/Dashboard.jsx';
import NewAudit from './components/NewAudit.jsx';
import PerformAudit from './components/PerformAudit.jsx';
import Evaluation from './components/Evaluation.jsx';
import Sidebar from './components/Sidebar.jsx';
import './index.css';

const theme = createTheme({
    components: {
        MuiPaper: {
            styleOverrides: {
                root: {
                    backgroundColor: '#c4171f',
                    padding: '16px',
                    textAlign: 'center',
                },
            },
        },
        MuiLinearProgress: {
            styleOverrides: {
                root: {
                    height: "2rem",
                    borderRadius: '5px',
                },
                bar: {
                    backgroundColor: '#c4171f',
                },
            },
        },
        MuiCircularProgress: {
            styleOverrides: {
                circle: {
                    strokeLinecap: 'round',
                    borderRadius: 30,
                },
                svg: {
                    color: '#c4171f',
                },
            },
        },
        MuiTypography: {
            styleOverrides: {
                caption: {
                    fontSize: '1.25rem', // Increase font size here
                },
                body2: {
                    fontSize: '1.25rem', // Increase font size for LinearProgress percentage
                },
            },
        },
    },
});

function App() {
    return (
        <Router>
            <div className="flex mb-16">
                <Sidebar/>
                <div className="ml-64 p-4 w-full">
                    <ThemeProvider theme={theme}>
                        <Routes>
                            <Route path="/" element={<Dashboard/>}/>
                            <Route path="/newAudit" element={<NewAudit/>}/>
                            <Route path="/performAudit/:auditId" element={<PerformAudit/>}/>
                            <Route path="/evaluation/:auditId" element={<Evaluation/>}/>
                        </Routes>
                    </ThemeProvider>
                </div>
            </div>
        </Router>
    );
}

export default App;
