// src/components/layout/AppNavbar.jsx
import { Navbar } from "flowbite-react";
import { HiBars3 } from "react-icons/hi2";

export function AppNavbar({ toggleSidebar }) {
  return (
    <Navbar
      fluid
      className="h-12 bg-white dark:bg-gray-800 border-b dark:border-gray-700 shadow-sm"
    >
      {/* App name */}
      <div className="flex items-center pl-2 sm:pl-4">
        <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
          Merchant Ops Dashboard
        </span>
      </div>

      {/* Right side actions */}
      <div className="flex items-center gap-3 pr-2 sm:pr-4">
        {/* Mobile / small screen sidebar toggle */}
        {/* <button
          onClick={toggleSidebar}
          className="inline-flex items-center justify-center p-2 w-10 h-10 text-gray-900 bg-white rounded-lg hover:bg-gray-200 focus:outline-none dark:text-white dark:bg-gray-800 dark:hover:bg-gray-700"
          aria-label="Toggle sidebar"
        >
          <HiBars3 className="w-5 h-5" />
        </button> */}
      </div>
    </Navbar>
  );
}
