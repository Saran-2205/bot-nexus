import mongoose from "mongoose";
import Competition from "../models/competition.model.js";
import Team from "../models/team.model.js";
import slugify from "slugify";
import { convertDriveLink } from "../lib/utils/convertDriveLink.js";

// CREATE COMPETITION
export const createCompetition = async (req, res) => {
  try {
    const {
      title,
      category,
      place,
      date,
      venue,
      heroImg,
      gallery = [],
      shortDesc,
      overview,
      stats = [],
      technicalSpecifications = [],
      keyTechnologies = [],
      teamMembers = [],
      tags = [],
    } = req.body;

    const errors = [];

    // ==== Validate required fields ====
    if (!title || typeof title !== "string")
      errors.push("Title is required and must be a string");
    if (!category || typeof category !== "string")
      errors.push("Category is required and must be a string");
    if (!venue || typeof venue !== "string")
      errors.push("Venue is required and must be a string");
    if (!date || isNaN(new Date(date).getTime()))
      errors.push("Date is required and must be a valid date string");
    if (!heroImg || typeof heroImg !== "string")
      errors.push("Hero image is required and must be a string");

    // ==== Validate teamMembers ====
    if (!Array.isArray(teamMembers) || teamMembers.length === 0) {
      errors.push("Team members must be a non-empty array.");
    } else {
      const validObjectIds = teamMembers.every((id) =>
        mongoose.Types.ObjectId.isValid(id)
      );
      if (!validObjectIds) errors.push("All team member IDs must be valid ObjectIds");

      const existingMembers = await Team.find({ _id: { $in: teamMembers } });
      if (existingMembers.length !== teamMembers.length) {
        errors.push("One or more team member IDs are invalid.");
      }
    }

    // ==== Validate arrays ====
    const validateKeyValueArray = (array, fieldName) => {
      if (!Array.isArray(array)) {
        errors.push(`${fieldName} must be an array`);
        return;
      }

      array.forEach(({ key, value }, index) => {
        if (typeof key !== "string" || typeof value !== "string") {
          errors.push(`${fieldName}[${index}] must have string 'key' and 'value'`);
        }
      });
    };

    const validateTechArray = (array) => {
      if (!Array.isArray(array)) {
        errors.push("keyTechnologies must be an array");
        return;
      }
      array.forEach(({ title }, i) => {
        if (typeof title !== "string") {
          errors.push(`keyTechnologies[${i}].title must be a string`);
        }
      });
    };

    validateKeyValueArray(stats, "stats");
    validateKeyValueArray(technicalSpecifications, "technicalSpecifications");
    validateTechArray(keyTechnologies);

    if (
      !Array.isArray(gallery) ||
      gallery.some((link) => typeof link !== "string")
    ) {
      errors.push("Gallery must be an array of string URLs.");
    }

    if (
      !Array.isArray(tags) ||
      tags.some((tag) => typeof tag !== "string")
    ) {
      errors.push("Tags must be an array of strings.");
    }

    if (errors.length > 0) {
      return res.status(400).json({ errors });
    }

    // ==== Slug generation ====
    const baseSlug = slugify(title, { lower: true, strict: true });
    let finalSlug = baseSlug;
    let counter = 1;
    while (await Competition.findOne({ slug: finalSlug })) {
      finalSlug = `${baseSlug}-${counter++}`;
    }

    // ==== Create and save ====
    const newCompetition = new Competition({
      title,
      slug: finalSlug,
      category,
      place,
      date: new Date(date),
      venue,
      heroImg: convertDriveLink(heroImg),
      gallery: gallery.map(convertDriveLink),
      shortDesc,
      overview,
      stats,
      technicalSpecifications,
      keyTechnologies,
      teamMembers,
      tags,
    });

    await newCompetition.save();

    res.status(201).json({
      message: "Competition created successfully",
      competition: newCompetition,
    });
  } catch (error) {
    console.error("Error creating competition:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};


export const getAllCompetitions = async (req, res) => {
  try {
    const competitions = await Competition.find()
      .populate("teamMembers")
      .sort({ createdAt: -1 });

    res.status(200).json({
      message: "Competitions fetched successfully",
      competitions,
    });
  } catch (error) {
    console.error("Error fetching competitions:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};



export const getCompetitionByParams = async (req, res) => {
  const { param } = req.params;
  try {
    let competition = null;

    if (mongoose.Types.ObjectId.isValid(param)) {
      competition = await Competition.findById(param).populate("teamMembers");
    }

    if (!competition) {
      competition = await Competition.findOne({ slug: param }).populate("teamMembers");
    }

    if (!competition) {
      return res.status(404).json({ error: "Competition not found" });
    }

    res.status(200).json({ competition });
  } catch (error) {
    console.error("Error fetching competition:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const updateCompetition = async (req, res) => {
  try {
    const { param } = req.params;
    const isObjectId = mongoose.Types.ObjectId.isValid(param);
    const filter = isObjectId ? { _id: param } : { slug: param };

    const existingCompetition = await Competition.findOne(filter);
    if (!existingCompetition) {
      return res.status(404).json({ error: "Competition not found" });
    }

    const {
      title,
      category,
      place,
      date,
      venue,
      heroImg,
      gallery,
      shortDesc,
      overview,
      stats,
      technicalSpecifications,
      keyTechnologies,
      teamMembers,
      tags,
    } = req.body;

    const errors = [];

    if (title !== undefined && typeof title !== "string")
      errors.push("Title must be a string");
    if (category !== undefined && typeof category !== "string")
      errors.push("Category must be a string");
    if (place !== undefined && typeof place !== "string")
      errors.push("Place must be a string");
    if (date !== undefined && isNaN(new Date(date).getTime()))
      errors.push("Date must be a valid date string");
    if (venue !== undefined && typeof venue !== "string")
      errors.push("Venue must be a string");
    if (heroImg !== undefined && typeof heroImg !== "string")
      errors.push("Hero image must be a string");
    if (shortDesc !== undefined && typeof shortDesc !== "string")
      errors.push("Short description must be a string");
    if (overview !== undefined && typeof overview !== "string")
      errors.push("Overview must be a string");

    // Validate structured arrays
    const validateKeyValueArray = (arr, name) => {
      if (arr && (!Array.isArray(arr) || arr.some(({ key, value }) =>
        typeof key !== "string" || typeof value !== "string"))) {
        errors.push(`${name} must be an array of objects with string key and value`);
      }
    };

    const validateTechArray = (arr) => {
      if (arr && (!Array.isArray(arr) || arr.some(({ title }) => typeof title !== "string"))) {
        errors.push("keyTechnologies must be an array of objects with string title");
      }
    };

    validateKeyValueArray(stats, "stats");
    validateKeyValueArray(technicalSpecifications, "technicalSpecifications");
    validateTechArray(keyTechnologies);

    if (gallery && (!Array.isArray(gallery) || gallery.some(link => typeof link !== "string"))) {
      errors.push("Gallery must be an array of string URLs.");
    }

    if (tags && (!Array.isArray(tags) || tags.some(tag => typeof tag !== "string"))) {
      errors.push("Tags must be an array of strings.");
    }

    if (teamMembers) {
      if (!Array.isArray(teamMembers)) {
        errors.push("teamMembers must be an array.");
      } else {
        const areValidIds = teamMembers.every(id => mongoose.Types.ObjectId.isValid(id));
        if (!areValidIds) {
          errors.push("All teamMember IDs must be valid MongoDB ObjectIds.");
        } else {
          const found = await Team.find({ _id: { $in: teamMembers } });
          if (found.length !== teamMembers.length) {
            errors.push("One or more teamMember IDs are invalid.");
          }
        }
      }
    }

    if (errors.length > 0) {
      return res.status(400).json({ errors });
    }

    // ==== Build update object ====
    const updateData = {};
    if (title !== undefined) updateData.title = title;
    if (category !== undefined) updateData.category = category;
    if (place !== undefined) updateData.place = place;
    if (date !== undefined) updateData.date = new Date(date);
    if (venue !== undefined) updateData.venue = venue;
    if (heroImg !== undefined) updateData.heroImg = convertDriveLink(heroImg);
    if (gallery !== undefined) updateData.gallery = gallery.map(convertDriveLink);
    if (shortDesc !== undefined) updateData.shortDesc = shortDesc;
    if (overview !== undefined) updateData.overview = overview;
    if (stats !== undefined) updateData.stats = stats;
    if (technicalSpecifications !== undefined) updateData.technicalSpecifications = technicalSpecifications;
    if (keyTechnologies !== undefined) updateData.keyTechnologies = keyTechnologies;
    if (teamMembers !== undefined) updateData.teamMembers = teamMembers;
    if (tags !== undefined) updateData.tags = tags;

    const updated = await Competition.findOneAndUpdate(
      filter,
      { $set: updateData },
      { new: true, runValidators: true }
    );

    res.status(200).json({
      message: "Competition updated successfully",
      competition: updated,
    });
  } catch (error) {
    console.error("Error updating competition:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};


export const deleteCompetition = async (req, res) => {
  try {
    const { param } = req.params;
    const filter = mongoose.Types.ObjectId.isValid(param)
      ? { _id: param }
      : { slug: param };

    const deleted = await Competition.findOneAndDelete(filter);

    if (!deleted) {
      return res.status(404).json({ error: "Competition not found" });
    }

    res.status(200).json({
      message: "Competition deleted successfully",
      competition: deleted,
    });
  } catch (error) {
    console.error("Error deleting competition:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
