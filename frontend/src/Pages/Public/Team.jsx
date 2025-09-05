import { useEffect, useState } from "react";
import LoadingSpinner from "../../Components/LoadingSpinner";

const Team = () => {
  const [teamMembers, setTeamMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const API = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchTeamMembers = async () => {
      try {
        const response = await fetch(`${API}/api/team`);
        if (!response.ok) {
          throw new Error("Failed to fetch team members");
        }
        const data = await response.json();
        setTeamMembers(data.teamMembers);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTeamMembers();
  }, [API]);

  // Group team members by role
  const teamLeads = teamMembers.filter(
    (member) =>
      member.designation?.toLowerCase().includes("team lead") ||
      member.designation?.toLowerCase().includes("director") ||
      member.designation?.toLowerCase().includes("team head")
  );

  const domainHeads = teamMembers.filter(
    (member) =>
      member.designation?.toLowerCase().includes("head") ||
      member.designation?.toLowerCase().includes("manager")
  );

  const regularMembers = teamMembers.filter(
    (member) => member.designation?.toLowerCase().includes("member")
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-white font-orbitron">
          <LoadingSpinner />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-red-500 font-roboto text-xl">Error: {error}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black py-8 pt-17 md:pt-17 px-5 sm:px-6 md:px-28">
      <div>
        <title>Our Team | Bot Nexus</title>
        <meta name="description" content="Meet our talented team members" />
      </div>

      <div className="max-w-7xl mx-auto py-8 md:py-17">
        {/* Header Section */}
        <div className="text-center mb-12 md:mb-16">
          <h1 className="text-3xl md:text-4xl text-white font-bold mb-4 md:mb-6 font-['Orbitron']">
            Meet Our <span className="text-red-500">Team</span>
          </h1>
          <p className="max-w-2xl mx-auto text-base md:text-xl text-gray-400 font-['Roboto'] px-4">
            The people quietly working behind the scenes, turning effort into
            steady progress
          </p>
        </div>

        {/* Leadership Section */}
        {teamLeads.length > 0 && (
          <div className="mb-16 md:mb-20">
            <SectionHeader
              title="Team Lead"
              accentColor="text-red-500"
              lineColor="bg-red-500"
            />
            <div className="justify-items-center">
              {teamLeads.map((member) => (
                <LeaderCard
                  key={member._id}
                  member={member}
                  accentColor="red"
                />
              ))}
            </div>
          </div>
        )}

        {/* Domain Heads Section */}
        {domainHeads.length > 0 && (
          <div className="mb-16 md:mb-20">
            <SectionHeader
              title="Domain Heads"
              accentColor="text-blue-500"
              lineColor="bg-blue-500"
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
              {domainHeads.map((member) => (
                <TeamMemberCard
                  key={member._id}
                  member={member}
                  accentColor="blue"
                />
              ))}
            </div>
          </div>
        )}

        {/* Team Members Section */}
        {regularMembers.length > 0 && (
          <div className="mb-16 md:mb-20">
            <SectionHeader
              title="Team Members"
              accentColor="text-amber-500"
              lineColor="bg-amber-500"
            />
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 md:gap-5">
              {regularMembers.map((member) => (
                <TeamMemberCard
                  key={member._id}
                  member={member}
                  accentColor="amber"
                  compact={true}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// Section Header Component
const SectionHeader = ({ title, accentColor, lineColor }) => {
  return (
    <div className="flex items-center mb-8 md:mb-10">
      <div className={`h-0.5 flex-grow ${lineColor}`}></div>
      <h2
        className={`mx-3 md:mx-4 text-xl md:text-2xl lg:text-3xl font-bold font-['Orbitron'] ${accentColor}`}
      >
        {title}
      </h2>
      <div className={`h-0.5 flex-grow ${lineColor}`}></div>
    </div>
  );
};

const colorClasses = {
  red: {
    solid: "bg-red-500",
    bg: "bg-red-900/20",
    border: "border-red-500/30",
    text: "text-red-400",
    light: "bg-red-400/10",
    socialHover: "hover:bg-red-500",
  },
  blue: {
    solid: "bg-blue-500",
    bg: "bg-blue-900/20",
    border: "border-blue-500/30",
    text: "text-blue-400",
    light: "bg-blue-400/10",
    socialHover: "hover:bg-blue-500",
  },
  amber: {
    solid: "bg-amber-500",
    bg: "bg-amber-900/20",
    border: "border-amber-500/30",
    text: "text-amber-400",
    light: "bg-amber-400/10",
    socialHover: "hover:bg-amber-500",
  },
};

const LeaderCard = ({ member, accentColor = "red" }) => {
  const colors = colorClasses[accentColor];
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div
      className={`relative w-full max-w-4xl rounded-2xl overflow-hidden ${colors.bg} border ${colors.border} backdrop-blur-sm p-4 md:p-6 mx-auto flex flex-col ${isMobile ? '' : 'md:flex-row'} items-center ${isMobile ? '' : 'md:items-start'} gap-6 md:gap-8`}
    >
      {/* Left Side: Avatar + Info */}
      <div className={`flex flex-col items-center gap-4 md:gap-6 ${isMobile ? 'w-full' : 'md:w-1/3'}`}>
        <div className="relative w-32 h-32 md:w-40 md:h-40">
          <img
            src={member.image || "/default-avatar.png"}
            alt={member.name}
            className="w-full h-full object-cover rounded-full border-2 border-white/10"
          />
          <div
            className={`absolute -bottom-2 -right-2 w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center ${colors.solid}`}
          >
            <i className="fas fa-crown text-white text-sm md:text-base"></i>
          </div>
        </div>

        <div className="text-center">
          <h3 className="font-['Orbitron'] text-xl md:text-2xl font-bold text-white mb-1">
            {member.name}
          </h3>
          <p className={`font-['Roboto'] font-medium ${colors.text} mb-1 text-sm md:text-base`}>
            {member.designation}
          </p>
          <p className="font-['Roboto'] text-gray-400 text-sm">
            {member.specialization}
          </p>
        </div>

        {/* Skills */}
        <div className="flex flex-wrap gap-2 justify-center">
          {(member.skills || []).map((skill, i) => (
            <span
              key={i}
              className={`text-xs px-2 py-1 md:px-3 md:py-1 rounded-full font-['Roboto'] ${colors.light} ${colors.text} border ${colors.border}`}
            >
              {skill}
            </span>
          ))}
        </div>
      </div>

      {/* Right Side: About + Social Links */}
      <div className={`flex flex-col ${isMobile ? 'w-full' : 'md:w-2/3'} gap-4 md:gap-6 justify-center`}>
        {member.comment && (
          <div>
            <h4 className="font-['Orbitron'] text-xl md:text-2xl font-bold text-white mb-2">
              About
            </h4>
            <p className="font-['Roboto'] text-gray-300 text-base md:text-lg">
              {member.comment}
            </p>
          </div>
        )}

        <div className="flex flex-wrap gap-2 md:gap-3 mt-2 justify-center md:justify-start">
          {member.socialLinks?.gmail && (
            <a
              href={`mailto:${member.socialLinks.gmail}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-3 py-2 md:px-4 md:py-2 rounded-lg bg-white/10 text-white hover:bg-white/20 text-sm"
            >
              <i className="fas fa-envelope"></i>
              <span className="inline">Email</span>
            </a>
          )}
          {member.socialLinks?.linkedin && (
            <a
              href={member.socialLinks.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-3 py-2 md:px-4 md:py-2 rounded-lg bg-white/10 text-white hover:bg-white/20 text-sm"
            >
              <i className="fab fa-linkedin-in"></i>
              <span className="inline">LinkedIn</span>
            </a>
          )}
          {member.socialLinks?.instagram && (
            <a
              href={member.socialLinks.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-3 py-2 md:px-4 md:py-2 rounded-lg bg-white/10 text-white hover:bg-white/20 text-sm"
            >
              <i className="fab fa-instagram"></i>
              <span className="hidden sm:inline">Instagram</span>
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

// Team Member Card Component
const TeamMemberCard = ({ member, accentColor = "blue", compact = false }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const colors = colorClasses[accentColor];
  const isMobile = window.innerWidth < 768;

  if (compact) {
    return (
      <>
        <div
          className={`relative rounded-xl overflow-hidden transition-all duration-300 ${colors.bg} border ${colors.border} backdrop-blur-sm cursor-pointer`}
          onMouseEnter={() => !isMobile && setIsHovered(true)}
          onMouseLeave={() => !isMobile && setIsHovered(false)}
          onClick={() => setShowModal(true)}
          style={{
            transform: isHovered ? "translateY(-5px)" : "none",
            boxShadow: isHovered ? `0 10px 20px ${colors.border}` : "none",
          }}
        >
          <div className="p-2 md:p-4">
            <div className="relative mx-auto w-20 h-20 md:w-30 md:h-30 mb-2 md:mb-3">
              <img
                src={member.image || "/default-avatar.png"}
                alt={member.name}
                className="w-full h-full object-cover rounded-full border-2 border-white/10"
              />
            </div>
            <div className="text-center">
              <h3 className="font-['Roboto'] font-medium text-white text-sm md:text-sm truncate px-1">
                {member.name}
              </h3>
              <p className={`font-['Roboto'] ${colors.text} truncate text-xs mt-1 md:mt-2 px-1`}>
                {member.specialization}
              </p>
            </div>
          </div>
        </div>
        {showModal && (
          <MemberModal
            member={member}
            onClose={() => setShowModal(false)}
            accentColor={accentColor}
          />
        )}
      </>
    );
  }

  return (
    <>
      <div
        className={`relative rounded-xl overflow-hidden transition-all duration-300 ${colors.bg} border ${colors.border} backdrop-blur-sm cursor-pointer`}
        onMouseEnter={() => !isMobile && setIsHovered(true)}
        onMouseLeave={() => !isMobile && setIsHovered(false)}
        onClick={() => setShowModal(true)}
        style={{
          transform: isHovered ? "translateY(-5px)" : "none",
          boxShadow: isHovered ? `0 10px 20px ${colors.border}` : "none",
        }}
      >
        <div className="p-4 md:p-5">
          <div className="relative mx-auto w-24 h-24 md:w-32 md:h-32 mb-3 md:mb-4">
            <img
              src={member.image || "/default-avatar.png"}
              alt={member.name}
              className="w-full h-full object-cover rounded-full border-2 border-white/10"
            />
          </div>
          <div className="text-center">
            <h3 className="font-['Roboto'] font-medium text-white mb-1 text-sm md:text-base">
              {member.name}
            </h3>
            <p
              className={`font-['Roboto'] text-xs md:text-sm font-medium mb-1 md:mb-2 ${colors.text}`}
            >
              {member.designation}
            </p>
            <p className="font-['Roboto'] text-gray-400 text-xs mb-2 md:mb-3">
              {member.specialization}
            </p>
            <div className="flex flex-wrap gap-1 justify-center mb-3 md:mb-4">
              {(member.skills || []).slice(0, 2).map((skill, i) => (
                <span
                  key={i}
                  className={`text-xs px-2 py-1 rounded-full font-['Roboto'] ${colors.light} ${colors.text}`}
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
      {showModal && (
        <MemberModal
          member={member}
          onClose={() => setShowModal(false)}
          accentColor={accentColor}
        />
      )}
    </>
  );
};

// Member Modal Component
const MemberModal = ({ member, onClose, accentColor = "blue" }) => {
  const colors = colorClasses[accentColor];
  const isMobile = window.innerWidth < 768;
  
  useEffect(() => {
    // Prevent background scrolling when modal is open
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div
        className={`relative max-w-2xl w-full rounded-2xl overflow-hidden ${colors.bg} border ${colors.border} backdrop-blur-md max-h-[90vh] overflow-y-auto`}
      >
        <button
          onClick={onClose}
          className="absolute top-3 right-3 md:top-4 md:right-4 w-7 h-7 md:w-8 md:h-8 cursor-pointer rounded-full flex items-center justify-center bg-white/10 text-white hover:bg-white/20 z-10"
        >
          <i className="fas fa-times"></i>
        </button>
        <div className="p-4 md:p-6 lg:p-8">
          <div className={`flex ${isMobile ? 'flex-col items-center' : 'flex-row items-start'} gap-4 md:gap-6 mb-4 md:mb-6`}>
            <div className={`relative ${isMobile ? 'w-28 h-28' : 'w-30 h-30 md:w-44 md:h-44'} flex-shrink-0`}>
              <img
                src={member.image || "/default-avatar.png"}
                alt={member.name}
                className="w-full h-full object-cover rounded-full border-2 border-white/10"
              />
            </div>
            <div className={`${isMobile ? 'text-center' : 'text-left'} flex-grow`}>
              <h3 className="font-['Orbitron'] text-xl md:text-2xl font-bold text-white mb-2">
                {member.name}
              </h3>
              <p
                className={`font-['Roboto'] text-base md:text-lg font-medium mb-1 ${colors.text}`}
              >
                {member.designation}
              </p>
              <p className="font-['Roboto'] text-gray-400 text-sm md:text-base">
                {member.specialization}
              </p>
              <div className="flex flex-wrap gap-2 mt-3 justify-center md:justify-start">
                {(member.skills || []).map((skill, i) => (
                  <span
                    key={i}
                    className={`text-xs px-2 py-1 rounded-full font-['Roboto'] ${colors.light} ${colors.text}`}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
          {member.comment && (
            <div className="mb-4 md:mb-6">
              <h4 className="font-['Orbitron'] text-lg md:text-xl font-bold text-white mb-2 md:mb-3">
                About
              </h4>
              <p className="font-['Roboto'] text-gray-300 text-sm md:text-base">{member.comment}</p>
            </div>
          )}
          <div className="flex flex-wrap gap-2 justify-center md:justify-start">
            {member.socialLinks?.gmail && (
              <a
                href={`mailto:${member.socialLinks.gmail}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-3 py-2 md:px-4 md:py-2 rounded-lg bg-white/10 text-white hover:bg-white/20 text-sm"
              >
                <i className="fas fa-envelope"></i>
                <span>Email</span>
              </a>
            )}
            {member.socialLinks?.linkedin && (
              <a
                href={member.socialLinks.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-3 py-2 md:px-4 md:py-2 rounded-lg bg-white/10 text-white hover:bg-white/20 text-sm"
              >
                <i className="fab fa-linkedin-in"></i>
                <span>LinkedIn</span>
              </a>
            )}
            {member.socialLinks?.instagram && (
              <a
                href={member.socialLinks.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-3 py-2 md:px-4 md:py-2 rounded-lg bg-white/10 text-white hover:bg-white/20 text-sm"
              >
                <i className="fab fa-instagram"></i>
                <span>Instagram</span>
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Team;