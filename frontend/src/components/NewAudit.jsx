import React, { useState, useEffect } from "react";
import api from "../api.js";
import { useNavigate } from "react-router-dom";
import { TextField } from "@mui/material";

const NewAudit = () => {
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [name, setName] = useState("Name");


  const navigate = useNavigate();
    
  
  const handleCreateAuditClick = () => {
    api
      .post("/v1/audits/new", {name: name,
        categories: cards.filter((card)=>card.column === "Ausgewählte Kategorien").map((card)=>card.id) ,
      })
      .then((response) => {
        navigate("/performAudit/"+response.data.id)
      })
     

  };

  const handleNameChange = (event) => {
    setName(event.target.value)
  }

  useEffect(() => {
    api
      .get("/v1/categories") // Adjust the URL to match your endpoint
      .then((response) => {
        const categories = response.data.map((category) => ({
          title: category.name,
          id: category.id.toString(),
          column: "Verfügbare Kategorien",
        }));
        setCards(categories);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching data:", err);
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
    <div>
      <form className="w-[240px] flex justify-center items-center mx-auto m-8">
        <div className="relative flex w-full items-center gap-2">
          <TextField placeholder="Name" label="Outlined" variant="outlined" value={name} onChange={handleNameChange}/>
        </div>
      </form>
      <Board cards={cards} setCards={setCards} />{" "}
      {/* Pass cards and setCards to Board */}
      <div className="flex p-10">
        <button
          onClick={handleCreateAuditClick}
          data-cy="NewAudit"
          className="absolute bottom-20 right-16 p-2 bg-blue-500 text-white rounded">
            Audit erstellen
        </button>
      </div>
    </div>
  );
};

// The Board component renders two columns and manages the state of the cards
const Board = ({ cards, setCards }) => {
  return (
    <div className="flex justify-center gap-10 h-[calc(80vh-192px)] w-full overflow-hidden p-4">
      <Column
        title="Verfügbare Kategorien"
        column="Verfügbare Kategorien"
        headingColor="text-neutral-700"
        cards={cards}
        setCards={setCards}
      />
      <Column
        title="Ausgewählte Kategorien"
        column="Ausgewählte Kategorien"
        headingColor="text-neutral-700"
        cards={cards}
        setCards={setCards}
      />
    </div>
  );
};

// The Column component represents each column in the board and handles drag-and-drop functionality
const Column = ({ title, headingColor, column, cards, setCards }) => {
  const [active, setActive] = useState(false);
  const filteredCards = cards.filter((c) => c.column === column);

  const handleDragStart = (e, card) => {
    e.dataTransfer.setData("cardID", card.id);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    highlightIndicator(e);
    setActive(true);
  };

  const highlightIndicator = (e) => {
    const indicators = getIndicators();
    clearHighlights();
    const el = getNearestIndicator(e, indicators);
    if (el) el.element.style.opacity = "1";
  };

  const clearHighlights = () => {
    const indicators = getIndicators();
    indicators.forEach((i) => {
      i.style.opacity = "0";
    });
  };

  const getNearestIndicator = (e, indicators) => {
    const DISTANCE_OFFSET = 50;

    return indicators.reduce(
      (closest, child) => {
        const box = child.getBoundingClientRect();
        const offset = e.clientY - (box.top + DISTANCE_OFFSET);

        if (offset < 0 && offset > closest.offset) {
          return { offset: offset, element: child };
        } else {
          return closest;
        }
      },
      {
        offset: Number.NEGATIVE_INFINITY,
        element: indicators[indicators.length - 1],
      },
    );
  };

  const getIndicators = () => {
    return Array.from(document.querySelectorAll(`[data-column="${column}"]`));
  };

  const handleDragLeave = () => {
    setActive(false);
    clearHighlights();
  };

  const handleDrop = (e) => {
    setActive(false);
    clearHighlights();

    const cardID = e.dataTransfer.getData("cardID");
    const indicators = getIndicators();
    const { element } = getNearestIndicator(e, indicators);

    const before = element.dataset.before || "-1";

    if (before !== cardID) {
      let copy = [...cards];
      let cardToTransfer = copy.find((c) => c.id === cardID);
      if (!cardToTransfer) return;

      // Change the column of the transferred card
      cardToTransfer = { ...cardToTransfer, column };
      copy = copy.filter((c) => c.id !== cardID);

      if (before === "-1") {
        copy.push(cardToTransfer);
      } else {
        const insertAtIndex = copy.findIndex((el) => el.id === before);
        if (insertAtIndex === undefined) return;

        copy.splice(insertAtIndex, 0, cardToTransfer);
      }
      setCards(copy);
    }
  };

  return (
    <div className="w-1/3 shrink-0 bg-white rounded-lg shadow-md overflow-hidden flex flex-col">
      <div className="mb-3 flex items-center justify-between p-4 border-b border-neutral-200">
        <h3 className={`font-medium ${headingColor}`}>{title}</h3>
        <span className="rounded text-sm text-neutral-500">
          {filteredCards.length}
        </span>
      </div>
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className="flex-grow p-4 transition-colors overflow-auto"
      >
        {filteredCards.map((c) => (
          <Card key={c.id} {...c} handleDragStart={handleDragStart} />
        ))}
        <DropIndicator beforeId="-1" column={column} />
      </div>
    </div>
  );
};

// The Card component represents a draggable card in the column
const Card = ({ title, id, column, handleDragStart }) => {
  return (
    <>
      <DropIndicator beforeId={id} column={column} />
      <div
        draggable="true"
        onDragStart={(e) => handleDragStart(e, { title, id, column })}
        className="cursor-grab rounded border border-neutral-700 bg-neutral-700 p-3 active:cursor-grabbing mb-2" // Set margin-bottom for spacing
        style={{ height: "50px" }} // Adjust card height as needed
      >
        <p className="text-sm text-neutral-100">{title}</p>
      </div>
    </>
  );
};

// The DropIndicator component represents the drop target indicator
const DropIndicator = ({ beforeId, column }) => {
  return (
    <div
      data-before={beforeId || "-1"}
      data-column={column}
      className="my-0.5 h-0.5 w-full bg-red-400 opacity-0"
    />
  );
};

export default NewAudit;
