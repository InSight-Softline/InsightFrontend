import React, { useState } from "react";
import { LayoutDefault } from "../layouts/LayoutDefault.jsx";  
import { Table } from "../components/Table/Table.jsx";  

export function NewAudit() {
    const [cards] = useState([
        { id: "1", title: "Kategorie 1" },
        { id: "2", title: "Kategorie 2" },
        { id: "3", title: "Kategorie 3" },
        { id: "4", title: "Kategorie 4" },
        { id: "5", title: "Kategorie 5" },
        { id: "6", title: "Kategorie 6" },
        { id: "7", title: "Kategorie 7" },
        { id: "8", title: "Kategorie 8" }
    ]);

    const [selectedCategories, setSelectedCategories] = useState([]);
    const [name, setName] = useState("");
    const [customerName, setCustomerName] = useState("");

    
    const handleCreateAuditClick = () => {
        if (!name || !customerName) {
            alert("Bitte geben Sie sowohl einen Audit-Namen als auch einen Firmennamen ein.");
            return;
        }

        const newAudit = {
            name,
            customerName,
            categories: selectedCategories,
        };

        fetch("/api/audits", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newAudit),
        })
        .then(response => response.json())
        .then(data => {
            console.log("Audit erstellt:", data);
            alert("Audit erfolgreich erstellt!");
        })
        .catch(error => {
            console.error("Fehler beim Erstellen des Audits:", error);
            alert("Fehler beim Erstellen des Audits.");
        });
    };

    return (
        <LayoutDefault>
            <div className="bg-green-200 w-full h-full p-4">
                <h1 className="text-center text-2xl mb-6">Neues Audit anlegen</h1>
                
                <div className="mb-4 flex justify-center">
                    <input 
                        value={name} 
                        onChange={(e) => setName(e.target.value)} 
                        placeholder="Audit Name" 
                        className="border rounded p-2 w-1/2"
                    />
                </div>

                <div className="mb-4 flex justify-center">
                    <input 
                        value={customerName} 
                        onChange={(e) => setCustomerName(e.target.value)} 
                        placeholder="Firmenname" 
                        className="border rounded p-2 w-1/2"
                    />
                </div>

                <Table
                    value={selectedCategories}
                    options={cards}
                    onChange={setSelectedCategories}
                />

                <div className="flex justify-center mt-6">
                    <button 
                        onClick={handleCreateAuditClick} 
                        className="bg-blue-500 text-white px-4 py-2 rounded"
                    >
                        Audit erstellen
                    </button>
                </div>
            </div>
        </LayoutDefault>
    );
}
