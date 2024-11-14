import React, { useState, useEffect } from "react";
import api from "../api.js";
import { LayoutDefault } from "../layouts/LayoutDefault.jsx";
import { Table } from "../components/Table/Table.jsx";
import { useNavigate } from "react-router-dom";
import { TextField } from "@mui/material";
import {TextSearch} from "../components/TextSearch/TextSearch.jsx";

export function NewAudit() {
  const [cards, setCards] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [name, setName] = useState("");
  const [customer, setCustomer] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [existingCustomersLoading, setExistingCustomersLoading] = useState(false);
  const [customerOptions, setCustomerOptions] = useState([]);

  const navigate = useNavigate();

  const handleCreateAuditClick = () => {
    api
      .post("/v1/audits/new", {
        name: name,
        categories: selectedCategories,
        customer: customer
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


  const fetchAudits = (query) => {
    return api.get("/v1/audits", {
      params: query
    })
  }

  const fetchAuditByCustomers = (searchCustomer=null) => {
    return fetchAudits({
      customer: searchCustomer,
      sortBy: 'customer'
    })
  };

  const onSearchChange = (_value) => {
    setExistingCustomersLoading(true)
    setCustomerOptions([])
    fetchAuditByCustomers(_value).then((response) => {
      setCustomerOptions([...new Set([_value,...response.data.map((audit) => audit.customer)])])
    }).finally(() => {
      setExistingCustomersLoading(false)
    })
  }


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
        <form className="w-[240px] flex justify-center items-center mx-auto m-8">
          <div className="flex flex-col gap-2">
            <TextField
              label="Audit Name"
              variant="outlined"
              value={name}
              onChange={handleNameChange}
            />
            <TextSearch
                placeholder="Kundenname"
                loading={existingCustomersLoading}
                options={customerOptions}
                value={customer}
                onChange={setCustomer}
                onSearchChange={onSearchChange}
            ></TextSearch>
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
