import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import toast from "react-hot-toast";
import { useQuery } from "@tanstack/react-query";
import LoadingSpinner from "../../Components/LoadingSpinner";
import axios from "axios";

const Dashboard = () => {
  const location = useLocation();

  useEffect(() => {
    if (location.state?.fromLogin) {
      toast.success("Logged in Successfully");
      window.history.replaceState({}, document.title);
    }
  }, [location]);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["dashboardStats"],
    queryFn: async () => {
      try {
        const res = await axios.get("/api/admin/dashboard/get");
        if (res.status !== 200) {
          throw new Error(
            res.data.message || "Failed to fetch dashboard stats"
          );
        }
        return res.data;
      } catch (error) {
        throw new Error(error.message);
      }
    },
  });

  const recentActivity = [
    "✅ Project Falcon updated 2 days ago",
    "📝 New blog 'Kriya Highlights' published",
    "⚙️ Hovercraft marked as in progress",
  ];

  if (isLoading) {
    return (
      <div className="h-screen flex justify-center items-center text-white">
        <LoadingSpinner />
      </div>
    );
  }

  if (isError) {
    toast.error("Failed to load dashboard stats");
    return <p className="text-white text-center mt-10">Error loading stats.</p>;
  }

  const stats = [
    {
      title: "Projects",
      count: data.projects,
      icon: "fas fa-robot",
      path: "projects",
    },
    {
      title: "Competitions",
      count: data.competitions,
      icon: "fas fa-trophy",
      path: "competitions",
    },
    {
      title: "Team Members",
      count: data.teamMembers,
      icon: "fas fa-users",
      path: "team",
    },
    {
      title: "Blogs",
      count: data.blogs,
      icon: "fas fa-pen-nib",
      path: "blog",
    },
  ];

  return (
    <div className="bg-black text-white font-['Orbitron']">
      <div className="">
        <h1 className="text-4xl font-bold text-[#E93535] py-6  text-center">
          Welcome to <span className="text-white">BotNexus HQ</span> 🚀
        </h1>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6 mb-6 p-6 hover:cursor-pointer">
        {stats.map((item, idx) => (
          <StatCard key={idx} {...item} />
        ))}
      </div>

      <div className="bg-[#1a1a2e] p-6 mx-6 rounded-2xl border border-[#E93535]/50 shadow-[0_0_10px_rgba(255,0,0,0.2)]">
        <h2 className="text-2xl font-bold text-[#E93535] mb-4 border-b border-[#E93535]/50 pb-2">
          🔄 Recent Activity
        </h2>
        <ul className="space-y-3 text-gray-300 pl-4 list-disc marker:text-[#E93535]">
          {recentActivity.map((activity, idx) => (
            <li key={idx}>{activity}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

const StatCard = ({ title, count, icon, path }) => (
  <Link to={`/nexus-hq/${path}`} className="group">
    <div className="bg-[#1a1a2e] p-6 rounded-2xl text-center border border-[#E93535]/50 shadow-[0_0_10px_rgba(233,53,53,0.25)] hover:shadow-[0_0_20px_rgba(33,150,243,0.3)] hover:border-[#2196f3]/50 transition-all duration-300 ease-in-out">
      <i
        className={`${icon} text-3xl text-[#E93535] mb-4 group-hover:text-[#2196F3]`}
      />
      <h3 className="text-lg font-semibold text-white">{title}</h3>
      <p className="text-2xl font-bold text-[#E93535] group-hover:text-[#2196F3]">
        {count}
      </p>
    </div>
  </Link>
);

export default Dashboard;
