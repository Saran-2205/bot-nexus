import express from "express";
import connectMongoDB from "./db/connectMongoDB.js";
import { protectRoute } from "./middleware/protectRoute.js";
import path from "path";
import dotenv from "dotenv";
import cors from "cors";
import { v2 as cloudinary } from "cloudinary";

import projectRoutes from "./routes/public/project.route.js";
import competitionRoutes from "./routes/public/competition.route.js";
import teamRoutes from "./routes/public/team.route.js";
import blogRoutes from "./routes/public/blog.route.js";

import adminAuthRoutes from "./routes/admin/auth.admin.route.js";
import adminDashBoardRoutes from "./routes/admin/dashboard.admin.route.js";
import adminProjectRoutes from "./routes/admin/project.admin.route.js";
import adminCompetitionRoutes from "./routes/admin/competition.admin.route.js";
import adminTeamRoutes from "./routes/admin/team.admin.route.js";
import adminBlogRoutes from "./routes/admin/blog.admin.route.js";
import cookieParser from "cookie-parser";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
const __dirname = path.resolve();

app.use(cors());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use(cookieParser());

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

app.use("/api/admin/auth", adminAuthRoutes);
app.use("/api/admin/dashboard", protectRoute, adminDashBoardRoutes);
app.use("/api/admin/projects", protectRoute, adminProjectRoutes);
app.use("/api/admin/competitions", protectRoute, adminCompetitionRoutes);
app.use("/api/admin/team", protectRoute, adminTeamRoutes);
app.use("/api/admin/blog", protectRoute, adminBlogRoutes);

app.use("/api/projects", projectRoutes);
app.use("/api/competitions", competitionRoutes);
app.use("/api/blog", blogRoutes);
app.use("/api/team", teamRoutes);
app.use("/api/feedback", feedbackRoutes);

connectMongoDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});
