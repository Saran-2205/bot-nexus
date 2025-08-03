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
import About from "./Pages/Public/About.jsx";
import Blog from "./Pages/Public/Blog.jsx";
import Competitions from "./Pages/Public/Competitions.jsx";
import Team from "./Pages/Public/Team.jsx";
import Projects from "./Pages/Public/Projects.jsx";

// Lazy Admin Pages
const LoginPage = lazy(() => import("./Pages/Admin/LoginPage.jsx"));
const Dashboard = lazy(() => import("./Pages/Admin/Dashboard.jsx"));
const ProjectsPage = lazy(() => import("./Pages/Admin/Projects/ProjectsPage.jsx"));
const CreateProject = lazy(() => import("./Pages/Admin/Projects/CreateProject.jsx"));
const EditProject = lazy(() => import("./Pages/Admin/Projects/EditProject.jsx"));
const CompetitionsPage = lazy(() => import("./Pages/Admin/Competitions/CompetitionsPage.jsx"));
const CreateCompetition = lazy(() => import("./Pages/Admin/Competitions/CreateCompetition.jsx"));
const EditCompetition = lazy(() => import("./Pages/Admin/Competitions/EditCompetiton.jsx"));
const TeamPage = lazy(() => import("./Pages/Admin/Team/TeamPage.jsx"));
const CreateTeam = lazy(() => import("./Pages/Admin/Team/CreateTeam.jsx"));
const EditTeam = lazy(() => import("./Pages/Admin/Team/EditTeam.jsx"));
const BlogsPage = lazy(() => import("./Pages/Admin/Blogs/BlogsPage.jsx"));
const CreateBlog = lazy(()=> import("./Pages/Admin/Blogs/CreateBlog.jsx"));
const EditBlog = lazy(() => import("./Pages/Admin/Blogs/EditBlog.jsx"));
const AdminLayout = lazy(() => import("./Components/Admin/AdminLayout.jsx"));

import RequireAdmin from "./Components/Admin/RequireAdmin.jsx";

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
          <Route path="/competitions" element={<Competitions />} />
          <Route path="/team" element={<Team />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/aboutus" element={<About />} />

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
            <Route path="projects" element={<ProjectsPage />} />
            <Route path="projects/add" element={<CreateProject />} />
            <Route path="projects/edit/:slug" element={<EditProject />} />
            <Route path="competitions" element={<CompetitionsPage />} />
            <Route path="competitions/add" element={<CreateCompetition />} />
            <Route path="competitions/edit/:slug" element={<EditCompetition />} />
            <Route path="team" element={<TeamPage />} />
            <Route path="team/add" element={<CreateTeam />} />
            <Route path="team/edit/:slug" element={<EditTeam />} />
            <Route path="blog" element={<BlogsPage />} />
            <Route path="blog/add" element={<CreateBlog />} />
            <Route path="blog/edit/:slug" element={<EditBlog />} />
          </Route>
          <Route
            path="*"
            element={<div className="p-10 text-white">404 Not Found</div>}
          />
        </Routes>
      </Suspense>

      {!isAdminRoute && <Footer />}
    </div>
  );
};

export default AppRoutes;
