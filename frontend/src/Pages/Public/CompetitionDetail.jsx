import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import LoadingSpinner from "../../Components/LoadingSpinner";

const EmptyState = ({ icon, title, description }) => (
  <div className="bg-[#1A1A25] rounded-xl p-6 border border-gray-800 text-center">
    <div className="text-4xl mb-3 text-gray-500">
      <i className={`fas fa-${icon}`}></i>
    </div>
    <h3 className="text-xl font-medium text-gray-400 mb-2">{title}</h3>
    <p className="text-gray-500">{description}</p>
  </div>
);

// Format date utility
function fmt(dateStr) {
  if (!dateStr) return "N/A";
  const d = new Date(dateStr);
  return d.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

const CompetitionDetail = () => {
  const [expandedImg, setExpandedImg] = useState(null);
  const { param } = useParams();
  const [competition, setCompetition] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  // Handle window resize to detect mobile devices
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleScroll = (direction) => {
    const itemsPerView = isMobile ? 1 : 3;
    const newIndex = currentIndex + direction;
    // Prevent scrolling beyond gallery bounds
    if (newIndex >= 0 && newIndex <= (competition?.gallery?.length || 0) - itemsPerView) {
      setCurrentIndex(newIndex);
    }
  };

  // Touch handling for gallery swipe
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);

  const handleTouchStart = (e) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (touchStart - touchEnd > 50) {
      // Left swipe
      handleScroll(1);
    } else if (touchEnd - touchStart > 50) {
      // Right swipe
      handleScroll(-1);
    }
  };

  useEffect(() => {
    const fetchCompetition = async () => {
      try {
        const response = await axios.get(`/api/competitions/${param}`);
        if (!response.data?.competition) {
          throw new Error("Competition data not found");
        }
        setCompetition(response.data.competition);
      } catch (error) {
        setError(
          error.response?.data?.error ||
            error.message ||
            "Failed to fetch competition"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchCompetition();
  }, [param]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black">
        <div>
          <LoadingSpinner />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black">
        <div className="error-message text-red-500 p-4 bg-[#1A1A25] rounded-lg">
          {error}
        </div>
      </div>
    );
  }

  if (!competition) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-white">
        <EmptyState
          icon="exclamation-triangle"
          title="Competition Not Found"
          description="The competition you're looking for doesn't exist or may have been removed."
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen py-17 bg-black">
      {/* Header */}
      <header className="bg-black/20 backdrop-blur-sm border-b border-[#E53935]/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
          <div className="flex items-center justify-between">
            <button
              className="flex items-center text-black text-sm sm:text-base font-medium bg-[#E53935] rounded-full p-2 sm:p-2 transition-colors cursor-pointer"
              onClick={() => window.history.back()}
            >
              <i className="fas fa-arrow-left mr-1 sm:mr-2"></i>
              <span className="hidden sm:inline">Back to Competitions Page</span>
              <span className="sm:hidden">Back</span>
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative h-64 sm:h-96 overflow-hidden">
        {competition.heroImg ? (
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: `url('${competition.heroImg}')`,
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent"></div>
          </div>
        ) : (
          <div className="absolute inset-0 bg-black">
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent"></div>
          </div>
        )}
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 h-full flex items-center">
          <div className="text-white max-w-2xl">
            <div className="flex flex-wrap gap-2 mb-4">
              {competition.category && (
                <span className="bg-purple-600 text-white px-3 py-1 rounded-full text-xs sm:text-sm font-medium">
                  {competition.category}
                </span>
              )}
              {competition.place && (
                <span className="bg-yellow-500 text-black px-3 py-1 rounded-full text-xs sm:text-sm font-bold">
                  {competition.place}
                </span>
              )}
            </div>
            <h1 className="text-3xl sm:text-5xl font-['Orbitron'] mb-4 bg-white bg-clip-text text-transparent">
              {competition.title || "Untitled Competition"}
            </h1>
            <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-6 text-base sm:text-lg text-white space-y-2 sm:space-y-0">
              {competition.date && (
                <div className="flex items-center">
                  <i className="fas fa-calendar mr-2 text-cyan-400"></i>
                  {fmt(competition.date)}
                </div>
              )}
              {competition.venue && (
                <div className="flex items-center">
                  <i className="fas fa-map-marker-alt mr-2 text-[#E53935]"></i>
                  {competition.venue}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        {/* Competition Overview */}
        <section className="mb-12 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl font-['Orbitron'] text-white mb-6 sm:mb-8">
            Competition Overview
          </h2>
          <div className="grid lg:grid-cols-3 gap-6 sm:gap-8">
            <div className="lg:col-span-2">
              <div className="bg-[#12121A] backdrop-blur-sm rounded-2xl p-6 sm:p-8 border border-[#E53935]/20">
                {!competition.overview ||
                competition.overview.length === 0 ||
                (competition.overview.length === 1 &&
                  competition.overview[0].trim() === "") ? (
                  <EmptyState
                    icon="info-circle"
                    title="No Overview Available"
                    description="This competition doesn't have an overview description yet."
                  />
                ) : (
                  competition.overview.map(
                    (paragraph, index) =>
                      paragraph.trim() !== "" && (
                        <p
                          key={index}
                          className="text-white text-base sm:text-lg leading-relaxed mb-4 sm:mb-6"
                        >
                          {paragraph}
                        </p>
                      )
                  )
                )}
              </div>
            </div>
            <div className="space-y-4 sm:space-y-6">
              {competition.stats?.length > 0 ? (
                <div className="bg-[#12121A] backdrop-blur-sm rounded-2xl p-4 sm:p-6 border border-[#E53935]/20">
                  <h3 className="text-lg sm:text-xl font-['Orbitron'] text-white mb-3 sm:mb-4">
                    Key Statistics
                  </h3>
                  <div className="space-y-2 sm:space-y-3">
                    {competition.stats.map((stat, index) => (
                      <div key={index} className="flex justify-between">
                        <span className="text-gray-400 text-sm sm:text-base">{stat.key}</span>
                        <span className="text-white font-bold text-sm sm:text-base">
                          {stat.value}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="bg-[#12121A] backdrop-blur-sm rounded-2xl p-6 border border-[#E53935]/20">
                  <EmptyState
                    icon="chart-bar"
                    title="No Statistics"
                    description="No statistics available for this competition."
                  />
                </div>
              )}

              {competition.place ? (
                <div className="bg-[#12121A] backdrop-blur-sm rounded-2xl p-4 sm:p-6 border border-[#E53935]/20">
                  <h3 className="text-lg sm:text-xl font-['Orbitron'] text-white mb-3 sm:mb-4">
                    Achievement
                  </h3>
                  <div className="text-center">
                    <div
                      className={`w-12 h-12 sm:w-16 sm:h-16 rounded-full flex items-center justify-center mx-auto mb-3 ${
                        competition.place.toLowerCase().includes("1st") ||
                        competition.place.toLowerCase().includes("winner") ||
                        competition.place
                          .toLowerCase()
                          .includes("gold medal") ||
                        competition.place.toLowerCase().includes("champion")
                          ? "bg-gradient-to-br from-yellow-400 to-yellow-600"
                          : competition.place.toLowerCase().includes("2nd")
                          ? "bg-gradient-to-br from-gray-300 to-gray-400"
                          : competition.place.toLowerCase().includes("3rd")
                          ? "bg-gradient-to-br from-amber-600 to-amber-800"
                          : "bg-gradient-to-br from-purple-500 to-purple-700"
                      }`}
                    >
                      <i
                        className={`fas ${
                          competition.place.toLowerCase().includes("1st") ||
                          competition.place.toLowerCase().includes("winner") ||
                          competition.place.toLowerCase().includes("champion")
                            ? "fa-trophy"
                            : "fa-award"
                        } text-lg sm:text-2xl text-white`}
                      ></i>
                    </div>
                    <p
                      className={`font-bold text-base sm:text-lg ${
                        competition.place.toLowerCase().includes("1st") ||
                        competition.place.toLowerCase().includes("winner") ||
                        competition.place.toLowerCase().includes("champion")
                          ? "text-yellow-400"
                          : competition.place.toLowerCase().includes("2nd")
                          ? "text-gray-300"
                          : competition.place.toLowerCase().includes("3rd")
                          ? "text-amber-500"
                          : "text-white"
                      }`}
                    >
                      {competition.place}
                    </p>
                    {!competition.place.toLowerCase().includes("1st") &&
                      !competition.place.toLowerCase().includes("winner") &&
                      !competition.place.toLowerCase().includes("champion") && (
                        <p className="text-gray-300 text-xs sm:text-sm">
                          Valuable experience gained
                        </p>
                      )}
                  </div>
                </div>
              ) : (
                <div className="bg-[#12121A] backdrop-blur-sm rounded-2xl p-6 border border-[#E53935]/20">
                  <EmptyState
                    icon="medal"
                    title="No Places"
                    description="Prize information not available for this competition."
                  />
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Technical Specifications */}

        <section className="mb-12 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl font-['Orbitron'] text-white mb-6 sm:mb-8">
            Technical Specifications
          </h2>

          <div className="grid lg:grid-cols-2 gap-6 sm:gap-8">
            <div className="bg-[#12121A] backdrop-blur-sm rounded-2xl p-6 sm:p-8 border border-[#E53935]/20">
              <h3 className="text-lg sm:text-xl font-['Orbitron'] text-white mb-4 sm:mb-6">
                Robot Specifications
              </h3>
              {!competition.technicalSpecifications ||
              competition.technicalSpecifications.length === 0 ||
              (competition.technicalSpecifications.length === 1 &&
                competition.technicalSpecifications[0].trim() === "") ? (
                <EmptyState
                  icon="info-circle"
                  title="No Technical Specifications Available"
                  description="This competition doesn't have a Technical Specifications description yet."
                />
              ) : (
                <div className="space-y-3 sm:space-y-4">
                  {competition.technicalSpecifications.map((spec, index) => (
                    <div
                      key={index}
                      className="flex justify-between py-2 border-b border-[#E53935]/20"
                    >
                      <span className="text-gray-400 text-sm sm:text-base">{spec.key}</span>
                      <span className="text-white font-medium text-sm sm:text-base">
                        {spec.value}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="bg-[#12121A] backdrop-blur-sm rounded-2xl p-6 sm:p-8 border border-[#E53935]/20">
              <h3 className="text-lg sm:text-xl font-['Orbitron'] text-white mb-4 sm:mb-6">
                Key Technologies
              </h3>
              {!competition.keyTechnologies ||
              competition.keyTechnologies.length === 0 ||
              (competition.keyTechnologies.length === 1 &&
                competition.keyTechnologies[0].trim() === "") ? (
                <EmptyState
                  icon="info-circle"
                  title="No Key Technologies Available"
                  description="This project doesn't have a Key Technologies description yet."
                />
              ) : (
                <div className="space-y-3 sm:space-y-4">
                  {competition.keyTechnologies.map((tech, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-[#E53935] rounded-full mt-2 flex-shrink-0"></div>
                      <div>
                        <h4 className="text-white font-['Orbitron'] text-sm sm:text-base">
                          {tech.title}
                        </h4>
                        {tech.description && (
                          <p className="text-gray-400 text-xs sm:text-sm">
                            {tech.description}
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Team Composition */}
        {competition.teamMembers?.length > 0 ? (
          <section className="mb-12 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl font-['Orbitron'] text-white mb-6 sm:mb-8">
              Team Composition
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              {competition.teamMembers.map((member, idx) => (
                <div
                  key={idx}
                  className="bg-[#12121A] backdrop-blur-sm rounded-2xl p-4 sm:p-6 border border-[#E53935]/20 text-center"
                >
                  <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gray-400 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                    {member.image ? (
                      <img
                        src={member.image}
                        alt={member.name || "Team member"}
                        className="w-12 h-12 sm:w-16 sm:h-16 rounded-full object-cover border-2 border-gray-700"
                        loading="lazy"
                      />
                    ) : (
                      <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#E53935] flex items-center justify-center text-black font-bold border-2 border-gray-700 text-xs sm:text-base">
                        {member.name?.charAt(0) || "?"}
                      </div>
                    )}
                  </div>
                  <h3 className="text-white font-['Orbitron'] text-sm sm:text-lg mb-1">
                    {member.name || "Unnamed Member"}
                  </h3>
                  <p className="text-[#E53935] font-medium text-xs sm:text-sm mb-2">
                    {member.designation || "No role specified"}
                  </p>
                  {member.specialization && (
                    <p className="text-gray-300 text-xs">
                      {member.specialization}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </section>
        ) : (
          <section className="mb-12 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl font-['Orbitron'] text-white mb-6 sm:mb-8">
              Team Composition
            </h2>
            <EmptyState
              icon="users"
              title="No Team Members"
              description="No team members have been listed for this competition."
            />
          </section>
        )}

        {/* Media Gallery */}
        <section>
          <h2 className="text-2xl sm:text-3xl font-['Orbitron'] text-white mb-6 sm:mb-8">
            Media Gallery
          </h2>

          {competition.gallery?.length > 0 ? (
            <div className="relative">
              {/* Left Arrow - appears only when scrolled */}
              <button
                onClick={() => handleScroll(-1)}
                className={`absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-black rounded-full w-8 h-8 flex items-center justify-center transition-opacity duration-200 ${
                  currentIndex > 0
                    ? "opacity-100"
                    : "opacity-0 pointer-events-none"
                }`}
              >
                <i className="fas fa-chevron-left text-[#E53935]"></i>
              </button>

              {/* Visible Images Container */}
              <div 
                className="flex overflow-hidden"
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
              >
                <div
                  className="flex transition-transform duration-300"
                  style={{
                    transform: `translateX(-${currentIndex * (isMobile ? 100 : 33.33)}%)`,
                  }}
                >
                  {competition.gallery.map((img, idx) => (
                    <div key={idx} className={`${isMobile ? 'w-full' : 'w-1/3'} flex-shrink-0 px-2`}>
                      <div
                        className="group relative bg-black/30 rounded-2xl overflow-hidden border border-[#E53935]/20 hover:border-[#E53935]/40 transition-all cursor-pointer"
                        onClick={() => setExpandedImg(img)}
                      >
                        <div className="aspect-[4/3] overflow-hidden">
                          <img
                            src={img}
                            alt={`Gallery item ${idx + 1}`}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-[#E53935]/90 rounded-full flex items-center justify-center">
                              <i className="fas fa-expand text-white text-sm sm:text-base"></i>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <button
                onClick={() => handleScroll(1)}
                className={`absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-black rounded-full w-8 h-8 flex items-center justify-center transition-opacity duration-200 ${
                  currentIndex < competition.gallery.length - (isMobile ? 1 : 3)
                    ? "opacity-100"
                    : "opacity-0 pointer-events-none"
                }`}
              >
                <i className="fas fa-chevron-right text-[#E53935]"></i>
              </button>
            </div>
          ) : (
            <EmptyState
              icon="images"
              title="No Gallery Images"
              description="This competition doesn't have any gallery images yet."
            />
          )}
        </section>
      </div>

      {/* Expanded Image Modal */}
      {expandedImg && (
        <div
          className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setExpandedImg(null)}
        >
          <div className="relative max-w-4xl max-h-full">
            <button
              className="absolute -top-10 right-0 text-white hover:text-purple-300 transition-colors cursor-pointer"
              onClick={() => setExpandedImg(null)}
            >
              <i className="fas fa-times text-2xl"></i>
            </button>
            <img
              src={expandedImg}
              alt="Expanded view"
              className="max-w-full max-h-full object-contain rounded-2xl"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default CompetitionDetail;