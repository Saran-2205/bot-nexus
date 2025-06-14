// pages/HomePage.js
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  const handleViewAllProjects = () => {
    navigate("/projects", { state: { fromHome: true } });
  };
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

  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
        {/* Grid Background */}
        <div className="absolute inset-0 z-0">
          <div
            className="absolute inset-0 bg-[url('/bg.jpg')]"
            style={{ backgroundSize: "cover", opacity: "0.2" }}
          ></div>
        </div>

        <div className="container mx-auto px-25 z-10 flex flex-col md:flex-row items-center">
          <div className="w-full md:w-1/2 text-center md:text-left mb-12 md:mb-0">
            <h1 className="font-['Orbitron'] text-4xl md:text-6xl font-bold leading-tight mb-6 text-white">
              <span className="block">Create.</span>
              <span className="block">Innovate.</span>
              <span className="block text-transparent bg-clip-text bg-[#E53935]">
                Dominate.
              </span>
            </h1>
            <p className="font-['Orbitron'] text-lg text-gray-300 mb-8 max-w-lg mx-auto md:mx-0">
              Manufacturing Department's robotics team, pushing the boundaries
              of innovation and engineering.
            </p>
            <div className="flex flex-col sm:flex-row justify-center md:justify-start space-y-4 sm:space-y-0 sm:space-x-4">
              <button
                onClick={handleViewAllProjects}
                className="bg-[#E53935] font-['Orbitron'] px-4 py-2 rounded text-black hover:text-white text-md font-semibold hover:scale-110 hover:bg-[#2196F3] cursor-pointer transition-all duration-300 hover:shadow-[0_0_10px_rgba(0,255,255,0.5)]"
              >
                Explore Projects
              </button>
              <button className="bg-transparent border border-[#E53935] px-8 py-3 rounded font-medium font-['Orbitron'] text-[#E53935] hover:bg-black hover:text-white hover:scale-105 transition-all duration-300 !rounded-button whitespace-nowrap cursor-pointer">
                Meet The Team
              </button>
            </div>
          </div>
          <div className="w-full md:w-1/2">
            <div className="relative">
              <img
                src="https://readdy.ai/api/search-image?query=futuristic%20robot%20with%20glowing%20cyan%20and%20purple%20details%2C%20high%20tech%20engineering%20masterpiece%2C%20dark%20background%20with%20subtle%20lighting%2C%20detailed%20mechanical%20parts%2C%20professional%20photography%2C%203D%20render%20with%20realistic%20textures%20and%20shadows&width=800&height=800&seq=hero-robot-1&orientation=squarish"
                alt="Advanced Robotics"
                className="w-full h-auto rounded-lg shadow-[0_0_30px_rgba(255,0,0,0.2)]"
              />
              <div className="absolute -bottom-4 -right-4 bg-[#0f0f1c]/80 backdrop-blur-md p-4 rounded-lg border border-[#E53935]/30">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 rounded-full bg-[#E53935] animate-pulse"></div>
                  <p className="font-['Orbitron'] text-sm text-[#E53935]">
                    LATEST PROJECT: HEXAPOD v4.2
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="absolute bottom-10 left-0 right-0 z-100 flex justify-center">
          <div className="animate-bounce">
            <i className="fas fa-chevron-down text-[#E53935] opacity-70"></i>
          </div>
        </div>
      </section>

      {/* Introduction Section */}
      <section className="py-20 relative">
        <div className="container mx-auto px-6">
          <div className="backdrop-blur-md bg-[#1a1a2e]/50 border border-[#E53935]/30 rounded-2xl p-8 md:p-12 shadow-[0_0_30px_rgba(255,0,0,0.3)]">
            <div className="flex flex-col md:flex-row items-center">
              <div className="w-full md:w-1/2 mb-10 md:mb-0 md:pr-12">
                <h2 className="font-['Orbitron'] text-3xl font-bold mb-6 text-white">
                  Pushing the Boundaries{" "}
                  <span className="text-[#E53935]">of Robotics</span>
                </h2>
                <p className="font-['Roboto'] text-gray-300 mb-6">
                  BotNexus represents the convergence of creativity and
                  technical expertise at Anna University, Chennai. Founded by a
                  group of passionate engineering students, our team specializes
                  in designing and building cutting-edge robotics systems that
                  solve real-world challenges.
                </p>
                <p className="font-['Roboto'] text-gray-300 mb-8">
                  With a focus on innovation and practical applications, we
                  participate in intra and inter-college competitions while
                  fostering a collaborative learning environment for robotics
                  enthusiasts.
                </p>
                <div className="grid grid-cols-2 gap-6">
                  <div className="flex flex-col">
                    <span className="font-['Orbitron'] text-3xl font-bold text-[#E53935]">
                      4+
                    </span>
                    <span className="font-['Orbitron'] text-sm text-gray-400">
                      Projects Completed
                    </span>
                  </div>
                  <div className="flex flex-col">
                    <span className="font-['Orbitron'] text-3xl font-bold text-[#E53935]">
                      18
                    </span>
                    <span className="font-['Orbitron'] text-sm text-gray-400">
                      Prizes Won
                    </span>
                  </div>
                  <div className="flex flex-col">
                    <span className="font-['Orbitron'] text-3xl font-bold text-[#E53935]">
                      35
                    </span>
                    <span className="font-['Orbitron'] text-sm text-gray-400">
                      Team Members
                    </span>
                  </div>
                  <div className="flex flex-col">
                    <span className="font-['Orbitron'] text-3xl font-bold text-[#E53935]">
                      7
                    </span>
                    <span className="font-['Orbitron'] text-sm text-gray-400">
                      Research Papers
                    </span>
                  </div>
                </div>
              </div>
              <div className="w-full md:w-1/2 relative">
                <div className="relative">
                  <img
                    src="https://readdy.ai/api/search-image?query=futuristic%20robotics%20lab%20with%20multiple%20robots%20being%20developed%2C%20engineers%20working%20on%20high-tech%20equipment%2C%20dark%20environment%20with%20cyan%20and%20purple%20lighting%20accents%2C%20cutting-edge%20technology%20workspace%20with%20computer%20screens%20and%20robotic%20parts%2C%20professional%20photography%20with%20dramatic%20lighting&width=800&height=600&seq=intro-image-1&orientation=landscape"
                    alt="Our Robotics Lab"
                    className="w-full h-auto rounded-lg shadow-lg"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0f0f1c] to-transparent opacity-40 rounded-lg"></div>
                </div>
                <div className="absolute -bottom-6 -left-6 bg-[#0f0f1c]/80 backdrop-blur-md p-4 rounded-lg border border-[#E53935]/30">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-full flex items-center justify-center bg-[#E53935]/20 border border-[#E53935]/50">
                      <i className="fas fa-flask text-[#E53935]"></i>
                    </div>
                    <div>
                      <p className="font-['Orbitron'] text-sm text-white">
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
      <section className="py-20 relative">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="font-['Orbitron'] text-3xl font-bold mb-4 text-white">
              Featured <span className="text-[#E53935]">Projects</span>
            </h2>
            <p className="font-['Roboto'] text-gray-300 max-w-2xl mx-auto">
              Explore our most innovative creations, from autonomous robots to
              specialized mechanical systems designed for various applications.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Hexapod Explorer",
                category: "Autonomous Navigation",
                description:
                  "Six-legged robot designed for traversing uneven terrain with advanced obstacle avoidance.",
                image:
                  "https://readdy.ai/api/search-image?query=futuristic%20six-legged%20robot%20hexapod%20with%20glowing%20cyan%20details%2C%20dark%20background%20with%20subtle%20lighting%2C%20detailed%20mechanical%20legs%20and%20body%2C%20professional%20photography%20with%20dramatic%20lighting%2C%20high-tech%20robotic%20design%20with%20sleek%20finish&width=600&height=400&seq=project-1&orientation=landscape",
              },
              {
                title: "AquaBot Submarine",
                category: "Underwater Robotics",
                description:
                  "Autonomous underwater vehicle for marine exploration and data collection.",
                image:
                  "https://readdy.ai/api/search-image?query=futuristic%20underwater%20robot%20submarine%20with%20glowing%20purple%20and%20cyan%20details%2C%20dark%20ocean%20background%2C%20sleek%20aerodynamic%20design%2C%20professional%20underwater%20photography%2C%20high-tech%20marine%20exploration%20vehicle%20with%20advanced%20sensors%20and%20cameras&width=600&height=400&seq=project-2&orientation=landscape",
              },
              {
                title: "Precision Robotic Arm",
                category: "Industrial Automation",
                description:
                  "High-precision robotic arm with 6 degrees of freedom for manufacturing applications.",
                image:
                  "https://readdy.ai/api/search-image?query=advanced%20robotic%20arm%20with%20multiple%20joints%20and%20precision%20grippers%2C%20glowing%20cyan%20and%20purple%20details%2C%20dark%20background%20with%20dramatic%20lighting%2C%20industrial%20design%20with%20sleek%20metallic%20finish%2C%20professional%20photography%20of%20high-tech%20manufacturing%20equipment&width=600&height=400&seq=project-3&orientation=landscape",
              },
              {
                title: "Drone Swarm System",
                category: "Aerial Robotics",
                description:
                  "Coordinated multi-drone system for complex aerial maneuvers and mapping.",
                image:
                  "https://readdy.ai/api/search-image?query=multiple%20futuristic%20drones%20flying%20in%20formation%20with%20glowing%20cyan%20and%20purple%20lights%2C%20dark%20night%20sky%20background%2C%20advanced%20aerial%20robots%20with%20sleek%20design%2C%20professional%20photography%20capturing%20high-tech%20flying%20machines%20in%20synchronized%20movement&width=600&height=400&seq=project-4&orientation=landscape",
              },
              {
                title: "Medical Assistant Bot",
                category: "Healthcare Robotics",
                description:
                  "Assistive robot designed to help medical professionals with routine tasks.",
                image:
                  "https://readdy.ai/api/search-image?query=sleek%20medical%20robot%20assistant%20in%20hospital%20setting%2C%20glowing%20cyan%20and%20purple%20interface%20details%2C%20clean%20white%20and%20dark%20contrasting%20design%2C%20professional%20photography%20of%20healthcare%20technology%2C%20advanced%20robotic%20helper%20with%20medical%20equipment%20attachments&width=600&height=400&seq=project-5&orientation=landscape",
              },
              {
                title: "Solar Tracking System",
                category: "Renewable Energy",
                description:
                  "Automated solar panel array that optimizes energy collection throughout the day.",
                image:
                  "https://readdy.ai/api/search-image?query=futuristic%20solar%20panel%20array%20with%20robotic%20tracking%20system%2C%20glowing%20cyan%20details%20on%20mechanical%20parts%2C%20dark%20environment%20with%20solar%20panels%20capturing%20light%2C%20professional%20photography%20of%20renewable%20energy%20technology%2C%20advanced%20positioning%20system%20with%20sleek%20design&width=600&height=400&seq=project-6&orientation=landscape",
              },
            ]
              .slice(0, 3)
              .map((project, index) => (
                <div
                  key={index}
                  className="bg-[#0d0d1a]/70 border text-[#E53935] hover:text-[#2196F3] border-[#E53935]/50 rounded-2xl backdrop-blur-xl overflow-hidden group hover:border-[#2196F3]/10 hover:shadow-[0_0_30px_rgba(0,110,210,1)] hover:cursor-pointer transition-all duration-300"
                >
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={project.image}
                      alt={`Image of ${project.title}`}
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0d0d1a] to-transparent opacity-80"></div>
                    <div className="absolute top-4 left-4">
                      <span className="bg-[#E53935] text-black text-xs font-semibold px-3 py-1 rounded-full">
                        {project.category}
                      </span>
                    </div>
                  </div>
                  <div className="p-5 ">
                    <h3 className="text-xl font-bold font-['Orbitron'] transition-colors duration-300">
                      {project.title}
                    </h3>
                    <p className="text-gray-300 font-['Roboto'] text-sm mt-2 line-clamp-3">
                      {project.description}
                    </p>
                    <div className="mt-4 flex justify-between items-center">
                      <button className="hover:scale-110 font-medium text-sm transition-colors duration-300">
                        View Details <i className="fas fa-arrow-right ml-2"></i>
                      </button>
                      <div className="w-8 h-8 rounded-full border   bg-[#0d0d1a] flex items-center justify-center hover:bg-[#2196F3]/20 transition-all duration-300">
                        <i className="fas fa-code text-sm"></i>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
          </div>

          <div className="text-center mt-12">
            <button
              onClick={handleViewAllProjects}
              className="bg-[#E53935] text-black font-['Orbitron'] text-md font-semibold px-5 py-2 rounded-lg transition-all duration-300
                     hover:text-white hover:scale-105 hover:bg-[#2196F3] hover:shadow-[0_0_10px_#2196F3] hover:cursor-pointer"
            >
              View All Projects{" "}
              <i className="fas fa-chevron-right ml-2 text-sm"></i>
            </button>
          </div>
        </div>
      </section>

      {/* Competitions Section */}
      <section className="py-20 relative">
        <div className="container mx-auto px-6">
          <div className="text-center ">
            <h2 className="font-['Orbitron'] text-3xl font-bold mb-4 text-white">
              Competition <span className="text-[#E53935]">Showcase</span>
            </h2>
            <p className="font-['Roboto'] text-gray-300 max-w-2xl mx-auto">
              Our team regularly participates in national and international
              robotics competitions, demonstrating our technical prowess and
              innovative solutions.
            </p>
          </div>

          <div className="relative">
            <div className="overflow-x-auto py-8">
              <div className="flex space-x-6 min-w-max px-4">
                {[
                  {
                    name: "RoboWars 2025",
                    date: "March 2025",
                    position: "1st Place",
                    category: "Combat Robotics",
                    image:
                      "https://readdy.ai/api/search-image?query=futuristic%20robot%20battle%20arena%20with%20glowing%20cyan%20and%20purple%20lighting%2C%20dark%20environment%20with%20dramatic%20spotlights%2C%20advanced%20combat%20robots%20with%20mechanical%20details%2C%20professional%20event%20photography%20with%20audience%20silhouettes%2C%20high-tech%20competition%20stage&width=500&height=300&seq=comp-1&orientation=landscape",
                  },
                  {
                    name: "TechFest Autonomous Challenge",
                    date: "January 2025",
                    position: "2nd Place",
                    category: "Autonomous Navigation",
                    image:
                      "https://readdy.ai/api/search-image?query=autonomous%20robot%20competition%20with%20obstacle%20course%2C%20glowing%20cyan%20and%20purple%20track%20markers%2C%20dark%20environment%20with%20focused%20lighting%20on%20robots%2C%20professional%20event%20photography%20of%20technical%20challenge%2C%20advanced%20robots%20navigating%20complex%20terrain&width=500&height=300&seq=comp-2&orientation=landscape",
                  },
                  {
                    name: "International Robotics Olympiad",
                    date: "November 2024",
                    position: "Gold Medal",
                    category: "Multi-domain Challenge",
                    image:
                      "https://readdy.ai/api/search-image?query=international%20robotics%20competition%20with%20multiple%20teams%20and%20robots%2C%20large%20arena%20with%20glowing%20cyan%20and%20purple%20lighting%20elements%2C%20dark%20environment%20with%20spotlights%20on%20competition%20floor%2C%20professional%20event%20photography%20of%20global%20robotics%20challenge%2C%20advanced%20robots%20performing%20complex%20tasks&width=500&height=300&seq=comp-3&orientation=landscape",
                  },
                  {
                    name: "Underwater Robotics Challenge",
                    date: "September 2024",
                    position: "1st Place",
                    category: "Marine Robotics",
                    image:
                      "https://readdy.ai/api/search-image?query=underwater%20robotics%20competition%20in%20large%20pool%2C%20robots%20with%20glowing%20cyan%20and%20purple%20lights%20underwater%2C%20dark%20environment%20with%20blue%20lighting%2C%20professional%20event%20photography%20of%20marine%20robotics%20challenge%2C%20advanced%20underwater%20vehicles%20performing%20precision%20tasks&width=500&height=300&seq=comp-4&orientation=landscape",
                  },
                  {
                    name: "Drone Racing League",
                    date: "July 2024",
                    position: "3rd Place",
                    category: "Aerial Robotics",
                    image:
                      "https://readdy.ai/api/search-image?query=drone%20racing%20competition%20with%20glowing%20cyan%20and%20purple%20LED%20course%20markers%2C%20dark%20arena%20with%20neon%20lighting%20tracks%2C%20professional%20event%20photography%20of%20high-speed%20aerial%20robots%2C%20advanced%20racing%20drones%20navigating%20through%20illuminated%20obstacles&width=500&height=300&seq=comp-5&orientation=landscape",
                  },
                ]
                  .slice(0, 4)
                  .map((competition, index) => (
                    <div
                      key={index}
                      className="backdrop-blur-md bg-[#1a1a2e]/50 border border-[#E53935]/50 rounded-xl w-85 group flex-shrink-0 transition-all duration-300 hover:border-[#2196F3]/20 hover:shadow-[0_0_25px_rgba(0,110,210,1)] cursor-pointer"
                    >
                      <div className="relative overflow-hidden rounded-xl">
                        <img
                          src={competition.image}
                          alt={competition.name}
                          className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#0f0f1c] to-transparent opacity-70"></div>
                        <div className="absolute top-4 left-4">
                          <span className="bg-[#E53935] backdrop-blur-sm text-xs font-['Roboto'] px-3 py-1 rounded-full text-black font-medium group-hover:bg-[#2196F3] transition-transform duration-500">
                            {competition.date}
                          </span>
                        </div>
                        <div className="absolute bottom-4 right-4">
                          <span className="bg-[#E53935] backdrop-blur-sm text-xs font-['Roboto'] px-3 py-1 rounded-full text-white group-hover:bg-[#2196F3] transition-transform duration-500">
                            {competition.category}
                          </span>
                        </div>
                      </div>
                      <div className="p-6">
                        <div className="flex items-start justify-between mb-3">
                          <h3 className="font-['Orbitron'] text-lg font-bold text-white transition-colors duration-300 pr-2">
                            {competition.name}
                          </h3>
                          <div className="flex-shrink-0 bg-[#1a1a2e] border border-[#E53935]/30 rounded-full px-3 py-1 group-hover:bg-[#2196F3]/30 group-hover:border-[#2196F3]/30 transition-transform duration-300">
                            <span className="font-['Orbitron'] text-xs text-[#E53935] group-hover:text-[#2196F3]">
                              {competition.position}
                            </span>
                          </div>
                        </div>
                        <div className="flex justify-between items-center mt-4">
                          <button className="font-['Roboto'] text-sm text-[#E53935] hover:scale-110 group-hover:text-[#2196F3] transition-all duration-300  flex items-center !rounded-button whitespace-nowrap cursor-pointer">
                            View Details
                            <i className="fas fa-arrow-right ml-2 group-hover:ml-3 transition-all duration-300"></i>
                          </button>
                          <div className="w-8 h-8 rounded-full flex items-center justify-center border border-[#E53935]/50 group-hover:border-[#2196F3]/50 bg-[#1a1a2e]  transition-all duration-300">
                            <i className="fas fa-trophy text-[#E53935] group-hover:text-[#2196F3] text-sm"></i>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>

          <div className="text-center mt-6">
            <button className="bg-[#E53935] text-black font-['Orbitron'] text-md font-semibold px-5 py-2 rounded-lg transition-all duration-300 hover:text-white hover:scale-105 hover:bg-[#2196F3] hover:shadow-[0_0_10px_#2196F3] hover:cursor-pointer">
              View All Competitions{" "}
              <i className="fas fa-chevron-right ml-2 text-sm"></i>
            </button>
          </div>
        </div>
      </section>

      {/* Team Preview Section */}
      <section className="py-20 relative">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="font-['Orbitron'] text-3xl font-bold mb-4 text-white">
              Meet Our <span className="text-[#E53935]">Team</span>
            </h2>
            <p className="font-['Roboto'] text-gray-300 max-w-2xl mx-auto">
              Our diverse team brings together the brightest minds from various
              engineering disciplines to create cutting-edge robotic solutions.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                name: "Alex Chen",
                role: "Team Lead",
                specialty: "Systems Integration",
                image:
                  "https://readdy.ai/api/search-image?query=professional%20portrait%20of%20young%20Asian%20male%20engineer%20in%20dark%20environment%20with%20subtle%20cyan%20lighting%2C%20serious%20expression%2C%20wearing%20tech%20company%20t-shirt%2C%20clean%20background%2C%20high%20quality%20professional%20headshot&width=300&height=300&seq=team-1&orientation=squarish",
              },
              {
                name: "Sophia Rodriguez",
                role: "Mechanical Lead",
                specialty: "Structural Design",
                image:
                  "https://readdy.ai/api/search-image?query=professional%20portrait%20of%20young%20Hispanic%20female%20engineer%20in%20dark%20environment%20with%20subtle%20purple%20lighting%2C%20confident%20expression%2C%20wearing%20tech%20company%20t-shirt%2C%20clean%20background%2C%20high%20quality%20professional%20headshot&width=300&height=300&seq=team-2&orientation=squarish",
              },
              {
                name: "Marcus Johnson",
                role: "Electronics Lead",
                specialty: "Circuit Design",
                image:
                  "https://readdy.ai/api/search-image?query=professional%20portrait%20of%20young%20Black%20male%20engineer%20in%20dark%20environment%20with%20subtle%20cyan%20lighting%2C%20friendly%20expression%2C%20wearing%20tech%20company%20t-shirt%2C%20clean%20background%2C%20high%20quality%20professional%20headshot&width=300&height=300&seq=team-3&orientation=squarish",
              },
              {
                name: "Aisha Patel",
                role: "Software Lead",
                specialty: "AI & Machine Learning",
                image:
                  "https://readdy.ai/api/search-image?query=professional%20portrait%20of%20young%20Indian%20female%20engineer%20in%20dark%20environment%20with%20subtle%20purple%20lighting%2C%20intelligent%20expression%2C%20wearing%20tech%20company%20t-shirt%2C%20clean%20background%2C%20high%20quality%20professional%20headshot&width=300&height=300&seq=team-4&orientation=squarish",
              },
            ]
              .slice(0, 4)
              .map((member, index) => (
                <div
                  key={index}
                  className="backdrop-blur-md bg-[#1a1a2e]/50 border border-[#E53935]/50 rounded-xl overflow-hidden transition-all duration-300 hover:shadow-[0_0_25px_rgba(0,110,210,1)] hover:border-[#2196F3]/40 group cursor-pointer"
                >
                  <div className="p-6 flex flex-col items-center">
                    <div className="relative w-32 h-32 mb-6">
                      <div className="absolute inset-0 rounded-full border-2 border-[#2196F3] opacity-0 group-hover:opacity-100 transition-all duration-750 scale-110 group-hover:scale-100"></div>
                      <img
                        src={member.image}
                        alt={member.name}
                        className="w-full h-full object-cover object-top rounded-full border-2 border-[#E53935]/70 group-hover:border-[#E53935] transition-all duration-300"
                      />
                      <div className="absolute -right-2 -bottom-2 w-8 h-8 rounded-full bg-[#1a1a2e] border border-[#E53935]/50 flex items-center justify-center group-hover:bg-[#2196F3] group-hover:border-[#2196F3]/50 transition-all duration-300">
                        <i className="fas fa-plus text-[#E53935] group-hover:text-[#1a1a2e] transition-all duration-300"></i>
                      </div>
                    </div>
                    <h3 className="font-['Orbitron'] text-xl font-bold mb-1 text-[#E53935] group-hover:text-[#2196F3] transition-colors duration-300 text-center">
                      {member.name}
                    </h3>
                    <p className="font-['Roboto'] text-white text-sm mb-2 text-center">
                      {member.role}
                    </p>
                    <p className="font-['Roboto'] text-gray-400 text-sm mb-4 text-center">
                      {member.specialty}
                    </p>
                    <div className="flex space-x-3">
                      <a
                        href="#"
                        className="w-8 h-8 rounded-full flex items-center justify-center border border-[#E53935] group-hover:border-[#2196F3] bg-[#1a1a2e]  hover:bg-[#2196F3]/20 hover:scale-120 transition-all duration-300 cursor-pointer"
                      >
                        <i className="fab fa-linkedin-in text-[#E53935] group-hover:text-[#2196F3] transition-all duration-300 text-sm"></i>
                      </a>
                      <a
                        href="#"
                        className="w-8 h-8 rounded-full flex items-center justify-center border border-[#E53935] group-hover:border-[#2196F3] bg-[#1a1a2e] hover:bg-[#2196F3]/20 hover:scale-120 transition-all duration-300 cursor-pointer"
                      >
                        <i className="fab fa-instagram text-[#E53935] group-hover:text-[#2196F3] transition-all duration-300 text-xl"></i>
                      </a>
                      <a
                        href="#"
                        className="w-8 h-8 rounded-full flex items-center justify-center border border-[#E53935] group-hover:border-[#2196F3] bg-[#1a1a2e] hover:bg-[#2196F3]/20 hover:scale-120 transition-all duration-300 cursor-pointer"
                      >
                        <i className="fas fa-envelope text-[#E53935] group-hover:text-[#2196F3] transition-all duration-300 text-sm"></i>
                      </a>
                    </div>
                  </div>
                </div>
              ))}
          </div>

          <div className="text-center mt-12">
            <button className="bg-[#E53935] text-black font-['Orbitron'] text-md font-semibold px-5 py-2 rounded-lg transition-all duration-300 hover:text-white hover:scale-105 hover:bg-[#2196F3] hover:shadow-[0_0_10px_#2196F3] hover:cursor-pointer">
              Meet The Full Team{" "}
              <i className="fas fa-chevron-right ml-2 text-sm"></i>
            </button>
          </div>
        </div>
      </section>

      {/* Blog Preview */}
      <section className="py-20 relative">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="font-['Orbitron'] text-3xl font-bold mb-4 text-white">
              Latest <span className="text-[#E53935]">Blog Posts</span>
            </h2>
            <p className="font-['Roboto'] text-gray-300 max-w-2xl mx-auto">
              Stay updated with our latest projects, technical insights, and
              team achievements through our blog.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                title: "Advancing Hexapod Locomotion: Our Latest Breakthrough",
                date: "April 20, 2025",
                readTime: "8 min read",
                category: "Technical",
                excerpt:
                  "Discover how our team solved complex terrain navigation challenges with our new adaptive gait algorithm for hexapod robots.",
                image:
                  "https://readdy.ai/api/search-image?query=close-up%20of%20hexapod%20robot%20legs%20in%20motion%20on%20rough%20terrain%2C%20with%20glowing%20cyan%20joints%20and%20sensors%2C%20dark%20environment%20with%20dramatic%20lighting%20on%20mechanical%20parts%2C%20professional%20photography%20of%20advanced%20robotics%20in%20action%2C%20detailed%20mechanical%20engineering&width=700&height=400&seq=blog-1&orientation=landscape",
              },
              {
                title:
                  "From Concept to Competition: Building Our Award-Winning AquaBot",
                date: "April 15, 2025",
                readTime: "12 min read",
                category: "Case Study",
                excerpt:
                  "A behind-the-scenes look at the development process of our underwater robot that won first place at the International Marine Robotics Challenge.",
                image:
                  "https://readdy.ai/api/search-image?query=underwater%20robot%20being%20tested%20in%20water%20tank%20with%20glowing%20purple%20and%20cyan%20details%2C%20engineers%20working%20around%20test%20pool%2C%20dark%20environment%20with%20blue%20lighting%2C%20professional%20photography%20of%20marine%20robotics%20development%2C%20advanced%20underwater%20vehicle%20with%20visible%20sensors%20and%20cameras&width=700&height=400&seq=blog-2&orientation=landscape",
              },
            ]
              .slice(0, 2)
              .map((post, index) => (
                <div
                  key={index}
                  className="backdrop-blur-md bg-[#1a1a2e]/50 border border-[#E53935]/50 rounded-xl overflow-hidden transition-all duration-300 hover:shadow-[0_0_25px_rgba(0,110,210,1)] hover:border-[#2196F3]/40 group cursor-pointer"
                >
                  <div className="relative h-64 overflow-hidden">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0f0f1c] to-transparent opacity-70"></div>
                    <div className="absolute top-4 left-4">
                      <span className="bg-[#E53935] backdrop-blur-sm text-xs font-['Roboto'] px-3 py-1 rounded-full text-black group-hover:bg-[#2196F3] transition-transform duration-300 font-medium">
                        {post.date}
                      </span>
                    </div>
                    <div className="absolute bottom-4 right-4">
                      <span className="bg-[#E53935] backdrop-blur-sm text-xs font-['Roboto'] px-3 py-1 rounded-full text-white group-hover:bg-[#2196F3] transition-transform duration-300">
                        {post.category}
                      </span>
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center mb-3">
                      <i className="far fa-clock text-[#E53935] group-hover:text-[#2196F3] transition-all duration-300 mr-2"></i>
                      <span className="font-['Roboto'] text-xs text-gray-400">
                        {post.readTime}
                      </span>
                    </div>
                    <h3 className="font-['Orbitron'] text-xl font-bold mb-3 text-[#E53935] group-hover:text-[#2196F3] transition-colors duration-300">
                      {post.title}
                    </h3>
                    <p className="font-['Roboto'] text-gray-300 text-sm mb-4">
                      {post.excerpt}
                    </p>
                    <div className="flex justify-between items-center">
                      <button className="font-['Roboto'] text-sm text-[#E53935] group-hover:text-[#2196F3] transition-colors duration-300 flex items-center !rounded-button whitespace-nowrap cursor-pointer">
                        Read Article
                        <i className="fas fa-arrow-right ml-2 group-hover:ml-3 transition-all duration-300"></i>
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

          <div className="text-center mt-12">
            <button className="bg-[#E53935] text-black font-['Orbitron'] text-md font-semibold px-5 py-2 rounded-lg transition-all duration-300 hover:text-white hover:scale-105 hover:bg-[#2196F3] hover:shadow-[0_0_10px_#2196F3] hover:cursor-pointer">
              View All Blogs{" "}
              <i className="fas fa-chevron-right ml-2 text-sm"></i>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
