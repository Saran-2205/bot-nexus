import { useState } from "react";
import "@fortawesome/fontawesome-free/css/all.min.css";

const Project = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("All");
  const [sortOption, setSortOption] = useState("Latest");
  const [showSortDropdown, setShowSortDropdown] = useState(false);

  const filters = ["All", "Completed", "Ongoing", "Upcoming"];
  const sortOptions = ["Latest", "Oldest", "Priority"];
  const projects = [
    {
      id: 1,
      title: "Quantum Neural Interface",
      category: "AI",
      progress: 78,
      team: ["Alex K.", "Sarah M.", "David L."],
      technologies: ["Quantum Computing", "Neural Networks", "Cybernetics"],
      resources: 65,
      lastUpdate: "12h ago",
      aiStatus: "Learning",
      deploymentStatus: "Testing",
      imagePrompt:
        "Futuristic quantum neural interface with glowing blue circuits and holographic brain patterns, sleek metallic surface with neon blue lights, cyberpunk style, dark background with subtle grid patterns, high-tech laboratory environment, ultra detailed, cinematic lighting, 8k resolution",
    },
    {
      id: 2,
      title: "Exoskeleton Mark IV",
      category: "Robotics",
      progress: 42,
      team: ["James W.", "Elena R."],
      technologies: ["Hydraulics", "Carbon Fiber", "Motion Sensors"],
      resources: 89,
      lastUpdate: "3d ago",
      aiStatus: "Optimizing",
      deploymentStatus: "Prototype",
      imagePrompt:
        "Advanced robotic exoskeleton with glowing blue power lines and articulated joints, matte black carbon fiber surface with neon cyan accents, futuristic military design, dark tech lab environment, cyberpunk aesthetic, ultra detailed mechanical parts, dramatic lighting, 8k resolution",
    },
    {
      id: 3,
      title: "Autonomous Drone Swarm",
      category: "Automation",
      progress: 91,
      team: ["Michael T.", "Olivia P.", "Robert K."],
      technologies: [
        "Swarm Intelligence",
        "Computer Vision",
        "Lightweight Materials",
      ],
      resources: 72,
      lastUpdate: "6h ago",
      aiStatus: "Deployed",
      deploymentStatus: "Active",
      imagePrompt:
        "Futuristic drone swarm with sleek hexagonal designs and glowing blue propulsion systems, carbon fiber bodies with neon purple accents, synchronized flight pattern in dark environment with grid patterns, cyberpunk aesthetic, advanced technology, dramatic backlighting, ultra detailed, 8k resolution",
    },
    {
      id: 4,
      title: "Synthetic Consciousness",
      category: "Research",
      progress: 23,
      team: ["Emma L.", "John D."],
      technologies: [
        "Neural Mapping",
        "Quantum Processing",
        "Consciousness Models",
      ],
      resources: 95,
      lastUpdate: "1d ago",
      aiStatus: "Experimental",
      deploymentStatus: "Lab Only",
      imagePrompt:
        "Abstract visualization of synthetic consciousness with interconnected neural pathways glowing with blue and purple energy, floating in dark space with subtle grid patterns, futuristic laboratory equipment in background, cyberpunk aesthetic, holographic data streams, ultra detailed, dramatic lighting, 8k resolution",
    },
    {
      id: 5,
      title: "Bionic Prosthetics",
      category: "Robotics",
      progress: 67,
      team: ["Thomas H.", "Sophia C.", "Daniel M."],
      technologies: ["Biomechanics", "Neural Interface", "Synthetic Muscle"],
      resources: 81,
      lastUpdate: "2d ago",
      aiStatus: "Calibrating",
      deploymentStatus: "Clinical Trial",
      imagePrompt:
        "Advanced bionic arm prosthetic with exposed mechanical internals and glowing blue neural interface connections, carbon fiber and titanium construction with neon cyan accents, cyberpunk medical laboratory environment, dark background with subtle tech patterns, ultra detailed mechanical components, dramatic lighting, 8k resolution",
    },
    {
      id: 6,
      title: "Quantum Encryption Protocol",
      category: "AI",
      progress: 85,
      team: ["Lisa R.", "Kevin T."],
      technologies: [
        "Quantum Entanglement",
        "Cryptography",
        "Security Protocols",
      ],
      resources: 58,
      lastUpdate: "8h ago",
      aiStatus: "Secure",
      deploymentStatus: "Implementation",
      imagePrompt:
        "Abstract visualization of quantum encryption with interlocking geometric patterns and glowing blue encryption keys, digital security interface with neon purple data streams, dark technological environment with grid patterns, cyberpunk aesthetic, holographic code elements, ultra detailed digital artifacts, dramatic lighting, 8k resolution",
    },
  ];
  const filteredProjects = projects.filter(project => {
    const matchesSearch = project.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = activeFilter === 'All' || project.category === activeFilter;
    return matchesSearch && matchesFilter;
  });

  const sortedProjects = [...filteredProjects].sort((a, b) => {
    switch (sortOption) {
      case 'Progress':
        return b.progress - a.progress;
      case 'Priority':
        return b.resources - a.resources;
      case 'Resources':
        return b.resources - a.resources;
      default:
        return b.id - a.id; // Latest by default
    }
  });
  const getStatusColor = (status) => {
  switch (status) {
    case 'Learning':
    case 'Optimizing':
    case 'Calibrating':
      return 'text-yellow-400';
    case 'Deployed':
    case 'Active':
    case 'Secure':
      return 'text-green-400';
    case 'Experimental':
      return 'text-purple-400';
    default:
      return 'text-blue-400';
  }
};

