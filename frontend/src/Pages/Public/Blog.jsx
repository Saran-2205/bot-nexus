import { useState, useEffect } from "react";
import LoadingSpinner from "../../Components/LoadingSpinner";

const Blog = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black py-28 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto text-center">
        <div className="mb-12">
          <h1 className="text-4xl text-white font-bold sm:text-5xl lg:text-4xl font-['Orbitron'] mb-6">
            Blog <span className="text-[#E53935]">Nexus</span>
          </h1>
          
          <p className="text-xl text-gray-400 font-['Roboto'] max-w-2xl mx-auto">
            Our blog is currently under development. We're working on creating valuable content
            that will help you stay updated with the latest in technology and innovation.
          </p>
        </div>

        <div className="bg-[#1a1a2e]/50 border border-[#E53935]/30 rounded-2xl p-12 backdrop-blur-md">
          <div className="text-[#2196F3] text-6xl mb-6">
            <i className="fas fa-tools"></i>
          </div>
          <h2 className="text-2xl font-['Orbitron'] text-white mb-4">
            Coming Soon
          </h2>
          <p className="text-gray-400 font-['Roboto'] mb-8">
            We're crafting something amazing. Check back later!
          </p>
          
          <div className="flex justify-center space-x-4">
            <button 
              className="px-6 py-3 bg-[#E53935] text-white rounded-lg font-['Orbitron'] hover:bg-red-500 transition-colors cursor-pointer"
              onClick={() => window.history.back()}
            >
              Go Back
            </button>
            <button 
              className="px-6 py-3 border border-[#2196F3] text-[#2196F3] rounded-lg font-['Orbitron'] hover:bg-[#2196F3]/10 transition-colors cursor-pointer"
              onClick={() => window.location.reload()}
            >
              Check Again
            </button>
          </div>
        </div>

        {/* Countdown or progress indicator */}
        <div className="mt-12">
          <div className="w-full bg-gray-800 rounded-full h-2.5 mb-4">
            <div 
              className="bg-[#E53935] h-2.5 rounded-full transition-all duration-1000" 
              style={{ width: '20%' }}
            ></div>
          </div>
          <p className="text-gray-500 font-['Roboto'] text-sm">
            Development in progress - 20% complete
          </p>
        </div>
      </div>
    </div>
  );
};

export default Blog;