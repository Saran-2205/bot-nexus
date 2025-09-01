import React from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import { Suspense } from "react";

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

import LoginPage from "./Pages/Admin/LoginPage.jsx";
import RequireAdmin from "./Components/Admin/RequireAdmin.jsx";
import Feedback from "./Pages/Admin/Feedback.jsx";
import ProjectDetail from "./Pages/Public/ProjectDetail.jsx";
import CompetitionDetail from "./Pages/Public/CompetitionDetail.jsx";
import Achievements from "./Pages/Admin/Achievements.jsx";
import AchievementForm from "./Components/Admin/AchievementForm.jsx";
import Dashboard from "./Pages/Admin/Dashboard.jsx";
import ProjectsPage from "./Pages/Admin/Projects/ProjectsPage.jsx";
import CreateProjectPage from "./Pages/Admin/Projects/CreateProject.jsx";
import EditProject from "./Pages/Admin/Projects/EditProject.jsx";
import CompetitionsPage from "./Pages/Admin/Competitions/CompetitionsPage.jsx";
import CreateCompetitionPage from "./Pages/Admin/Competitions/CreateCompetition.jsx";
import EditCompetition from "./Pages/Admin/Competitions/EditCompetiton.jsx";
import TeamPage from "./Pages/Admin/Team/TeamPage.jsx";
import CreateTeamPage from "./Pages/Admin/Team/CreateTeam.jsx";
import EditTeam from "./Pages/Admin/Team/EditTeam.jsx";
import BlogsPage from "./Pages/Admin/Blogs/BlogsPage.jsx";
import CreateBlog from "./Pages/Admin/Blogs/CreateBlog.jsx";
import EditBlog from "./Pages/Admin/Blogs/EditBlog.jsx";
import AdminLayout from "./Components/Admin/AdminLayout.jsx";

const AppRoutes = () => {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith("/nexus-hq");

  return (
    <div className="bg-black text-white min-h-screen">
      <ScrollToTop />
      {!isAdminRoute && <Navbar />}

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

          {/* Admin Login Route */}
          <Route path="/nexus-hq/login" element={<LoginPage />} />
          {/* Admin Protected Routes */}
          <Route
            path="/nexus-hq"
            element={
              <RequireAdmin>
                <AdminLayout />
              </RequireAdmin>
            }
          >
            <Route index element={<Dashboard />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="feedback" element={<Feedback />} />
            <Route path="achievements" element={<Achievements />} />
            <Route path="achievements/add" element={<AchievementForm/>}/>
            <Route path="achievements/edit/:id" element={<AchievementForm/>}/>
            <Route path="projects" element={<ProjectsPage/>} />
            <Route path="projects/add" element={<CreateProjectPage />} />
            <Route path="projects/edit/:slug" element={<EditProject />} />
            <Route path="competitions" element={<CompetitionsPage />} />
            <Route path="competitions/add" element={<CreateCompetitionPage />} />
            <Route path="competitions/edit/:slug" element={<EditCompetition />} />
            <Route path="team" element={<TeamPage />} />
            <Route path="team/add" element={<CreateTeamPage />} />
            <Route path="team/edit/:slug" element={<EditTeam />} />
            <Route path="blog" element={<BlogsPage />} />
            <Route path="blog/add" element={<CreateBlog />} />
            <Route path="blog/edit/:slug" element={<EditBlog />} />
          </Route>
        </Routes>
      </Suspense>

      {!isAdminRoute && <Footer />}
    </div>
  );
};

export default AppRoutes;
