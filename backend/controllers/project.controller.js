import mongoose from "mongoose";
import slugify from "slugify";
import Project from "../models/project.model.js";
import Team from "../models/team.model.js";
import {v2 as cloudinary} from "cloudinary";

export const createProject = async (req, res) => {
  try {
    const {
      title,
      shortDesc,
      overview,
      desc,
      coreObjectives,
      technicalSpecifications,
      technologies,
      progress,
      team,
      gallery,
      category,
      status,
      milestones,
    } = req.body;
    let {img} =req.body
    let uploadedGallery = [];

    // Generate slug from title
    const generatedSlug = slugify(title, { lower: true, strict: true });

    // Check if slug already exists in the database
    const existingProject = await Project.findOne({ slug: generatedSlug });

    if (existingProject) {
      return res.status(400).json({
        error:
          "A project with this title already exists. Please choose a different title.",
      });
    }

    // Required field checks
    if (!title || typeof title !== "string")
      return res
        .status(400)
        .json({ error: "Title is required and must be a string." });

    if (!shortDesc || typeof shortDesc !== "string")
      return res
        .status(400)
        .json({ error: "Short description is required and must be a string." });

    // Optional field type checks
    if (img && !img.startsWith('https://res.cloudinary.com/')) {
      const uploadedResponse = await cloudinary.uploader.upload(img);
      img = uploadedResponse.secure_url;
    }

    if (overview && typeof overview !== "string") {
      return res.status(400).json({ error: "Overview must be a string." });
    }

    if (desc && typeof desc !== "string") {
      return res.status(400).json({ error: "Description must be a string." });
    }

    if (
      coreObjectives &&
      (!Array.isArray(coreObjectives) ||
        coreObjectives.some((obj) => typeof obj !== "string"))
    ) {
      return res
        .status(400)
        .json({ error: "Core Objectives must be an array of strings." });
    }

    if (technicalSpecifications && !Array.isArray(technicalSpecifications)) {
      return res.status(400).json({
        error: "Each technical specification must contain 'key' and 'value'",
      });
    }

    if (
      technologies &&
      (!Array.isArray(technologies) ||
        technologies.some((tech) => typeof tech !== "string"))
    ) {
      return res
        .status(400)
        .json({ error: "Technologies must be an array of strings." });
    }

    if (progress !== undefined && typeof progress !== "number") {
      return res.status(400).json({ error: "Progress must be a number." });
    }

    // Optional: validate existence of all team members
    if (Array.isArray(team) && team.length > 0) {
      const areAllValidObjectIds = team.every((id) =>
        mongoose.Types.ObjectId.isValid(id)
      );
      if (!areAllValidObjectIds) {
        return res
          .status(400)
          .json({ error: "One or more team IDs are not valid ObjectIds." });
      }

      const validTeamMembers = await Team.find({ _id: { $in: team } });
      if (validTeamMembers.length !== team.length) {
        return res
          .status(400)
          .json({ error: "Provide valid team member IDs." });
      }
    }

    if (category && typeof category !== "string") {
      return res.status(400).json({ error: "Category must be a string." });
    }

    if (gallery && gallery.length > 0) {
      // Upload all gallery images in parallel
      uploadedGallery = await Promise.all(
        gallery.map(async (img) => {
          if (img.startsWith("https://res.cloudinary.com/")) {
            // Already uploaded URL — skip re-uploading
            return img;
          } else {
            const uploaded = await cloudinary.uploader.upload(img);
            return uploaded.secure_url;
          }
        })
      );
    }

    if (milestones && !Array.isArray(milestones)) {
      return res.status(400).json({
        error: "Each milestone must have a title, description, and valid date.",
      });
    }

    // Create and save the project
    const newProject = new Project({
      title,
      shortDesc,
      img,
      overview,
      desc,
      coreObjectives,
      technicalSpecifications,
      technologies,
      progress,
      team,
      category,
      gallery: uploadedGallery,
      status: status || "ongoing", // default to ongoing if not provided
      milestones,
      slug: generatedSlug,
    });

    await newProject.save();

    res.status(201).json({
      message: "Project created successfully",
      project: newProject,
    });
  } catch (error) {
    console.error("Error in createProject Controller", error.message);
    res.status(500).json({ error: error.message || "Internal server error" });
  }
};

