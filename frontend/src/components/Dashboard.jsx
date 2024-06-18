
import Paper from '@mui/material/Paper';
import AddIcon from '@mui/icons-material/Add';
import {Link} from 'react-router-dom';

function Dashboard() {
    return (
        <div>

            <div>
                <h1 className="text-center text-4xl m-10">Dashboard</h1>
            </div>
            
            <div className="grid grid-cols-4 gap-4 justify-center">
                <Link to="/newAudit" className="testbox flex justify-center items-center h-full">
                    <Paper elevation={8} className="w-60 h-60 flex justify-center items-center">
                        <AddIcon sx={{fontSize: 140}}/>
                    </Paper>
                </Link>

                <Link to="/" className="testbox flex justify-center items-center h-full">
                    <Paper elevation={8} className="w-60 h-60 flex justify-center items-center m-10">
                        <p>Kachel</p>
                    </Paper>
                </Link>

                <Link to="/" className="testbox flex justify-center items-center h-full">
                    <Paper elevation={8} className="w-60 h-60 flex justify-center items-center m-10">
                        <p>Kachel</p>
                    </Paper>
                </Link>

                <Link to="/" className="testbox flex justify-center items-center h-full">
                    <Paper elevation={8} className="w-60 h-60 flex justify-center items-center m-10">
                        <p>Kachel</p>
                    </Paper>
                </Link>

                <Link to="/" className="testbox flex justify-center items-center h-full">
                    <Paper elevation={8} className="w-60 h-60 flex justify-center items-center m-10">
                        <p>Kachel</p>
                    </Paper>
                </Link>

                <Link to="" className="testbox flex justify-center items-center h-full">
                    <Paper elevation={8} className="w-60 h-60 flex justify-center items-center m-10">
                        <p>Kachel</p>
                    </Paper>
                </Link>

                <Link to="/" className="testbox flex justify-center items-center h-full">
                    <Paper elevation={8} className="w-60 h-60 flex justify-center items-center m-10">
                        <p>Kachel</p>
                    </Paper>
                </Link>

                <Link to="/" className="testbox flex justify-center items-center h-full">
                    <Paper elevation={8} className="w-60 h-60 flex justify-center items-center m-10">
                        <p>Kachel</p>
                    </Paper>
                </Link>

                <Link to="/" className="testbox flex justify-center items-center h-full">
                    <Paper elevation={8} className="w-60 h-60 flex justify-center items-center m-10">
                        <p>Kachel</p>
                    </Paper>
                </Link>

                <Link to="/" className="testbox flex justify-center items-center h-full">
                    <Paper elevation={8} className="w-60 h-60 flex justify-center items-center m-10">
                        <p>Kachel</p>
                    </Paper>
                </Link>
            </div>

        </div>
    );
}

export default Dashboard;
