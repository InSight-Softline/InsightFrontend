import React from 'react';
import './index.css';
import {Route, HashRouter, Routes} from "react-router-dom";
import {Index} from "./pages/Index.jsx";
import {Dashboard} from "./pages/Dashboard.jsx";
import {NewAudit} from "./pages/NewAudit.jsx";
import {PerformAudit} from "./pages/PerformAudit.jsx";
import {Evaluation} from "./pages/Evaluation.jsx";

function App() {
    return (
        <HashRouter>
            <Routes>
                <Route path="/" element={<Index />}></Route>
                <Route path="/dashboard" element={<Dashboard />}></Route>
                <Route path="/new-audit" element={<NewAudit />}></Route>
                <Route path="/perform-audit/:auditId" element={<PerformAudit />}></Route>
                <Route path="/evaluation" element={<Evaluation />}></Route>
            </Routes>
        </HashRouter>
    );
}

export default App;
