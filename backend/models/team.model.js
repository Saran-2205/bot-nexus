import mongoose from "mongoose";
import slugify from "slugify";
import { convertDriveLink } from "../lib/utils/convertDriveLink.js";

const teamSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  slug: {
    type: String,
    unique: true,
    lowercase: true,
    trim: true
  },
  year: {
    type: String,
    trim: true
  },
  designation: {
    type: String,
    trim: true
  },
  specialization: {
    type: String,
    trim: true
  },
  socialLinks: {
    linkedin: {
      type: String,
      trim: true
    },
    instagram: {
      type: String,
      trim: true
    },
    gmail: {
      type: String,
      lowercase: true,
      trim: true,
      match: [/.+@.+\..+/, 'Please fill a valid email address'],
    },
  },
  comment: {
    type: String,
    trim: true
  },
  image: {
    type: String
  },
  skills: [{
    type: String,
    trim: true
  }],
  createdAt: {
    type: Date,
    default: Date.now
  },
});

teamSchema.pre("validate", function (next) {
  if (!this.slug || this.isModified("name")) {
    this.slug = slugify(this.name, { lower: true, strict: true });
  }

  // Convert Google Drive link for main image
  if (this.image) {
    this.image = convertDriveLink(this.image);
  }

  this.setUpdate(update);
  next();
});

const Team = mongoose.model("Team", teamSchema);

export default Team;
