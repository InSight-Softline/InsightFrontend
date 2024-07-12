import React from "react";
import DropIndicator from "./DropIndicator";

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

export default Card;
