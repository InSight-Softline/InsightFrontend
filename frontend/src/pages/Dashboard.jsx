import React, { useEffect, useState } from "react";
import {LayoutDefault} from "../layouts/LayoutDefault.jsx";
import Title from "../components/Textareas/Title";
import Text from "../components/Textareas/Text";

const Dashboard = () => {
    const [audits, setAudits] = useState([]);

    useEffect(() => {
        // Daten vom Backend laden
        fetch("/api/audits")
            .then(response => response.json())
            .then(data => setAudits(data))
            .catch(error => console.error("Fehler beim Laden der Audits:", error));
    }, []);


    return (
        <LayoutDefault>
            <div className="bg-green-200 w-full h-full"></div>
            <Title>Dashboard</Title>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {audits.map(audit => (
                        <div key={audit.id} className="bg-white p-4 rounded shadow">
                            <Text customStyles="font-bold">Audit Name: {audit.name}</Text>
                            <Text>Firmenname: {audit.companyName}</Text>
                            <Text>Erstellungsdatum: {new Date(audit.creationDate).toLocaleDateString()}</Text>
                        </div>
                    ))}
                </div>
        </LayoutDefault>
    )
}
export default Dashboard;
