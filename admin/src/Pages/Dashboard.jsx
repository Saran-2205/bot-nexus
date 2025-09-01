import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { useQuery } from "@tanstack/react-query";
import LoadingSpinner from "../Components/LoadingSpinner.jsx";
import axios from "axios";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";

const Dashboard = () => {

  const API = import.meta.env.VITE_API_URL;

  const token = localStorage.getItem("authToken");

  const { data, isLoading, isError } = useQuery({
    queryKey: ["dashboardStats", token], // token as part of key to refetch if token changes
    queryFn: async () => {
      if (!token) throw new Error("No auth token found");
      try {
        const res = await axios.get(`${API}/api/admin/dashboard/get`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (res.status !== 200) {
          throw new Error(res.data.message || "Failed to fetch dashboard stats");
        }
        return res.data;
      } catch (error) {
        throw new Error(error?.response?.data?.message || error.message || "Unknown error occurred");
      }
    }, // only run if token exists
  });



  const recentActivity = [
    { action: "Project Falcon updated", status: "completed", time: "2 days ago" },
    { action: "New blog 'Kriya Highlights' published", status: "published", time: "1 day ago" },
    { action: "Hovercraft marked as in progress", status: "in-progress", time: "5 hours ago" },
  ];

  if (isLoading) {
    return (
      <div className="h-screen flex justify-center items-center text-white">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (isError) {
    toast.error("Failed to load dashboard stats");
    return (
      <div className="h-screen flex justify-center items-center">
        <p className="text-white text-center text-xl">Error loading dashboard stats</p>
      </div>
    );
  }

  const stats = [
    {
      title: "Projects",
      count: data.projects,
      icon: "fas fa-robot",
      path: "projects",
      color: "text-[#E93535]"
    },
    {
      title: "Competitions",
      count: data.competitions,
      icon: "fas fa-trophy",
      path: "competitions",
      color: "text-[#2196F3]"
    },
    {
      title: "Team Members",
      count: data.teamMembers,
      icon: "fas fa-users",
      path: "team",
      color: "text-[#4CAF50]"
    },
    {
      title: "Blogs",
      count: data.blogs,
      icon: "fas fa-pen-nib",
      path: "blog",
      color: "text-[#FFC107]"
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="bg-black text-white font-['Orbitron'] mb-10" // Added overflow-hidden here
    >
      {/* Header */}
      <div className="pt-8 pb-6 px-6 text-center">
        <motion.h1
          initial={{ y: -20 }}
          animate={{ y: 0 }}
          className="text-4xl md:text-5xl font-bold text-[#E93535] mb-2"
        >
          Welcome to <span className="text-white">BotNexus HQ</span>
        </motion.h1>
        <p className="text-gray-400">Admin Dashboard </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8 px-6">
        {stats.map((item, idx) => (
          <StatCard key={idx} {...item} index={idx} />
        ))}
      </div>

      {/* Recent Activity */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="bg-[#1a1a2e]/90 p-6 mx-6 rounded-2xl border border-[#E93535]/30 shadow-lg backdrop-blur-sm"
      >
        <h2 className="text-2xl font-bold text-[#E93535] mb-6 flex items-center">
          <span className="w-4 h-4 bg-[#E93535] rounded-full mr-3 animate-pulse"></span>
          Recent Activity
        </h2>
        <ul className="space-y-4">
          {recentActivity.map((activity, idx) => (
            <motion.li
              key={idx}
              initial={{ x: -20 }}
              animate={{ x: 0 }}
              transition={{ delay: 0.1 * idx }}
              className="flex items-start border-b border-[#E93535]/10 pb-4 last:border-0"
            >
              <div className={`mr-3 mt-1 ${activity.status === 'completed' ? 'text-green-500' :
                activity.status === 'published' ? 'text-blue-400' :
                  'text-yellow-500'
                }`}>
                {activity.status === 'completed' ? '✅' :
                  activity.status === 'published' ? '📝' : '⚙️'}
              </div>
              <div>
                <p className="text-white">{activity.action}</p>
                <p className="text-sm text-gray-400">{activity.time}</p>
              </div>
            </motion.li>
          ))}
        </ul>
      </motion.div>
    </motion.div>
  );
};

const StatCard = ({ title, count, icon, path, color, index }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.1 * index }}
    whileHover={{ y: -5 }}
  >
    <Link to={`/${path}`} className="group block">
      <div className="bg-[#1a1a2e]/80 p-6 rounded-2xl text-center border border-[#E93535]/20 hover:border-[#2196F3]/50 transition-all duration-300 hover:shadow-[0_0_20px_rgba(33,150,243,0.2)]">
        <div className={`${color} text-4xl mb-4 group-hover:text-[#2196F3] transition-colors`}>
          <i className={icon} />
        </div>
        <h3 className="text-lg font-semibold text-white mb-1">{title}</h3>
        <p className={`text-3xl font-bold ${color} group-hover:text-[#2196F3] transition-colors`}>
          {count}
        </p>
      </div>
    </Link>
  </motion.div>
);

export default Dashboard;