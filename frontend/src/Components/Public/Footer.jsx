import { useState } from "react";
import toast from "react-hot-toast";

const Footer = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/feedback", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        toast.success("Message sent successfully!");
        setFormData({ name: "", email: "", message: "" });
      } else {
        toast.error("Something went wrong.");
      }
    } catch (error) {
      console.error(error);
      toast.error("Error sending message.");
    }
  };

  return (
    <footer className="bg-[#0f0f1c] pt-12 md:pt-20 pb-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 mb-12 md:mb-16">
          {/* First Column */}
          <div>
            <div className="flex font-['Orbitron'] mb-5 items-center text-2xl md:text-3xl hover:cursor-pointer">
              <img
                src="/nav-logo.png"
                alt="Bot Nexus Logo"
                width={40}
                height={32}
                className="w-10 md:w-12"
              />
              <span className="text-[#ff2121] mr-1 md:mr-2">Bot</span>
              <span className="text-white hover:text-[#2196F3]">Nexus</span>
            </div>
            <div className="mb-6">
              <p className="font-['Roboto'] text-white mb-3 text-sm md:text-base">
                A Student run team working to reach new heights in robotics and
                engineering.
              </p>
              <div className="space-y-2 text-sm md:text-base">
                <p className="flex items-center font-['Roboto']">
                  <i className="fas fa-envelope mr-2 text-[#E53935] text-sm md:text-base"></i>
                  teambotnexushq@gmail.com
                </p>
                <p className="flex items-start font-['Roboto']">
                  <i className="fas fa-map-marker-alt mr-2 md:mr-3 mt-0.5 md:mt-1 text-[#E53935] text-sm md:text-base"></i>
                  <span>
                    Manufacturing Engineering Department,
                    <span className="block">
                      Anna University, Chennai - 600025
                    </span>
                  </span>
                </p>
                <p className="flex items-center font-['Roboto']">
                  <i className="fas fa-phone mr-2 text-[#E53935] text-sm md:text-base"></i>
                  +91 86081 26812
                </p>
              </div>
            </div>
            <div className="flex space-x-3 md:space-x-4">
              {["instagram", "linkedin-in", "youtube"].map(
                (icon, index) => (
                  <a
                    href="#"
                    key={index}
                    className="w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center border border-[#E53935]/50 bg-[#1a1a2e] group hover:border-[#2196F3]/50 hover:bg-[#2196F3]/20 hover:scale-110 transition-all duration-300 cursor-pointer"
                  >
                    <i
                      className={`fab fa-${icon} text-[#E53935] text-sm md:text-base group-hover:text-[#2196F3] transition-all duration-300`}
                    ></i>
                  </a>
                )
              )}
            </div>
          </div>

          {/* Second Column - Quick Links */}
          <div className="mt-6 md:mt-0">
            <h4 className="font-['Orbitron'] text-base md:text-lg font-bold mb-4 md:mb-6 text-[#E53935]">
              Quick Links
            </h4>
            <ul className="space-y-2 md:space-y-3">
              {[
                "Home",
                "Projects",
                "Competitions",
                "Team",
                "Blog",
                "About Us",
              ].map((item, index) => (
                <li key={index}>
                  <div className="font-['Orbitron'] text-[#E53935] flex items-center text-sm md:text-base">
                    <span className="hover:scale-105 group md:hover:scale-110 transition-all duration-300 cursor-pointer hover:text-[#2196F3]">
                      <i className="fas fa-chevron-right text-xs pr-2 text-[#E53935] group-hover:text-[#2196F3]"></i>
                      {item}
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Third Column - Contact Form */}
          <div className="mt-6 md:mt-0">
            <form onSubmit={handleSubmit}>
              <h4 className="font-['Orbitron'] text-base md:text-lg font-bold mb-2 md:mb-3 text-[#E53935]">
                Feedbacks and Queries
              </h4>
              <p className="font-['Roboto'] text-gray-400 mb-3 text-sm md:text-base">
                Leave your feedbacks and queries here that you need us to look.
              </p>
              <div className="flex flex-col space-y-3 md:space-y-4">
                <h4 className="font-['Orbitron'] text-sm md:text-md font-bold text-[#E53935]">
                  Name
                </h4>
                <div className="relative">
                  <input
                    type="text"
                    name="name"
                    className="w-full bg-[#1a1a2e] border border-[#E53935]/30 rounded-lg py-2 md:py-3 px-3 md:px-4 font-['Roboto'] text-white focus:outline-none focus:border-[#2196F3] transition-all duration-300 text-sm md:text-base"
                    required
                    placeholder="Your Name"
                    value={formData.name}
                    onChange={handleChange}
                  />
                </div>
                <h4 className="font-['Orbitron'] text-sm md:text-md font-bold text-[#E53935]">
                  Email
                </h4>
                <div className="relative">
                  <input
                    type="email"
                    name="email"
                    className="w-full bg-[#1a1a2e] border border-[#E53935]/30 rounded-lg py-2 md:py-3 px-3 md:px-4 font-['Roboto'] text-white focus:outline-none focus:border-[#2196F3] transition-all duration-300 text-sm md:text-base"
                    placeholder="Your Email Address"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
                <h4 className="font-['Orbitron'] text-sm md:text-md font-bold text-[#E53935]">
                  Message
                </h4>
                <div className="relative">
                  <textarea
                    name="message"
                    className="w-full bg-[#1a1a2e] border border-[#E53935]/30 rounded-lg py-2 md:py-3 px-3 md:px-4 font-['Roboto'] text-white focus:outline-none focus:border-[#2196F3] transition-all duration-300 text-sm md:text-base"
                    rows={2}
                    placeholder="Type Your Message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                  />
                </div>
                <button className="bg-[#E53935] font-['Orbitron'] px-4 py-2 rounded text-black hover:text-white text-sm md:text-md font-semibold hover:bg-[#2196F3] cursor-pointer transition-all duration-300 hover:shadow-[0_0_2.5px_rgba(0,255,255,0.5)]">
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-[#E53935]/20 pt-6 md:pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="font-['Roboto'] text-xs md:text-sm text-gray-500 mb-3 md:mb-0">
              © {new Date().getFullYear()} Bot Nexus. All rights reserved.
            </p>

            <div className="flex space-x-4 md:space-x-6">
              <a
                href="#"
                className="font-['Roboto'] text-xs md:text-sm text-gray-500 hover:text-[#2196F3] transition-colors duration-300 cursor-pointer"
              >
                Privacy Policy
              </a>
              <a
                href="#"
                className="font-['Roboto'] text-xs md:text-sm text-gray-500 hover:text-[#2196F3] transition-colors duration-300 cursor-pointer"
              >
                Terms of Service
              </a>
              <a
                href="#"
                className="font-['Roboto'] text-xs md:text-sm text-gray-500 hover:text-[#2196F3] transition-colors duration-300 cursor-pointer"
              >
                Cookie Policy
              </a>
            </div>
          </div>
        </div>
      </div>
      <p className="text-center text-gray-500 text-xs mt-4 font-['Roboto']">
        Designed & Developed with ❤️ by Saran | © 2025 BotNexus
      </p>
    </footer>
  );
};

export default Footer;
