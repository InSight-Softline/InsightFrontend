import React from "react";

const Footer = () => {
    return (
        <footer
            className="fixed flex justify-center items-center bottom-0 h-16 w-full bg-white border-t border-gray-200 shadow dark:bg-gray-800 dark:border-gray-600">
      <span className="block text-sm text-gray-500 sm:text-center dark:text-gray-400">
        © 2024{' '}
          <a href="http://localhost:5173/" className="hover:underline">
          InSight
        </a>{' '}
          All Rights Reserved.
      </span>
        </footer>
    );
};

export default Footer;