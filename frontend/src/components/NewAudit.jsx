import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api.js";
import {
  Box,
  TextField,
  Typography,
  CircularProgress,
  Button,
} from "@mui/material";

const NewAudit = () => {
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [name, setName] = useState("");
  const navigate = useNavigate();

  const handleCreateAuditClick = () => {
    api
      .post("/v1/audits/new", {
        name: name,
        categories: cards
          .filter((card) => card.column === "Ausgewählte Kategorien")
          .map((card) => card.id),
      })
      .then((response) => {
        navigate("/performAudit/" + response.data.id);
      })
      .catch((err) => {
        console.error("Error creating audit:", err);
      });
  };

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  useEffect(() => {
    api
      .get("/v1/categories")
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
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="50vh">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Typography color="error" align="center" variant="body1">
        Fehler: {error.message}
      </Typography>
    );
  }

  return (
    <Box padding={3}>
      <form className="w-full flex justify-center items-center mb-8">
        <TextField
          label="Audit Name"
          variant="outlined"
          value={name}
          onChange={handleNameChange}
          fullWidth
          sx={{ maxWidth: 300 }}
        />
      </form>
      <Board cards={cards} setCards={setCards} />
      <Box display="flex" justifyContent="flex-end" paddingTop={4}>
        <Button
          onClick={handleCreateAuditClick}
          variant="contained"
          color="primary"
        >
          Audit erstellen
        </Button>
      </Box>
    </Box>
  );
};

// The Board component renders two columns and manages the state of the cards
const Board = ({ cards, setCards }) => {
  return (
    <Box display="flex" justifyContent="center" gap={2} height="calc(80vh - 192px)" padding={4}>
      <Column title="Verfügbare Kategorien" column="Verfügbare Kategorien" cards={cards} setCards={setCards} />
      <Column title="Ausgewählte Kategorien" column="Ausgewählte Kategorien" cards={cards} setCards={setCards} />
    </Box>
  );
};

// The Column component represents each column in the board and handles drag-and-drop functionality
const Column = ({ title, column, cards, setCards }) => {
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
    <Box width="33%" padding={2} bgcolor="white" boxShadow={3} borderRadius={2} display="flex" flexDirection="column">
      <Box display="flex" justifyContent="space-between" padding={2} borderBottom="1px solid" borderColor="grey.300">
        <Typography variant="h6">{title}</Typography>
        <Typography variant="body2" color="textSecondary">{filteredCards.length}</Typography>
      </Box>
      <Box
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        flexGrow={1}
        padding={2}
        overflow="auto"
      >
        {filteredCards.map((c) => (
          <Card key={c.id} {...c} handleDragStart={handleDragStart} />
        ))}
        <DropIndicator beforeId="-1" column={column} />
      </Box>
    </Box>
  );
};

// The Card component represents a draggable card in the column
const Card = ({ title, id, column, handleDragStart }) => {
  return (
    <>
      <DropIndicator beforeId={id} column={column} />
      <Box
        draggable
        onDragStart={(e) => handleDragStart(e, { title, id, column })}
        marginY={1}
        padding={2}
        borderRadius={1}
        bgcolor="grey.800"
        color="white"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <Typography variant="body2">{title}</Typography>
      </Box>
    </>
  );
};

// The DropIndicator component represents the drop target indicator
const DropIndicator = ({ beforeId, column }) => {
  return (
    <Box
      data-before={beforeId || "-1"}
      data-column={column}
      height="2px"
      width="100%"
      bgcolor="primary.main"
      opacity={0}
      marginY={0.5}
    />
  );
};

export default NewAudit;
