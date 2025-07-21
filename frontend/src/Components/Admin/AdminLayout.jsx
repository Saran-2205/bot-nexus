// src/Components/AdminLayout.jsx
import { Outlet, NavLink } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";

const AdminLayout = () => {
  const queryClient = useQueryClient();

  const handleLogout = async () => {
    await fetch("/api/admin/auth/logout", {
      method: "POST",
      credentials: "include",
    });
    localStorage.removeItem("admin-token");
    queryClient.removeQueries(["currentAdmin"]); // << flush react-query
    window.location.href = "/nexus-hq/login";
  };

  return (
    <div className="min-h-screen flex text-black bg-[#1a1a1a] font-['Orbitron']">
      {/* Sidebar */}
      <aside className="fixed top-0 left-0 w-70 bg-[#1a1a1a] text-white">
        <div className="flex items-center text-3xl p-4 hover:cursor-pointer transition-all duration-300 pb-4">
          <img src="/nav-logo.png" alt="BotNexus Logo" width={60} />
          <span className="text-[#ff2121]">Bot</span>
          <span className="text-white hover:text-[#2196F3] duration-300">
            Nexus
          </span>
        </div>
        <nav className="flex flex-col space-y-2 border-t border-[#E53935]/50 pt-4">
          <NavLink
            to="/nexus-hq/dashboard"
            className="text-md py-3 px-4 border border-none hover:bg-[#2196F3] rounded-[8px] mx-4 transition-all cursor-pointer duration-300"
          >
            <i className="fa-solid fa-house mx-2"></i> Dashboard
          </NavLink>
          <NavLink
            to="/nexus-hq/projects"
            className="text-md py-3 px-4 border border-none hover:bg-[#2196F3] rounded-[8px] mx-4 transition-all cursor-pointer duration-300"
          >
            <i className="fa-solid fa-folder mx-2"></i> Projects
          </NavLink>
          <NavLink
            to="/nexus-hq/competitions"
            className="text-md py-3 px-4 border border-none hover:bg-[#2196F3] rounded-[8px] mx-4 transition-all cursor-pointer duration-300"
          >
            <i className="fa-solid fa-trophy mx-2"></i> Competitions
          </NavLink>
          <NavLink
            to="/nexus-hq/team"
            className="text-md py-3 px-4 border border-none hover:bg-[#2196F3] rounded-[8px] mx-4 transition-all cursor-pointer duration-300"
          >
            <i className="fa-solid fa-users mx-2"></i> Team
          </NavLink>
          <NavLink
            to="/nexus-hq/blog"
            className="text-md py-3 px-4 border border-none hover:bg-[#2196F3] rounded-[8px] mx-4 transition-all cursor-pointer duration-300"
          >
            <i className="fa-solid fa-pen-nib mx-2"></i> Blogs
          </NavLink>
        </nav>
        <footer className="fixed bottom-0 bg-[#1a1a1a] py-6 text-center w-70 border-t border-[#E53935]/50 ">
          <button
            onClick={handleLogout}
            className="bg-[#E53935] px-17 py-2 rounded-[8px] text-white text-md cursor-pointer transition-all duration-300 "
          >
            <i className="fa-solid fa-arrow-right-from-bracket pr-2"></i>
            Log Out
          </button>
        </footer>
      </aside>

      {/* Main Content */}
      <main className="ml-70 flex-1 border-l bg-black border-[#E53935]/50">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
