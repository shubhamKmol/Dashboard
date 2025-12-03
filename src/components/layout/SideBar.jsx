// src/components/layout/SideBar.jsx
import { Link, useLocation } from "react-router-dom";
import { HiChartPie, HiShoppingBag, HiXMark, HiBars3 } from "react-icons/hi2";

export function Sidebar({ isCollapsed, toggleCollapse }) {
  const { pathname } = useLocation();

  const links = [
    { name: "Dashboard", path: "/", icon: <HiChartPie className="text-xl" /> },
    { name: "Merchants", path: "/merchants", icon: <HiShoppingBag className="text-xl" /> },
  ];

  const getLinkClasses = (path) => `
  flex items-center gap-3 p-2 rounded-lg transition-colors font-medium
  ${pathname === path
      ? "bg-blue-600 text-white"
      : "text-gray-700 hover:bg-gray-200 dark:text-gray-200 dark:hover:bg-gray-700"}
  ${isCollapsed ? "justify-center" : "justify-start"}
`;

  return (
    <aside
      className={`
        fixed top-0 left-0 h-screen bg-white dark:bg-gray-800
        border-r dark:border-gray-700 p-4 z-50 transition-all duration-300
        ${isCollapsed ? "w-16" : "w-56"}
      `}
    >
      <div className="flex justify-end mb-6">
        <button
          onClick={toggleCollapse}
          className="text-gray-700 dark:text-gray-200 hover:text-blue-500"
        >
          {isCollapsed ? <HiBars3 className="w-6 h-6" /> : <HiXMark className="w-6 h-6" />}
        </button>
      </div>

      <nav className="flex flex-col space-y-2 mt-2">
        {links.map((link) => (
          <Link key={link.path} to={link.path} className={getLinkClasses(link.path)}>
            {link.icon}
            {!isCollapsed && <span>{link.name}</span>}
          </Link>
        ))}
      </nav>
    </aside>
  );
}
