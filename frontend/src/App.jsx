
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Dashboard from './components/Dashboard.jsx';
import NewAudit from './components/NewAudit.jsx';
import PerformAudit from './components/PerformAudit.jsx';
import Evaluation from './components/Evaluation.jsx';
import Sidebar from './components/Sidebar.jsx';
import './index.css';


function App() {
  return (
    <Router>
      <div className="flex">
      <Sidebar />
      <div className="ml-64 p-4 w-full">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/newAudit" element={<NewAudit />} />
          <Route path="/performAudit" element={<PerformAudit />} />
          <Route path="/evaluation" element={<Evaluation />} />
        </Routes>
      </div>
      </div>
    </Router>
  );
}

export default App;