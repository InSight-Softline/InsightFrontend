import React, { useState } from "react";
import Card from "./Card";
import DropIndicator from "./DropIndicator";

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

export default Column;
