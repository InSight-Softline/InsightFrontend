import React from "react";

export function TableItem({ id, title, onDragStart }) {
    return (
        <div
            draggable="true"
            onDragStart={(e) => onDragStart(e, id)}
            className="cursor-grab rounded border bg-neutral-700 p-3 text-sm text-neutral-100"
        >
            {title}
        </div>
    );
}
