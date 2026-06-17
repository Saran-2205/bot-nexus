import React, { useState, useEffect } from "react";
import {
  FiSearch,
  FiChevronDown,
  FiCalendar,
  FiMapPin,
  FiAward,
  FiArrowRight,
  FiCheck,
  FiMenu,
  FiX
} from "react-icons/fi";
import { FaTrophy, FaUsers, FaCode } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import LoadingSpinner from "../../Components/LoadingSpinner.jsx";

const Competition = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("All");
  const [sortOption, setSortOption] = useState("Latest");
  const [showSortDropdown, setShowSortDropdown] = useState(false);
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(6);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const API = import.meta.env.VITE_API_URL;

  const fetchProjects = async () => {
    const res = await axios.get(`${API}/api/competitions`);
    return res.data.competitions;
  };

  const {
    data: competitions = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["competitions"],
    queryFn: fetchProjects,
  });

  const filters = ["All"];
  const sortOptions = ["Latest", "Oldest"];
  // Filter competitions
  const filteredCompetitions = competitions.filter((competition) => {
    const matchesSearch =
      competition.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      competition.shortDesc.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = activeFilter === "All";
    return matchesSearch && matchesFilter;
  });

  // Sort competitions
  const sortedCompetitions = [...filteredCompetitions].sort((a, b) => {
    switch (sortOption) {
      case "Oldest":
        return new Date(a.date) - new Date(b.date);
      default:
        return new Date(b.date) - new Date(a.date);
    }
  });

  // Pagination
  const total = sortedCompetitions.length;
  const totalPages = Math.ceil(total / perPage);
  const paginated = sortedCompetitions.slice(
    (page - 1) * perPage,
    page * perPage
  );

  useEffect(() => {
    setPage(1);
  }, [searchQuery, activeFilter, sortOption, perPage]);

  if (isLoading) {
    return (
      <div className="pt-[67px] mx-4 md:mx-28 min-h-screen bg-black text-white flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  // Error state (matches homepage)
  if (error) {
    return (
      <div className="pt-[67px] min-h-screen bg-black text-white px-6 py-16 text-center">
        <div className="container mx-auto">
          <h2 className="font-['Orbitron'] text-3xl font-bold mb-4">
            Competition <span className="text-[#E53935]">Arena</span>
          </h2>
          <p className="font-['Roboto'] text-gray-400 mb-8 max-w-2xl mx-auto">
            Error loading competitions: {error.message}
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

  const placementStyles = {
    "1st": "bg-gradient-to-br from-yellow-400 to-yellow-600",
    "2nd": "bg-gradient-to-br from-gray-300 to-gray-500",
    "3rd": "bg-gradient-to-br from-amber-600 to-amber-800",
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  return (
    <div className="min-h-screen bg-black px-4 md:px-28 text-white relative">
      <div>
        <title> Competition Arena | Bot Nexus</title>
        <meta name="description" content="Showcasing our achievements in robotics competitions" />
      </div>
      {/* Mobile Filter Toggle */}
      {isMobile && (
        <div className="top-20 right-4 z-40">
          <button
            onClick={() => setMobileFiltersOpen(!mobileFiltersOpen)}
            className="flex items-center gap-2 px-4 py-2 bg-[#E53935] text-black rounded-lg font-['Orbitron'] text-sm"
          >
            {mobileFiltersOpen ? <FiX size={16} /> : <FiMenu size={16} />}
            Filters
          </button>
        </div>
      )}

      <div className="relative container mx-auto px-0 md:px-6 py-24 md:py-32">
        {/* Header */}
        <div className="mb-8 md:mb-10 justify-center text-center">
          <h1 className="font-['Orbitron'] text-2xl md:text-4xl font-bold mb-4">
            Competition <span className="text-[#E53935]">Arena</span>
          </h1>
          <p className="font-['Roboto'] text-gray-300 text-sm md:text-base">
            Showcasing our achievements in robotics competitions with gold-medal
            performances
          </p>
        </div>

        {/* Search & Filter */}
        <div className={`mb-6 md:mb-8 bg-[#12121A] p-4 md:p-6 rounded-xl border border-[#E53935]/30 shadow-lg `}>
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            {/* Search Input */}
            <div className="relative w-full md:w-auto md:flex-1 max-w-xl">
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
            <div className="flex flex-wrap gap-3 w-full md:w-auto justify-center">
              {filters.map((filter,i) => (
                <button
                  key={i}
                  onClick={() => setActiveFilter(filter)}
                  className={`px-3 py-1.5 rounded-lg text-xs md:text-sm font-['Orbitron'] transition-all duration-200 cursor-pointer ${activeFilter === filter
                      ? "bg-[#E53935] text-black font-medium"
                      : "bg-[#1A1A25] text-gray-300 hover:bg-[#252535]"
                    }`}
                >
                  {filter}
                </button>
              ))}

              <div className="relative">
                <button
                  onClick={() => setShowSortDropdown(!showSortDropdown)}
                  className="flex items-center gap-2 px-3 py-1.5 bg-[#1A1A25] rounded-lg text-xs md:text-sm font-['Orbitron'] cursor-pointer hover:bg-[#252535] transition-all"
                >
                  <FaCode className="text-[#E53935] text-sm" />
                  {sortOption}
                  <FiChevronDown
                    className={`transition-transform ${showSortDropdown ? "rotate-180" : ""
                      }`}
                  />
                </button>

                {showSortDropdown && (
                  <div className="absolute right-0 mt-2 w-40 bg-[#1A1A25] border border-[#E53935]/30 rounded-lg shadow-lg z-10 overflow-hidden">
                    {sortOptions.map((option,i) => (
                      <button
                        key={i}
                        onClick={() => {
                          setSortOption(option);
                          setShowSortDropdown(false);
                        }}
                        className={`w-full text-left px-3 py-2 text-sm font-['Roboto'] flex items-center gap-2 hover:bg-[#252535] cursor-pointer ${sortOption === option
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

        {/* Competition Grid */}
        {paginated.length > 0 ? (
          <>
            <div className="space-y-4 md:space-y-6">
              {paginated.map((competition,i) => (
                <div
                  key={i}
                  className="backdrop-blur-md bg-[#1a1a2e]/50 border border-[#E53935]/30 rounded-xl overflow-hidden transition-all duration-300 hover:border-[#E53935]/50 group cursor-pointer flex flex-col md:flex-row"
                  onClick={() => navigate(`/competitions/${competition.slug}`)}
                >
                  {/* Hero Image - Side */}
                  <div className="relative md:w-1/3 h-48 md:h-auto">
                    <SafeImg
                      src={competition.heroImg}
                      alt={competition.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-[#0f0f1c] to-transparent opacity-70 md:hidden" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0f0f1c] via-transparent to-transparent opacity-70 md:bg-gradient-to-r" />

                    {/* Placement Badge */}
                    {competition.place && (
                      <div
                        className={`absolute top-4 left-4 w-10 h-10 flex items-center justify-center rounded-full ${placementStyles[competition.place.split(" ")[0]] ||
                          "bg-[#E53935]"
                          } shadow-lg z-10`}
                      >
                        <span className="font-['Orbitron'] text-xs font-bold text-black">
                          {competition.place.split(" ")[0]}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Content - Main */}
                  <div className="p-4 md:p-6 flex-1 flex flex-col">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="font-['Orbitron'] text-xl font-bold mb-1 group-hover:text-[#E53935] transition-colors">
                          {competition.title}
                        </h3>
                        <div className="flex flex-col md:flex-row md:items-center text-sm text-gray-400 gap-1 md:gap-0">
                          <div className="flex items-center">
                            <FiCalendar className="text-[#E53935] mr-2" />
                            {formatDate(competition.date)}
                          </div>
                          <div className="flex items-center">
                            <FiMapPin className="text-[#E53935] ml-0 md:ml-4 mr-2" />
                            {competition.venue}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex-1">
                      <p className="font-['Roboto'] text-gray-300 text-sm mb-4">
                        {competition.shortDesc}
                      </p>

                      {/* Stats - Horizontal */}
                      {competition.stats?.length > 0 && (
                        <div className="flex flex-wrap gap-2 mb-4">
                          {competition.stats.map((stat, idx) => (
                            <div
                              key={idx}
                              className="bg-[#1a1a2e]/70 p-2 rounded border border-[#E53935]/10 flex items-center text-xs md:text-sm"
                            >
                              <div className="text-[#E53935] mr-1 md:mr-2">
                                {stat.key}:
                              </div>
                              <div className="text-white font-medium">
                                {stat.value}
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Footer */}
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center pt-3 border-t border-gray-800 gap-3">
                      {/* Team Members */}
                      <div className="flex items-center">
                        <FaUsers className="text-[#E53935] mr-2" />
                        <div className="flex -space-x-2">
                          {competition.teamMembers
                            ?.slice(0, 5)
                            .map((member, idx) => (
                              <div
                                key={idx}
                                className="w-6 h-6 md:w-8 md:h-8 rounded-full border-2 border-[#0f0f1c] overflow-hidden bg-[#1a1a2e] flex items-center justify-center text-white text-xs"
                                title={member.name}
                              >
                                {member.name?.charAt(0) || "T"}
                              </div>
                            ))}
                          {competition.teamMembers?.length > 5 && (
                            <div className="w-6 h-6 md:w-8 md:h-8 rounded-full bg-[#1a1a2e] border-2 border-[#0f0f1c] flex items-center justify-center text-xs text-gray-400">
                              +{competition.teamMembers.length - 5}
                            </div>
                          )}
                        </div>
                      </div>

                      {/* CTA */}
                      <button className="flex items-center gap-2 px-4 py-2 bg-[#1a1a2e] border border-gray-800 rounded-full text-sm text-gray-300 group-hover:bg-[#E53935]/10 group-hover:border-[#E53935]/30 group-hover:text-[#E53935] cursor-pointer transition-all">
                        View Details
                        <FiArrowRight className="text-sm" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination */}
            <div className="mt-8 md:mt-12 flex flex-col md:flex-row justify-between items-center gap-4">
              <div className="flex items-center">
                <span className="text-sm text-gray-400 mr-3 hidden md:block">
                  Items per page:
                </span>
                <div className="relative">
                  <select
                    className="appearance-none bg-[#1a1a2e] border border-[#E53935]/30 rounded-lg py-1 pl-3 pr-8 text-sm text-white focus:outline-none cursor-pointer"
                    value={perPage}
                    onChange={(e) => setPerPage(Number(e.target.value))}
                  >
                    {[6, 9, 12].map((n,i) => (
                      <option key={i} value={n}>
                        {n}
                      </option>
                    ))}
                  </select>
                  <FiChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 text-[#E53935] text-xs" />
                </div>
                <span className="text-sm text-gray-400 ml-4 hidden md:inline">
                  Showing {(page - 1) * perPage + 1}-
                  {Math.min(page * perPage, total)} of {total}
                </span>
              </div>

              <div className="flex flex-col items-center md:flex-row gap-2 w-full md:w-auto">
                <span className="text-sm text-gray-400 md:hidden w-full text-center mb-2">
                  Page {page} of {totalPages}
                </span>

                <div className="flex items-center justify-center w-full md:w-auto">
                  <button
                    onClick={() => setPage((p) => Math.max(p - 1, 1))}
                    disabled={page === 1}
                    className={`w-9 h-9 rounded-lg flex items-center justify-center mr-2 ${page === 1
                        ? "bg-[#1a1a2e]/50 text-gray-500 cursor-not-allowed"
                        : "bg-[#1a1a2e] hover:bg-[#E53935]/10"
                      }`}
                  >
                    <FiChevronDown className="transform rotate-90 text-xs" />
                  </button>

                  <div className="flex overflow-x-auto max-w-[200px] md:max-w-none">
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                      (n,i) => (
                        <button
                          key={i}
                          onClick={() => setPage(n)}
                          className={`w-9 h-9 rounded-lg mx-1 text-sm flex-shrink-0 ${page === n
                              ? "bg-[#E53935] text-black font-medium"
                              : "bg-[#1a1a2e] hover:bg-[#E53935]/10"
                            }`}
                        >
                          {n}
                        </button>
                      )
                    )}
                  </div>

                  <button
                    onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
                    disabled={page === totalPages}
                    className={`w-9 h-9 rounded-lg flex items-center justify-center ml-2 ${page === totalPages
                        ? "bg-[#1a1a2e]/50 text-gray-500 cursor-not-allowed"
                        : "bg-[#1a1a2e] hover:bg-[#E53935]/10"
                      }`}
                  >
                    <FiChevronDown className="transform -rotate-90 text-xs" />
                  </button>
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className="backdrop-blur-md bg-[#1a1a2e]/50 border border-[#E53935]/30 rounded-xl p-8 md:p-12 text-center">
            <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-[#1a1a2e] border border-[#E53935]/30 flex items-center justify-center">
              <FaTrophy className="text-[#E53935] text-2xl" />
            </div>
            <h3 className="font-['Orbitron'] text-xl font-bold mb-3">
              No Competitions Found
            </h3>
            <p className="font-['Roboto'] text-gray-400 mb-6 max-w-md mx-auto">
              Try adjusting your search or filter criteria
            </p>
            <button
              onClick={() => {
                setSearchQuery("");
                setActiveFilter("All");
                setSortOption("Latest");
              }}
              className="bg-[#E53935]/10 border border-[#E53935]/30 px-6 py-2 rounded-full text-white hover:bg-[#E53935]/20 transition-all"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Competition;