const getDeploymentColor = (status) => {
  switch (status) {
    case 'Testing':
    case 'Prototype':
      return 'text-yellow-400';
    case 'Active':
    case 'Implementation':
      return 'text-green-400';
    case 'Lab Only':
    case 'Clinical Trial':
      return 'text-purple-400';
    default:
      return 'text-blue-400';
  }
};
  return (
    <div className="mt-[67px]">
      <div className="min-h-screen bg-black text-white px-6 py-16 font-['Orbitron'] text-center">

        {/* Header */}
        <div className="mb-12 text-center">
          <h2 className="text-4xl font-bold mb-4">
            Project <span className="text-[#E53935]">Nexus</span>
          </h2>
          <p className="text-gray-400 font-['Roboto'] max-w-3xl mx-auto">
            Explore our cutting-edge robotics and AI projects pushing the
            boundaries of what's possible. From neural interfaces to autonomous
            systems, witness the future being built today.
          </p>
        </div>

        {/*Search & Filter*/}
        <div className="mb-8 bg-[#12121A] p-6 rounded-lg border border-[#E53935]/50 shadow-lg w-[90%] mx-auto">
          <div className="flex flex-col md:flex-row justify-between gap-4">
            <div className="relative flex-grow max-w-md">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <i className="fas fa-search text-gray-500"></i>
              </div>
              <input
                type="text"
                className="bg-[#0A0A0F] w-full pl-10 pr-4 py-3 rounded-lg border border-[#E53935]/50 focus:border-[#2196F3] focus:outline-none focus:ring-1 focus:ring-[#2196F3] text-sm"
                placeholder="Search projects..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                <div className="w-6 h-0.5 bg-gradient-to-r from-transparent via-[#2196F3] to-transparent animate-pulse"></div>
              </div>
            </div>

            <div className="flex flex-wrap gap-3">
              {filters.map((filter) => (
                <button
                  key={filter}
                  className={`px-4 py-2 rounded text-sm font-medium whitespace-nowrap cursor-pointer transition-all duration-300 ${
                    activeFilter === filter
                      ? "bg-[#E53935] text-black"
                      : "bg-[#1A1A25] text-gray-300 hover:bg-[#252535]"
                  }`}
                  onClick={() => setActiveFilter(filter)}
                >
                  <div className="flex items-center">
                    {activeFilter === filter && (
                      <div className="mr-2 w-2 h-2 rounded-full bg-black"></div>
                    )}
                    {filter}
                  </div>
                </button>
              ))}

              <div className="relative">
                <button
                  className="px-4 py-2 bg-[#1A1A25] rounded-button text-sm font-medium flex items-center whitespace-nowrap cursor-pointer"
                  onClick={() => setShowSortDropdown(!showSortDropdown)}
                >
                  <i className="fas fa-sort-amount-down mr-2 text-[#E53935]"></i>
                  {sortOption}
                  <i
                    className={`fas fa-chevron-down ml-2 transition-transform duration-300 ${
                      showSortDropdown ? "rotate-180" : ""
                    }`}
                  ></i>
                </button>

                {showSortDropdown && (
                  <div className="absolute right-0 mt-2 w-48 bg-[#1A1A25] border border-gray-700 rounded-lg shadow-lg z-10">
                    {sortOptions.map((option) => (
                      <button
                        key={option}
                        className="w-full text-left px-4 py-2 hover:text-[#2196F3] hover:bg-[#252535] text-sm whitespace-nowrap cursor-pointer"
                        onClick={() => {
                          setSortOption(option);
                          setShowSortDropdown(false);
                        }}
                      >
                        {option === sortOption && (
                          <i className="fas fa-check mr-2 text-[#2196F3]"></i>
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

        {/* Projects Card */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 w-[90%] mx-auto">
          {sortedProjects.map((project) => (
            <div
              key={project.id}
              className="bg-[#12121A] rounded-lg overflow-hidden border border-[#E53935]/60 hover:border-[#2196F3]/60 shadow-lg transition-transform duration-300 hover:transform group hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(0,110,210,1)] cursor-pointer"
            >
              <div className="h-48 overflow-hidden relative">
                <img
                  src={`https://readdy.ai/api/search-image?query=$%7Bproject.imagePrompt%7D&width=600&height=300&seq=${project.id}&orientation=landscape`}
                  alt={project.title}
                  className="w-full h-full object-cover object-top"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0f0f1c] to-transparent opacity-90"></div>
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <div className="flex justify-between items-end">
                    <h3 className="text-xl font-bold text-white">
                      {project.title}
                    </h3>
                    <span className="text-xs px-2 py-1 bg-[#1A1A25] rounded-full">
                      {project.category}
                    </span>
                  </div>
                </div>
              </div>

              <div className="p-5">
                <div className="mb-4">
                  <div className="flex justify-between text-sm text-gray-400 mb-1">
                    <span>Progress</span>
                    <span>{project.progress}%</span>
                  </div>
                  <div className="w-full h-2 bg-gray-800 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-[#00F0FF] to-[#FF00E5]"
                      style={{ width: `${project.progress}%` }}
                    ></div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="flex items-center">
                    <i className="fas fa-microchip text-[#00F0FF] mr-2"></i>
                    <div>
                      <div className="text-xs text-gray-400">AI Status</div>
                      <div
                        className={`text-sm font-medium ${getStatusColor(
                          project.aiStatus
                        )}`}
                      >
                        {project.aiStatus}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center">
                    <i className="fas fa-rocket text-[#FF00E5] mr-2"></i>
                    <div>
                      <div className="text-xs text-gray-400">Deployment</div>
                      <div
                        className={`text-sm font-medium ${getDeploymentColor(
                          project.deploymentStatus
                        )}`}
                      >
                        {project.deploymentStatus}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center">
                    <i className="fas fa-server text-[#00F0FF] mr-2"></i>
                    <div>
                      <div className="text-xs text-gray-400">Resources</div>
                      <div className="text-sm font-medium">
                        {project.resources}%
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center">
                    <i className="fas fa-clock text-[#FF00E5] mr-2"></i>
                    <div>
                      <div className="text-xs text-gray-400">Updated</div>
                      <div className="text-sm font-medium">
                        {project.lastUpdate}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="border-t border-gray-800 pt-4">
                  <div className="flex justify-between items-center">
                    <div className="flex -space-x-2">
                      {project.team.slice(0, 3).map((member, index) => (
                        <div
                          key={index}
                          className="w-8 h-8 rounded-full bg-[#1A1A25] border-2 border-[#12121A] flex items-center justify-center text-xs font-medium"
                          title={member}
                        >
                          {member
                            .split(" ")
                            .map((name) => name[0])
                            .join("")}
                        </div>
                      ))}
                      {project.team.length > 3 && (
                        <div className="w-8 h-8 rounded-full bg-[#1A1A25] border-2 border-[#12121A] flex items-center justify-center text-xs">
                          +{project.team.length - 3}
                        </div>
                      )}
                    </div>
                    <button className="w-8 h-8 rounded-full bg-[#1A1A25] flex items-center justify-center hover:bg-[#252535] transition-colors duration-300 !rounded-button whitespace-nowrap cursor-pointer">
                      <i className="fas fa-arrow-right text-[#00F0FF]"></i>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Project;
