

const Footer = () => {
  return (
    <footer className="bg-[#0f0f1c] pt-20 pb-8">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
          <div>
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
            <p className="font-['Roboto'] text-white mb-6">
              A Student run team working to reach new heights in robotics and engineering.
            </p>
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

          <div>
            <h4 className="font-['Orbitron'] text-lg font-bold mb-6 text-[#E53935]">
              Feedbacks and Queries
            </h4>
            <p className="font-['Roboto'] text-gray-400 mb-6">
              Leave your feebacks and queries here that you need us to look
              into.
            </p>
            <div className="flex flex-col space-y-4">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Type here"
                  className="w-full bg-[#1a1a2e] border border-[#E53935]/30 rounded-lg py-3 px-4 font-['Roboto'] text-white focus:outline-none focus:border-[#2196F3] transition-all duration-300"
                />
                <div className="absolute right-3 top-1/2 -translate-y-1/2">
                  <i className="far fa-envelope text-[#E53935]"></i>
                </div>
              </div>
              <button className="bg-[#E53935] font-['Orbitron'] px-4 py-2 rounded text-black hover:text-white text-md font-semibold hover:bg-[#2196F3] cursor-pointer transition-all duration-300 hover:shadow-[0_0_10px_rgba(0,255,255,0.5)]">
                Submit
              </button>
            </div>
          </div>
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
