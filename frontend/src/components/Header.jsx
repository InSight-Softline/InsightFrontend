import React from "react";

/**
 * Adds a basic header to the website with the Softline Logo and the software name "InSight"
 *
 * @author [Anna Liepelt]
 */
function Header() {
  return (
    <header className="fixed top-0 left-0 w-full bg-white shadow-md items-center justify-between p-4 z-10">
      <div className="flex items-center justify-start">
        <img
          src="./src/logo-insight.png"
          alt="InSight Logo"
          className="w-8 h-8 mr-2"
        />
        <h1 className="text-4xl font-medium">InSight</h1>
      </div>
    </header>
  );
}

export default Header;
