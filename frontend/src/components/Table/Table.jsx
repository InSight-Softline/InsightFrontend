import React from "react";
import { TableColumn } from "./TableColumn.jsx";

export function Table({ value, options, onChange }) {
    const availableItems = options.filter(option => !value.includes(option.id));
    const selectedItems = options.filter(option => value.includes(option.id));

    // Funktion zum Hinzufügen eines Items in die ausgewählte Liste
    const handleAdd = (id) => {
        onChange([...value, id]); // Zustand mit neuem Item aktualisieren
    };

    // Funktion zum Entfernen eines Items aus der ausgewählten Liste
    const handleRemove = (id) => {
        onChange(value.filter(selectedId => selectedId !== id)); // Zustand ohne das Item aktualisieren
    };

    // Funktion, die je nach Zielbereich `handleAdd` oder `handleRemove` aufruft
    const handleDropItem = (id, targetColumn) => {
        if (targetColumn === "selected") {
            handleAdd(id);
        } else {
            handleRemove(id); 
        }
    };

    return (
        <div className="flex justify-center gap-10 p-4">
            <TableColumn
                title="Verfügbare Kategorien"
                items={availableItems}
                onDropItem={(id) => handleDropItem(id, "available")}
            />
            <TableColumn
                title="Ausgewählte Kategorien"
                items={selectedItems}
                onDropItem={(id) => handleDropItem(id, "selected")}
            />
        </div>
    );
}
