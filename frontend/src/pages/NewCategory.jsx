import React, { useState, useEffect } from "react";
import api from "../api.js";
import { LayoutDefault } from "../layouts/LayoutDefault.jsx";
import {CategoryForm} from "../components/CategoryForm/CategoryForm.jsx";

export function NewCategory() {
    const [name, setName] = useState("");

    const handleSubmit = () => {
        api.post("/v1/categories/new" , {
            name: name,
        }).then((response) => {
            alert("Kategorie erfolgreich erstellt.");
            setName("");
        }).catch((err) => {
            alert("Fehler beim Erstellen der Kategorie.");
        })
    }

    const handleChange = ({name}) => {
        setName(name)
    }

    return (
        <LayoutDefault>
            <div>
                <h1>New Category</h1>
                <CategoryForm
                    value={{name: name}}
                    onChange={handleChange}
                    onSubmit={handleSubmit}
                >
                </CategoryForm>
            </div>
        </LayoutDefault>
    )
}