import mongoose from "mongoose";
import slugify from "slugify";
import { convertDriveLink } from "../lib/utils/convertDriveLink.js";

const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  img: {
    type: String,
    required: true,
  },
  shortDesc: {
    type: String,
    required: true,
  },
  author: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Team",
    },
  ],
  category: String,
  content: String,
  thumbnail: String, // Preview image
  tags: [String],
  slug: {
    type: String,
    unique: true,
  },
  // For SEO-friendly URLs
  comments: [
    {
      name: String,
      text: String,
      createdAt: { type: Date, default: Date.now },
    },
  ],
});

blogSchema.pre("validate", function (next) {
  if (!this.slug || this.isModified("title")) {
    this.slug = slugify(this.title, { lower: true, strict: true });
  }
  if (this.img) {
    this.img = convertDriveLink(this.img);
  };
  next();
});

const Blog = mongoose.model("Blog", blogSchema);

export default Blog;
