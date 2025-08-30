import axios from "axios";
import React, { useEffect, useState } from "react";
import { FiArrowLeft, FiClock, FiX, FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { useParams, useNavigate } from "react-router-dom";
import LoadingSpinner from "../../Components/LoadingSpinner.jsx";

// Format date utility
function fmt(dateStr) {
  if (!dateStr) return "N/A";
  const d = new Date(dateStr);
  return d.toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

const EmptyState = ({ icon, title, description }) => (
  <div className="bg-[#1A1A25] rounded-xl p-6 border border-gray-800 text-center">
    <div className="text-4xl mb-3 text-gray-500">
      <i className={`fas fa-${icon}`}></i>
    </div>
    <h3 className="text-xl font-medium text-gray-400 mb-2">{title}</h3>
    <p className="text-gray-500">{description}</p>
  </div>
);

const ProjectDetail = () => {
  const [lightboxSrc, setLightboxSrc] = useState(null);
  const { param } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);

  const handleScroll = (direction) => {
    if (isScrolling) return;
    
    setIsScrolling(true);
    const newIndex = currentIndex + direction;
    
    // For mobile, show 1 image at a time instead of 3
    const itemsToShow = window.innerWidth < 768 ? 1 : 3;
    const maxIndex = Math.max(0, project.gallery.length - itemsToShow);
    
    if (newIndex >= 0 && newIndex <= maxIndex) {
      setCurrentIndex(newIndex);
    }
    
    setTimeout(() => setIsScrolling(false), 300);
  };

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const response = await axios.get(`/api/projects/${param}`);
        if (!response.data?.project) {
          throw new Error("Project data not found");
        }
        setProject(response.data.project);
      } catch (err) {
        setError(
          err.response?.data?.error || err.message || "Failed to fetch project"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchProject();
  }, [param]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black pt-16">
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black pt-16 px-4">
        <div className="text-center max-w-md">
          <div className="text-[#E53935] text-5xl mb-4">
            <i className="fas fa-exclamation-triangle"></i>
          </div>
          <h2 className="text-xl font-['Orbitron'] text-white mb-2">Error Loading Project</h2>
          <p className="text-gray-400 font-['Roboto'] mb-6">{error}</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button
              onClick={() => navigate(-1)}
              className="bg-[#1A1A25] text-white px-4 py-2 rounded-lg border border-gray-700 font-['Orbitron']"
            >
              Go Back
            </button>
            <button
              onClick={() => window.location.reload()}
              className="bg-[#E53935] text-black px-4 py-2 rounded-lg font-['Orbitron']"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black pt-16 px-4">
        <EmptyState
          icon="exclamation-triangle"
          title="Project Not Found"
          description="The project you're looking for doesn't exist or may have been removed."
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen py-17 bg-black text-white">
      {/* Mobile Header - Only shows on small screens */}
      <header className="lg:hidden sticky top-0 z-30 bg-black/90 backdrop-blur-md border-b border-gray-800 px-4 py-3">
        <div className="flex items-center">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center text-[#E53935] font-['Orbitron'] mr-3 p-1"
          >
            <FiArrowLeft className="mr-1 text-lg" />
            <span className="text-sm">Back</span>
          </button>
          <h1 className="text-lg font-['Orbitron'] truncate flex-1">
            {project.title || "Untitled Project"}
          </h1>
          <div className="bg-green-400 text-black text-xs font-bold px-2 py-1 rounded-full">
            {project.progress || 0}%
          </div>
        </div>
      </header>

      <div className="px-4 sm:px-6 md:px-8 lg:px-28">
        {/* Hero Section */}
        <section className="bg-black pt-4 md:pt-8 lg:pt-16">
          <div className="container mx-auto">
            <div className="flex flex-col lg:flex-row gap-6 lg:gap-12 items-center">
              {/* Left Column - Project Info */}
              <div className="w-full lg:w-1/2">
                {/* Back button - hidden on mobile, shown on desktop */}
                <div className="mb-4 lg:mb-6 hidden lg:block">
                  <button
                    className="inline-flex items-center bg-[#E53935] text-black text-lg font-bold px-4 py-2 rounded-full cursor-pointer hover:bg-[#2196F3] hover:text-white transition-colors"
                    onClick={() => navigate(-1)}
                  >
                    <FiArrowLeft className="mr-2" />
                    Back to Projects
                  </button>
                </div>
                
                <h1 className="text-2xl md:text-3xl lg:text-4xl font-['Orbitron'] leading-tight mb-2 lg:mb-3">
                  {project.title || "Untitled Project"}
                </h1>
                
                <div className="flex items-center gap-2 mb-4 lg:mb-6 flex-wrap">
                  <span className="bg-green-400 text-black text-xs font-bold px-2 py-1 rounded-full mb-1">
                    {project.progress || 0}% Complete
                  </span>
                  {project.category && (
                    <span className="text-xs px-2 py-1 bg-[#1A1A25] rounded-full border border-gray-700 mb-1">
                      {project.category}
                    </span>
                  )}
                </div>

                {project.shortDesc ? (
                  <p className="text-base md:text-lg font-['Roboto'] text-gray-300 mb-4 lg:mb-6">
                    {project.shortDesc}
                  </p>
                ) : (
                  <p className="text-base md:text-lg text-gray-500 italic mb-4 lg:mb-6">
                    No description available
                  </p>
                )}

                <div className="grid grid-cols-2 gap-3 mb-6 md:grid-cols-3 md:gap-4">
                  <div className="bg-[#1a1a25] p-3 md:p-4 rounded-xl border border-gray-800">
                    <div className="text-[#E53935] font-['Orbitron'] text-sm md:text-md mb-1">
                      Technologies
                    </div>
                    <div className="text-base md:text-lg font-['Roboto']">
                      {project.technologies?.length || 0}
                    </div>
                  </div>
                  <div className="bg-[#1A1A25] p-3 md:p-4 rounded-xl border border-gray-800">
                    <div className="text-[#E53935] font-['Orbitron'] text-sm md:text-md mb-1">
                      Team Members
                    </div>
                    <div className="text-base md:text-lg font-['Roboto']">
                      {project.team?.length || 0}
                    </div>
                  </div>
                  <div className="bg-[#1A1A25] p-3 md:p-4 rounded-xl border border-gray-800 col-span-2 md:col-span-1">
                    <div className="text-[#E53935] font-['Orbitron'] text-sm md:text-md mb-1">
                      Started
                    </div>
                    <div className="text-base md:text-lg font-['Roboto']">
                      {fmt(project.createdAt)}
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column - Project Image */}
              <div className="w-full lg:w-1/2 relative order-first lg:order-last mb-4 lg:mb-0">
                {project.img ? (
                  <div className="aspect-w-16 aspect-h-9 rounded-xl overflow-hidden border-2 border-gray-800 shadow-2xl">
                    <img
                      src={project.img}
                      alt={project.title || "Project image"}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80"></div>
                  </div>
                ) : (
                  <div className="aspect-w-16 aspect-h-9 rounded-xl overflow-hidden border-2 border-gray-800 shadow-2xl bg-[#1A1A25] flex items-center justify-center">
                    <div className="text-center p-4 md:p-6">
                      <i className="fas fa-image text-4xl md:text-5xl text-gray-600 mb-2 md:mb-3"></i>
                      <p className="text-gray-500 text-sm md:text-base">No project image available</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <main className="container mx-auto py-6 md:py-8 lg:py-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8 lg:gap-12">
            {/* Left Column - Main Content */}
            <div className="lg:col-span-2 space-y-6 md:space-y-8">
              {/* Overview Section */}
              <section className="space-y-4">
                <h2 className="text-xl md:text-2xl font-['Orbitron'] border-b border-gray-800 pb-3 flex items-center">
                  <i className="fas fa-info-circle text-[#E53935] mr-2 md:mr-3"></i>
                  Project Overview
                </h2>

                {!project.overview || project.overview.length === 0 ||
                (project.overview.length === 1 && project.overview[0].trim() === "") ? (
                  <EmptyState
                    icon="info-circle"
                    title="No Overview Available"
                    description="This project doesn't have an overview description yet."
                  />
                ) : (
                  <div className="space-y-3 text-gray-300 font-['Roboto'] text-base md:text-lg">
                    {project.overview.map(
                      (paragraph, idx) =>
                        paragraph.trim() !== "" && (
                          <p key={idx} className="leading-relaxed">
                            {paragraph}
                          </p>
                        )
                    )}
                  </div>
                )}
              </section>

              {/* Objectives Section */}
              <section className="space-y-4">
                <h2 className="text-xl md:text-2xl font-['Orbitron'] border-b border-gray-800 pb-3 flex items-center">
                  <i className="fas fa-bullseye text-[#E53935] mr-2 md:mr-3"></i>
                  Core Objectives
                </h2>
                {project.coreObjectives?.length > 0 ? (
                  <ul className="space-y-3">
                    {project.coreObjectives.map((o, idx) => (
                      <li
                        key={idx}
                        className="flex items-start font-['Roboto'] text-base md:text-lg"
                      >
                        <div className="text-[#2196F3] mr-2 mt-1 md:mr-3">
                          <i className="fas fa-check-circle text-sm md:text-base"></i>
                        </div>
                        <span className="text-gray-300">{o}</span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <EmptyState
                    icon="bullseye"
                    title="No Objectives Defined"
                    description="The project objectives haven't been specified yet."
                  />
                )}
              </section>

              {/* Technical Specifications */}
              <section className="space-y-4">
                <h2 className="text-xl md:text-2xl font-['Orbitron'] pb-3 flex border-b border-gray-800 items-center">
                  <i className="fas fa-cogs text-[#E53935] mr-2 md:mr-3"></i>
                  Technical Details
                </h2>

                {project.technicalSpecifications?.length > 0 ? (
                  <div className="grid grid-cols-1 gap-3">
                    {project.technicalSpecifications.map((spec, idx) => (
                      <div
                        key={idx}
                        className="bg-[#1A1A25] p-4 md:p-5 rounded-xl border border-gray-800 transition-all duration-300 hover:shadow-lg hover:shadow-[#E53935]/20 group"
                      >
                        <h3 className="text-[#E53935] font-['Orbitron'] font-medium mb-2 flex items-center text-sm md:text-base">
                          <span className="inline-block w-2 h-2 bg-[#E53935] rounded-full mr-2 group-hover:animate-pulse"></span>
                          {spec.key}
                        </h3>
                        <p className="text-gray-300 font-['Roboto'] text-sm md:text-md pl-4 border-l-2 border-gray-700 group-hover:border-[#E53935] transition-colors duration-300">
                          {spec.value}
                        </p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <EmptyState
                    icon="cogs"
                    title="No Technical Details"
                    description="Technical specifications haven't been added to this project."
                  />
                )}
              </section>

              {/* Technologies */}
              <section className="space-y-4">
                <h2 className="text-xl md:text-2xl font-['Orbitron'] border-b border-gray-800 pb-3 flex items-center">
                  <i className="fas fa-microchip text-[#E53935] mr-2 md:mr-3"></i>
                  Technologies
                </h2>
                {project.technologies?.length > 0 ? (
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1.5 text-sm md:text-md bg-[#1A1A25] font-['Orbitron'] rounded-full border border-gray-800 hover:border-[#E53935] transition-colors"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                ) : (
                  <EmptyState
                    icon="microchip"
                    title="No Technologies Listed"
                    description="The technologies used in this project haven't been specified."
                  />
                )}
              </section>

              {/* Timeline */}
              <section className="space-y-6">
                <h2 className="text-xl md:text-2xl font-['Orbitron'] flex items-center gap-2">
                  <i className="fas fa-history text-[#E53935] mr-2 md:mr-3"></i>
                  Project Timeline
                </h2>

                {project.milestones?.length > 0 ? (
                  <div className="space-y-1">
                    {project.milestones.map((milestone, idx) => (
                      <div key={idx} className="flex group">
                        <div className="flex flex-col items-center w-6 md:w-8 mr-3 md:mr-4">
                          <div className="w-2 h-2 md:w-3 md:h-3 rounded-full bg-[#E53935] flex-shrink-0" />
                          {idx !== project.milestones.length - 1 && (
                            <div className="w-px h-full bg-gray-700 my-1" />
                          )}
                        </div>

                        <div className="pb-4 md:pb-6 flex-1">
                          <div className="bg-[#1E1E28] p-3 md:p-4 rounded-lg border border-gray-800 hover:border-[#E53935]/30 transition-colors">
                            <div className="flex flex-col justify-between gap-2 mb-2">
                              <h3 className="font-['Orbitron'] text-white text-sm md:text-base">
                                {milestone.title || "Milestone"}
                              </h3>
                              <div className="text-xs text-[#E53935] font-['Orbitron'] bg-[#0A0A0F] px-2 py-1 rounded-md">
                                {fmt(milestone.date) || "No date"}
                              </div>
                            </div>
                            {milestone.description && (
                              <p className="text-gray-400 text-sm md:text-md font-['Roboto']">
                                {milestone.description}
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <EmptyState
                    icon="history"
                    title="No Timeline Available"
                    description="Project milestones haven't been established yet."
                  />
                )}
              </section>

              {/* Gallery */}
              <section className="space-y-4">
                <h2 className="text-xl md:text-2xl font-['Orbitron'] border-b border-gray-800 pb-3 flex items-center">
                  <i className="fas fa-images text-[#E53935] mr-2 md:mr-3"></i>
                  Project Gallery
                </h2>

                {project.gallery?.length > 0 ? (
                  <div className="relative">
                    <button
                      onClick={() => handleScroll(-1)}
                      className={`absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-black cursor-pointer rounded-full w-8 h-8 flex items-center justify-center transition-opacity duration-200 ${
                        currentIndex > 0
                          ? "opacity-100"
                          : "opacity-0 pointer-events-none"
                      }`}
                    >
                      <FiChevronLeft className="text-[#E53935]" />
                    </button>

                    <div className="flex overflow-hidden">
                      <div
                        className="flex transition-transform duration-300"
                        style={{
                          // Show 1 image on mobile, 3 on desktop
                          transform: `translateX(-${currentIndex * (window.innerWidth < 768 ? 100 : 33.33)}%)`,
                        }}
                      >
                        {project.gallery.map((img, idx) => (
                          <div
                            key={idx}
                            // Full width on mobile, 1/3 on desktop
                            className="w-full md:w-1/3 flex-shrink-0 px-1 md:px-2"
                          >
                            <div
                              className="cursor-pointer group aspect-square overflow-hidden rounded-lg md:rounded-xl border-2 border-gray-800 hover:border-[#2196F3] transition-colors"
                              onClick={() => setLightboxSrc(img)}
                            >
                              <img
                                src={img}
                                alt={`Gallery image ${idx + 1}`}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <button
                      onClick={() => handleScroll(1)}
                      className={`absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-black cursor-pointer rounded-full w-8 h-8 flex items-center justify-center transition-opacity duration-200 ${
                        // Calculate max index based on screen size
                        currentIndex < project.gallery.length - (window.innerWidth < 768 ? 1 : 3)
                          ? "opacity-100"
                          : "opacity-0 pointer-events-none"
                      }`}
                    >
                      <FiChevronRight className="text-[#E53935]" />
                    </button>
                    
                    {/* Gallery indicator dots for mobile */}
                    {window.innerWidth < 768 && project.gallery.length > 1 && (
                      <div className="flex justify-center mt-4 space-x-2">
                        {project.gallery.map((_, idx) => (
                          <button
                            key={idx}
                            className={`w-2 h-2 rounded-full ${
                              idx === currentIndex ? 'bg-[#E53935]' : 'bg-gray-600'
                            }`}
                            onClick={() => setCurrentIndex(idx)}
                            aria-label={`View image ${idx + 1}`}
                          />
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <EmptyState
                    icon="images"
                    title="No Gallery Images"
                    description="This project doesn't have any gallery images yet."
                  />
                )}
              </section>
            </div>

            {/* Right Column - Sidebar */}
            <div className="lg:col-span-1 space-y-6 md:space-y-8">
              {/* Project Details Card */}
              <div className="bg-[#12121A] rounded-xl border border-gray-800 p-4 md:p-6 top-6">
                <h3 className="text-xl md:text-2xl font-['Orbitron'] mb-4 md:mb-6">
                  Project Summary
                </h3>
                <div className="space-y-4 md:space-y-6">
                  <div>
                    <div className="text-gray-400 text-xs md:text-sm mb-1 md:mb-2 font-['Orbitron']">
                      Status
                    </div>
                    <div className="flex items-center">
                      <div
                        className={`w-2 h-2 md:w-3 md:h-3 rounded-full mr-2 md:mr-3 ${
                          project.status === "completed"
                            ? "bg-green-400"
                            : project.status === "upcoming"
                            ? "bg-yellow-400"
                            : "bg-blue-400"
                        }`}
                      ></div>
                      <span className="font-medium text-sm md:text-base capitalize">
                        {project.status || "Not specified"}
                      </span>
                    </div>
                  </div>

                  <div>
                    <div className="text-gray-400 text-xs md:text-sm mb-1 md:mb-2 font-['Orbitron']">
                      Category
                    </div>
                    <div className="flex items-center">
                      <i className="fas fa-tag text-[#FF00E5] mr-2 md:mr-3 text-sm"></i>
                      <span className="text-sm md:text-base">{project.category || "Uncategorized"}</span>
                    </div>
                  </div>

                  <div>
                    <div className="text-gray-400 text-xs md:text-sm mb-1 md:mb-2 font-['Orbitron']">
                      Start Date
                    </div>
                    <div className="flex items-center">
                      <i className="far fa-calendar-alt text-[#E53935] mr-2 md:mr-3 text-sm"></i>
                      <span className="text-sm md:text-base">{fmt(project.createdAt)}</span>
                    </div>
                  </div>

                  <div>
                    <div className="text-gray-400 text-xs md:text-sm mb-1 md:mb-2 font-['Orbitron']">
                      Progress
                    </div>
                    <div className="w-full bg-gray-800 rounded-full h-2 md:h-2.5">
                      <div
                        className="bg-[#E53935] h-2 md:h-2.5 rounded-full"
                        style={{ width: `${project.progress || 0}%` }}
                      ></div>
                    </div>
                    <div className="text-right mt-1 text-xs md:text-sm text-gray-400">
                      {project.progress || 0}% Complete
                    </div>
                  </div>

                  <div>
                    <div className="text-gray-400 text-xs md:text-sm mb-2 md:mb-3 font-['Orbitron']">
                      Key Technologies
                    </div>
                    {project.technologies?.length > 0 ? (
                      <div className="flex flex-wrap gap-1 md:gap-2">
                        {project.technologies.slice(0, 6).map((tech, idx) => (
                          <span
                            key={idx}
                            className="px-2 py-1 text-xs md:text-sm bg-[#1A1A25] rounded-full border border-[#E53935]"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    ) : (
                      <p className="text-gray-500 text-xs md:text-sm">None specified</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Team Members */}
              <div className="bg-[#12121A] rounded-xl border border-gray-800 p-4 md:p-6">
                <h3 className="text-xl md:text-2xl font-['Orbitron'] mb-4 md:mb-6">Team Members</h3>
                {project.team?.length > 0 ? (
                  <div className="space-y-3 md:space-y-4">
                    {project.team.map((member, idx) => (
                      <div
                        key={idx}
                        className="flex items-center gap-3 p-2 md:p-3 hover:bg-[#1A1A25] rounded-lg transition-colors"
                      >
                        {member.image ? (
                          <img
                            src={member.image}
                            alt={member.name || "Team member"}
                            className="w-10 h-10 md:w-12 md:h-12 rounded-full object-cover border-2 border-gray-700"
                            loading="lazy"
                          />
                        ) : (
                          <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-[#E53935] flex items-center justify-center text-black font-bold border-2 border-gray-700 text-sm md:text-base">
                            {member.name?.charAt(0) || "?"}
                          </div>
                        )}
                        <div>
                          <h4 className="font-['Orbitron'] text-sm md:text-base">
                            {member.name || "Unnamed Member"}
                          </h4>
                          <p className="text-xs md:text-md font-['Roboto'] text-gray-400">
                            {member.designation || "No role specified"}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <EmptyState
                    icon="users"
                    title="No Team Members"
                    description="No team members have been assigned to this project yet."
                  />
                )}
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* Lightbox for gallery images */}
      {lightboxSrc && (
        <div
          className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50 p-4"
          onClick={() => setLightboxSrc(null)}
        >
          <div className="relative max-w-4xl w-full max-h-full">
            <img
              src={lightboxSrc}
              alt="Expanded gallery view"
              className="w-full h-full object-contain max-h-[80vh] mx-auto rounded-lg"
            />
            <button
              className="absolute top-2 right-2 md:top-4 md:right-4 text-red bg-[#1A1A25] rounded-full cursor-pointer text-xl md:text-2xl p-1 md:p-2 hover:text-[#E53935] transition-colors"
              onClick={(e) => {
                e.stopPropagation();
                setLightboxSrc(null);
              }}
            >
              <FiX />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectDetail;