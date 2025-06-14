import mongoose from "mongoose";
import Competition from "../models/competition.model.js";
import Project from "../models/project.model.js";
import Team from "../models/team.model.js";
import slugify from "slugify";
import { convertDriveLink } from "../lib/utils/convertDriveLink.js";

export const createCompetition = async (req, res) => {
  try {
    const {
      title,
      slug,
      category,
      img,
      shortDesc,
      overview,
      competitionDetails = {},
      gallery = [],
      tags = [],
    } = req.body;

    const {
      venue,
      teamSize,
      teamMembers = [],
      participants,
      prizeDetails,
      prize,
      date,
      time,
      technical,
    } = competitionDetails;

    // 🔍 Manual Validation
    const errors = [];

    if (!title || typeof title !== "string")
      errors.push("Title is required and must be a string");
    if (slug && typeof slug !== "string") errors.push("Slug must be a string");
    if (category && typeof category !== "string")
      errors.push("Category must be a string");
    if (img && typeof img !== "string") errors.push("Invalid image URL");
    if (shortDesc && typeof shortDesc !== "string")
      errors.push("Short description must be a string");
    if (overview && typeof overview !== "string")
      errors.push("Overview must be a string");

    if (venue && typeof venue !== "string")
      errors.push("Venue must be a string");
    if (teamSize && (!Number.isInteger(teamSize) || teamSize < 1))
      errors.push("Team size must be a positive integer");
    if (participants && (!Number.isInteger(participants) || participants < 1))
      errors.push("Participants must be a positive integer");
    if (prizeDetails && typeof prizeDetails !== "string")
      errors.push("Prize details must be a string");
    if (prize && typeof prize !== "string")
      errors.push("Prize must be a string");
    if (date && isNaN(new Date(date).getTime()))
      errors.push("Date must be a valid date string");
    if (time && typeof time !== "string") errors.push("Time must be a string");

    if (Array.isArray(technical) && technical.length > 0) {
      const areAllValidObjectIds = technical.every((id) =>
        mongoose.Types.ObjectId.isValid(id)
      );
      if (!areAllValidObjectIds) {
        return res
          .status(400)
          .json({ error: "One or more Project IDs are not valid ObjectIds." });
      }

      const validProjects = await Project.find({ _id: { $in: technical } });
      if (validProjects.length !== technical.length) {
        return res.status(400).json({ error: "Provide valid Project IDs." });
      }
    }
    if (
      gallery &&
      (!Array.isArray(gallery) ||
        gallery.some((url) => typeof url !== "string"))
    ) {
      return res
        .status(400)
        .json({ error: "Gallery must be an array of string URLs." });
    }

    if (!Array.isArray(tags)) errors.push("Tags must be an array");
    else
      tags.forEach((tag) => {
        if (typeof tag !== "string") errors.push("Each tag must be a string");
      });
    if (!Array.isArray(teamMembers)) {
      errors.push("teamMembers must be an array.");
    } else {
      if (teamMembers.length === 0) {
        errors.push("teamMembers array cannot be empty.");
      }

      const areAllValidObjectIds = teamMembers.every((id) =>
        mongoose.Types.ObjectId.isValid(id)
      );
      if (!areAllValidObjectIds) {
        errors.push("All teamMember IDs must be valid MongoDB ObjectIds.");
      } else {
        const existingMembers = await Team.find({ _id: { $in: teamMembers } });
        if (existingMembers.length !== teamMembers.length) {
          errors.push("One or more teamMember IDs do not exist.");
        }
      }
    }

    // Return validation errors
    if (errors.length > 0) {
      return res.status(400).json({ errors });
    }

    const newCompetition = new Competition({
      title,
      slug,
      category,
      img,
      shortDesc,
      overview,
      competitionDetails: {
        venue,
        teamSize,
        teamMembers,
        participants,
        prizeDetails,
        prize,
        date,
        time,
        technical,
      },
      gallery,
      tags,
    });

    await newCompetition.save();

    res.status(201).json({
      message: "Competition created successfully",
      competition: newCompetition,
    });
  } catch (error) {
    console.log("Error in createCompetition Controller", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getAllCompetitions = async (req, res) => {
  try {
    const competitions = await Competition.find()
      .populate("competitionDetails.technical") // ✅ this is the actual reference
      .populate("competitionDetails.teamMembers") // if you also want to show team member details
      .sort({ createdAt: -1 });

    res.status(200).json({
      message: "Competitions fetched successfully",
      competitions,
    });
  } catch (error) {
    console.error("Error in getAllCompetitions Controller", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getCompetitionByParams = async (req, res) => {
  const param = req.params.param;
  try {
    let competition;

    // Check if param is a valid ObjectId
    if (mongoose.Types.ObjectId.isValid(param)) {
      competition = await Competition.findById(param)
        .populate("competitionDetails.technical") // ✅ this is the actual reference
        .populate("competitionDetails.teamMembers");
    }

    // If not found by ID or param isn't an ObjectId, try slug
    if (!competition) {
      competition = await Competition.findOne({ slug: param })
        .populate("competitionDetails.technical")
        .populate("competitionDetails.teamMembers");
    }

    // If still not found, return 404
    if (!competition) {
      return res.status(404).json({ error: "Competition not found" });
    }

    res.status(200).json({ competition });
  } catch (error) {
    console.log("Error in getCompetitionById Controller", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const updateCompetition = async (req, res) => {
  try {
    const { param } = req.params;
    const isCompetitionId = mongoose.Types.ObjectId.isValid(param);
    const filter = isCompetitionId ? { _id: param } : { slug: param };

    const existingCompetition = await Competition.findOne(filter);
    if (!existingCompetition) {
      return res.status(404).json({ error: "Competition not found" });
    }

    const {
      title,
      slug,
      category,
      img,
      shortDesc,
      overview,
      competitionDetails = {},
      gallery,
      tags,
    } = req.body;

    const {
      venue,
      teamSize,
      teamMembers,
      participants,
      prizeDetails,
      prize,
      date,
      time,
      technical,
    } = competitionDetails;

    const errors = [];

    // Validate top-level fields if provided
    if (title !== undefined && typeof title !== "string")
      errors.push("Title must be a string");
    if (slug !== undefined && typeof slug !== "string")
      errors.push("Slug must be a string");
    if (category !== undefined && typeof category !== "string")
      errors.push("Category must be a string");
    if (img !== undefined && typeof img !== "string")
      errors.push("Image must be a string URL");
    if (shortDesc !== undefined && typeof shortDesc !== "string")
      errors.push("Short description must be a string");
    if (overview !== undefined && typeof overview !== "string")
      errors.push("Overview must be a string");

    // Validate nested competitionDetails if present
    if (venue !== undefined && typeof venue !== "string")
      errors.push("Venue must be a string");
    if (
      teamSize !== undefined &&
      (!Number.isInteger(teamSize) || teamSize < 1)
    )
      errors.push("Team size must be a positive integer");
    if (
      participants !== undefined &&
      (!Number.isInteger(participants) || participants < 1)
    )
      errors.push("Participants must be a positive integer");
    if (prizeDetails !== undefined && typeof prizeDetails !== "string")
      errors.push("Prize details must be a string");
    if (prize !== undefined && typeof prize !== "string")
      errors.push("Prize must be a string");
    if (date !== undefined && isNaN(new Date(date).getTime()))
      errors.push("Date must be a valid date string");
    if (time !== undefined && typeof time !== "string")
      errors.push("Time must be a string");

    if (technical !== undefined) {
      if (!mongoose.Types.ObjectId.isValid(technical)) {
        errors.push("Provided technical ID is not a valid ObjectId.");
      } else {
        const validProject = await Project.findById(technical);
        if (!validProject) {
          errors.push("Invalid technical project ID.");
        }
      }
    }

    if (gallery !== undefined) {
      if (
        !Array.isArray(gallery) ||
        gallery.some((url) => typeof url !== "string")
      ) {
        errors.push("Gallery must be an array of string URLs.");
      }
    }

    if (tags !== undefined) {
      if (!Array.isArray(tags)) errors.push("Tags must be an array");
      else {
        tags.forEach((tag) => {
          if (typeof tag !== "string")
            errors.push("Each tag in tags must be a string");
        });
      }
    }

    if (teamMembers !== undefined) {
      if (!Array.isArray(teamMembers)) {
        errors.push("teamMembers must be an array.");
      } else {
        if (teamMembers.length === 0) {
          errors.push("teamMembers array cannot be empty.");
        } else {
          const areAllValidObjectIds = teamMembers.every((id) =>
            mongoose.Types.ObjectId.isValid(id)
          );
          if (!areAllValidObjectIds) {
            errors.push("All teamMember IDs must be valid MongoDB ObjectIds.");
          } else {
            const existingMembers = await Team.find({
              _id: { $in: teamMembers },
            });
            if (existingMembers.length !== teamMembers.length) {
              errors.push("One or more teamMember IDs do not exist.");
            }
          }
        }
      }
    }

    if (errors.length > 0) {
      return res.status(400).json({ errors });
    }

    // Construct updateData dynamically only for provided fields
    const updateData = {};

    if (title !== undefined) updateData.title = title;
    if (slug !== undefined)
      updateData.slug = slug || slugify(title, { lower: true, strict: true });
    if (category !== undefined) updateData.category = category;
    if (img !== undefined) updateData.img = convertDriveLink(img);
    if (shortDesc !== undefined) updateData.shortDesc = shortDesc;
    if (overview !== undefined) updateData.overview = overview;
    if (tags !== undefined) updateData.tags = tags;
    if (gallery !== undefined)
      updateData.gallery = gallery.map((link) => convertDriveLink(link));

    // Prepare competitionDetails updates
    const competitionDetailsUpdate = {};
    if (venue !== undefined) competitionDetailsUpdate.venue = venue;
    if (teamSize !== undefined) competitionDetailsUpdate.teamSize = teamSize;
    if (teamMembers !== undefined)
      competitionDetailsUpdate.teamMembers = teamMembers;
    if (participants !== undefined)
      competitionDetailsUpdate.participants = participants;
    if (prizeDetails !== undefined)
      competitionDetailsUpdate.prizeDetails = prizeDetails;
    if (prize !== undefined) competitionDetailsUpdate.prize = prize;
    if (date !== undefined) competitionDetailsUpdate.date = date;
    if (time !== undefined) competitionDetailsUpdate.time = time;
    if (technical !== undefined)
      competitionDetailsUpdate.technical = technical;

    if (Object.keys(competitionDetailsUpdate).length > 0) {
      updateData.competitionDetails = competitionDetailsUpdate;
    }

    const updatedCompetition = await Competition.findOneAndUpdate(
      filter,
      { $set: updateData },
      { new: true, runValidators: true }
    );

    res.status(200).json({
      message: "Competition updated successfully",
      competition: updatedCompetition,
    });
  } catch (error) {
    console.error("Error in updateCompetition Controller:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const deleteCompetition = async (req, res) => {
  try {
    const { param } = req.params;

    // Determine whether it's an ObjectId or a slug
    const isCompetitionId = mongoose.Types.ObjectId.isValid(param);
    const filter = isCompetitionId ? { _id: param } : { slug: param };

    const deletedCompetition = await Competition.findOneAndDelete(filter);

    if (!deletedCompetition) {
      return res.status(404).json({ error: "Competition not found" });
    }

    res.status(200).json({
      message: "Competition deleted successfully",
      project: deletedCompetition,
    });
  } catch (error) {
    console.log("Error in deleteCompetition Controller", error);
    res.status(500).json({ error: "Internal server error" });
  }
};