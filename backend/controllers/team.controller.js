import mongoose from "mongoose";
import { convertDriveLink } from "../lib/utils/convertDriveLink.js";
import Team from "../models/team.model.js";
import slugify from "slugify";

// Helper: validate string fields
const validateString = (value, fieldName) => {
  if (value && typeof value !== "string") {
    throw new Error(`${fieldName} must be a string.`);
  }
};

// Helper: validate skills array
const validateSkills = (skills) => {
  if (skills && (!Array.isArray(skills) || skills.some((s) => typeof s !== "string"))) {
    throw new Error("Skills must be an array of strings.");
  }
};

// Helper: validate Gmail
const validateGmail = (gmail) => {
  if (gmail && !/.+@.+\..+/.test(gmail)) {
    throw new Error("Invalid Gmail address.");
  }
};

// Create a team member
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
      year,
    } = req.body;

    // Required field
    if (!name || !name.trim()) {
      return res.status(400).json({ error: "Name is required." });
    }

    // Validate optional fields
    try {
      validateString(designation, "Designation");
      validateString(specialization, "Specialization");
      validateString(comment, "Comment");
      validateString(image, "Image");
      validateString(year, "Year");
      validateSkills(skills);
      validateGmail(socialLinks?.gmail);
    } catch (err) {
      return res.status(400).json({ error: err.message });
    }

    const fixedImage = image ? convertDriveLink(image) : "";

    const newTeamMember = new Team({
      name,
      designation,
      specialization,
      socialLinks,
      comment,
      image: fixedImage,
      skills,
      year,
    });

    await newTeamMember.save();

    res.status(201).json({
      message: "Team member created successfully",
      teamMember: newTeamMember,
    });
  } catch (error) {
    console.error("Error in createTeamMember:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Get all team members
export const getAllTeamMembers = async (req, res) => {
  try {
    const teamMembers = await Team.find();
    res.status(200).json({ message: "Team Members fetched successfully", teamMembers });
  } catch (error) {
    console.error("Error in getAllTeamMembers:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Get team member by ID or slug
export const getTeamMemberByParams = async (req, res) => {
  const { param } = req.params;
  try {
    let member;

    if (mongoose.Types.ObjectId.isValid(param)) {
      member = await Team.findById(param);
    }

    if (!member) {
      member = await Team.findOne({ slug: param });
    }

    if (!member) {
      return res.status(404).json({ error: "Team Member not found" });
    }

    res.status(200).json({ teamMember: member });
  } catch (error) {
    console.error("Error in getTeamMemberByParams:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const updateTeamMember = async (req, res) => {
  try {
    const { param } = req.params;
    const filter = mongoose.Types.ObjectId.isValid(param) ? { _id: param } : { slug: param };

    const existingMember = await Team.findOne(filter);
    if (!existingMember) return res.status(404).json({ error: "Team Member not found" });

    const {
      name,
      designation,
      specialization,
      socialLinks,
      comment,
      image,
      skills,
      year,
    } = req.body;

    try {
      validateString(name, "Name");
      validateString(designation, "Designation");
      validateString(specialization, "Specialization");
      validateString(comment, "Comment");
      validateString(image, "Image");
      validateString(year, "Year");
      validateSkills(skills);
      validateGmail(socialLinks?.gmail);
    } catch (err) {
      return res.status(400).json({ error: err.message });
    }

    const updates = {
      ...(name && {
        name,
        slug: slugify(name, { lower: true, strict: true })  // 👈 slug updated here
      }),
      ...(designation && { designation }),
      ...(specialization && { specialization }),
      ...(socialLinks && { socialLinks }),
      ...(comment && { comment }),
      ...(image && { image: convertDriveLink(image) }),     // 👈 drive link handled here
      ...(skills && { skills }),
      ...(year && { year }),
    };

    const updatedMember = await Team.findOneAndUpdate(filter, updates, { new: true, runValidators: true });

    res.status(200).json({ message: "Team Member updated successfully", teamMember: updatedMember });
  } catch (error) {
    console.error("Error in updateTeamMember:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Delete a team member
export const deleteTeamMember = async (req, res) => {
  try {
    const { param } = req.params;
    const filter = mongoose.Types.ObjectId.isValid(param) ? { _id: param } : { slug: param };

    const deletedMember = await Team.findOneAndDelete(filter);
    if (!deletedMember) return res.status(404).json({ error: "Team Member not found" });

    res.status(200).json({ message: "Team Member deleted successfully", teamMember: deletedMember });
  } catch (error) {
    console.error("Error in deleteTeamMember:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Search team members by name
export const searchTeamMember = async (req, res) => {
  try {
    const query = req.query.query || "";
    const members = await Team.find({ name: { $regex: query, $options: "i" } }).limit(5);
    res.status(200).json(members);
  } catch (error) {
    console.error("Error in searchTeamMember:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
