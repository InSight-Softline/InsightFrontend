import React from 'react';
import './index.css';
import {Route, HashRouter, Routes} from "react-router-dom";
import {Dashboard} from "./pages/Dashboard.jsx";
import {NewAudit} from "./pages/NewAudit.jsx";
import {PerformAudit} from "./pages/PerformAudit.jsx";
import {Evaluation} from "./pages/Evaluation.jsx";
import { CompareAudits} from './pages/CompareAudits.jsx';
import {ManageCategoriesAndQuestions} from "./pages/ManageCategoriesAndQuestions.jsx";

function App() {
    return (
        <HashRouter>
            <Routes>
                <Route path="/" element={<Dashboard />}></Route>
                <Route path="/dashboard" element={<Dashboard />}></Route>
                <Route path="/new-audit" element={<NewAudit />}></Route>
                <Route path="/perform-audit/:auditId" element={<PerformAudit />}></Route>
                <Route path="/evaluation/:auditId" element={<Evaluation />} />
                <Route path="/compare-audits/:auditId" element={<CompareAudits />} />
                <Route path="/manage-categories-and-questions" element={<ManageCategoriesAndQuestions />} />
            </Routes>
        </HashRouter>
    );
}

export default App;
