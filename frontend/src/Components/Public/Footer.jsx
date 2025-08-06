import { useState } from "react";

const Footer = () => {

  const [formData, setFormData] = useState({ name: '', email: '', overview: '' });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('/api/feedback', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert('Message sent successfully!');
        setFormData({ name: '', email: '', overview: '' });
      } else {
        alert('Something went wrong.');
      }
    } catch (error) {
      console.error(error);
      alert('Error sending message.');
    }};


  return (
    <footer className="bg-[#0f0f1c] pt-20 pb-8">
      <div className="mx-25">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
          <div >
            <div className="flex font-['Orbitron'] mb-5 items-center text-3xl hover:cursor-pointer">
              <img
                src="/nav-logo.png"
                alt="Bot Nexus Logo"
                width={50}
                height={40}
              />
              <span className="text-[#ff2121] mr-2">Bot</span>
              <span className="text-white hover:text-[#2196F3]">Nexus</span>
            </div>
            <div className="mb-6">
              <p className="font-['Roboto'] text-white mb-3">
                A Student run team working to reach new heights in robotics and engineering.
              </p>
              <div className="space-y-2">
                <p className="flex items-center font-['Roboto']">
                  <i className="fas fa-envelope mr-2 text-[#E53935]"></i>
                  teambotnexushq@gmail.com
                </p>
                <p className="flex items-start font-['Roboto']">
                  <i className="fas fa-map-marker-alt mr-3 mt-1 text-[#E53935]"></i>
                  <span>
                    Manufacturing Engineering Department,
                    <span className="block">Anna University, Chennai - 600025</span>
                  </span>
                </p>
                <p className="flex items-center font-['Roboto']">
                  <i className="fas fa-phone mr-2 text-[#E53935]"></i>
                  +91 86081 26812
                </p>
              </div>
            </div>
            <div className="flex space-x-4">
              <a
                href="#"
                className="w-10 h-10 rounded-full flex items-center justify-center border border-[#E53935]/50 bg-[#1a1a2e] group hover:border-[#2196F3]/50 hover:bg-[#2196F3]/20 hover:scale-110 transition-all duration-300 cursor-pointer"
              >
                <i className="fab fa-instagram text-[#E53935] group-hover:text-[#2196F3] transition-all duration-300"></i>
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full flex items-center justify-center border border-[#E53935]/50 bg-[#1a1a2e] group hover:border-[#2196F3]/50 hover:bg-[#2196F3]/20 hover:scale-110 transition-all duration-300 cursor-pointer"
              >
                <i className="fab fa-x-twitter text-[#E53935] group-hover:text-[#2196F3] transition-all duration-300"></i>
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full flex items-center justify-center border border-[#E53935]/50 bg-[#1a1a2e] group hover:border-[#2196F3]/50 hover:bg-[#2196F3]/20 hover:scale-110 transition-all duration-300 cursor-pointer"
              >
                <i className="fab fa-linkedin-in text-[#E53935] group-hover:text-[#2196F3] transition-all duration-300"></i>
              </a>

              <a
                href="#"
                className="w-10 h-10 rounded-full flex items-center justify-center border border-[#E53935]/50 bg-[#1a1a2e] group hover:border-[#2196F3]/50 hover:bg-[#2196F3]/20 hover:scale-110 transition-all duration-300 cursor-pointer"
              >
                <i className="fab fa-youtube text-[#E53935] group-hover:text-[#2196F3] transition-all duration-300"></i>
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-['Orbitron'] text-lg font-bold mb-6 text-[#E53935]">
              Quick Links
            </h4>
            <ul className="space-y-3">
              {[
                "Home",
                "Projects",
                "Competitions",
                "Team",
                "Blog",
                "About Us",
              ].map((item, index) => (
                <li key={index}>
                  <a
                    href="#"
                    className="font-['Orbitron'] text-[#E53935] hover:text-[#2196F3] group hover:scale-110 transition-all duration-300 flex items-center cursor-pointer"
                  >
                    <i className="fas fa-chevron-right text-xs pr-2 text-[#E53935] group-hover:text-[#2196F3]"></i>
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <form onSubmit={handleSubmit}>
            <h4 className="font-['Orbitron'] text-lg font-bold mb-3 text-[#E53935]">
              Feedbacks and Queries
            </h4>
            <p className="font-['Roboto'] text-gray-400 mb-3">
              Leave your feebacks and queries here that you need us to look
              into.
            </p>
            <div className="flex flex-col space-y-4">
              <h4 className="font-['Orbitron'] text-md font-bold text-[#E53935]">
                Name
              </h4>
              <div className="relative">
                <input
                  type="text"
                  name="name"
                  className="w-full bg-[#1a1a2e] border border-[#E53935]/30 rounded-lg py-3 px-4 font-['Roboto'] text-white focus:outline-none focus:border-[#2196F3] transition-all duration-300"
                  required
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={handleChange}
                />
              </div>
              <h4 className="font-['Orbitron'] text-md font-bold text-[#E53935]">
                Email
              </h4>
              <div className="relative">
                <input
                  type="email"
                  name="email"
                  className="w-full bg-[#1a1a2e] border border-[#E53935]/30 rounded-lg py-3 px-4 font-['Roboto'] text-white focus:outline-none focus:border-[#2196F3] transition-all duration-300"
                  placeholder="Your Email Address"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <h4 className="font-['Orbitron'] text-md font-bold text-[#E53935]">
                Message
              </h4>
              <div className="relative">
                <textarea
                  name="overview"
                  className="w-full bg-[#1a1a2e] border border-[#E53935]/30 rounded-lg py-3 px-4 font-['Roboto'] text-white focus:outline-none focus:border-[#2196F3] transition-all duration-300"
                  rows={2}
                  placeholder="Type Your Message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                />
              </div>
              <button className="bg-[#E53935] font-['Orbitron'] px-4 py-2 rounded text-black hover:text-white text-md font-semibold hover:bg-[#2196F3] cursor-pointer transition-all duration-300 hover:shadow-[0_0_2.5px_rgba(0,255,255,0.5)]">
                Submit
              </button>
            </div>
          </form>
        </div>

        <div className="border-t border-[#E53935]/20 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="font-['Roboto'] text-sm text-gray-500 mb-4 md:mb-0">
              © 2025 Bot Nexus. All rights reserved.
            </p>
            <div className="flex space-x-6">
              <a
                href="#"
                className="font-['Roboto'] text-sm text-gray-500 hover:text-[#2196F3] transition-colors duration-300 cursor-pointer"
              >
                Privacy Policy
              </a>
              <a
                href="#"
                className="font-['Roboto'] text-sm text-gray-500 hover:text-[#2196F3] transition-colors duration-300 cursor-pointer"
              >
                Terms of Service
              </a>
              <a
                href="#"
                className="font-['Roboto'] text-sm text-gray-500 hover:text-[#2196F3] transition-colors duration-300 cursor-pointer"
              >
                Cookie Policy
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
