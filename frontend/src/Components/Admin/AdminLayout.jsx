import { Outlet, NavLink, useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import {
  FaHome,
  FaFolder,
  FaTrophy,
  FaUsers,
  FaPenAlt,
  FaSignOutAlt,
  FaChevronRight,
} from "react-icons/fa";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const AdminLayout = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const [isCollapsed, setIsCollapsed] = useState(false);
  // eslint-disable-next-line no-unused-vars
  const [activePath, setActivePath] = useState("");

  useEffect(() => {
    setActivePath(window.location.pathname);
  }, []);

  const handleLogout = async () => {
    try {
      await fetch("/api/admin/auth/logout", {
        method: "POST",
        credentials: "include",
      });
      localStorage.removeItem("admin-token");
      queryClient.removeQueries(["currentAdmin"]);
      navigate("/nexus-hq/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const navItems = [
    { path: "/nexus-hq/dashboard", icon: <FaHome />, label: "Dashboard" },
    { path: "/nexus-hq/projects", icon: <FaFolder />, label: "Projects" },
    {
      path: "/nexus-hq/competitions",
      icon: <FaTrophy />,
      label: "Competitions",
    },
    { path: "/nexus-hq/team", icon: <FaUsers />, label: "Team" },
    { path: "/nexus-hq/blog", icon: <FaPenAlt />, label: "Blogs" },
  ];

  return (
    <div className="min-h-screen flex bg-black text-white font-['Orbitron']">
      {/* Sidebar */}
      <motion.aside
        className={`fixed top-0 left-0 h-full bg-gray-800 text-white z-50 shadow-2xl transition-all duration-300 ${
          isCollapsed ? "w-20" : "w-64"
        }`}
        initial={{ x: 0 }}
        animate={{ x: 0 }}
      >
        <div className="flex flex-col h-full">
          {/* Logo and Collapse Button */}
          <div className="flex items-center justify-between p-4 border-b border-gray-700">
            {!isCollapsed && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex items-center text-2xl cursor-pointer"
                onClick={() => navigate("/nexus-hq/dashboard")}
              >
                <img
                  src="/nav-logo.png"
                  alt="BotNexus Logo"
                  className="w-12 h-12"
                />
                <span className="text-red-500 ml-2">Bot</span>
                <span className="text-white hover:text-blue-400 transition-colors">
                  Nexus
                </span>
              </motion.div>
            )}
            <button
              onClick={() => setIsCollapsed(!isCollapsed)}
              className="p-2 rounded-full hover:bg-gray-700 transition-colors"
            >
              <FaChevronRight
                className={`transition-transform ${
                  isCollapsed ? "rotate-360" : "rotate-180"
                }`}
              />
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto py-4">
            <ul className="space-y-2 px-2">
              {navItems.map((item) => (
                <li key={item.path}>
                  <NavLink
                    to={item.path}
                    className={({ isActive }) =>
                      `flex items-center p-3 rounded-lg transition-colors duration-200 ${
                        isActive
                          ? "bg-blue-600 text-white"
                          : "hover:bg-gray-700 text-gray-300"
                      }`
                    }
                  >
                    <span className="text-lg mr-3">{item.icon}</span>
                    {!isCollapsed && (
                      <motion.span
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1 }}
                      >
                        {item.label}
                      </motion.span>
                    )}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>

          {/* Logout Button */}
          <div className="p-4 border-t border-gray-700">
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={handleLogout}
              className={`flex items-center justify-center w-full py-2 rounded-lg bg-red-600 hover:bg-red-700 transition-colors ${
                isCollapsed ? "px-0" : "px-4"
              }`}
            >
              <FaSignOutAlt />
              {!isCollapsed && <span className="ml-2">Log Out</span>}
            </motion.button>
          </div>
        </div>
      </motion.aside>

      {/* Main Content */}
      <main
        className={`flex-1 min-h-screen transition-all duration-300 ${
          isCollapsed ? "ml-20" : "ml-64"
        }`}
      >
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
