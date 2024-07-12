import React from "react";
import { useNavigate } from "react-router-dom";
import useCategories from "../../hooks/useCategories";
import Board from "../../components/Board";
import './NewAudit.css';

const NewAudit = () => {
  const { cards, setCards, loading, error } = useCategories();
  const navigate = useNavigate();

  const handleCreateAuditClick = () => {
    navigate("/performAudit");
  };

  if (loading) {
    return <p>Loading...</p>; 
  }

  if (error) {
    return <p>Fehler: {error.message}</p>; 
  }

  return (
    <div>
      <form className="form-container">
        <div className="input-container">
          <input
            type="text"
            placeholder="Name"
            className="input-field"
          />
        </div>
      </form>
      <Board cards={cards} setCards={setCards} />{" "}
      {/* Pass cards and setCards to Board */}
      <div className="button-container">
        <button
          onClick={handleCreateAuditClick}
          className="create-audit-button">
          Audit erstellen
        </button>
      </div>
    </div>
  );
};

export default NewAudit;
