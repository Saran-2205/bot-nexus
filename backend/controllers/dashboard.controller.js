import Project from "../models/project.model.js";
import Competition from "../models/competition.model.js";
import Blog from "../models/blog.model.js";
import Team from "../models/team.model.js";

export const getDashboardData = async (req, res) => {
  try {
    const [projects, competitions, blogs, teamMembers] = await Promise.all([
      Project.countDocuments(),
      Competition.countDocuments(),
      Blog.countDocuments(),
      Team.countDocuments(),
    ]);

    res.status(200).json({ projects, competitions, blogs, teamMembers });
  } catch (err) {
    console.error("Dashboard stats error:", err);
    res.status(500).json({ error: "Failed to fetch dashboard stats" });
  }
};
