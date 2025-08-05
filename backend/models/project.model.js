import mongoose from "mongoose";
import slugify from "slugify";
import { convertDriveLink } from "../lib/utils/convertDriveLink.js";

const projectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  slug: {
    type: String,
    unique: true,
    index: true,
  },
  shortDesc: {
    type: String,
    required: true,
  },
  img: {
    type: String,
    default: "", // Hero Image URL
  },
  overview: {
    type: String,
    default: "",
  },
  desc: {
    type: String,
    default: "",
  },
  coreObjectives: [
    {
      type: String,
    },
  ],
  technicalSpecifications: [
      {
        key: { type: String, required: true, trim: true },
        value: { type: String, required: true, trim: true },
      },
    ],
  technologies: [
    {
      type: String,
    },
  ],
  progress: {
    type: Number,
    default: 0,
  },
  team: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Team",
    },
  ],
  category: {
    type: String,
    default: "", // e.g. "Robotics", "AI"
  },
  gallery: [
    {
      type: String,
    },
  ],
  status: {
    type: String,
    enum: ["ongoing", "completed", "upcoming"],
    default: "",
  },
  milestones: [
    {
      title: { type: String },
      description: { type: String },
      date: { type: Date },
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Automatically generate slug before saving
projectSchema.pre("validate", function (next) {
  if (!this.slug || this.isModified("title")) {
    this.slug = slugify(this.title, { lower: true, strict: true });
  }

  // Convert Google Drive link for main image
  if (this.img) {
    this.img = convertDriveLink(this.img);
  }

  // Convert all gallery links
  if (Array.isArray(this.gallery)) {
    this.gallery = this.gallery.map(link => convertDriveLink(link));
  }

  next();
});


const Project = mongoose.model("Project", projectSchema);

export default Project;
