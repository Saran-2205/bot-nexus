import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { FaUserTie, FaUserGraduate, FaRobot, FaTools, FaRocket, FaAward, FaHandshake, FaClipboardList, FaTrophy, FaUsers } from 'react-icons/fa';

const AboutUs = () => {
  const [teamMembers, setTeamMembers] = useState([]);

  const API = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchTeamMembers = async () => {
      const response = await fetch(`${API}/api/team`);
      const data = await response.json();
      setTeamMembers(data.teamMembers);
    };

    fetchTeamMembers();
  }, [API]);

  const faculty = teamMembers.filter(member => member.designation.toLowerCase().includes('professor') );

  const {
    data: achievements
  } = useQuery({
    queryKey: ["achievements"],
    queryFn: async () => {
      const res = await axios.get(`${API}/api/admin/achievements`);
      return res.data;
    }
  });

  const values = [
    {
      icon: "🔬",
      title: "Innovation",
      description: "We push boundaries and explore new frontiers in robotics technology, encouraging creative problem-solving and out-of-the-box thinking."
    },
    {
      icon: "🤝",
      title: "Collaboration",
      description: "We believe in the power of teamwork, sharing knowledge, and learning from each other to achieve collective success."
    },
    {
      icon: "🎯",
      title: "Excellence",
      description: "We strive for the highest standards in everything we do, from project execution to competition performance."
    },
    {
      icon: "🌱",
      title: "Learning",
      description: "We foster a culture of continuous learning, mentoring, and skill development for all our members."
    }
  ];

  return (
    <div className="bg-black text-gray-200 min-h-screen font-['Roboto']">
      <div>
        <title>Our Story | Bot Nexus</title>
        <meta name="description" content="Learn about the journey and mission of Bot Nexus" />
      </div>

      {/* Header */}
      <section className="bg-black pt-20 md:pt-20 md:py-10 px-4 md:px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold font-['Orbitron'] pt-8 md:pt-10 mb-4 md:mb-6">
            About <span className="text-[#E53935]">Bot <span className="text-[#2196F3]">Nexus</span></span>
          </h1>
          <p className="text-lg md:text-xl text-gray-300 max-w-5xl mx-auto leading-relaxed">
            The Official Robotics Club of the Department of Manufacturing Engineering, CEG, Anna University
          </p>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4 md:px-6 pt-10 md:pt-0 space-y-16 md:space-y-24">

        {/* Our Story */}
        <section className="space-y-12 md:space-y-16">
          <div className="relative">
            <div className="relative bg-gradient-to-br from-gray-900/80 to-black/80 backdrop-blur-sm rounded-2xl md:rounded-3xl p-6 md:p-12">
              <div className="max-w-5xl mx-auto text-center space-y-6 md:space-y-8">
                <h2 className="text-3xl md:text-4xl font-bold font-['Orbitron'] bg-[#E53935] bg-clip-text text-transparent">
                  Our Story
                </h2>
                <div className="text-base md:text-lg leading-relaxed space-y-4 md:space-y-6 text-gray-300">
                  <p className="text-lg md:text-xl">
                    Bot Nexus began as a spark of curiosity and passion among a small group of robotics enthusiasts
                    during their <span className="font-semibold text-[#E53935]">second year</span> in the Manufacturing Engineering program at CEG, Anna University.
                  </p>
                  <p>
                    Seeking a dedicated space to explore robotics and automation, these students approached the department head,
                    <span className="font-semibold text-[#2196F3]"> Dr. Omkumar</span>, and senior faculty member,
                    <span className="font-semibold text-[#2196F3]"> Dr. Hariharan</span>, with a proposal to establish a student-led robotics club.
                  </p>
                  <p>
                    With the guidance and support of the faculty, Bot Nexus was officially launched, providing students with a platform
                    to transform classroom knowledge into hands-on robotics projects, fostering innovation, collaboration, and practical learning.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Mission & Vision */}
        <section className="space-y-12 md:space-y-16">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-[#2196F3]/10 via-transparent to-[#E53935]/10 rounded-3xl blur-2xl"></div>
            <div className="relative grid lg:grid-cols-2 gap-8 md:gap-16 items-center">
              <div className="text-center lg:text-left space-y-6 md:space-y-8">
                <div className="inline-flex items-center space-x-3 md:space-x-4 bg-gradient-to-r from-[#2196F3]/20 to-[#2196F3]/10 rounded-full px-4 py-2 md:px-6 md:py-3">
                  <span className="text-2xl md:text-3xl">🎯</span>
                  <h3 className="text-xl md:text-2xl font-bold text-[#2196F3] font-['Orbitron']">Our Mission</h3>
                </div>
                <p className="text-base md:text-lg leading-relaxed text-gray-300">
                  To provide students with hands-on experience in robotics and automation,
                  fostering innovation, technical excellence, and collaborative problem-solving.
                  We aim to bridge the gap between theoretical knowledge and practical application,
                  preparing future engineers for the challenges of tomorrow.
                </p>
              </div>

              <div className="text-center lg:text-right space-y-6 md:space-y-8">
                <div className="inline-flex items-center space-x-3 md:space-x-4 bg-gradient-to-r from-[#E53935]/20 to-[#E53935]/10 rounded-full px-4 py-2 md:px-6 md:py-3">
                  <span className="text-2xl md:text-3xl">🚀</span>
                  <h3 className="text-xl md:text-2xl font-bold text-[#E53935] font-['Orbitron']">Our Vision</h3>
                </div>
                <p className="text-base md:text-lg leading-relaxed text-gray-300">
                  To become a leading center of robotics innovation in South India, producing
                  skilled engineers who contribute meaningfully to the field of automation and
                  robotics. We envision a future where our alumni lead technological advancement
                  and our projects make real-world impact.
                </p>
              </div>
            </div>
          </div>

          {/* Core Values */}
          <div className="text-center space-y-8 md:space-y-12">
            <h3 className="text-2xl md:text-3xl font-bold bg-[#E53935] bg-clip-text text-transparent font-['Orbitron']">
              Our Core Values
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
              {values.map((value, i) => (
                <div key={i} className="group">
                  <div className="relative bg-gray-800/40 backdrop-blur-sm rounded-2xl md:rounded-3xl p-6 md:p-8 border border-gray-700/30 transition-all duration-300 min-h-[300px] md:min-h-[340px]">
                    <div className="text-4xl md:text-5xl mb-4 md:mb-6">{value.icon}</div>
                    <h4 className="text-lg md:text-xl font-bold text-[#E53935] mb-3 md:mb-4">{value.title}</h4>
                    <p className="text-gray-300 leading-relaxed text-sm md:text-base">{value.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Faculty Advisors */}
        <section className="text-center space-y-8 md:space-y-12">
          <h3 className="text-2xl md:text-3xl font-bold bg-[#E53935] bg-clip-text text-transparent font-['Orbitron']">
            Faculty Advisors
          </h3>
          <div className="flex flex-col lg:flex-row justify-center items-center gap-8 md:gap-12 max-w-4xl mx-auto">
            {faculty.slice(0, 2).map((member, i) => (
              <div key={i} className="group relative">
                <div className="relative bg-gray-900/60 backdrop-blur-sm rounded-2xl md:rounded-3xl p-6 md:p-10 text-center border border-gray-700/50 hover:border-[#2196F3]/50 transition-transform duration-300 transform group-hover:scale-105 min-w-[250px] md:min-w-[280px]">
                  <img
                    className="rounded-full w-24 h-24 md:w-32 md:h-32 object-cover mx-auto mb-4 md:mb-6"
                    src={member.image}
                    alt={member.name}
                  />
                  <h4 className="text-xl md:text-2xl font-bold text-[#E53935] mb-2 md:mb-3">{member.name}</h4>
                  <p className="text-[#2196F3] font-semibold text-base md:text-lg mb-1 md:mb-2">{member.designation}</p>
                  <p className="text-gray-400 text-sm md:text-base">Department of Manufacturing Engineering</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Student Leadership */}
        <section className="space-y-8 md:space-y-12">
          <h3 className="text-2xl md:text-3xl font-bold text-center bg-[#E53935] bg-clip-text text-transparent font-['Orbitron']">
            Student Leadership
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {teamMembers.slice(0, 4).map((member, i) => (
              <div key={i} className="group relative">
                <div className="absolute inset-0 bg-gradient-to-br from-gray-800/30 to-gray-900/30 rounded-2xl blur group-hover:blur-none transition-all duration-300"></div>
                <div className="relative bg-gray-800/40 backdrop-blur-sm rounded-2xl p-4 md:p-6 text-center border border-gray-700/30 hover:border-[#2196F3]/50 transition-transform duration-300 transform group-hover:scale-105">
                  <img
                    className="rounded-full w-20 h-20 md:w-24 md:h-24 object-cover mx-auto mb-3 md:mb-4"
                    src={member.image}
                    alt={member.name}
                  />
                  <h4 className="text-base md:text-lg font-bold text-[#E53935] mb-1 md:mb-2">{member.name}</h4>
                  <p className="text-[#2196F3] font-semibold text-xs md:text-sm mb-1">{member.designation}</p>
                  {member.year && <p className="text-gray-400 text-xs md:text-sm">{member.year}</p>}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Achievements */}
        {achievements?.length > 0 && (
          <section className="space-y-8 md:space-y-12">
            <h3 className="text-2xl md:text-3xl font-bold text-center bg-[#E53935] bg-clip-text text-transparent font-['Orbitron']">
              Our Achievements
            </h3>
            <div className="space-y-4 md:space-y-6 max-w-5xl mx-auto">
              {achievements.map((achievement, i) => (
                <div key={i} className="group relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-gray-800/20 via-gray-900/30 to-gray-800/20 rounded-2xl md:rounded-3xl blur group-hover:blur-none transition-all duration-300"></div>
                  <div className="relative bg-gray-800/40 backdrop-blur-sm rounded-2xl md:rounded-3xl p-6 md:p-8 border border-gray-700/30 hover:border-[#2196F3]/50 transition-all duration-300 group-hover:transform group-hover:scale-[1.02]">
                    <div className="flex flex-col lg:flex-row items-center justify-between space-y-4 lg:space-y-0">
                      <div className="flex-1 text-center lg:text-left">
                        <div className="flex flex-col lg:flex-row items-center lg:items-start space-y-3 lg:space-y-0 lg:space-x-4 md:lg:space-x-6">
                          <span className="bg-[#2196F3] text-white px-3 py-1 md:px-4 md:py-2 rounded-full text-xs md:text-sm font-bold">
                            {achievement.year}
                          </span>
                          <div>
                            <h4 className="text-lg md:text-xl font-bold text-white mb-1 md:mb-2">{achievement.title}</h4>
                            <p className="text-gray-400 text-sm md:text-base">{achievement.event}</p>
                          </div>
                        </div>
                      </div>
                      <div className="flex-shrink-0">
                        <span
                          className={`px-4 py-2 md:px-6 md:py-3 rounded-full font-bold text-base md:text-lg 
                    ${achievement.prize.includes('1st')
                              ? 'bg-gradient-to-r from-yellow-400 to-yellow-500 text-black'
                              : achievement.prize.includes('2nd')
                                ? 'bg-gradient-to-r from-gray-300 to-gray-400 text-black'
                                : 'bg-[#E53935] text-white'
                            }`}
                        >
                          {achievement.prize}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}


        {/* Statistics */}
        <section className="grid grid-cols-3 sm:grid-cols-3 gap-3 md:gap-8">
          {[
            { num: "12+", label: "Competitions", desc: "Events participated", icon: <FaClipboardList className="mx-auto text-[#E53935] w-8 h-8 md:w-12 md:h-12" />, color: "from-red-500/20 to-red-600/10" },
            { num: "8+", label: "Awards", desc: "Recognition received", icon: <FaTrophy className="mx-auto text-[#2196F3] w-8 h-8 md:w-12 md:h-12" />, color: "from-blue-500/20 to-blue-600/10" },
            { num: "25+", label: "Members", desc: "Active participants", icon: <FaUsers className="mx-auto text-[#4CAF50] w-8 h-8 md:w-12 md:h-12" />, color: "from-green-500/20 to-green-600/10" }
          ].map((stat, i) => (
            <div key={i} className="group">
              <div className=" bg-gray-800/40 backdrop-blur-sm rounded-2xl md:rounded-3xl p-3 md:p-8 text-center border border-gray-700/30 hover:border-[#2196F3]/50 transition-all duration-300 group-hover:transform group-hover:scale-105">
                <div className="mb-3 md:mb-4">{stat.icon}</div>
                <div className="text-2xl md:text-4xl font-bold bg-white bg-clip-text text-transparent mb-2 md:mb-3">
                  {stat.num}
                </div>
                <div className="text-md md:text-xl font-semibold text-white mb-1 md:mb-2">{stat.label}</div>
                <div className="text-gray-400 text-sm md:text-base">{stat.desc}</div>
              </div>
            </div>
          ))}
        </section>

        {/* Looking Forward */}
        <section className="text-center space-y-8 md:space-y-12">
          <h3 className="text-2xl md:text-3xl font-bold bg-[#E53935] bg-clip-text text-transparent font-['Orbitron']">
            Looking Forward
          </h3>
          <div className="max-w-4xl mx-auto space-y-6 md:space-y-8">
            <p className="text-lg md:text-xl text-gray-300 leading-relaxed">
              Our achievements are just the beginning. We're setting our sights on national-level
              competitions, research publications, and industry collaborations.
            </p>
            <p className="text-base md:text-lg text-gray-400 leading-relaxed">
              With the continued support of our faculty, department, and growing membership, Bot Nexus is poised to
              make even greater contributions to the field of robotics.
            </p>

            <div className="grid grid-cols-3 md:grid-cols-3 gap-6 md:gap-8 mt-8 md:mt-12">
              {[
                { icon: "🔬", title: "Research Publications", desc: "Academic contributions" },
                { icon: "🤝", title: "Industry Partnerships", desc: "Professional collaborations" },
                { icon: "🌟", title: "National Recognition", desc: "Expanding our reach" }
              ].map((goal, i) => (
                <div key={i} className="bg-gray-800/40 backdrop-blur-sm rounded-2xl p-3 md:p-6 border border-gray-700/30 hover:border-[#2196F3]/50 transition-all duration-300">
                  <div className="text-2xl md:text-3xl mb-2 md:mb-3">{goal.icon}</div>
                  <h4 className="font-semibold text-[#E53935] text-base md:text-lg mb-1">{goal.title}</h4>
                  <p className="text-gray-400 text-xs md:text-sm">{goal.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section>
          <div className="relative">
            <div className="relative backdrop-blur-sm rounded-2xl md:rounded-3xl mb-8 md:mb-12">
              <h3 className="text-2xl md:text-3xl font-bold text-center mb-8 md:mb-12 bg-[#E53935] bg-clip-text text-transparent font-['Orbitron']">
                Get In Touch
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-12">
                {[
                  {
                    icon: "📍",
                    title: "Location",
                    content: "Department of Manufacturing Engineering\nCEG, Anna University, Chennai",
                    color: "blue-600/10"
                  },
                  {
                    icon: "📧",
                    title: "Email",
                    content: "teambotnexushq@gmail.com",
                    color: "from-red-500/20 to-red-600/10"
                  },
                  {
                    icon: "🕒",
                    title: "Meeting Hours",
                    content: "Fridays 4:00 PM - 6:00 PM\nSaturdays 2:00 PM - 5:00 PM",
                    color: "from-green-500/20 to-green-600/10"
                  }
                ].map((contact, i) => (
                  <div key={i} className="group relative text-center">
                    <div className="relative bg-gray-800/40 backdrop-blur-sm rounded-2xl p-6 md:p-8 border border-gray-700/30 hover:border-[#2196F3]/50 transition-all duration-300 group-hover:transform group-hover:scale-105  md:min-h-[245px]">
                      <div className="text-3xl md:text-4xl mb-3 md:mb-4">{contact.icon}</div>
                      <h4 className="font-bold text-[#E53935] text-base md:text-lg mb-3 md:mb-4">{contact.title}</h4>
                      <p className="text-gray-300 whitespace-pre-line leading-relaxed text-sm md:text-base">{contact.content}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default AboutUs;