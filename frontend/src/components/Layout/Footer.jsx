import React from "react";

/**
 * Footer Component
 *
 * Adds a basic footer with a link to the dashboard page.
 *
 * @returns {Element}
 */
export function Footer(){
    return (
        <footer className="fixed flex justify-center items-center bottom-0 h-16 w-full bg-white border-t border-gray-200 shadow">
          <span className="block text-sm text-gray-500 sm:text-center">
            © 2024{" "}
              <a href="http://localhost:5173/#/" className="hover:underline">
              InSight
            </a>{" "}
              All Rights Reserved.
          </span>
        </footer>
    );
}