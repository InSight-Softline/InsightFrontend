import React from "react";

/**
 * A reusable Header component.
 *
 * @returns {JSX.Element}
 * @constructor
 */
export function Header() {
  return (
    <header className="fixed top-0 left-0 w-full bg-white shadow-md items-center justify-between p-4 z-10 transition-all duration-300 ${open ? 'ml-60' : 'ml-0'}">
      <div className="flex items-center justify-start pl-6">
        <img
          src="/logo-insight.png"
          alt="InSight Logo"
          className="w-8 h-8 mr-2"
        />
        <h1 className="text-4xl font-medium">InSight</h1>
      </div>
    </header>
  );
}