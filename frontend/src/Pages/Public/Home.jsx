// pages/HomePage.js
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";

const Home = () => {
  const navigate = useNavigate();

  const navigateTo = (path) => {
    navigate(path, { state: { fromHome: true } });
  };

  const fetchData = async (endpoint) => {
    const res = await axios.get(`/api/${endpoint}`);
    return res.data; // Return entire response data
  };

  // 1. Projects Query (matches your API response structure)
  const {
    data: projectsData,
    isLoading: projectsLoading,
    error: projectsError,
  } = useQuery({
    queryKey: ["projects"],
    queryFn: () => fetchData("projects").then((data) => data.projects), // Extract projects array
  });

  // 2. Competitions Query
  const {
    data: competitionsData,
    isLoading: competitionsLoading,
    error: competitionsError,
  } = useQuery({
    queryKey: ["competitions"],
    queryFn: () => fetchData("competitions").then((data) => data.competitions),
  });

  // 3. Team Query
  const {
    data: teamData,
    isLoading: teamLoading,
    error: teamError,
  } = useQuery({
    queryKey: ["team"],
    queryFn: () => fetchData("team").then((data) => data.teamMembers),
  });

  // 4. Blog Query
  const {
    data: blogData
  } = useQuery({
    queryKey: ["blog"],
    queryFn: () => fetchData("blog").then((data) => data.blog || []),
  });

  // 4. Latest Project Query
  const {
    data: latestProjectData,
    isLoading: latestProjectLoading,
    error: latestProjectError,
  } = useQuery({
    queryKey: ["latestProject"],
    queryFn: () => fetchData("projects/latest"),
  });

  // Safely extract data with fallbacks
  const projects = projectsData || [];
  const competitions = competitionsData || [];
  const team = teamData || [];
  const latestProject = latestProjectData || null;

  // Observe sections for animation
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animated");
        }
      },
      { threshold: 0.1 }
    );

    const sections = document.querySelectorAll(".animate-on-scroll");
    sections.forEach((section) => {
      observer.observe(section);
    });

    return () => {
      sections.forEach((section) => {
        observer.unobserve(section);
      });
    };
  }, []);

  const formatMonthYear = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", { month: "long", year: "numeric" });
  };

  return (
    <div>
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 px-4 sm:px-8 md:px-28">
        {/* Grid Background */}
        <div className="absolute inset-0 z-0">
          <div
            className="absolute inset-0 bg-[url('/bg.jpg')]"
            style={{ backgroundSize: "cover", opacity: "0.1" }}
          ></div>
        </div>

        <div className="container mx-auto md:px-28 z-10 flex flex-col md:flex-row items-center justify-center min-h-[70vh] md:min-h-[80vh] gap-6 md:gap-12">
          {/* Text Content */}
          <div className="w-full md:w-1/2 text-center md:text-left flex flex-col justify-center order-2 md:order-1">
            <h1 className="font-['Orbitron'] text-4xl sm:text-5xl md:text-6xl font-bold leading-tight mb-4 md:mb-6 text-white">
              <span className="block">Create.</span>
              <span className="block">Innovate.</span>
              <span className="block text-transparent bg-clip-text bg-[#E53935]">
                Dominate.
              </span>
            </h1>
            <p className="font-['Orbitron'] text-base sm:text-lg text-gray-300 mb-6 md:mb-8 max-w-lg mx-auto md:mx-0">
              Manufacturing Department's robotics team, pushing the boundaries
              of innovation and engineering.
            </p>
            <div className="flex flex-col sm:flex-row justify-center md:justify-start space-y-4 sm:space-y-0 sm:space-x-4">
              <button
                onClick={() => navigateTo("/projects")}
                className="bg-[#E53935] font-['Orbitron'] px-6 py-3 rounded text-black hover:text-white text-sm md:text-base font-semibold hover:scale-105 hover:bg-[#2196F3] cursor-pointer transition-all duration-300 hover:shadow-[0_0_10px_rgba(0,255,255,0.5)]"
              >
                Explore Projects
              </button>
              <button
                onClick={() => navigateTo("/team")}
                className="bg-transparent border border-[#E53935] px-6 py-3 rounded font-medium font-['Orbitron'] text-[#E53935] hover:bg-black hover:text-white hover:scale-105 transition-all duration-300 whitespace-nowrap cursor-pointer text-sm md:text-base mt-2 sm:mt-0"
              >
                Meet The Team
              </button>
            </div>
          </div>

          {/* Image Content */}
          <div className="w-full md:w-1/2 flex items-center justify-center order-1 md:order-2 mb-6 md:mb-0">
            <div className="relative w-full max-w-xs sm:max-w-md md:max-w-lg">
              {latestProjectLoading ? (
                <div className="w-full h-48 sm:h-64 md:h-80 bg-[#0f0f1c] rounded-lg animate-pulse"></div>
              ) : latestProjectError ? (
                <div className="w-full h-48 sm:h-64 md:h-80 bg-[#0f0f1c] rounded-lg flex items-center justify-center">
                  <p className="text-[#E53935] text-sm text-center px-4">
                    {latestProjectError.message || "Error loading project"}
                  </p>
                </div>
              ) : latestProject ? (
                <>
                  <div
                    onClick={() => navigateTo(`/projects/${latestProject.slug}`)}
                    className="aspect-w-16 aspect-h-9 w-full cursor-pointer overflow-hidden rounded-lg shadow-[0_0_20px_rgba(255,0,0,0.2)] sm:shadow-[0_0_30px_rgba(255,0,0,0.2)]"
                  >
                    <img
                      src={latestProject.img}
                      alt={latestProject.title || "Latest Project"}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </div>
                  <div className="absolute -bottom-2 -right-2 sm:-bottom-3 sm:-right-3 bg-[#0f0f1c]/90 backdrop-blur-md p-2 sm:p-3 rounded-lg border border-[#E53935]/30">
                    <div className="flex items-center space-x-1 sm:space-x-2">
                      <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-[#E53935] animate-pulse"></div>
                      <p className="font-['Orbitron'] text-xs sm:text-sm text-[#E53935]">
                        LATEST: {latestProject.title.length > 15
                          ? `${latestProject.title.substring(0, 15)}...`
                          : latestProject.title}
                      </p>
                    </div>
                  </div>
                </>
              ) : (
                <div className="w-full h-48 sm:h-64 md:h-80 bg-[#0f0f1c] rounded-lg flex items-center justify-center">
                  <p className="text-[#E53935] text-sm sm:text-base">No projects found</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Scroll indicator - hidden on mobile */}
        <div className="absolute bottom-10 left-0 right-0 z-100 justify-center hidden md:flex">
          <div className="animate-bounce">
            <i className="fas fa-chevron-down text-[#E53935] opacity-70"></i>
          </div>
        </div>
      </section>

      {/* Introduction Section */}
      <section className="py-12 md:py-20 px-4 sm:px-8 md:px-28 relative">
        <div className="container mx-auto px-4 md:px-6">
          <div className="backdrop-blur-md bg-[#1a1a2e]/50 border border-[#E53935]/30 rounded-2xl p-6 md:p-12 shadow-[0_0_30px_rgba(255,0,0,0.3)]">
            <div className="flex flex-col lg:flex-row items-center">
              {/* Text Content */}
              <div className="w-full lg:w-1/2 mb-8 lg:mb-0 lg:pr-12">
                <h2 className="font-['Orbitron'] text-2xl md:text-3xl font-bold mb-4 md:mb-6 text-white text-center lg:text-left">
                  Pushing the Boundaries{" "}
                  <span className="text-[#E53935]">of Robotics</span>
                </h2>
                <p className="font-['Roboto'] text-gray-300 mb-4 md:mb-6 text-sm md:text-base leading-relaxed">
                  Bot Nexus represents the convergence of creativity and
                  technical expertise at Anna University, Chennai. Founded by a
                  group of passionate engineering students, our team specializes
                  in designing and building cutting-edge robotics systems that
                  solve real-world challenges.
                </p>
                <p className="font-['Roboto'] text-gray-300 mb-6 md:mb-8 text-sm md:text-base leading-relaxed">
                  With a focus on innovation and practical applications, we
                  participate in intra and inter-college competitions while
                  fostering a collaborative learning environment for robotics
                  enthusiasts.
                </p>
                <div className="grid grid-cols-2 gap-4 md:gap-6">
                  <div className="flex flex-col text-center md:text-left">
                    <span className="font-['Orbitron'] text-2xl md:text-3xl font-bold text-[#E53935]">
                      4+
                    </span>
                    <span className="font-['Orbitron'] text-xs md:text-sm text-gray-400">
                      Projects Completed
                    </span>
                  </div>
                  <div className="flex flex-col text-center md:text-left">
                    <span className="font-['Orbitron'] text-2xl md:text-3xl font-bold text-[#E53935]">
                      18
                    </span>
                    <span className="font-['Orbitron'] text-xs md:text-sm text-gray-400">
                      Prizes Won
                    </span>
                  </div>
                  <div className="flex flex-col text-center md:text-left">
                    <span className="font-['Orbitron'] text-2xl md:text-3xl font-bold text-[#E53935]">
                      35
                    </span>
                    <span className="font-['Orbitron'] text-xs md:text-sm text-gray-400">
                      Team Members
                    </span>
                  </div>
                  <div className="flex flex-col text-center md:text-left">
                    <span className="font-['Orbitron'] text-2xl md:text-3xl font-bold text-[#E53935]">
                      10+
                    </span>
                    <span className="font-['Orbitron'] text-xs md:text-sm text-gray-400">
                      Domains
                    </span>
                  </div>
                </div>
              </div>

              {/* Image Content */}
              <div className="w-full lg:w-1/2 relative">
                <div className="relative">
                  <img
                    src="https://readdy.ai/api/search-image?query=futuristic%20robotics%20lab%20with%20multiple%20robots%20being%20developed%2C%20engineers%20working%20on%20high-tech%20equipment%2C%20dark%20environment%20with%20cyan%20and%20purple%20lighting%20accents%2C%20cutting-edge%20technology%20workspace%20with%20computer%20screens%20and%20robotic%20parts%2C%20professional%20photography%20with%20dramatic%20lighting&width=800&height=600&seq=intro-image-1&orientation=landscape"
                    alt="Our Robotics Lab"
                    className="w-full h-auto rounded-lg shadow-lg"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0f0f1c] to-transparent opacity-40 rounded-lg"></div>
                </div>
                <div className="absolute -bottom-4 md:-bottom-6 -left-3 md:-left-6 bg-[#0f0f1c]/80 backdrop-blur-md p-3 md:p-4 rounded-lg border border-[#E53935]/30">
                  <div className="flex items-center space-x-2 md:space-x-3">
                    <div className="w-8 md:w-10 h-8 md:h-10 rounded-full flex items-center justify-center bg-[#E53935]/20 border border-[#E53935]/50">
                      <i className="fas fa-flask text-[#E53935] text-sm md:text-base"></i>
                    </div>
                    <div>
                      <p className="font-['Orbitron'] text-xs md:text-sm text-white">
                        Research & Development
                      </p>
                      <p className="font-['Roboto'] text-xs text-gray-400">
                        Cutting-edge innovation lab
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Projects */}
      <section className="py-12 md:py-20 px-4 sm:px-8 md:px-28 relative">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-8 md:mb-16">
            <h2 className="font-['Orbitron'] text-2xl md:text-3xl font-bold mb-3 md:mb-4 text-white">
              Featured <span className="text-[#E53935]">Projects</span>
            </h2>
            <p className="font-['Roboto'] text-gray-300 max-w-2xl mx-auto text-sm md:text-base px-4 md:px-0 leading-relaxed">
              Explore our most innovative creations, from autonomous robots to
              specialized mechanical systems designed for various applications.
            </p>
          </div>

          {projectsLoading ? (
            <div className="flex justify-center items-center h-32 md:h-64">
              <div className="animate-spin rounded-full h-8 md:h-12 w-8 md:w-12 border-t-2 border-b-2 border-[#E53935]"></div>
            </div>
          ) : projectsError ? (
            <div className="text-center text-red-500 py-10">
              Error loading projects: {projectsError.message}
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-8">
                {projects.slice(0, 3).map((project, index) => (
                  <div
                    key={project._id || index}
                    onClick={() => navigateTo(`/projects/${project.slug}`)}
                    className="bg-[#0d0d1a]/70 border text-[#E53935] hover:text-[#2196F3] border-[#E53935]/50 rounded-2xl backdrop-blur-xl overflow-hidden group hover:border-[#2196F3]/10 hover:shadow-[0_0_30px_rgba(0,110,210,1)] hover:cursor-pointer transition-all duration-300"
                  >
                    <div className="relative h-40 md:h-48 overflow-hidden">
                      <img
                        src={project.img}
                        alt={`Image of ${project.title}`}
                        className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0d0d1a] to-transparent opacity-80"></div>
                      <div className="absolute top-3 md:top-4 left-3 md:left-4">
                        <span className="bg-[#E53935] text-black text-xs font-semibold px-2 md:px-3 py-1 rounded-full">
                          {project.category}
                        </span>
                      </div>
                    </div>
                    <div className="p-4 md:p-5">
                      <h3 className="text-lg md:text-xl font-bold font-['Orbitron'] transition-colors duration-300 mb-2 line-clamp-2">
                        {project.title}
                      </h3>
                      <p className="text-gray-300 font-['Roboto'] text-sm mt-2 line-clamp-3 leading-relaxed">
                        {project.shortDesc}
                      </p>
                      <div className="mt-4 flex justify-between items-center">
                        <button className="hover:scale-110 font-medium text-sm transition-colors duration-300">
                          View Details{" "}
                          <i className="fas fa-arrow-right ml-2"></i>
                        </button>
                        <div className="w-8 h-8 rounded-full border bg-[#0d0d1a] flex items-center justify-center hover:bg-[#2196F3]/20 transition-all duration-300">
                          <i className="fas fa-code text-sm"></i>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
          <div className="text-center mt-8 md:mt-12">
            <button
              onClick={() => navigateTo("/projects")}
              className="bg-[#E53935] text-black font-['Orbitron'] text-sm md:text-base font-semibold px-5 py-2 md:py-2 rounded-lg transition-all duration-300
                 hover:text-white hover:scale-105 hover:bg-[#2196F3] hover:shadow-[0_0_10px_#2196F3] hover:cursor-pointer"
            >
              View All Projects{" "}
              <i className="fas fa-chevron-right ml-2 text-sm"></i>
            </button>
          </div>
        </div>
      </section>

      {/* Competitions Section */}
      <section className="py-12 md:py-20 px-4 sm:px-8 md:px-28 relative">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-8 md:mb-16">
            <h2 className="font-['Orbitron'] text-2xl md:text-3xl font-bold mb-3 md:mb-4 text-white">
              Competition <span className="text-[#E53935]">Showcase</span>
            </h2>
            <p className="font-['Roboto'] text-gray-300 max-w-2xl mx-auto text-sm md:text-base px-4 md:px-0 leading-relaxed">
              Our team regularly participates in national and international
              robotics competitions, demonstrating our technical prowess and
              innovative solutions.
            </p>
          </div>

          {competitionsLoading ? (
            <div className="flex justify-center items-center h-32 md:h-64">
              <div className="animate-spin rounded-full h-8 md:h-12 w-8 md:w-12 border-t-2 border-b-2 border-[#E53935]"></div>
            </div>
          ) : competitionsError ? (
            <div className="text-center text-red-500 py-10">
              Error loading competitions: {competitionsError.message}
            </div>
          ) : (
            <div className="relative">
              <div className="overflow-x-auto py-4 md:py-8 hide-scrollbar">
                <div className="flex space-x-4 md:space-x-6 min-w-max px-2">
                  {competitions.slice(0, 4).map((competition, index) => (
                    <div
                      key={competition._id || index}
                      onClick={() => navigateTo(`/competitions/${competition.slug}`)}
                      className="backdrop-blur-md bg-[#1a1a2e]/50 border border-[#E53935]/50 rounded-xl w-72 md:w-85 group flex-shrink-0 transition-all duration-300 hover:border-[#2196F3]/20 hover:shadow-[0_0_25px_rgba(0,110,210,1)] cursor-pointer"
                    >
                      <div className="relative overflow-hidden rounded-t-xl h-40 md:h-48">
                        <img
                          src={competition.heroImg}
                          alt={competition.title}
                          className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#0f0f1c] to-transparent opacity-70"></div>
                        <div className="absolute top-3 md:top-4 left-3 md:left-4">
                          <span className="bg-[#E53935] backdrop-blur-sm text-xs font-['Roboto'] px-2 md:px-3 py-1 rounded-full text-black font-medium group-hover:bg-[#2196F3] transition-transform duration-300">
                            {formatMonthYear(competition.date)}
                          </span>
                        </div>
                        <div className="absolute bottom-3 md:bottom-4 right-3 md:right-4">
                          <span className="bg-[#E53935] backdrop-blur-sm text-xs font-['Roboto'] px-2 md:px-3 py-1 rounded-full text-white group-hover:bg-[#2196F3] transition-transform duration-300">
                            {competition.category}
                          </span>
                        </div>
                      </div>
                      <div className="p-4 md:p-6">
                        <div className="flex items-start justify-between mb-3">
                          <h3 className="font-['Orbitron'] text-base md:text-lg font-bold text-white transition-colors duration-300 pr-2 line-clamp-2">
                            {competition.title}
                          </h3>
                          <div className="flex-shrink-0 bg-[#1a1a2e] border border-[#E53935]/30 rounded-full px-2 md:px-3 py-1 group-hover:bg-[#2196F3]/30 group-hover:border-[#2196F3]/30 transition-transform duration-300">
                            <span className="font-['Orbitron'] text-xs text-[#E53935] group-hover:text-[#2196F3]">
                              {competition.place}
                            </span>
                          </div>
                        </div>
                        <div className="flex justify-between items-center mt-4">
                          <button className="font-['Roboto'] text-sm text-[#E53935] hover:scale-110 group-hover:text-[#2196F3] transition-all duration-300 flex items-center whitespace-nowrap cursor-pointer">
                            View Details
                            <i className="fas fa-arrow-right ml-2 group-hover:ml-3 transition-all duration-300"></i>
                          </button>
                          <div className="w-8 h-8 rounded-full flex items-center justify-center border border-[#E53935]/50 group-hover:border-[#2196F3]/50 bg-[#1a1a2e] transition-all duration-300">
                            <i className="fas fa-trophy text-[#E53935] group-hover:text-[#2196F3] text-sm"></i>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          <div className="text-center mt-8">
            <button
              onClick={() => navigateTo("/competitions")}
              className="bg-[#E53935] text-black font-['Orbitron'] text-sm md:text-base font-semibold px-5 py-2 rounded-lg transition-all duration-300 hover:text-white hover:scale-105 hover:bg-[#2196F3] hover:shadow-[0_0_10px_#2196F3] hover:cursor-pointer"
            >
              View All Competitions{" "}
              <i className="fas fa-chevron-right ml-2 text-sm"></i>
            </button>
          </div>
        </div>


      </section>

      {/* Team Preview Section */}
      <section className="py-12 md:py-20 px-4 sm:px-8 md:px-28 relative">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-8 md:mb-16">
            <h2 className="font-['Orbitron'] text-2xl md:text-3xl font-bold mb-3 md:mb-4 text-white">
              Meet Our <span className="text-[#E53935]">Team</span>
            </h2>
            <p className="font-['Roboto'] text-gray-300 max-w-2xl mx-auto text-sm md:text-base px-4 md:px-0 leading-relaxed">
              Our diverse team brings together the brightest minds from various
              engineering disciplines to create cutting-edge robotic solutions.
            </p>
          </div>

          {teamLoading ? (
            <div className="flex justify-center items-center h-32 md:h-64">
              <div className="animate-spin rounded-full h-8 md:h-12 w-8 md:w-12 border-t-2 border-b-2 border-[#E53935]"></div>
            </div>
          ) : teamError ? (
            <div className="text-center text-red-500 py-10">
              Error loading team members: {teamError.message}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-8">
              {team.slice(0, 4).map((member, index) => (
                <div
                  key={member._id || index}
                  onClick={() => navigateTo('/team')}
                  className="backdrop-blur-md bg-[#1a1a2e]/50 border border-[#E53935]/50 rounded-xl overflow-hidden transition-all duration-300 hover:shadow-[0_0_25px_rgba(0,110,210,1)] hover:border-[#2196F3]/40 group cursor-pointer"
                >
                  <div className="p-4 md:p-6 flex flex-col items-center">
                    <div className="relative w-20 h-20 md:w-24 md:h-24 lg:w-32 lg:h-32 mb-4 md:mb-6">
                      <div className="absolute inset-0 rounded-full border-2 border-[#2196F3] opacity-0 group-hover:opacity-100 transition-all duration-750 scale-110 group-hover:scale-100"></div>
                      <img
                        src={member.image}
                        alt={member.name}
                        className="w-full h-full object-cover object-top rounded-full border-2 border-[#E53935]/70 group-hover:border-[#E53935] transition-all duration-300"
                      />
                    </div>
                    <h3 className="font-['Orbitron'] text-lg md:text-xl font-bold mb-1 text-[#E53935] group-hover:text-[#2196F3] transition-colors duration-300 text-center line-clamp-1">
                      {member.name}
                    </h3>
                    <p className="font-['Roboto'] text-white text-sm mb-1 md:mb-2 text-center line-clamp-1">
                      {member.designation}
                    </p>
                    <p className="font-['Roboto'] text-gray-400 text-xs md:text-sm mb-3 md:mb-4 text-center line-clamp-2 px-1">
                      {member.specialization}
                    </p>

                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="text-center mt-8 md:mt-12">
            <button
              onClick={() => navigateTo("/team")}
              className="bg-[#E53935] text-black font-['Orbitron'] text-sm md:text-base font-semibold px-5 py-2 rounded-lg transition-all duration-300 hover:text-white hover:scale-105 hover:bg-[#2196F3] hover:shadow-[0_0_10px_#2196F3] hover:cursor-pointer"
            >
              Meet The Full Team{" "}
              <i className="fas fa-chevron-right ml-2 text-sm"></i>
            </button>
          </div>
        </div>
      </section>

      {/* Blog Preview */}
      {blogData && (
        <section className="py-12 md:py-20 px-4 sm:px-8 md:px-28 relative">
          <div className="container mx-auto px-4 md:px-6">
            <div className="text-center mb-8 md:mb-16">
              <h2 className="font-['Orbitron'] text-2xl md:text-3xl font-bold mb-3 md:mb-4 text-white">
                Latest <span className="text-[#E53935]">Blog Posts</span>
              </h2>
              <p className="font-['Roboto'] text-gray-300 max-w-2xl mx-auto text-sm md:text-base px-4 md:px-0 leading-relaxed">
                Stay updated with our latest projects, technical insights, and
                team achievements through our blog.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
              {blogData.map((post, index) => (
                <div
                  key={index}
                  className="backdrop-blur-md bg-[#1a1a2e]/50 border border-[#E53935]/50 rounded-xl overflow-hidden transition-all duration-300 hover:shadow-[0_0_25px_rgba(0,110,210,1)] hover:border-[#2196F3]/40 group cursor-pointer"
                >
                  <div className="relative h-48 md:h-56 lg:h-64 overflow-hidden">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0f0f1c] to-transparent opacity-70"></div>
                    <div className="absolute top-3 left-3 md:top-4 md:left-4">
                      <span className="bg-[#E53935] backdrop-blur-sm text-xs font-['Roboto'] px-2 md:px-3 py-1 rounded-full text-black group-hover:bg-[#2196F3] transition-transform duration-300 font-medium">
                        {post.date}
                      </span>
                    </div>
                    <div className="absolute bottom-3 right-3 md:bottom-4 md:right-4">
                      <span className="bg-[#E53935] backdrop-blur-sm text-xs font-['Roboto'] px-2 md:px-3 py-1 rounded-full text-white group-hover:bg-[#2196F3] transition-transform duration-300">
                        {post.category}
                      </span>
                    </div>
                  </div>
                  <div className="p-4 md:p-6">
                    <div className="flex items-center mb-3">
                      <i className="far fa-clock text-[#E53935] group-hover:text-[#2196F3] transition-all duration-300 mr-2 text-xs md:text-sm"></i>
                      <span className="font-['Roboto'] text-xs text-gray-400">
                        {post.readTime}
                      </span>
                    </div>
                    <h3 className="font-['Orbitron'] text-lg md:text-xl font-bold mb-3 text-[#E53935] group-hover:text-[#2196F3] transition-colors duration-300 line-clamp-2">
                      {post.title}
                    </h3>
                    <p className="font-['Roboto'] text-gray-300 text-sm mb-4 line-clamp-3">
                      {post.excerpt}
                    </p>
                    <div className="flex justify-between items-center">
                      <button className="font-['Roboto'] text-sm text-[#E53935] group-hover:text-[#2196F3] transition-colors duration-300 flex items-center whitespace-nowrap cursor-pointer">
                        Read Article
                        <i className="fas fa-arrow-right ml-2 group-hover:ml-3 transition-all duration-300 text-xs"></i>
                      </button>
                      <div className="flex items-center space-x-2">
                        <div className="w-6 h-6 rounded-full overflow-hidden border border-[#E53935]/50 group-hover:border-[#2196F3]/50 transition-all duration-300">
                          <img
                            src="https://readdy.ai/api/search-image?query=professional%20portrait%20of%20young%20male%20writer%20in%20dark%20environment%20with%20subtle%20cyan%20lighting%2C%20focused%20expression%2C%20clean%20background%2C%20high%20quality%20professional%20headshot&width=100&height=100&seq=author-1&orientation=squarish"
                            alt="Author"
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <span className="font-['Roboto'] text-xs text-gray-400">
                          By Team Lead
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center mt-8 md:mt-12">
              <button
                onClick={() => navigateTo("/blog")}
                className="bg-[#E53935] text-black font-['Orbitron'] text-sm md:text-base font-semibold px-5 py-2 rounded-lg transition-all duration-300 hover:text-white hover:scale-105 hover:bg-[#2196F3] hover:shadow-[0_0_10px_#2196F3] hover:cursor-pointer"
              >
                View All Blogs{" "}
                <i className="fas fa-chevron-right ml-2 text-sm"></i>
              </button>
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default Home;
