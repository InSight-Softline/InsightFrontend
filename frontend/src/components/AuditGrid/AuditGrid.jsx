import React from "react";
import { AuditGridItem } from "./AuditGridItem";
import { NewAuditGridItem } from "./NewAuditGridItem";

/**
 * AuditGrid component fetches audit data from the backend and displays
 * them in a grid format, including a button to create a new audit.
 *
 * @returns {JSX.Element} The rendered audit grid component.
 * @constructor
 */
export function AuditGrid({ data = [], loading = false, error = null }) {
  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-10 justify-center">
        {/* PlusIcon */}
        <NewAuditGridItem />

        {/* Existing Audits */}
        {data.map((audit) => (
          <AuditGridItem key={audit.id} audit={audit} />
        ))}
      </div>
    </div>
  );
}

export default AuditGrid;
