import { useState } from "react";
import {
  FiSearch,
  FiChevronDown,
  FiCheck,
  FiClock,
  FiArrowRight,
} from "react-icons/fi";
import { FaRobot, FaCode, FaFlask, FaTrophy } from "react-icons/fa";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import LoadingSpinner from "../../Components/LoadingSpinner";

const Project = () => {
  const navigate = useNavigate();
  // State management
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("All");
  const [sortOption, setSortOption] = useState("Latest");
  const [showSortDropdown, setShowSortDropdown] = useState(false);

  // Constants matching homepage
  const filters = ["All", "Ongoing", "Completed", "Upcoming"];
  const sortOptions = ["Latest", "Oldest", "Priority"];

  // Data fetching (matches homepage pattern)
  const fetchProjects = async () => {
    const res = await axios.get("/api/projects");
    return res.data.projects;
  };

  const {
    data: projects = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["projects"],
    queryFn: fetchProjects,
  });

  // Filter and sort logic
  const filteredProjects = projects.filter((project) => {
    const matchesSearch = project.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesFilter =
      activeFilter === "All" ||
      project.status?.toLowerCase() === activeFilter.toLowerCase();
    return matchesSearch && matchesFilter;
  });

  const sortedProjects = [...filteredProjects].sort((a, b) => {
    switch (sortOption) {
      case "Priority":
        return (b.priority || 0) - (a.priority || 0);
      case "Oldest":
        return new Date(a.createdAt) - new Date(b.createdAt);
      default:
        return new Date(b.createdAt) - new Date(a.createdAt);
    }
  });

  // Status styling matching homepage
  const statusStyles = {
    ongoing: "bg-[#E53935]/20 text-[#E53935] border-[#E53935]/50",
    completed: "bg-green-500/20 text-green-500 border-green-500/50",
    upcoming: "bg-purple-500/20 text-purple-500 border-purple-500/50",
  };

  // Loading state (matches homepage)
  if (isLoading) {
    return (
      <div className="pt-[67px] px-4 sm:px-8 md:px-28 min-h-screen bg-black text-white flex items-center justify-center">
        <LoadingSpinner/>
      </div>
    );
  }

  // Error state (matches homepage)
  if (error) {
    return (
      <div className="pt-[67px] min-h-screen bg-black text-white px-6 py-16 text-center">
        <div className="container mx-auto">
          <h2 className="font-['Orbitron'] text-3xl font-bold mb-4">
            Project <span className="text-[#E53935]">Nexus</span>
          </h2>
          <p className="font-['Roboto'] text-gray-400 mb-8 max-w-2xl mx-auto">
            Error loading projects: {error.message}
          </p>
          <button
            onClick={() => window.location.reload()}
            className="bg-[#E53935] hover:bg-[#2196F3] text-black hover:text-white px-6 py-3 rounded font-['Orbitron'] transition-all duration-300"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  const formatMonthYear = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", { day:"numeric",month: "long", year: "numeric" });
  };

  return (
    <div className="pt-[67px] px-4 sm:px-8 md:px-28 min-h-screen bg-black text-white">
      {/* Hero Section */}
      <section className="relative pt-12 md:pt-16 px-4 md:px-6">
        <div className="container mx-auto">
          <div className="text-center mb-8 md:mb-12">
            <h2 className="font-['Orbitron'] text-2xl md:text-3xl lg:text-4xl font-bold mb-3 md:mb-4">
              Project <span className="text-[#E53935]">Nexus</span>
            </h2>
            <p className="font-['Roboto'] text-gray-400 max-w-3xl mx-auto text-sm md:text-base px-2">
              Explore our cutting-edge robotics and AI projects pushing the
              boundaries of innovation.
            </p>
          </div>

          {/* Search & Filter Section */}
          <div className="mb-8 md:mb-12 bg-[#12121A] p-4 md:p-6 rounded-xl border border-[#E53935]/30 shadow-lg">
            <div className="flex flex-col md:flex-row gap-4 items-stretch md:items-center justify-between">
              {/* Search Input */}
              <div className="relative w-full md:flex-1 max-w-xl">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiSearch className="text-gray-500" />
                </div>
                <input
                  type="text"
                  className="bg-[#0A0A0F] w-full pl-10 pr-4 py-2.5 rounded-lg border border-[#E53935]/30 focus:border-[#E53935] focus:outline-none focus:ring-1 focus:ring-[#E53935]/30 text-sm font-['Roboto'] placeholder-gray-500"
                  placeholder="Search projects..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              {/* Filter & Sort */}
              <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
                <div className="flex flex-wrap gap-2">
                  {filters.map((filter) => (
                    <button
                      key={filter}
                      onClick={() => setActiveFilter(filter)}
                      className={`px-3 py-1.5 rounded-lg text-xs md:text-sm font-['Orbitron'] transition-all duration-200 flex-1 sm:flex-none ${
                        activeFilter === filter
                          ? "bg-[#E53935] text-black font-medium"
                          : "bg-[#1A1A25] text-gray-300 hover:bg-[#252535]"
                      }`}
                    >
                      {filter}
                    </button>
                  ))}
                </div>

                <div className="relative">
                  <button
                    onClick={() => setShowSortDropdown(!showSortDropdown)}
                    className="flex items-center gap-2 px-3 py-1.5 bg-[#1A1A25] rounded-lg text-xs md:text-sm font-['Orbitron'] hover:bg-[#252535] transition-all w-full sm:w-auto justify-center"
                  >
                    <FaCode className="text-[#E53935] text-sm" />
                    {sortOption}
                    <FiChevronDown
                      className={`transition-transform ${
                        showSortDropdown ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  {showSortDropdown && (
                    <div className="absolute right-0 mt-2 w-40 bg-[#1A1A25] border border-[#E53935]/30 rounded-lg shadow-lg z-10 overflow-hidden">
                      {sortOptions.map((option) => (
                        <button
                          key={option}
                          onClick={() => {
                            setSortOption(option);
                            setShowSortDropdown(false);
                          }}
                          className={`w-full text-left px-3 py-2 text-sm font-['Roboto'] flex items-center gap-2 hover:bg-[#252535] ${
                            sortOption === option
                              ? "text-[#2196F3]"
                              : "text-gray-300"
                          }`}
                        >
                          {sortOption === option && (
                            <FiCheck className="text-[#2196F3]" />
                          )}
                          {option}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="pb-12 md:pb-16 px-4 md:px-6">
        <div className="container mx-auto">
          {sortedProjects.length === 0 ? (
            <div className="text-center py-12">
              <FaRobot className="mx-auto text-4xl text-[#E53935] mb-4" />
              <h3 className="font-['Orbitron'] text-xl text-[#E53935] mb-2">
                No Projects Found
              </h3>
              <p className="font-['Roboto'] text-gray-400 mb-6 max-w-md mx-auto">
                Try adjusting your search or filter criteria
              </p>
              <button
                onClick={() => {
                  setSearchQuery("");
                  setActiveFilter("All");
                }}
                className="bg-[#E53935] hover:bg-[#2196F3] text-black hover:text-white px-5 py-2 rounded-lg font-['Orbitron'] text-sm transition-all cursor-pointer"
              >
                Reset Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
              {sortedProjects.map((project) => (
                <div
                  onClick={() => navigate(`/projects/${project.slug}`)}
                  key={project._id}
                  className="group bg-[#0d0d1a]/80 border border-[#E53935]/50 rounded-xl overflow-hidden hover:border-[#2196F3]/60 hover:shadow-[0_0_20px_rgba(33,150,243,0.2)] transition-all duration-300 cursor-pointer"
                >
                  {/* Project Image */}
                  <div className="relative h-40 md:h-48 overflow-hidden">
                    <img
                      src={project.img || "/default-project.jpg"}
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                    <div className="absolute top-3 right-3">
                      <span className="bg-[#1A1A25]/90 backdrop-blur-sm text-xs font-['Roboto'] px-2 py-1 rounded-full border border-[#E53935]/30">
                        {project.category}
                      </span>
                    </div>
                  </div>

                  {/* Project Content */}
                  <div className="p-4 md:p-5">
                    <div className="flex justify-between items-start mb-3">
                      <h3 className="font-['Orbitron'] text-base md:text-lg font-bold text-white group-hover:text-[#2196F3] transition-colors line-clamp-1">
                        {project.title}
                      </h3>
                      <div className="flex items-center gap-1 flex-shrink-0">
                        <FiClock className="text-[#E53935] text-xs" />
                        <span className="text-xs font-['Roboto'] text-gray-400">
                          {formatMonthYear(project.createdAt)}
                        </span>
                      </div>
                    </div>

                    <p className="font-['Roboto'] text-gray-400 text-sm mb-3 md:mb-4 line-clamp-2">
                      {project.shortDesc}
                    </p>

                    {/* Technologies */}
                    {project.technologies?.length > 0 && (
                      <div className="flex flex-wrap gap-1 md:gap-2 mb-3 md:mb-4">
                        {project.technologies.slice(0, 3).map((tech, idx) => (
                          <span
                            key={idx}
                            className="text-xs px-2 py-1 bg-[#1A1A25] rounded-full border border-gray-800 text-gray-300 font-['Roboto']"
                          >
                            {tech}
                          </span>
                        ))}
                        {project.technologies.length > 3 && (
                          <span className="text-xs text-gray-500 font-['Roboto'] self-center">
                            +{project.technologies.length - 3}
                          </span>
                        )}
                      </div>
                    )}

                    {/* Footer */}
                    <div className="flex justify-between items-center pt-3 border-t border-gray-800">
                      <div className="flex -space-x-2">
                        {project.team?.slice(0, 3).map((member, idx) => (
                          <div
                            key={idx}
                            className="w-6 h-6 md:w-7 md:h-7 rounded-full border-2 border-[#0d0d1a] overflow-hidden"
                            title={member.name}
                          >
                            {member.image ? (
                              <img
                                src={member.image}
                                alt={member.name}
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <div className="w-full h-full bg-[#1A1A25] flex items-center justify-center text-white text-xs">
                                {member.name.charAt(0)}
                              </div>
                            )}
                          </div>
                        ))}
                        {project.team?.length > 3 && (
                          <div className="w-6 h-6 md:w-7 md:h-7 rounded-full bg-[#1A1A25] border-2 border-[#0d0d1a] flex items-center justify-center text-xs text-gray-400">
                            +{project.team.length - 3}
                          </div>
                        )}
                      </div>

                      <div className="flex items-center gap-2 cursor-pointer">
                        <span
                          className={`text-xs px-2.5 py-1 rounded-full border ${
                            statusStyles[project.status?.toLowerCase()] ||
                            "bg-blue-500/20 text-blue-500 border-blue-500/50"
                          } font-['Roboto']`}
                        >
                          {project.status?.charAt(0).toUpperCase() +
                            project.status?.slice(1)}
                        </span>
                        <button className="w-6 h-6 rounded-full flex items-center justify-center bg-[#1A1A25] border border-gray-800 group-hover:bg-[#2196F3]/20 group-hover:border-[#2196F3]/30 transition-all cursor-pointer">
                          <FiArrowRight className="text-xs text-gray-400 group-hover:text-[#2196F3]" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Project;