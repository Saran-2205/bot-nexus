import React from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import { lazy, Suspense } from "react";

import "./App.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

import Footer from "./Components/Public/Footer.jsx";
import Navbar from "./Components/Public/Navbar.jsx";
import ScrollToTop from "./Components/ScrollToTop.jsx";
import LoadingSpinner from "./Components/LoadingSpinner.jsx";

// Public Pages
import Home from "./Pages/Public/Home.jsx";
import AboutUs from "./Pages/Public/AboutUs.jsx";
import Blog from "./Pages/Public/Blog.jsx";
import Competitions from "./Pages/Public/Competitions.jsx";
import Team from "./Pages/Public/Team.jsx";
import Projects from "./Pages/Public/Projects.jsx";

import ProjectDetail from "./Pages/Public/ProjectDetail.jsx";
import CompetitionDetail from "./Pages/Public/CompetitionDetail.jsx";

const AppRoutes = () => {
  const location = useLocation();

  return (
    <div className="bg-black text-white min-h-screen">
      <ScrollToTop />
      <Navbar />

      <Suspense
        fallback={
          <div className="h-screen flex justify-center items-center">
            <LoadingSpinner size="lg" />
          </div>
        }
      >
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/projects/:param" element={<ProjectDetail />} />
          <Route path="/competitions" element={<Competitions />} />
          <Route path="/competitions/:param" element={<CompetitionDetail />} />
          <Route path="/team" element={<Team />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/aboutus" element={<AboutUs />} />
          
        </Routes>
      </Suspense>

      <Footer />
    </div>
  );
};

export default AppRoutes;
