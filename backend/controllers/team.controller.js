import { convertDriveLink } from "../lib/utils/convertDriveLink.js";
import Team from "../models/team.model.js";
import mongoose from "mongoose";

export const createTeamMember = async (req, res) => {
  try {
    const {
      name,
      designation,
      specialization,
      socialLinks,
      comment,
      image,
      skills,
    } = req.body;

    // === Required Field Validation ===
    if (!name || typeof name !== "string" || !name.trim()) {
      return res
        .status(400)
        .json({ error: "Name is required and must be a string." });
    }

    // === Optional Fields Type Checking ===
    if (designation && typeof designation !== "string")
      return res.status(400).json({ error: "Designation must be a string." });

    if (specialization && typeof specialization !== "string")
      return res
        .status(400)
        .json({ error: "Specialization must be a string." });

    if (comment && typeof comment !== "string")
      return res.status(400).json({ error: "Comment must be a string." });

    if (image && typeof image !== "string")
      return res.status(400).json({ error: "Image must be a string URL." });

    const fixedImage = image ? convertDriveLink(image) : "";

    // === Email Format Check (if gmail is provided) ===
    if (socialLinks?.gmail && !/.+@.+\..+/.test(socialLinks.gmail)) {
      return res.status(400).json({ error: "Invalid Gmail address." });
    }

    // === Validate Skills Array ===
    if (
      skills &&
      (!Array.isArray(skills) || skills.some((s) => typeof s !== "string"))
    ) {
      return res
        .status(400)
        .json({ error: "Skills must be an array of strings." });
    }

    // === Create Team Member ===
    const newTeamMember = new Team({
      name,
      designation,
      specialization,
      socialLinks,
      comment,
      image: fixedImage,
      skills,
    });

    await newTeamMember.save();

    res.status(201).json({
      message: "Team member created successfully",
      teamMember: newTeamMember,
    });
  } catch (error) {
    console.log("Error in createTeamMember Controller", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getAllTeamMembers = async (req, res) => {
  try {
    const teamMembers = await Team.find();

    res.status(200).json({
      message: "Team Members fetched successfully",
      teamMembers,
    });
  } catch (error) {
    console.error("Error in getAllTeamMembers Controller", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getTeamMemberByParams = async (req, res) => {
  const param = req.params.param;
  try {
    let team;

    // Check if param is a valid ObjectId
    if (mongoose.Types.ObjectId.isValid(param)) {
      team = await Team.findById(param);
    }

    // If not found by ID or param isn't an ObjectId, try slug
    if (!team) {
      team = await Team.findOne({ slug: param });
    }

    // If still not found, return 404
    if (!team) {
      return res.status(404).json({ error: "Team Member not found" });
    }

    res.status(200).json({ team });
  } catch (error) {
    console.log("Error in getTeamMemberByParams Controller", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const updateTeamMember = async (req, res) => {
  try {
    const { param } = req.params;

    const isMemberId = mongoose.Types.ObjectId.isValid(param);
    const filter = isMemberId ? { _id: param } : { slug: param };

    const existingMember = await Team.findOne(filter);
    if (!existingMember) {
      return res.status(404).json({ error: "Team Member not found" });
    }

    const {
      name,
      designation,
      specialization,
      socialLinks,
      comment,
      image,
      skills,
    } = req.body;

    if (name && typeof name !== "string") {
      return res.status(400).json({ error: "Name must be a string." });
    }

    if (designation && typeof designation !== "string") {
      return res.status(400).json({ error: "Designation must be a string." });
    }

    if (specialization && typeof specialization !== "string") {
      return res
        .status(400)
        .json({ error: "Specialization must be a string." });
    }

    if (comment && typeof comment !== "string") {
      return res.status(400).json({ error: "Comment must be a string." });
    }

    if (image && typeof image !== "string") { 
      return res.status(400).json({ error: "Image must be a URL" });
    }

    const fixedImage = image ? convertDriveLink(image) : "";

    if (socialLinks?.gmail && !/.+@.+\..+/.test(socialLinks.gmail)) {
      return res.status(400).json({ error: "Invalid Gmail address." });
    }

    if (
      skills &&
      (!Array.isArray(skills) || skills.some((s) => typeof s !== "string"))
    ) {
      return res
        .status(400)
        .json({ error: "Skills must be an array of strings." });
    }

    const updates = {
      ...(name && { name }),
      ...(designation && { designation }),
      ...(specialization && { specialization }),
      ...(socialLinks && { socialLinks }),
      ...(comment && { comment }),
      ...(image && { image: fixedImage }),
      ...(skills && { skills }),
    };

    const updatedTeamMember = await Team.findOneAndUpdate(filter, updates, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      message: "Team Member updated successfully",
      teamMember: updatedTeamMember,
    });
  } catch (error) {
    console.log("Error in updateTeamMember Controller", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const searchTeamMember = async (req, res) => {
  try {
    const query = req.query.query || "";
    const members = await TeamMember.find({
      name: { $regex: query, $options: "i" },
    }).limit(5);

    res.json(members);
  } catch (error) {
    console.log("Error in searchTeamMember Controller", error);
    res.status(500).json({error:"Internal Server Error"});
  }
}

export const deleteTeamMember = async (req, res) => {
  try {
    const { param } = req.params;

    // Determine whether it's an ObjectId or a slug
    const isMemberId = mongoose.Types.ObjectId.isValid(param);
    const filter = isMemberId ? { _id: param } : { slug: param };

    const deletedTeamMember = await Team.findOneAndDelete(filter);

    if (!deletedTeamMember) {
      return res.status(404).json({ error: "Team Member not found" });
    }

    res.status(200).json({
      message: "Team Member deleted successfully",
      project: deletedTeamMember,
    });
  } catch (error) {
    console.log("Error in deleteTeamMember Controller", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