export const getAllProjects = async (req, res) => {
  try {
    const projects = await Project.find()
      .populate("team") // optional: populate team with selected fields
      .sort({ createdAt: -1 }); // newest first

    res.status(200).json({
      message: "Projects fetched successfully",
      projects,
    });
  } catch (error) {
    console.error("Error in getAllProjects Controller", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getProjectByParams = async (req, res) => {
  const param = req.params.param;
  try {
    let project;

    // Check if param is a valid ObjectId
    if (mongoose.Types.ObjectId.isValid(param)) {
      project = await Project.findById(param).populate("team");
    }

    // If not found by ID or param isn't an ObjectId, try slug
    if (!project) {
      project = await Project.findOne({ slug: param }).populate("team");
    }

    // If still not found, return 404
    if (!project) {
      return res.status(404).json({ error: "Project not found" });
    }

    res.status(200).json({ project });
  } catch (error) {
    console.log("Error in getProjectByParams Controller", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const updateProject = async (req, res) => {
  try {
    const { param } = req.params;

    const isObjectId = mongoose.Types.ObjectId.isValid(param);
    const filter = isObjectId ? { _id: param } : { slug: param };

    const existingProject = await Project.findOne(filter);
    if (!existingProject) {
      return res.status(404).json({ error: "Project not found" });
    }

    const {
      title,
      shortDesc,
      img,
      overview,
      desc,
      coreObjectives,
      technicalSpecifications,
      technologies,
      progress,
      team,
      category,
      gallery,
      status,
      milestones,
    } = req.body;

    // Full validation
    if (title && typeof title !== "string")
      return res.status(400).json({ error: "Title must be a string." });

    if (shortDesc && typeof shortDesc !== "string")
      return res
        .status(400)
        .json({ error: "Short description must be a string." });

    if (img) {
      const uploadedResponse = await cloudinary.uploader.upload(img);
      img = uploadedResponse.secure_url;
    }

    if (overview && typeof overview !== "string")
      return res.status(400).json({ error: "Overview must be a string." });

    if (desc && typeof desc !== "string")
      return res.status(400).json({ error: "Description must be a string." });

    if (
      coreObjectives &&
      (!Array.isArray(coreObjectives) ||
        coreObjectives.some((item) => typeof item !== "string"))
    )
      return res
        .status(400)
        .json({ error: "Core Objectives must be an array of strings." });

    if (
      technicalSpecifications &&
      (!Array.isArray(technicalSpecifications) ||
        technicalSpecifications.some(
          (spec) =>
            typeof spec.key !== "string" || typeof spec.value !== "string"
        ))
    )
      return res.status(400).json({
        error:
          "Technical specifications must be an array of objects with string 'key' and 'value'.",
      });

    if (
      technologies &&
      (!Array.isArray(technologies) ||
        technologies.some((tech) => typeof tech !== "string"))
    )
      return res
        .status(400)
        .json({ error: "Technologies must be an array of strings." });

    if (progress !== undefined && typeof progress !== "number")
      return res.status(400).json({ error: "Progress must be a number." });

    if (team && team.length > 0) {
      const validTeam = await Team.find({ _id: { $in: team } });
      if (validTeam.length !== team.length) {
        return res.status(400).json({
          error: "Member Id must be a valid ObjectId.",
        });
      }
    }

    if (category && typeof category !== "string")
      return res.status(400).json({ error: "Category must be a string." });

    if (gallery && gallery.length > 0) {
      // Upload all gallery images in parallel
      uploadedGallery = await Promise.all(
        gallery.map(async (img) => {
          if (img.startsWith("https://res.cloudinary.com/")) {
            // Already uploaded URL — skip re-uploading
            return img;
          } else {
            const uploaded = await cloudinary.uploader.upload(img);
            return uploaded.secure_url;
          }
        })
      );
    }

    if (
      milestones &&
      (!Array.isArray(milestones) ||
        milestones.some(
          (m) =>
            typeof m.title !== "string" ||
            typeof m.description !== "string" ||
            isNaN(Date.parse(m.date))
        ))
    )
      return res.status(400).json({
        error:
          "Each milestone must have a string title, string description, and a valid date.",
      });

    const updates = {
      ...(title && {
        title,
        slug: slugify(title, { lower: true, strict: true }),
      }),
      ...(shortDesc && { shortDesc }),
      ...(img && { img }),
      ...(overview && { overview }),
      ...(desc && { desc }),
      ...(coreObjectives && { coreObjectives }),
      ...(technicalSpecifications && { technicalSpecifications }),
      ...(technologies && { technologies }),
      ...(progress !== undefined && { progress }),
      ...(team && { team }),
      ...(category && { category }),
      ...(gallery && { gallery }),
      ...(status && { status }),
      ...(milestones && { milestones }),
    };

    const updatedProject = await Project.findOneAndUpdate(filter, updates, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      message: "Project updated successfully",
      project: updatedProject,
    });
  } catch (error) {
    console.log("Error in updateProject Controller", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const deleteProject = async (req, res) => {
  try {
    const { param } = req.params;

    // Determine whether it's an ObjectId or a slug
    const isObjectId = mongoose.Types.ObjectId.isValid(param);
    const filter = isObjectId ? { _id: param } : { slug: param };

    const deletedProject = await Project.findOneAndDelete(filter);

    if (!deletedProject) {
      return res.status(404).json({ error: "Project not found" });
    }

    res.status(200).json({
      message: "Project deleted successfully",
      project: deletedProject,
    });
  } catch (error) {
    console.log("Error in deleteProject Controller", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
