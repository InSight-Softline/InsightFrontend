import React from "react";
import Column from "./Column";

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

export default Board;
