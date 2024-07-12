import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Dashboard from '../pages/Dashboard/Dashboard.jsx';
import NewAudit from '../pages/NewAudit/NewAudit.jsx';
import PerformAudit from '../pages/PerformAudit/PerformAudit.jsx';
import Evaluation from '../pages/Evaluation/Evaluation.jsx';

const AppRouter = () => {
    return (
        <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/newAudit" element={<NewAudit />} />
            <Route path="/performAudit/:auditId" element={<PerformAudit />} />
            <Route path="/evaluation/:auditId" element={<Evaluation />} />
        </Routes>
    );
};

export default AppRouter;
