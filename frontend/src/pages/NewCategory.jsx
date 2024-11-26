import React, { useState, useEffect } from "react";
import api from "../api.js";
import { LayoutDefault } from "../layouts/LayoutDefault.jsx";
import { useNavigate } from "react-router-dom";
import { TextField } from "@mui/material";

export function NewCategory() {
  const [name, setName] = useState("");

  const navigate = useNavigate();

  const handleCreateCategoryClick1 = () => {    //Übergabe erweitern mit Kategorie Namen /ID???

    if (!name) {
        alert("Bitte geben Sie sowohl einen Kategorie-Namen ein.");
        return;
    }
    
    api
        .post("/v1/categories/new" , {
            name: name,
        })
        .then((response) => {
            navigate("/new-category/" + response.data.id);     //Navigation ändern zu new-question!!!
        })
        .catch((err) => {
            console.error("Error creating category:", err);
            alert("Fehler beim Erstellen der Kategorie.");
        });
  };

  const handleCreateCategoryClick2 = () => {

    if (!name) {
        alert("Bitte geben Sie sowohl einen Kategorie-Namen ein.");
        return;
    }
    
    api
        .post("/v1/categories/new" , {
            name: name,
        })
        .then((response) => {
            navigate("/new-question/" + response.data.id);
        })
        .catch((err) => {
            console.error("Error creating category:", err);
            alert("Fehler beim Erstellen der Kategorie.");
        });
  };

  const handleCreateCategoryClick3 = () => {

    if (!name) {
        alert("Bitte geben Sie sowohl einen Kategorie-Namen ein.");
        return;
    }
    
    api
        .post("/v1/categories/new" , {
            name: name,
        })
        .then((response) => {
            navigate("/dashboard/" + response.data.id);     //Navigation ändern zum anzeigen der Kategorien!!!
        })
        .catch((err) => {
            console.error("Error creating category:", err);
            alert("Fehler beim Erstellen der Kategorie.");
        });
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
  };


  const fetchCategories = (query) => {
    return api.get("/v1/categories", {
      params: query
    })
  }

  return (
    <LayoutDefault>
      <div>
        <h1 className="text-center text-4xl m-6">Neue Kategorie anlegen</h1>
        <form className="flex justify-center items-center mx-auto m-8">
          <div className="flex flex-col gap-2">
            <TextField
              label="Category Name"
              variant="outlined"
              value={name}
              onChange={handleNameChange}
            />
          </div>
        </form>
        <div className="flex justify-center mt-6">
          <button
            onClick={handleCreateCategoryClick1}
            className="fixed right-48 p-2 bottom-20 mb-12 bg-blue-500 text-white rounded"
          >
            Speichern und Fragen erstellen
          </button>
          <button
            onClick={handleCreateCategoryClick2}
            className="fixed right-32 p-2 bottom-20 mb-12 bg-blue-500 text-white rounded"
          >
            Speichern und neue Kategorie anlegen
          </button>
          <button
            onClick={handleCreateCategoryClick3}
            className="fixed right-16 p-2 bottom-20 mb-12 bg-blue-500 text-white rounded"
          >
            Speichern und zurück
          </button>
        </div>
      </div>
    </LayoutDefault>
  );
}