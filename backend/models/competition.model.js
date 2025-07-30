import mongoose from "mongoose";
import slugify from "slugify";
import { convertDriveLink } from "../lib/utils/convertDriveLink.js";

const competitionSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },                // e.g., "RoboWars 2025"
    slug: { type: String, required: true, unique: true },   // auto-generated from title
    category: { type: String, required: true },             // e.g., "Combat Robotics"
    place: { type: String },                                // e.g., "1st Place"
    date: { type: Date, required: true },                   // e.g., "2025-03-15"
    venue: { type: String, required: true },                // e.g., "New Delhi, India"

    // Hero & media
    heroImg: { type: String, required: true },              // Hero background image URL
    gallery: [{ type: String }],                            // Media gallery (array of image/video URLs)

    // Descriptions
    shortDesc: { type: String },                            // Short summary
    overview: { type: String },                             // Detailed description

    // Key stats
    stats:[
      {
        key: { type: String, required: true, trim: true },
        value: { type: String, required: true, trim: true },
      },
    ],

    // Technical specifications
    technicalSpecifications: [
      {
        key: { type: String, required: true, trim: true },
        value: { type: String, required: true, trim: true },
      },
    ],

    // Key technologies/features
    keyTechnologies: [
      {
        title: { type: String, required: true },
        description: { type: String },
      },
    ],

    // Team members (ref to Team collection)
    teamMembers: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Team", // Reference to Team model
      }],
    tags: [{ type: String }],                               // e.g., ["combat", "robotics", "asia"]
  },
  { timestamps: true }
);



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
