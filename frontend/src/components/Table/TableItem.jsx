import React from "react";

export function TableItem({ id, title, onDragStart }) {
  return (
    <div
      draggable="true"
      onDragStart={(e) => onDragStart(e, id)}
      className="cursor-grab rounded border border-neutral-700 bg-neutral-700 p-3 text-sm text-neutral-100 active:cursor-grabbing mb-2"
    >
      {title}
    </div>
  );
}
