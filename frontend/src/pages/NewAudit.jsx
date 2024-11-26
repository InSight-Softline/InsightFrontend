import React, { useState, useEffect } from "react";
import api from "../api.js";
import { LayoutDefault } from "../layouts/LayoutDefault.jsx";
import { Table } from "../components/Table/Table.jsx";
import { useNavigate } from "react-router-dom";
import { TextField } from "@mui/material";

export function NewAudit() {
  const [cards, setCards] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [name, setName] = useState("");
  const [customerName, setCustomerName] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  
  const handleCreateAuditClick = () => {
    
    if (!name || !customerName) {
      alert("Bitte geben Sie sowohl einen Audit-Namen als auch einen Firmennamen ein.");
      return;
    }

    api
      .post("/v1/audits/new" , {
        name: name,
        customer: customerName,
        categories: selectedCategories,
      })
      .then((response) => {
        navigate("/perform-audit/" + response.data.id);
      })
      .catch((err) => {
        console.error("Error creating audit:", err);
        alert("Fehler beim Erstellen des Audits.");
      });
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
  };
  const handleCustomerNameChange = (e) => {
    setCustomerName(e.target.value);
  };

  useEffect(() => {
    api
      .get("/v1/categories")
      .then((response) => {
        const categories = response.data.map((category) => ({
          id: category.id.toString(),
          title: category.name,
        }));
        setCards(categories);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching categories:", err);
        setError(err);
        setLoading(false);
      });
  }, []);


  if (loading) {
    return <p>Loading...</p>; // Display loading message while data is being fetched
  }

  if (error) {
    return <p>Fehler: {error.message}</p>; // Display error message if fetch fails
  }

  return (
    <LayoutDefault>
      <div>
        <h1 className="text-center text-4xl m-6">Neues Audit anlegen</h1>
        <form className="flex flex-col items-center w-full mb-8">
          <div className="audit-name-field w-full max-w-xs ml-12">
            <TextField
              label="Audit Name"
              variant="outlined"
              value={name}
              onChange={handleNameChange}
            />
          </div>
          <div className="customer-name-field w-full max-w-xs mt-4 ml-12">
            <TextField
              label="Firmenname"
              variant="outlined"
              value={customerName}
              onChange={handleCustomerNameChange}
            />
          </div>
        </form>
        <Table
          value={selectedCategories}
          options={cards}
          onChange={setSelectedCategories}
        />
        <div className="flex justify-center mt-6">
          <button
            onClick={handleCreateAuditClick}
            className="fixed right-16 p-2 bottom-20 mb-12 bg-blue-500 text-white rounded"
          >
            Audit erstellen
          </button>
        </div>
      </div>
    </LayoutDefault>
  );
}
