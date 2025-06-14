import mongoose from "mongoose";
import slugify from "slugify";
import { convertDriveLink } from "../lib/utils/convertDriveLink.js";

const competitionSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    category: {
      type: String,
      trim: true,
    },
    img: {
      type: String, // URL for competition hero image
    },
    shortDesc: {
      type: String,
      trim: true,
    },
    overview: {
      type: String,
    },
    competitionDetails: {
      venue: { type: String, trim: true },
      teamSize: { type: Number, min: 1 },
      teamMembers: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Team", // Reference to Team model
      }],
      participants: { type: Number, min: 1 }, // Total participants
      prizeDetails: { type: String, trim: true }, // Details about prizes
      prize: { type: String, trim: true }, // Could be redundant with prizeDetails; pick one
      date: { type: Date },
      time: { type: String },
      technical: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Project",
      }],
    },
    gallery: [
      {
        type: String,
      },
    ], // Array of URLs for images/videos
    tags: [
      {
        type: String,
        lowercase: true,
        trim: true,
      },
    ],
  },
  { timestamps: true }
); // Adds createdAt and updatedAt automatically


competitionSchema.pre("validate", function (next) {
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

const Competition = mongoose.model("Competition", competitionSchema);

export default Competition;
