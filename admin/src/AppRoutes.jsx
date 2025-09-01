import React from "react";
import { Route, Routes} from "react-router-dom";
import { Suspense } from "react";

import "./App.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

import ScrollToTop from "./Components/ScrollToTop.jsx";
import LoadingSpinner from "./Components/LoadingSpinner.jsx";
import LoginPage from "./Pages/LoginPage.jsx";
import RequireAdmin from "./Components/RequireAdmin.jsx";
import AdminLayout from "./Components/AdminLayout.jsx";
import Dashboard from "./Pages/Dashboard.jsx";
import Feedback from "./Pages/Feedback.jsx";
import Achievements from "./Pages/Achievements.jsx";
import AchievementForm from "./Components/AchievementForm.jsx";
import ProjectsPage from "./Pages/Projects/ProjectsPage.jsx";
import CreateProjectPage from "./Pages/Projects/CreateProject.jsx";
import EditProject from "./Pages/Projects/EditProject.jsx";
import CompetitionsPage from "./Pages/Competitions/CompetitionsPage.jsx";
import CreateCompetitionPage from "./Pages/Competitions/CreateCompetition.jsx";
import EditCompetition from "./Pages/Competitions/EditCompetiton.jsx";
import TeamPage from "./Pages/Team/TeamPage.jsx";
import CreateTeamPage from "./Pages/Team/CreateTeam.jsx";
import EditTeam from "./Pages/Team/EditTeam.jsx";
import BlogsPage from "./Pages/Blogs/BlogsPage.jsx";
import CreateBlog from "./Pages/Blogs/CreateBlog.jsx";
import EditBlog from "./Pages/Blogs/EditBlog.jsx";


const AppRoutes = () => {

  return (
    <div className="bg-black text-white min-h-screen">
      <ScrollToTop />

      <Suspense
        fallback={
          <div className="h-screen flex justify-center items-center">
            <LoadingSpinner size="lg" />
          </div>
        }
      >
        <Routes>


          {/* Admin Login Route */}
          <Route path="/login" element={<LoginPage />} />
          {/* Admin Protected Routes */}
          <Route
            path="/"
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
            <Route path="achievements/add" element={<AchievementForm />} />
            <Route path="achievements/edit/:id" element={<AchievementForm />} />
            <Route path="projects" element={<ProjectsPage />} />
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
    </div>
  );
};

export default AppRoutes;
