// The exported code uses Tailwind CSS. Install Tailwind CSS in your dev environment to ensure all styles work.
import React, { useState, useEffect } from "react";
import * as echarts from "echarts";
const App = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [showTeamModal, setShowTeamModal] = useState(false);
  const [showResourceModal, setShowResourceModal] = useState(false);
  const [commentText, setCommentText] = useState("");
  const [comments, setComments] = useState([
    {
      id: 1,
      author: "Sarah M.",
      avatar: "SM",
      text: "The latest neural mapping tests are showing promising results. We should schedule a review meeting.",
      time: "2 days ago",
    },
    {
      id: 2,
      author: "Alex K.",
      avatar: "AK",
      text: "I've updated the quantum processing algorithms. The efficiency has improved by 15%.",
      time: "1 day ago",
    },
  ]);
  useEffect(() => {
    // Initialize progress chart
    const progressChart = echarts.init(
      document.getElementById("progress-chart")
    );
    const progressOption = {
      animation: false,
      tooltip: {
        trigger: "item",
      },
      series: [
        {
          name: "Progress",
          type: "pie",
          radius: ["60%", "80%"],
          avoidLabelOverlap: false,
          itemStyle: {
            borderRadius: 10,
            borderColor: "#12121A",
            borderWidth: 2,
          },
          label: {
            show: false,
            position: "center",
          },
          emphasis: {
            label: {
              show: true,
              fontSize: "18",
              fontWeight: "bold",
            },
          },
          labelLine: {
            show: false,
          },
          data: [
            { value: 78, name: "Completed", itemStyle: { color: "#00F0FF" } },
            { value: 22, name: "Remaining", itemStyle: { color: "#1A1A25" } },
          ],
        },
      ],
    };
    progressChart.setOption(progressOption);
    // Initialize resource allocation chart
    const resourceChart = echarts.init(
      document.getElementById("resource-chart")
    );
    const resourceOption = {
      animation: false,
      tooltip: {
        trigger: "axis",
        axisPointer: {
          type: "shadow",
        },
      },
      grid: {
        left: "3%",
        right: "4%",
        bottom: "3%",
        containLabel: true,
      },
      xAxis: [
        {
          type: "category",
          data: ["Budget", "Equipment", "Personnel", "Time"],
          axisTick: {
            alignWithLabel: true,
          },
          axisLine: {
            lineStyle: {
              color: "#333",
            },
          },
          axisLabel: {
            color: "#999",
          },
        },
      ],
      yAxis: [
        {
          type: "value",
          max: 100,
          axisLine: {
            lineStyle: {
              color: "#333",
            },
          },
          splitLine: {
            lineStyle: {
              color: "#222",
            },
          },
          axisLabel: {
            color: "#999",
          },
        },
      ],
      series: [
        {
          name: "Allocated",
          type: "bar",
          barWidth: "60%",
          data: [
            {
              value: 65,
              itemStyle: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  { offset: 0, color: "#00F0FF" },
                  { offset: 1, color: "#0072FF" },
                ]),
              },
            },
            {
              value: 82,
              itemStyle: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  { offset: 0, color: "#00F0FF" },
                  { offset: 1, color: "#0072FF" },
                ]),
              },
            },
            {
              value: 70,
              itemStyle: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  { offset: 0, color: "#00F0FF" },
                  { offset: 1, color: "#0072FF" },
                ]),
              },
            },
            {
              value: 55,
              itemStyle: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  { offset: 0, color: "#00F0FF" },
                  { offset: 1, color: "#0072FF" },
                ]),
              },
            },
          ],
        },
      ],
    };
    resourceChart.setOption(resourceOption);
    // Initialize timeline chart
    const timelineChart = echarts.init(
      document.getElementById("timeline-chart")
    );
    const timelineOption = {
      animation: false,
      tooltip: {
        trigger: "axis",
        axisPointer: {
          type: "shadow",
        },
      },
      grid: {
        top: 10,
        left: "3%",
        right: "4%",
        bottom: "3%",
        containLabel: true,
      },
      xAxis: {
        type: "category",
        data: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep"],
        axisLine: {
          lineStyle: {
            color: "#333",
          },
        },
        axisLabel: {
          color: "#999",
        },
      },
      yAxis: {
        type: "value",
        axisLine: {
          lineStyle: {
            color: "#333",
          },
        },
        splitLine: {
          lineStyle: {
            color: "#222",
          },
        },
        axisLabel: {
          color: "#999",
        },
      },
      series: [
        {
          name: "Milestones",
          type: "line",
          smooth: true,
          lineStyle: {
            width: 3,
            color: "#FF00E5",
          },
          symbol: "circle",
          symbolSize: 8,
          itemStyle: {
            color: "#FF00E5",
          },
          data: [10, 25, 35, 30, 55, 65, 60, 78, 85],
        },
        {
          name: "Planned",
          type: "line",
          smooth: true,
          lineStyle: {
            width: 3,
            color: "#00F0FF",
            type: "dashed",
          },
          symbol: "circle",
          symbolSize: 8,
          itemStyle: {
            color: "#00F0FF",
          },
          data: [15, 30, 40, 45, 60, 70, 75, 80, 90],
        },
      ],
    };
    timelineChart.setOption(timelineOption);
    // Handle window resize
    const handleResize = () => {
      progressChart.resize();
      resourceChart.resize();
      timelineChart.resize();
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
      progressChart.dispose();
      resourceChart.dispose();
      timelineChart.dispose();
    };
  }, []);
  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (commentText.trim()) {
      setComments([
        {
          id: comments.length + 1,
          author: "You",
          avatar: "YO",
          text: commentText,
          time: "Just now",
        },
        ...comments,
      ]);
      setCommentText("");
    }
  };
  return (
    <div className="min-h-screen bg-[#0A0A0F] text-gray-100 font-sans">
      {/* Header */}
      <header className="bg-[#12121A] border-b border-gray-800">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <div className="mr-2 relative w-10 h-10 flex items-center justify-center">
                <div className="absolute w-full h-full bg-[#00F0FF] opacity-20 rounded-full animate-pulse"></div>
                <i className="fas fa-robot text-2xl text-[#00F0FF]"></i>
              </div>
              <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#00F0FF] to-[#FF00E5]">
                NEXUS ROBOTICS
              </h1>
            </div>
            <nav>
              <ul className="flex space-x-8">
                <li>
                  <a
                    href="#"
                    className="hover:text-[#00F0FF] transition-colors duration-300 cursor-pointer"
                  >
                    Home
                  </a>
                </li>
                <li>
                  <a
                    href="https://readdy.ai/home/1551b6b2-9bed-4035-a030-0158cf365b56/3712bcb8-5213-47bb-a218-c909ceb3c188"
                    data-readdy="true"
                    className="text-[#00F0FF] border-b-2 border-[#00F0FF] pb-1 cursor-pointer"
                  >
                    Projects
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-[#00F0FF] transition-colors duration-300 cursor-pointer"
                  >
                    Technology
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-[#00F0FF] transition-colors duration-300 cursor-pointer"
                  >
                    Team
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-[#00F0FF] transition-colors duration-300 cursor-pointer"
                  >
                    Contact
                  </a>
                </li>
              </ul>
            </nav>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></div>
                <span className="text-sm">Systems Online</span>
              </div>
              <button className="bg-gradient-to-r from-[#00F0FF] to-[#FF00E5] px-4 py-2 !rounded-button text-black font-medium hover:opacity-90 transition-opacity duration-300 whitespace-nowrap cursor-pointer">
                <i className="fas fa-sign-in-alt mr-2"></i>
                Connect
              </button>
            </div>
          </div>
        </div>
      </header>
      {/* Project navigation */}
      <div className="bg-[#0F0F17] border-b border-gray-800">
        <div className="container mx-auto px-4">
          <div className="flex items-center py-4">
            <a
              href="https://readdy.ai/home/1551b6b2-9bed-4035-a030-0158cf365b56/3712bcb8-5213-47bb-a218-c909ceb3c188"
              data-readdy="true"
              className="flex items-center text-[#00F0FF] mr-4 hover:opacity-80 transition-opacity cursor-pointer"
            >
              <i className="fas fa-arrow-left mr-2"></i>
              <span>Back to Projects</span>
            </a>
            <div className="h-5 border-r border-gray-700 mx-4"></div>
            <div className="flex items-center">
              <span className="text-gray-400 mr-2">Project:</span>
              <h2 className="text-xl font-bold">Quantum Neural Interface</h2>
              <span className="ml-3 px-2 py-1 bg-[#1A1A25] text-xs rounded-full">
                AI
              </span>
              <div className="ml-4 flex items-center">
                <div className="w-2 h-2 rounded-full bg-green-400 mr-2"></div>
                <span className="text-sm text-green-400">Active</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Main content */}
      <main className="container mx-auto px-4 py-8">
        {/* Hero section */}
        <div className="relative rounded-lg overflow-hidden mb-8 h-80">
          <img
            src="https://readdy.ai/api/search-image?query=Futuristic%20quantum%20neural%20interface%20laboratory%20with%20glowing%20blue%20and%20purple%20holographic%20displays%20showing%20brain%20patterns%20and%20neural%20networks%2C%20advanced%20technology%20workstations%20with%20multiple%20screens%2C%20dark%20sci-fi%20environment%20with%20subtle%20grid%20patterns%20on%20walls%2C%20dramatic%20blue%20lighting%20illuminating%20researchers%20working%20with%20high-tech%20equipment&width=1400&height=400&seq=1&orientation=landscape"
            alt="Quantum Neural Interface Project"
            className="w-full h-full object-cover object-top"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0A0A0F] via-[#0A0A0F80] to-transparent"></div>
          <div className="absolute inset-0 flex items-center">
            <div className="max-w-2xl px-8 py-6">
              <div className="flex items-center mb-2">
                <span className="px-2 py-1 bg-[#FF00E5] text-xs font-medium rounded-full text-black">
                  Priority Project
                </span>
                <span className="ml-3 px-2 py-1 bg-[#1A1A25] text-xs rounded-full">
                  ID: QNI-2025-001
                </span>
              </div>
              <h1 className="text-4xl font-bold mb-4">
                Quantum Neural Interface
              </h1>
              <p className="text-gray-300 mb-6">
                A revolutionary brain-computer interface utilizing quantum
                computing principles to achieve unprecedented neural signal
                processing capabilities and direct thought-to-machine
                communication.
              </p>
              <div className="flex space-x-4">
                <button className="bg-[#00F0FF] text-black px-4 py-2 !rounded-button font-medium hover:opacity-90 transition-opacity whitespace-nowrap cursor-pointer">
                  <i className="fas fa-play-circle mr-2"></i>
                  Project Demo
                </button>
                <button className="bg-[#1A1A25] px-4 py-2 !rounded-button font-medium hover:bg-[#252535] transition-colors whitespace-nowrap cursor-pointer">
                  <i className="fas fa-file-alt mr-2"></i>
                  Documentation
                </button>
              </div>
            </div>
          </div>
        </div>
        {/* Tab navigation */}
        <div className="flex border-b border-gray-800 mb-8">
          <button
            className={`px-6 py-3 font-medium text-sm whitespace-nowrap cursor-pointer ${
              activeTab === "overview"
                ? "text-[#00F0FF] border-b-2 border-[#00F0FF]"
                : "text-gray-400 hover:text-gray-200"
            }`}
            onClick={() => setActiveTab("overview")}
          >
            <i className="fas fa-info-circle mr-2"></i>
            Overview
          </button>
          <button
            className={`px-6 py-3 font-medium text-sm whitespace-nowrap cursor-pointer ${
              activeTab === "team"
                ? "text-[#00F0FF] border-b-2 border-[#00F0FF]"
                : "text-gray-400 hover:text-gray-200"
            }`}
            onClick={() => setActiveTab("team")}
          >
            <i className="fas fa-users mr-2"></i>
            Team
          </button>
          <button
            className={`px-6 py-3 font-medium text-sm whitespace-nowrap cursor-pointer ${
              activeTab === "technical"
                ? "text-[#00F0FF] border-b-2 border-[#00F0FF]"
                : "text-gray-400 hover:text-gray-200"
            }`}
            onClick={() => setActiveTab("technical")}
          >
            <i className="fas fa-microchip mr-2"></i>
            Technical Details
          </button>
          <button
            className={`px-6 py-3 font-medium text-sm whitespace-nowrap cursor-pointer ${
              activeTab === "timeline"
                ? "text-[#00F0FF] border-b-2 border-[#00F0FF]"
                : "text-gray-400 hover:text-gray-200"
            }`}
            onClick={() => setActiveTab("timeline")}
          >
            <i className="fas fa-calendar-alt mr-2"></i>
            Timeline
          </button>
          <button
            className={`px-6 py-3 font-medium text-sm whitespace-nowrap cursor-pointer ${
              activeTab === "resources"
                ? "text-[#00F0FF] border-b-2 border-[#00F0FF]"
                : "text-gray-400 hover:text-gray-200"
            }`}
            onClick={() => setActiveTab("resources")}
          >
            <i className="fas fa-chart-pie mr-2"></i>
            Resources
          </button>
          <button
            className={`px-6 py-3 font-medium text-sm whitespace-nowrap cursor-pointer ${
              activeTab === "documents"
                ? "text-[#00F0FF] border-b-2 border-[#00F0FF]"
                : "text-gray-400 hover:text-gray-200"
            }`}
            onClick={() => setActiveTab("documents")}
          >
            <i className="fas fa-file-alt mr-2"></i>
            Documents
          </button>
        </div>
        {/* Overview Tab Content */}
        {activeTab === "overview" && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left column - Project details */}
            <div className="lg:col-span-2">
              <div className="bg-[#12121A] rounded-lg border border-gray-800 shadow-lg mb-8">
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-4">
                    Project Description
                  </h3>
                  <p className="text-gray-300 mb-4">
                    The Quantum Neural Interface (QNI) represents a paradigm
                    shift in brain-computer interface technology. By leveraging
                    quantum computing principles, we've developed a system
                    capable of processing neural signals with unprecedented
                    speed and accuracy, enabling direct thought-to-machine
                    communication.
                  </p>
                  <p className="text-gray-300 mb-4">
                    Our proprietary quantum entanglement algorithms allow for
                    non-invasive neural mapping at the quantum level, bypassing
                    traditional limitations of signal noise and processing
                    delays. The system can interpret complex neural patterns and
                    translate them into precise digital commands in real-time.
                  </p>
                  <p className="text-gray-300">
                    Applications range from medical rehabilitation and enhanced
                    human-computer interaction to advanced prosthetics control
                    and immersive virtual reality experiences without
                    traditional input devices.
                  </p>
                </div>
                <div className="border-t border-gray-800 p-6">
                  <h3 className="text-xl font-bold mb-4">Key Objectives</h3>
                  <ul className="space-y-3">
                    <li className="flex">
                      <div className="flex-shrink-0 w-6 h-6 rounded-full bg-[#1A1A25] border border-[#00F0FF] flex items-center justify-center mr-3 mt-0.5">
                        <i className="fas fa-check text-xs text-[#00F0FF]"></i>
                      </div>
                      <div>
                        <h4 className="font-medium">
                          Quantum Signal Processing
                        </h4>
                        <p className="text-gray-400 text-sm">
                          Develop quantum algorithms for real-time neural signal
                          processing with 99.8% accuracy
                        </p>
                      </div>
                    </li>
                    <li className="flex">
                      <div className="flex-shrink-0 w-6 h-6 rounded-full bg-[#1A1A25] border border-[#00F0FF] flex items-center justify-center mr-3 mt-0.5">
                        <i className="fas fa-check text-xs text-[#00F0FF]"></i>
                      </div>
                      <div>
                        <h4 className="font-medium">Non-invasive Interface</h4>
                        <p className="text-gray-400 text-sm">
                          Create a comfortable, wearable interface requiring no
                          surgical implantation
                        </p>
                      </div>
                    </li>
                    <li className="flex">
                      <div className="flex-shrink-0 w-6 h-6 rounded-full bg-[#1A1A25] border border-gray-600 flex items-center justify-center mr-3 mt-0.5">
                        <i className="fas fa-spinner text-xs text-gray-400"></i>
                      </div>
                      <div>
                        <h4 className="font-medium">
                          Adaptive Learning System
                        </h4>
                        <p className="text-gray-400 text-sm">
                          Implement neural network that adapts to individual
                          brain patterns over time
                        </p>
                      </div>
                    </li>
                    <li className="flex">
                      <div className="flex-shrink-0 w-6 h-6 rounded-full bg-[#1A1A25] border border-gray-600 flex items-center justify-center mr-3 mt-0.5">
                        <i className="fas fa-spinner text-xs text-gray-400"></i>
                      </div>
                      <div>
                        <h4 className="font-medium">Commercial Prototype</h4>
                        <p className="text-gray-400 text-sm">
                          Develop market-ready prototype for medical and
                          consumer applications
                        </p>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="bg-[#12121A] rounded-lg border border-gray-800 shadow-lg">
                <div className="p-6">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xl font-bold">
                      Project Updates & Comments
                    </h3>
                    <button className="text-sm text-[#00F0FF] hover:underline cursor-pointer">
                      View All
                    </button>
                  </div>
                  <form onSubmit={handleCommentSubmit} className="mb-6">
                    <div className="flex">
                      <div className="w-10 h-10 rounded-full bg-[#1A1A25] border-2 border-[#00F0FF] flex items-center justify-center text-sm font-medium mr-3 flex-shrink-0">
                        YO
                      </div>
                      <div className="flex-grow">
                        <textarea
                          className="w-full bg-[#1A1A25] border border-gray-700 rounded-lg p-3 text-sm focus:outline-none focus:border-[#00F0FF] min-h-[80px]"
                          placeholder="Add a comment or update..."
                          value={commentText}
                          onChange={(e) => setCommentText(e.target.value)}
                        ></textarea>
                        <div className="flex justify-end mt-2">
                          <button
                            type="submit"
                            className="bg-[#00F0FF] text-black px-4 py-2 !rounded-button text-sm font-medium hover:opacity-90 transition-opacity whitespace-nowrap cursor-pointer"
                          >
                            <i className="fas fa-paper-plane mr-2"></i>
                            Post Comment
                          </button>
                        </div>
                      </div>
                    </div>
                  </form>
                  <div className="space-y-6">
                    {comments.map((comment) => (
                      <div key={comment.id} className="flex">
                        <div className="w-10 h-10 rounded-full bg-[#1A1A25] border-2 border-[#12121A] flex items-center justify-center text-sm font-medium mr-3 flex-shrink-0">
                          {comment.avatar}
                        </div>
                        <div className="flex-grow">
                          <div className="flex items-center mb-1">
                            <h4 className="font-medium">{comment.author}</h4>
                            <span className="text-gray-500 text-xs ml-2">
                              {comment.time}
                            </span>
                          </div>
                          <p className="text-gray-300 text-sm">
                            {comment.text}
                          </p>
                          <div className="flex space-x-4 mt-2">
                            <button className="text-gray-400 hover:text-[#00F0FF] text-xs cursor-pointer">
                              <i className="far fa-thumbs-up mr-1"></i> Like
                            </button>
                            <button className="text-gray-400 hover:text-[#00F0FF] text-xs cursor-pointer">
                              <i className="far fa-comment mr-1"></i> Reply
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            {/* Right column - Stats and quick info */}
            <div>
              <div className="bg-[#12121A] rounded-lg border border-gray-800 shadow-lg mb-8">
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-4">Project Metrics</h3>
                  <div className="mb-6">
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-gray-400">Overall Progress</span>
                      <span className="font-medium">78%</span>
                    </div>
                    <div className="w-full h-2 bg-gray-800 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-[#00F0FF] to-[#FF00E5]"
                        style={{ width: "78%" }}
                      ></div>
                    </div>
                  </div>
                  <div className="mb-6">
                    <div id="progress-chart" className="w-full h-48"></div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-[#1A1A25] p-4 rounded-lg">
                      <div className="text-xs text-gray-400 mb-1">
                        Time Remaining
                      </div>
                      <div className="flex items-center">
                        <i className="fas fa-clock text-[#00F0FF] mr-2"></i>
                        <div className="font-medium">43 days</div>
                      </div>
                    </div>
                    <div className="bg-[#1A1A25] p-4 rounded-lg">
                      <div className="text-xs text-gray-400 mb-1">
                        Budget Status
                      </div>
                      <div className="flex items-center">
                        <i className="fas fa-chart-line text-[#00F0FF] mr-2"></i>
                        <div className="font-medium">65% Used</div>
                      </div>
                    </div>
                    <div className="bg-[#1A1A25] p-4 rounded-lg">
                      <div className="text-xs text-gray-400 mb-1">
                        Priority Level
                      </div>
                      <div className="flex items-center">
                        <i className="fas fa-flag text-[#FF00E5] mr-2"></i>
                        <div className="font-medium">High</div>
                      </div>
                    </div>
                    <div className="bg-[#1A1A25] p-4 rounded-lg">
                      <div className="text-xs text-gray-400 mb-1">
                        Last Updated
                      </div>
                      <div className="flex items-center">
                        <i className="fas fa-history text-[#FF00E5] mr-2"></i>
                        <div className="font-medium">12h ago</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-[#12121A] rounded-lg border border-gray-800 shadow-lg mb-8">
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-4">System Status</h3>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center">
                        <i className="fas fa-brain text-[#00F0FF] mr-3"></i>
                        <div>
                          <div className="font-medium">AI Status</div>
                          <div className="text-xs text-gray-400">
                            Neural processing system
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <div className="w-2 h-2 rounded-full bg-yellow-400 mr-2"></div>
                        <span className="text-yellow-400">Learning</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="flex items-center">
                        <i className="fas fa-server text-[#FF00E5] mr-3"></i>
                        <div>
                          <div className="font-medium">Quantum Processor</div>
                          <div className="text-xs text-gray-400">
                            Signal processing unit
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <div className="w-2 h-2 rounded-full bg-green-400 mr-2"></div>
                        <span className="text-green-400">Online</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="flex items-center">
                        <i className="fas fa-vial text-[#00F0FF] mr-3"></i>
                        <div>
                          <div className="font-medium">Testing Environment</div>
                          <div className="text-xs text-gray-400">
                            Laboratory systems
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <div className="w-2 h-2 rounded-full bg-green-400 mr-2"></div>
                        <span className="text-green-400">Active</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="flex items-center">
                        <i className="fas fa-shield-alt text-[#FF00E5] mr-3"></i>
                        <div>
                          <div className="font-medium">Security Protocol</div>
                          <div className="text-xs text-gray-400">
                            Data protection
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <div className="w-2 h-2 rounded-full bg-green-400 mr-2"></div>
                        <span className="text-green-400">Secure</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-[#12121A] rounded-lg border border-gray-800 shadow-lg">
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-4">Quick Actions</h3>
                  <div className="grid grid-cols-2 gap-3">
                    <button className="bg-[#1A1A25] p-3 rounded-lg hover:bg-[#252535] transition-colors text-sm font-medium flex flex-col items-center justify-center h-24 !rounded-button whitespace-nowrap cursor-pointer">
                      <i className="fas fa-file-export text-[#00F0FF] text-xl mb-2"></i>
                      Export Report
                    </button>
                    <button className="bg-[#1A1A25] p-3 rounded-lg hover:bg-[#252535] transition-colors text-sm font-medium flex flex-col items-center justify-center h-24 !rounded-button whitespace-nowrap cursor-pointer">
                      <i className="fas fa-tasks text-[#FF00E5] text-xl mb-2"></i>
                      Update Status
                    </button>
                    <button className="bg-[#1A1A25] p-3 rounded-lg hover:bg-[#252535] transition-colors text-sm font-medium flex flex-col items-center justify-center h-24 !rounded-button whitespace-nowrap cursor-pointer">
                      <i className="fas fa-calendar-plus text-[#00F0FF] text-xl mb-2"></i>
                      Schedule Meeting
                    </button>
                    <button
                      className="bg-[#1A1A25] p-3 rounded-lg hover:bg-[#252535] transition-colors text-sm font-medium flex flex-col items-center justify-center h-24 !rounded-button whitespace-nowrap cursor-pointer"
                      onClick={() => setShowResourceModal(true)}
                    >
                      <i className="fas fa-hand-holding-usd text-[#FF00E5] text-xl mb-2"></i>
                      Request Resources
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        {/* Team Tab Content */}
        {activeTab === "team" && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="bg-[#12121A] rounded-lg border border-gray-800 shadow-lg mb-8">
                <div className="p-6">
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="text-xl font-bold">Team Members</h3>
                    <button
                      className="bg-[#00F0FF] text-black px-4 py-2 !rounded-button text-sm font-medium hover:opacity-90 transition-opacity whitespace-nowrap cursor-pointer"
                      onClick={() => setShowTeamModal(true)}
                    >
                      <i className="fas fa-user-plus mr-2"></i>
                      Add Team Member
                    </button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-[#1A1A25] rounded-lg p-4 border border-gray-800">
                      <div className="flex items-start">
                        <div className="w-16 h-16 rounded-full bg-[#252535] border-2 border-[#00F0FF] flex items-center justify-center text-lg font-medium mr-4 flex-shrink-0">
                          AK
                        </div>
                        <div>
                          <h4 className="font-bold text-lg">Alex Kwan</h4>
                          <p className="text-[#00F0FF] text-sm mb-2">
                            Project Lead
                          </p>
                          <p className="text-gray-400 text-sm mb-3">
                            Quantum Computing Specialist with 10+ years
                            experience in neural interfaces
                          </p>
                          <div className="flex space-x-3">
                            <button className="w-8 h-8 rounded-full bg-[#252535] flex items-center justify-center hover:bg-[#303045] transition-colors !rounded-button whitespace-nowrap cursor-pointer">
                              <i className="fas fa-envelope text-[#00F0FF] text-sm"></i>
                            </button>
                            <button className="w-8 h-8 rounded-full bg-[#252535] flex items-center justify-center hover:bg-[#303045] transition-colors !rounded-button whitespace-nowrap cursor-pointer">
                              <i className="fas fa-phone text-[#00F0FF] text-sm"></i>
                            </button>
                            <button className="w-8 h-8 rounded-full bg-[#252535] flex items-center justify-center hover:bg-[#303045] transition-colors !rounded-button whitespace-nowrap cursor-pointer">
                              <i className="fas fa-video text-[#00F0FF] text-sm"></i>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="bg-[#1A1A25] rounded-lg p-4 border border-gray-800">
                      <div className="flex items-start">
                        <div className="w-16 h-16 rounded-full bg-[#252535] border-2 border-[#FF00E5] flex items-center justify-center text-lg font-medium mr-4 flex-shrink-0">
                          SM
                        </div>
                        <div>
                          <h4 className="font-bold text-lg">Sarah Miller</h4>
                          <p className="text-[#FF00E5] text-sm mb-2">
                            Neural Engineer
                          </p>
                          <p className="text-gray-400 text-sm mb-3">
                            Specializes in brain-computer interfaces and neural
                            signal processing
                          </p>
                          <div className="flex space-x-3">
                            <button className="w-8 h-8 rounded-full bg-[#252535] flex items-center justify-center hover:bg-[#303045] transition-colors !rounded-button whitespace-nowrap cursor-pointer">
                              <i className="fas fa-envelope text-[#FF00E5] text-sm"></i>
                            </button>
                            <button className="w-8 h-8 rounded-full bg-[#252535] flex items-center justify-center hover:bg-[#303045] transition-colors !rounded-button whitespace-nowrap cursor-pointer">
                              <i className="fas fa-phone text-[#FF00E5] text-sm"></i>
                            </button>
                            <button className="w-8 h-8 rounded-full bg-[#252535] flex items-center justify-center hover:bg-[#303045] transition-colors !rounded-button whitespace-nowrap cursor-pointer">
                              <i className="fas fa-video text-[#FF00E5] text-sm"></i>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="bg-[#1A1A25] rounded-lg p-4 border border-gray-800">
                      <div className="flex items-start">
                        <div className="w-16 h-16 rounded-full bg-[#252535] border-2 border-[#00F0FF] flex items-center justify-center text-lg font-medium mr-4 flex-shrink-0">
                          DL
                        </div>
                        <div>
                          <h4 className="font-bold text-lg">David Lee</h4>
                          <p className="text-[#00F0FF] text-sm mb-2">
                            Cybernetics Expert
                          </p>
                          <p className="text-gray-400 text-sm mb-3">
                            Focuses on human-machine integration and cybernetic
                            systems
                          </p>
                          <div className="flex space-x-3">
                            <button className="w-8 h-8 rounded-full bg-[#252535] flex items-center justify-center hover:bg-[#303045] transition-colors !rounded-button whitespace-nowrap cursor-pointer">
                              <i className="fas fa-envelope text-[#00F0FF] text-sm"></i>
                            </button>
                            <button className="w-8 h-8 rounded-full bg-[#252535] flex items-center justify-center hover:bg-[#303045] transition-colors !rounded-button whitespace-nowrap cursor-pointer">
                              <i className="fas fa-phone text-[#00F0FF] text-sm"></i>
                            </button>
                            <button className="w-8 h-8 rounded-full bg-[#252535] flex items-center justify-center hover:bg-[#303045] transition-colors !rounded-button whitespace-nowrap cursor-pointer">
                              <i className="fas fa-video text-[#00F0FF] text-sm"></i>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="bg-[#1A1A25] rounded-lg p-4 border border-gray-800">
                      <div className="flex items-start">
                        <div className="w-16 h-16 rounded-full bg-[#252535] border-2 border-[#FF00E5] flex items-center justify-center text-lg font-medium mr-4 flex-shrink-0">
                          JC
                        </div>
                        <div>
                          <h4 className="font-bold text-lg">Jennifer Chen</h4>
                          <p className="text-[#FF00E5] text-sm mb-2">
                            Quantum Algorithm Specialist
                          </p>
                          <p className="text-gray-400 text-sm mb-3">
                            Develops quantum computing algorithms for neural
                            processing
                          </p>
                          <div className="flex space-x-3">
                            <button className="w-8 h-8 rounded-full bg-[#252535] flex items-center justify-center hover:bg-[#303045] transition-colors !rounded-button whitespace-nowrap cursor-pointer">
                              <i className="fas fa-envelope text-[#FF00E5] text-sm"></i>
                            </button>
                            <button className="w-8 h-8 rounded-full bg-[#252535] flex items-center justify-center hover:bg-[#303045] transition-colors !rounded-button whitespace-nowrap cursor-pointer">
                              <i className="fas fa-phone text-[#FF00E5] text-sm"></i>
                            </button>
                            <button className="w-8 h-8 rounded-full bg-[#252535] flex items-center justify-center hover:bg-[#303045] transition-colors !rounded-button whitespace-nowrap cursor-pointer">
                              <i className="fas fa-video text-[#FF00E5] text-sm"></i>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-[#12121A] rounded-lg border border-gray-800 shadow-lg">
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-4">Team Performance</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                    <div className="bg-[#1A1A25] p-4 rounded-lg">
                      <div className="text-xs text-gray-400 mb-1">
                        Tasks Completed
                      </div>
                      <div className="text-2xl font-bold">127 / 164</div>
                      <div className="w-full h-1 bg-gray-800 rounded-full overflow-hidden mt-2">
                        <div
                          className="h-full bg-[#00F0FF]"
                          style={{ width: "77%" }}
                        ></div>
                      </div>
                    </div>
                    <div className="bg-[#1A1A25] p-4 rounded-lg">
                      <div className="text-xs text-gray-400 mb-1">
                        Avg. Response Time
                      </div>
                      <div className="text-2xl font-bold">4.2 hrs</div>
                      <div className="text-xs text-green-400 mt-2">
                        <i className="fas fa-arrow-down mr-1"></i>
                        12% from last month
                      </div>
                    </div>
                    <div className="bg-[#1A1A25] p-4 rounded-lg">
                      <div className="text-xs text-gray-400 mb-1">
                        Team Velocity
                      </div>
                      <div className="text-2xl font-bold">86 pts/wk</div>
                      <div className="text-xs text-green-400 mt-2">
                        <i className="fas fa-arrow-up mr-1"></i>
                        8% from last month
                      </div>
                    </div>
                  </div>
                  <h4 className="font-bold mb-3">Recent Team Activity</h4>
                  <div className="space-y-4">
                    <div className="bg-[#1A1A25] p-3 rounded-lg">
                      <div className="flex">
                        <div className="w-8 h-8 rounded-full bg-[#252535] flex items-center justify-center text-xs font-medium mr-3 flex-shrink-0">
                          SM
                        </div>
                        <div>
                          <div className="flex items-center">
                            <span className="font-medium">Sarah Miller</span>
                            <span className="text-gray-500 text-xs ml-2">
                              Yesterday at 3:45 PM
                            </span>
                          </div>
                          <p className="text-gray-300 text-sm">
                            Completed neural mapping tests with 98.7% accuracy -
                            new record!
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="bg-[#1A1A25] p-3 rounded-lg">
                      <div className="flex">
                        <div className="w-8 h-8 rounded-full bg-[#252535] flex items-center justify-center text-xs font-medium mr-3 flex-shrink-0">
                          AK
                        </div>
                        <div>
                          <div className="flex items-center">
                            <span className="font-medium">Alex Kwan</span>
                            <span className="text-gray-500 text-xs ml-2">
                              2 days ago
                            </span>
                          </div>
                          <p className="text-gray-300 text-sm">
                            Optimized quantum processing algorithm, reducing
                            latency by 15ms
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="bg-[#1A1A25] p-3 rounded-lg">
                      <div className="flex">
                        <div className="w-8 h-8 rounded-full bg-[#252535] flex items-center justify-center text-xs font-medium mr-3 flex-shrink-0">
                          DL
                        </div>
                        <div>
                          <div className="flex items-center">
                            <span className="font-medium">David Lee</span>
                            <span className="text-gray-500 text-xs ml-2">
                              3 days ago
                            </span>
                          </div>
                          <p className="text-gray-300 text-sm">
                            Redesigned interface headset for improved comfort
                            during extended use
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <div className="bg-[#12121A] rounded-lg border border-gray-800 shadow-lg mb-8">
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-4">Team Lead</h3>
                  <div className="flex flex-col items-center mb-6">
                    <div className="w-24 h-24 rounded-full bg-[#252535] border-4 border-[#00F0FF] flex items-center justify-center text-2xl font-bold mb-4">
                      AK
                    </div>
                    <h4 className="text-xl font-bold">Alex Kwan, Ph.D.</h4>
                    <p className="text-[#00F0FF]">
                      Project Lead & Quantum Computing Specialist
                    </p>
                  </div>
                  <div className="space-y-4 mb-6">
                    <div className="flex items-center">
                      <i className="fas fa-envelope text-[#00F0FF] w-6"></i>
                      <span className="ml-3">alex.kwan@nexusrobotics.com</span>
                    </div>
                    <div className="flex items-center">
                      <i className="fas fa-phone text-[#00F0FF] w-6"></i>
                      <span className="ml-3">+1 (555) 123-4567</span>
                    </div>
                    <div className="flex items-center">
                      <i className="fas fa-building text-[#00F0FF] w-6"></i>
                      <span className="ml-3">Quantum Research Division</span>
                    </div>
                    <div className="flex items-center">
                      <i className="fas fa-clock text-[#00F0FF] w-6"></i>
                      <span className="ml-3">With Nexus since 2020</span>
                    </div>
                  </div>
                  <div className="border-t border-gray-800 pt-4">
                    <h4 className="font-bold mb-2">Expertise</h4>
                    <div className="flex flex-wrap gap-2">
                      <span className="px-3 py-1 bg-[#252535] rounded-full text-xs">
                        Quantum Computing
                      </span>
                      <span className="px-3 py-1 bg-[#252535] rounded-full text-xs">
                        Neural Interfaces
                      </span>
                      <span className="px-3 py-1 bg-[#252535] rounded-full text-xs">
                        AI Systems
                      </span>
                      <span className="px-3 py-1 bg-[#252535] rounded-full text-xs">
                        Project Management
                      </span>
                      <span className="px-3 py-1 bg-[#252535] rounded-full text-xs">
                        Cybernetics
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-[#12121A] rounded-lg border border-gray-800 shadow-lg mb-8">
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-4">
                    Team Expertise Distribution
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Quantum Computing</span>
                        <span>85%</span>
                      </div>
                      <div className="w-full h-2 bg-gray-800 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-[#00F0FF]"
                          style={{ width: "85%" }}
                        ></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Neural Networks</span>
                        <span>92%</span>
                      </div>
                      <div className="w-full h-2 bg-gray-800 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-[#FF00E5]"
                          style={{ width: "92%" }}
                        ></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Cybernetics</span>
                        <span>78%</span>
                      </div>
                      <div className="w-full h-2 bg-gray-800 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-[#00F0FF]"
                          style={{ width: "78%" }}
                        ></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Hardware Design</span>
                        <span>65%</span>
                      </div>
                      <div className="w-full h-2 bg-gray-800 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-[#FF00E5]"
                          style={{ width: "65%" }}
                        ></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Medical Applications</span>
                        <span>70%</span>
                      </div>
                      <div className="w-full h-2 bg-gray-800 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-[#00F0FF]"
                          style={{ width: "70%" }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-[#12121A] rounded-lg border border-gray-800 shadow-lg">
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-4">Team Communication</h3>
                  <div className="grid grid-cols-2 gap-3">
                    <button className="bg-[#1A1A25] p-3 rounded-lg hover:bg-[#252535] transition-colors text-sm font-medium flex flex-col items-center justify-center h-24 !rounded-button whitespace-nowrap cursor-pointer">
                      <i className="fas fa-users text-[#00F0FF] text-xl mb-2"></i>
                      Team Meeting
                    </button>
                    <button className="bg-[#1A1A25] p-3 rounded-lg hover:bg-[#252535] transition-colors text-sm font-medium flex flex-col items-center justify-center h-24 !rounded-button whitespace-nowrap cursor-pointer">
                      <i className="fas fa-comment-alt text-[#FF00E5] text-xl mb-2"></i>
                      Message Team
                    </button>
                    <button className="bg-[#1A1A25] p-3 rounded-lg hover:bg-[#252535] transition-colors text-sm font-medium flex flex-col items-center justify-center h-24 !rounded-button whitespace-nowrap cursor-pointer">
                      <i className="fas fa-file-alt text-[#00F0FF] text-xl mb-2"></i>
                      Share Document
                    </button>
                    <button className="bg-[#1A1A25] p-3 rounded-lg hover:bg-[#252535] transition-colors text-sm font-medium flex flex-col items-center justify-center h-24 !rounded-button whitespace-nowrap cursor-pointer">
                      <i className="fas fa-tasks text-[#FF00E5] text-xl mb-2"></i>
                      Assign Tasks
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        {/* Other tabs would be implemented similarly */}
        {activeTab !== "overview" && activeTab !== "team" && (
          <div className="bg-[#12121A] rounded-lg border border-gray-800 shadow-lg p-8 text-center">
            <i className="fas fa-tools text-5xl text-[#00F0FF] mb-4"></i>
            <h3 className="text-2xl font-bold mb-2">
              This Section is Under Development
            </h3>
            <p className="text-gray-400 mb-6 max-w-lg mx-auto">
              We're currently building the{" "}
              {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} section
              of the project details page. Please check back soon for updates.
            </p>
            <button
              className="bg-[#00F0FF] text-black px-6 py-3 !rounded-button font-medium hover:opacity-90 transition-opacity whitespace-nowrap cursor-pointer"
              onClick={() => setActiveTab("overview")}
            >
              <i className="fas fa-arrow-left mr-2"></i>
              Return to Overview
            </button>
          </div>
        )}
        {/* Resource Allocation Tab */}
        {activeTab === "resources" && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="bg-[#12121A] rounded-lg border border-gray-800 shadow-lg mb-8">
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-6">
                    Resource Allocation
                  </h3>
                  <div id="resource-chart" className="w-full h-80"></div>
                </div>
              </div>
              <div className="bg-[#12121A] rounded-lg border border-gray-800 shadow-lg">
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-4">Resource Details</h3>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-gray-800">
                          <th className="text-left py-3 px-4">Resource Type</th>
                          <th className="text-left py-3 px-4">Allocated</th>
                          <th className="text-left py-3 px-4">Used</th>
                          <th className="text-left py-3 px-4">Remaining</th>
                          <th className="text-left py-3 px-4">Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-b border-gray-800">
                          <td className="py-3 px-4">
                            <div className="flex items-center">
                              <i className="fas fa-dollar-sign text-[#00F0FF] mr-3"></i>
                              <span>Budget</span>
                            </div>
                          </td>
                          <td className="py-3 px-4">$2,500,000</td>
                          <td className="py-3 px-4">$1,625,000</td>
                          <td className="py-3 px-4">$875,000</td>
                          <td className="py-3 px-4">
                            <span className="px-2 py-1 bg-green-900 text-green-400 rounded-full text-xs">
                              On Track
                            </span>
                          </td>
                        </tr>
                        <tr className="border-b border-gray-800">
                          <td className="py-3 px-4">
                            <div className="flex items-center">
                              <i className="fas fa-laptop-code text-[#FF00E5] mr-3"></i>
                              <span>Equipment</span>
                            </div>
                          </td>
                          <td className="py-3 px-4">42 units</td>
                          <td className="py-3 px-4">34 units</td>
                          <td className="py-3 px-4">8 units</td>
                          <td className="py-3 px-4">
                            <span className="px-2 py-1 bg-yellow-900 text-yellow-400 rounded-full text-xs">
                              High Usage
                            </span>
                          </td>
                        </tr>
                        <tr className="border-b border-gray-800">
                          <td className="py-3 px-4">
                            <div className="flex items-center">
                              <i className="fas fa-users text-[#00F0FF] mr-3"></i>
                              <span>Personnel</span>
                            </div>
                          </td>
                          <td className="py-3 px-4">12 members</td>
                          <td className="py-3 px-4">12 members</td>
                          <td className="py-3 px-4">0 members</td>
                          <td className="py-3 px-4">
                            <span className="px-2 py-1 bg-red-900 text-red-400 rounded-full text-xs">
                              At Capacity
                            </span>
                          </td>
                        </tr>
                        <tr className="border-b border-gray-800">
                          <td className="py-3 px-4">
                            <div className="flex items-center">
                              <i className="fas fa-clock text-[#FF00E5] mr-3"></i>
                              <span>Time</span>
                            </div>
                          </td>
                          <td className="py-3 px-4">180 days</td>
                          <td className="py-3 px-4">137 days</td>
                          <td className="py-3 px-4">43 days</td>
                          <td className="py-3 px-4">
                            <span className="px-2 py-1 bg-green-900 text-green-400 rounded-full text-xs">
                              On Schedule
                            </span>
                          </td>
                        </tr>
                        <tr>
                          <td className="py-3 px-4">
                            <div className="flex items-center">
                              <i className="fas fa-server text-[#00F0FF] mr-3"></i>
                              <span>Computing Power</span>
                            </div>
                          </td>
                          <td className="py-3 px-4">500 QFLOPS</td>
                          <td className="py-3 px-4">425 QFLOPS</td>
                          <td className="py-3 px-4">75 QFLOPS</td>
                          <td className="py-3 px-4">
                            <span className="px-2 py-1 bg-yellow-900 text-yellow-400 rounded-full text-xs">
                              High Usage
                            </span>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <div className="bg-[#12121A] rounded-lg border border-gray-800 shadow-lg mb-8">
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-4">Budget Breakdown</h3>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Research & Development</span>
                        <span>45%</span>
                      </div>
                      <div className="w-full h-2 bg-gray-800 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-[#00F0FF]"
                          style={{ width: "45%" }}
                        ></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Equipment & Materials</span>
                        <span>30%</span>
                      </div>
                      <div className="w-full h-2 bg-gray-800 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-[#FF00E5]"
                          style={{ width: "30%" }}
                        ></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Personnel</span>
                        <span>20%</span>
                      </div>
                      <div className="w-full h-2 bg-gray-800 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-[#00F0FF]"
                          style={{ width: "20%" }}
                        ></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Testing & Validation</span>
                        <span>5%</span>
                      </div>
                      <div className="w-full h-2 bg-gray-800 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-[#FF00E5]"
                          style={{ width: "5%" }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-[#12121A] rounded-lg border border-gray-800 shadow-lg mb-8">
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-4">Resource Requests</h3>
                  <div className="space-y-3">
                    <div className="bg-[#1A1A25] p-3 rounded-lg">
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-medium">
                            Additional Quantum Processor
                          </h4>
                          <p className="text-gray-400 text-xs">
                            Requested by: Alex Kwan
                          </p>
                          <p className="text-gray-400 text-xs">2 days ago</p>
                        </div>
                        <span className="px-2 py-1 bg-yellow-900 text-yellow-400 rounded-full text-xs">
                          Pending
                        </span>
                      </div>
                    </div>
                    <div className="bg-[#1A1A25] p-3 rounded-lg">
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-medium">
                            Neural Interface Prototype Materials
                          </h4>
                          <p className="text-gray-400 text-xs">
                            Requested by: Sarah Miller
                          </p>
                          <p className="text-gray-400 text-xs">5 days ago</p>
                        </div>
                        <span className="px-2 py-1 bg-green-900 text-green-400 rounded-full text-xs">
                          Approved
                        </span>
                      </div>
                    </div>
                    <div className="bg-[#1A1A25] p-3 rounded-lg">
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-medium">
                            Additional Research Staff
                          </h4>
                          <p className="text-gray-400 text-xs">
                            Requested by: Alex Kwan
                          </p>
                          <p className="text-gray-400 text-xs">1 week ago</p>
                        </div>
                        <span className="px-2 py-1 bg-red-900 text-red-400 rounded-full text-xs">
                          Denied
                        </span>
                      </div>
                    </div>
                  </div>
                  <button
                    className="w-full mt-4 bg-[#1A1A25] p-3 rounded-lg hover:bg-[#252535] transition-colors text-sm font-medium !rounded-button whitespace-nowrap cursor-pointer"
                    onClick={() => setShowResourceModal(true)}
                  >
                    <i className="fas fa-plus-circle mr-2 text-[#00F0FF]"></i>
                    New Resource Request
                  </button>
                </div>
              </div>
              <div className="bg-[#12121A] rounded-lg border border-gray-800 shadow-lg">
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-4">
                    Resource Management
                  </h3>
                  <div className="grid grid-cols-2 gap-3">
                    <button className="bg-[#1A1A25] p-3 rounded-lg hover:bg-[#252535] transition-colors text-sm font-medium flex flex-col items-center justify-center h-24 !rounded-button whitespace-nowrap cursor-pointer">
                      <i className="fas fa-file-export text-[#00F0FF] text-xl mb-2"></i>
                      Export Report
                    </button>
                    <button className="bg-[#1A1A25] p-3 rounded-lg hover:bg-[#252535] transition-colors text-sm font-medium flex flex-col items-center justify-center h-24 !rounded-button whitespace-nowrap cursor-pointer">
                      <i className="fas fa-chart-line text-[#FF00E5] text-xl mb-2"></i>
                      Budget Analysis
                    </button>
                    <button className="bg-[#1A1A25] p-3 rounded-lg hover:bg-[#252535] transition-colors text-sm font-medium flex flex-col items-center justify-center h-24 !rounded-button whitespace-nowrap cursor-pointer">
                      <i className="fas fa-calendar-alt text-[#00F0FF] text-xl mb-2"></i>
                      Resource Calendar
                    </button>
                    <button className="bg-[#1A1A25] p-3 rounded-lg hover:bg-[#252535] transition-colors text-sm font-medium flex flex-col items-center justify-center h-24 !rounded-button whitespace-nowrap cursor-pointer">
                      <i className="fas fa-cog text-[#FF00E5] text-xl mb-2"></i>
                      Settings
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        {/* Timeline Tab */}
        {activeTab === "timeline" && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="bg-[#12121A] rounded-lg border border-gray-800 shadow-lg mb-8">
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-6">Project Timeline</h3>
                  <div id="timeline-chart" className="w-full h-80"></div>
                </div>
              </div>
              <div className="bg-[#12121A] rounded-lg border border-gray-800 shadow-lg">
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-6">Project Milestones</h3>
                  <div className="relative">
                    <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gray-800"></div>
                    <div className="relative pl-12 pb-8">
                      <div className="absolute left-0 w-8 h-8 rounded-full bg-[#00F0FF] flex items-center justify-center">
                        <i className="fas fa-check text-black"></i>
                      </div>
                      <div>
                        <div className="flex items-center mb-1">
                          <h4 className="font-bold text-lg">
                            Project Initiation
                          </h4>
                          <span className="ml-3 text-xs text-gray-400">
                            January 15, 2025
                          </span>
                          <span className="ml-3 px-2 py-1 bg-green-900 text-green-400 rounded-full text-xs">
                            Completed
                          </span>
                        </div>
                        <p className="text-gray-300 mb-2">
                          Project scope defined, team assembled, and initial
                          resources allocated.
                        </p>
                        <div className="flex space-x-3">
                          <span className="text-xs text-gray-400">
                            <i className="fas fa-file-alt mr-1"></i> 3 Documents
                          </span>
                          <span className="text-xs text-gray-400">
                            <i className="fas fa-tasks mr-1"></i> 12 Tasks
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="relative pl-12 pb-8">
                      <div className="absolute left-0 w-8 h-8 rounded-full bg-[#00F0FF] flex items-center justify-center">
                        <i className="fas fa-check text-black"></i>
                      </div>
                      <div>
                        <div className="flex items-center mb-1">
                          <h4 className="font-bold text-lg">
                            Quantum Algorithm Development
                          </h4>
                          <span className="ml-3 text-xs text-gray-400">
                            March 10, 2025
                          </span>
                          <span className="ml-3 px-2 py-1 bg-green-900 text-green-400 rounded-full text-xs">
                            Completed
                          </span>
                        </div>
                        <p className="text-gray-300 mb-2">
                          Core quantum processing algorithms developed and
                          tested in lab environment.
                        </p>
                        <div className="flex space-x-3">
                          <span className="text-xs text-gray-400">
                            <i className="fas fa-file-alt mr-1"></i> 8 Documents
                          </span>
                          <span className="text-xs text-gray-400">
                            <i className="fas fa-tasks mr-1"></i> 24 Tasks
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="relative pl-12 pb-8">
                      <div className="absolute left-0 w-8 h-8 rounded-full bg-[#00F0FF] flex items-center justify-center">
                        <i className="fas fa-check text-black"></i>
                      </div>
                      <div>
                        <div className="flex items-center mb-1">
                          <h4 className="font-bold text-lg">
                            Neural Interface Prototype
                          </h4>
                          <span className="ml-3 text-xs text-gray-400">
                            May 22, 2025
                          </span>
                          <span className="ml-3 px-2 py-1 bg-green-900 text-green-400 rounded-full text-xs">
                            Completed
                          </span>
                        </div>
                        <p className="text-gray-300 mb-2">
                          First working prototype of the non-invasive neural
                          interface developed.
                        </p>
                        <div className="flex space-x-3">
                          <span className="text-xs text-gray-400">
                            <i className="fas fa-file-alt mr-1"></i> 12
                            Documents
                          </span>
                          <span className="text-xs text-gray-400">
                            <i className="fas fa-tasks mr-1"></i> 31 Tasks
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="relative pl-12 pb-8">
                      <div className="absolute left-0 w-8 h-8 rounded-full bg-[#FF00E5] flex items-center justify-center">
                        <i className="fas fa-spinner fa-spin text-black"></i>
                      </div>
                      <div>
                        <div className="flex items-center mb-1">
                          <h4 className="font-bold text-lg">
                            System Integration
                          </h4>
                          <span className="ml-3 text-xs text-gray-400">
                            Current Phase
                          </span>
                          <span className="ml-3 px-2 py-1 bg-blue-900 text-blue-400 rounded-full text-xs">
                            In Progress
                          </span>
                        </div>
                        <p className="text-gray-300 mb-2">
                          Integration of quantum processing with neural
                          interface hardware.
                        </p>
                        <div className="flex space-x-3">
                          <span className="text-xs text-gray-400">
                            <i className="fas fa-file-alt mr-1"></i> 9 Documents
                          </span>
                          <span className="text-xs text-gray-400">
                            <i className="fas fa-tasks mr-1"></i> 28 Tasks
                          </span>
                          <span className="text-xs text-[#00F0FF]">
                            <i className="fas fa-chart-line mr-1"></i> 78%
                            Complete
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="relative pl-12 pb-8">
                      <div className="absolute left-0 w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center">
                        <i className="fas fa-hourglass text-gray-400"></i>
                      </div>
                      <div>
                        <div className="flex items-center mb-1">
                          <h4 className="font-bold text-lg">
                            Clinical Testing
                          </h4>
                          <span className="ml-3 text-xs text-gray-400">
                            Starts August 15, 2025
                          </span>
                          <span className="ml-3 px-2 py-1 bg-gray-800 text-gray-400 rounded-full text-xs">
                            Upcoming
                          </span>
                        </div>
                        <p className="text-gray-300 mb-2">
                          Controlled testing with volunteer subjects in clinical
                          environment.
                        </p>
                        <div className="flex space-x-3">
                          <span className="text-xs text-gray-400">
                            <i className="fas fa-file-alt mr-1"></i> 5 Documents
                          </span>
                          <span className="text-xs text-gray-400">
                            <i className="fas fa-tasks mr-1"></i> 18 Tasks
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="relative pl-12">
                      <div className="absolute left-0 w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center">
                        <i className="fas fa-flag-checkered text-gray-400"></i>
                      </div>
                      <div>
                        <div className="flex items-center mb-1">
                          <h4 className="font-bold text-lg">
                            Final Product & Documentation
                          </h4>
                          <span className="ml-3 text-xs text-gray-400">
                            Target: October 30, 2025
                          </span>
                          <span className="ml-3 px-2 py-1 bg-gray-800 text-gray-400 rounded-full text-xs">
                            Upcoming
                          </span>
                        </div>
                        <p className="text-gray-300 mb-2">
                          Completion of market-ready prototype and comprehensive
                          documentation.
                        </p>
                        <div className="flex space-x-3">
                          <span className="text-xs text-gray-400">
                            <i className="fas fa-file-alt mr-1"></i> 15
                            Documents
                          </span>
                          <span className="text-xs text-gray-400">
                            <i className="fas fa-tasks mr-1"></i> 42 Tasks
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <div className="bg-[#12121A] rounded-lg border border-gray-800 shadow-lg mb-8">
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-4">Timeline Overview</h3>
                  <div className="space-y-4">
                    <div className="bg-[#1A1A25] p-4 rounded-lg">
                      <div className="flex items-center mb-2">
                        <i className="fas fa-calendar-alt text-[#00F0FF] mr-3"></i>
                        <h4 className="font-medium">Project Duration</h4>
                      </div>
                      <div className="flex justify-between items-center">
                        <div>
                          <div className="text-xs text-gray-400">
                            Start Date
                          </div>
                          <div>Jan 15, 2025</div>
                        </div>
                        <div className="text-gray-600">
                          <i className="fas fa-arrow-right"></i>
                        </div>
                        <div>
                          <div className="text-xs text-gray-400">End Date</div>
                          <div>Oct 30, 2025</div>
                        </div>
                      </div>
                    </div>
                    <div className="bg-[#1A1A25] p-4 rounded-lg">
                      <div className="flex items-center mb-2">
                        <i className="fas fa-hourglass-half text-[#FF00E5] mr-3"></i>
                        <h4 className="font-medium">Current Status</h4>
                      </div>
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>Timeline Progress</span>
                          <span>61%</span>
                        </div>
                        <div className="w-full h-2 bg-gray-800 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-[#00F0FF] to-[#FF00E5]"
                            style={{ width: "61%" }}
                          ></div>
                        </div>
                      </div>
                      <div className="mt-3 text-sm">
                        <span className="text-[#00F0FF]">137 days</span>{" "}
                        elapsed, <span className="text-[#FF00E5]">43 days</span>{" "}
                        remaining until next milestone
                      </div>
                    </div>
                    <div className="bg-[#1A1A25] p-4 rounded-lg">
                      <div className="flex items-center mb-2">
                        <i className="fas fa-exclamation-triangle text-yellow-400 mr-3"></i>
                        <h4 className="font-medium">Critical Path Items</h4>
                      </div>
                      <ul className="space-y-2 text-sm">
                        <li className="flex items-center">
                          <i className="fas fa-circle text-xs text-yellow-400 mr-2"></i>
                          Neural signal processing optimization
                        </li>
                        <li className="flex items-center">
                          <i className="fas fa-circle text-xs text-yellow-400 mr-2"></i>
                          Quantum entanglement stability testing
                        </li>
                        <li className="flex items-center">
                          <i className="fas fa-circle text-xs text-yellow-400 mr-2"></i>
                          Clinical testing approval process
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-[#12121A] rounded-lg border border-gray-800 shadow-lg mb-8">
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-4">Upcoming Deadlines</h3>
                  <div className="space-y-3">
                    <div className="bg-[#1A1A25] p-3 rounded-lg border-l-4 border-red-500">
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-medium">
                            Integration Testing Completion
                          </h4>
                          <p className="text-gray-400 text-xs">
                            Assigned to: Alex Kwan, Sarah Miller
                          </p>
                        </div>
                        <span className="text-red-400 text-sm">
                          2 days left
                        </span>
                      </div>
                    </div>
                    <div className="bg-[#1A1A25] p-3 rounded-lg border-l-4 border-yellow-500">
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-medium">
                            Quarterly Progress Report
                          </h4>
                          <p className="text-gray-400 text-xs">
                            Assigned to: Alex Kwan
                          </p>
                        </div>
                        <span className="text-yellow-400 text-sm">
                          5 days left
                        </span>
                      </div>
                    </div>
                    <div className="bg-[#1A1A25] p-3 rounded-lg border-l-4 border-blue-500">
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-medium">
                            Clinical Trial Documentation
                          </h4>
                          <p className="text-gray-400 text-xs">
                            Assigned to: David Lee
                          </p>
                        </div>
                        <span className="text-blue-400 text-sm">
                          2 weeks left
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-[#12121A] rounded-lg border border-gray-800 shadow-lg">
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-4">
                    Timeline Management
                  </h3>
                  <div className="grid grid-cols-2 gap-3">
                    <button className="bg-[#1A1A25] p-3 rounded-lg hover:bg-[#252535] transition-colors text-sm font-medium flex flex-col items-center justify-center h-24 !rounded-button whitespace-nowrap cursor-pointer">
                      <i className="fas fa-calendar-plus text-[#00F0FF] text-xl mb-2"></i>
                      Add Milestone
                    </button>
                    <button className="bg-[#1A1A25] p-3 rounded-lg hover:bg-[#252535] transition-colors text-sm font-medium flex flex-col items-center justify-center h-24 !rounded-button whitespace-nowrap cursor-pointer">
                      <i className="fas fa-tasks text-[#FF00E5] text-xl mb-2"></i>
                      Manage Tasks
                    </button>
                    <button className="bg-[#1A1A25] p-3 rounded-lg hover:bg-[#252535] transition-colors text-sm font-medium flex flex-col items-center justify-center h-24 !rounded-button whitespace-nowrap cursor-pointer">
                      <i className="fas fa-clock text-[#00F0FF] text-xl mb-2"></i>
                      Adjust Timeline
                    </button>
                    <button className="bg-[#1A1A25] p-3 rounded-lg hover:bg-[#252535] transition-colors text-sm font-medium flex flex-col items-center justify-center h-24 !rounded-button whitespace-nowrap cursor-pointer">
                      <i className="fas fa-file-export text-[#FF00E5] text-xl mb-2"></i>
                      Export Schedule
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
      {/* Footer */}
      <footer className="bg-[#0A0A0F] border-t border-gray-800 py-8 mt-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center mb-4">
                <div className="mr-2 relative w-8 h-8 flex items-center justify-center">
                  <div className="absolute w-full h-full bg-[#00F0FF] opacity-20 rounded-full"></div>
                  <i className="fas fa-robot text-xl text-[#00F0FF]"></i>
                </div>
                <h3 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#00F0FF] to-[#FF00E5]">
                  NEXUS
                </h3>
              </div>
              <p className="text-gray-400 text-sm mb-4">
                Pioneering the future of robotics and artificial intelligence
                with cutting-edge research and development.
              </p>
              <div className="flex space-x-4">
                <a
                  href="#"
                  className="text-gray-400 hover:text-[#00F0FF] transition-colors duration-300 cursor-pointer"
                >
                  <i className="fab fa-twitter"></i>
                </a>
                <a
                  href="#"
                  className="text-gray-400 hover:text-[#00F0FF] transition-colors duration-300 cursor-pointer"
                >
                  <i className="fab fa-linkedin"></i>
                </a>
                <a
                  href="#"
                  className="text-gray-400 hover:text-[#00F0FF] transition-colors duration-300 cursor-pointer"
                >
                  <i className="fab fa-github"></i>
                </a>
                <a
                  href="#"
                  className="text-gray-400 hover:text-[#00F0FF] transition-colors duration-300 cursor-pointer"
                >
                  <i className="fab fa-youtube"></i>
                </a>
              </div>
            </div>
            <div>
              <h4 className="text-white font-medium mb-4">Quick Links</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-[#00F0FF] transition-colors duration-300 cursor-pointer"
                  >
                    About Us
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-[#00F0FF] transition-colors duration-300 cursor-pointer"
                  >
                    Our Technology
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-[#00F0FF] transition-colors duration-300 cursor-pointer"
                  >
                    Research Papers
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-[#00F0FF] transition-colors duration-300 cursor-pointer"
                  >
                    Careers
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-[#00F0FF] transition-colors duration-300 cursor-pointer"
                  >
                    Contact
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-medium mb-4">Resources</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-[#00F0FF] transition-colors duration-300 cursor-pointer"
                  >
                    Documentation
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-[#00F0FF] transition-colors duration-300 cursor-pointer"
                  >
                    API Reference
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-[#00F0FF] transition-colors duration-300 cursor-pointer"
                  >
                    Developer Tools
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-[#00F0FF] transition-colors duration-300 cursor-pointer"
                  >
                    Community Forum
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-[#00F0FF] transition-colors duration-300 cursor-pointer"
                  >
                    Support Center
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-medium mb-4">Newsletter</h4>
              <p className="text-gray-400 text-sm mb-4">
                Subscribe to receive updates on our latest projects and
                breakthroughs.
              </p>
              <div className="flex">
                <input
                  type="email"
                  placeholder="Your email"
                  className="bg-[#1A1A25] border border-gray-700 rounded-l-lg px-4 py-2 text-sm flex-grow focus:outline-none focus:border-[#00F0FF]"
                />
                <button className="bg-[#00F0FF] text-black px-4 py-2 rounded-r-lg hover:bg-opacity-90 transition-colors duration-300 !rounded-button whitespace-nowrap cursor-pointer">
                  <i className="fas fa-paper-plane"></i>
                </button>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-500 text-sm">
              © 2025 Nexus Robotics. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a
                href="#"
                className="text-gray-500 hover:text-gray-300 text-sm cursor-pointer"
              >
                Privacy Policy
              </a>
              <a
                href="#"
                className="text-gray-500 hover:text-gray-300 text-sm cursor-pointer"
              >
                Terms of Service
              </a>
              <a
                href="#"
                className="text-gray-500 hover:text-gray-300 text-sm cursor-pointer"
              >
                Cookie Policy
              </a>
            </div>
          </div>
        </div>
      </footer>
      {/* Floating action button */}
      <div className="fixed bottom-8 right-8 z-20">
        <button className="w-14 h-14 rounded-full bg-gradient-to-r from-[#00F0FF] to-[#FF00E5] flex items-center justify-center shadow-lg hover:shadow-[0_0_20px_rgba(0,240,255,0.5)] transition-shadow duration-300 !rounded-button whitespace-nowrap cursor-pointer">
          <i className="fas fa-plus text-black text-xl"></i>
        </button>
      </div>
      {/* Add Team Member Modal */}
      {showTeamModal && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
          <div className="bg-[#12121A] rounded-lg border border-gray-800 shadow-lg w-full max-w-md p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold">Add Team Member</h3>
              <button
                className="text-gray-400 hover:text-white cursor-pointer"
                onClick={() => setShowTeamModal(false)}
              >
                <i className="fas fa-times"></i>
              </button>
            </div>
            <form>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">Name</label>
                <input
                  type="text"
                  className="w-full bg-[#1A1A25] border border-gray-700 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-[#00F0FF]"
                  placeholder="Enter full name"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">Role</label>
                <input
                  type="text"
                  className="w-full bg-[#1A1A25] border border-gray-700 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-[#00F0FF]"
                  placeholder="Enter role or position"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">Email</label>
                <input
                  type="email"
                  className="w-full bg-[#1A1A25] border border-gray-700 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-[#00F0FF]"
                  placeholder="Enter email address"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">
                  Expertise
                </label>
                <input
                  type="text"
                  className="w-full bg-[#1A1A25] border border-gray-700 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-[#00F0FF]"
                  placeholder="Enter areas of expertise"
                />
              </div>
              <div className="flex justify-end space-x-3 mt-6">
                <button
                  type="button"
                  className="px-4 py-2 bg-[#1A1A25] rounded-lg text-sm hover:bg-[#252535] transition-colors !rounded-button whitespace-nowrap cursor-pointer"
                  onClick={() => setShowTeamModal(false)}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="px-4 py-2 bg-[#00F0FF] text-black rounded-lg text-sm hover:opacity-90 transition-opacity !rounded-button whitespace-nowrap cursor-pointer"
                  onClick={() => setShowTeamModal(false)}
                >
                  Add Member
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      {/* Resource Request Modal */}
      {showResourceModal && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
          <div className="bg-[#12121A] rounded-lg border border-gray-800 shadow-lg w-full max-w-md p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold">Request Resources</h3>
              <button
                className="text-gray-400 hover:text-white cursor-pointer"
                onClick={() => setShowResourceModal(false)}
              >
                <i className="fas fa-times"></i>
              </button>
            </div>
            <form>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">
                  Resource Type
                </label>
                <select className="w-full bg-[#1A1A25] border border-gray-700 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-[#00F0FF]">
                  <option>Equipment</option>
                  <option>Personnel</option>
                  <option>Budget</option>
                  <option>Computing Resources</option>
                  <option>Other</option>
                </select>
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">
                  Description
                </label>
                <textarea
                  className="w-full bg-[#1A1A25] border border-gray-700 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-[#00F0FF] min-h-[100px]"
                  placeholder="Describe the resources needed and why they are necessary"
                ></textarea>
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">
                  Quantity/Amount
                </label>
                <input
                  type="text"
                  className="w-full bg-[#1A1A25] border border-gray-700 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-[#00F0FF]"
                  placeholder="Specify quantity or amount needed"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">
                  Priority
                </label>
                <div className="flex space-x-3">
                  <label className="flex items-center">
                    <input type="radio" name="priority" className="mr-2" />
                    <span>Low</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="priority"
                      className="mr-2"
                      checked
                    />
                    <span>Medium</span>
                  </label>
                  <label className="flex items-center">
                    <input type="radio" name="priority" className="mr-2" />
                    <span>High</span>
                  </label>
                  <label className="flex items-center">
                    <input type="radio" name="priority" className="mr-2" />
                    <span>Critical</span>
                  </label>
                </div>
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">
                  Date Needed
                </label>
                <input
                  type="date"
                  className="w-full bg-[#1A1A25] border border-gray-700 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-[#00F0FF]"
                />
              </div>
              <div className="flex justify-end space-x-3 mt-6">
                <button
                  type="button"
                  className="px-4 py-2 bg-[#1A1A25] rounded-lg text-sm hover:bg-[#252535] transition-colors !rounded-button whitespace-nowrap cursor-pointer"
                  onClick={() => setShowResourceModal(false)}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="px-4 py-2 bg-[#00F0FF] text-black rounded-lg text-sm hover:opacity-90 transition-opacity !rounded-button whitespace-nowrap cursor-pointer"
                  onClick={() => setShowResourceModal(false)}
                >
                  Submit Request
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
export default App;
