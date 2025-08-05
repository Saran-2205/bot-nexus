import mongoose from "mongoose";
import Blog from "../models/blog.model.js";
import Team from "../models/team.model.js"; // Assuming you have a Team model for authors
import { convertDriveLink } from "../lib/utils/convertDriveLink.js";
import slugify from "slugify";

export const createBlog = async (req, res) => {
  try {
    const {
      title,
      img,
      shortDesc,
      author, // ObjectId of team member
      category,
      content,
      thumbnail,
      tags,
      comments, // optional, usually not added at blog creation
    } = req.body;

    // Validation
    const errors = [];
    if (!title) errors.push("Title is required.");
    if (!img) errors.push("Image URL is required.");
    if (!shortDesc) errors.push("Short description is required.");
    if (!Array.isArray(author)) {
      errors.push("author must be an array.");
    } else {
      if (author.length === 0) {
        errors.push("author array cannot be empty.");
      }

      const areAllValidObjectIds = author.every((id) =>
        mongoose.Types.ObjectId.isValid(id)
      );
      if (!areAllValidObjectIds) {
        errors.push("All author IDs must be valid MongoDB ObjectIds.");
      } else {
        const existingMembers = await Team.find({ _id: { $in: author } });
        if (existingMembers.length !== author.length) {
          errors.push("One or more author IDs do not exist.");
        }
      }
    }

    if (errors.length > 0) {
      return res.status(400).json({ error: errors.join(" ") });
    }

    // Create blog
    const newBlog = new Blog({
      title,
      img,
      shortDesc,
      author,
      category,
      content,
      thumbnail,
      tags,
      comments,
    });

    // Slug is auto-generated in the pre("validate") hook

    await newBlog.save();

    res.status(201).json({
      message: "Blog created successfully",
      blog: newBlog,
    });
  } catch (error) {
    console.log("Error in createBlog Controller", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find()
      .populate("author") // optional: populate team with selected fields
      .sort({ createdAt: -1 }); // newest first

    res.status(200).json({
      message: "Blogs fetched successfully",
      blogs,
    });
  } catch (error) {
    console.error("Error in getAllBlogs Controller", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getBlogByParams = async (req, res) => {
  const param = req.params.param;
  try {
    let blog;

    // Check if param is a valid ObjectId
    if (mongoose.Types.ObjectId.isValid(param)) {
      blog = await Blog.findById(param).populate("author");
    }

    // If not found by ID or param isn't an ObjectId, try slug
    if (!blog) {
      blog = await Blog.findOne({ slug: param }).populate("author");
    }

    // If still not found, return 404
    if (!blog) {
      return res.status(404).json({ error: "Blog not found" });
    }

    res.status(200).json({ blog });
  } catch (error) {
    console.log("Error in getBlogById Controller", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const updateBlog = async (req, res) => {
  try {
    const { param } = req.params;
    const isObjectId = mongoose.Types.ObjectId.isValid(param);
    const filter = isObjectId ? { _id: param } : { slug: param };

    const existingBlog = await Blog.findOne(filter);
    if (!existingBlog) {
      return res.status(404).json({ error: "Blog not found." });
    }

    const {
      title,
      img,
      shortDesc,
      author,
      category,
      content,
      thumbnail,
      tags,
      comments,
    } = req.body;

    const updates = {};
    const errors = [];

    // Validate and apply each field if present
    if (title !== undefined) {
      if (!title.trim()) errors.push("Title cannot be empty.");
      else updates.title = title;
    }

    if (img !== undefined) {
      if (!img.trim()) errors.push("Image URL cannot be empty.");
      else updates.img = img;
    }

    if (shortDesc !== undefined) {
      if (!shortDesc.trim()) errors.push("Short description cannot be empty.");
      else updates.shortDesc = shortDesc;
    }

    if (author !== undefined) {
      if (!Array.isArray(author)) {
        errors.push("Author must be an array.");
      } else if (author.length === 0) {
        errors.push("Author array cannot be empty.");
      } else {
        const areValid = author.every((id) =>
          mongoose.Types.ObjectId.isValid(id)
        );
        if (!areValid) {
          errors.push("All author IDs must be valid.");
        } else {
          const existingAuthors = await Team.find({ _id: { $in: author } });
          if (existingAuthors.length !== author.length) {
            errors.push("One or more author IDs do not exist.");
          } else {
            updates.author = author;
          }
        }
      }
    }

    if (category !== undefined) updates.category = category;
    if (content !== undefined) updates.content = content;
    if (thumbnail !== undefined) updates.thumbnail = thumbnail;
    if (tags !== undefined) {
      if (!Array.isArray(tags)) {
        errors.push("Tags must be an array.");
      } else {
        updates.tags = tags;
      }
    }
    if (comments !== undefined) updates.comments = comments;

    if (errors.length > 0) {
      return res.status(400).json({ error: errors.join(" ") });
    }

    // Apply updates
    Object.assign(existingBlog, updates);

    // Re-generate slug if title is updated
    if (updates.title) {
      existingBlog.slug = slugify(updates.title, { lower: true, strict: true });
    }

    await existingBlog.save();

    return res.status(200).json({
      message: "Blog updated successfully",
      blog: existingBlog,
    });
  } catch (error) {
    console.log("Error in updateBlog Controller", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const deleteBlog = async (req, res) => {
  try {
    const { param } = req.params;

    // Determine whether it's an ObjectId or a slug
    const isBlogId = mongoose.Types.ObjectId.isValid(param);
    const filter = isBlogId ? { _id: param } : { slug: param };

    const deletedBlog = await Blog.findOneAndDelete(filter);

    if (!deletedBlog) {
      return res.status(404).json({ error: "Blog not found" });
    }

    res.status(200).json({
      message: "Blog deleted successfully",
      project: deletedBlog,
    });
  } catch (error) {
    console.log("Error in deleteBlog Controller", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
