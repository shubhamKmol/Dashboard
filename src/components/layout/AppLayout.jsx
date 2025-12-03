// src/components/layout/AppLayout.jsx
import { Outlet } from "react-router-dom";
import { AppNavbar } from "./AppNavbar";
import { Sidebar } from "./SideBar";
import { useState } from "react";

export function AppLayout() {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white">
      {/* Fixed sidebar, full height */}
      <Sidebar
        isCollapsed={isCollapsed}
        toggleCollapse={() => setIsCollapsed((prev) => !prev)}
      />

      {/* Right side: navbar + main content, shifted by sidebar width */}
      <div
        className={`
          flex flex-col min-h-screen transition-all duration-300
          ${isCollapsed ? "ml-16" : "ml-56"}
        `}
      >
        <AppNavbar toggleSidebar={() => setIsCollapsed((prev) => !prev)} />

        <main className="flex-1 p-6 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
