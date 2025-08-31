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


teamSchema.pre("save", function(next) {
  if (this.isModified("name")) {
    this.slug = slugify(this.name, { lower: true, strict: true });
  }
  next();
});

teamSchema.pre("findOneAndUpdate", function(next) {
  const update = this.getUpdate();
  if (update.name) {
    update.slug = slugify(update.name, { lower: true, strict: true });
    this.setUpdate(update);
  }
  next();
});

const Team = mongoose.model("Team", teamSchema);

export default Team;
