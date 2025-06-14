import React, { useState } from "react";

// helper function to convert file to base64
const fileToBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
};

const ProjectForm = ({ onSubmit, initialData = {} }) => {
  const [formData, setFormData] = useState({
    title: initialData.title || "",
    shortDesc: initialData.shortDesc || "",
    img: initialData.img || "",
    overview: initialData.overview || "",
    desc: initialData.desc || "",
    coreObjectives: initialData.coreObjectives || [""],
    team: initialData.team || [''],
    technicalSpecifications: initialData.technicalSpecifications?.length
      ? initialData.technicalSpecifications
      : [{ key: "", value: "" }],
    technologies: initialData.technologies || [""],
    progress: initialData.progress ?? 0,
    category: initialData.category || "",
    gallery: initialData.gallery || [""],
    status: initialData.status || "ongoing",
    milestones: initialData.milestones?.length
      ? initialData.milestones
      : [{ title: "", description: "", date: "" }],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleArrayChange = (field, index, value) => {
    const updated = [...formData[field]];
    updated[index] = value;
    setFormData((prev) => ({ ...prev, [field]: updated }));
  };

  const handleNestedArrayChange = (field, index, key, value) => {
    const updated = [...formData[field]];
    updated[index][key] = value;
    setFormData((prev) => ({ ...prev, [field]: updated }));
  };

  const addArrayItem = (field, item) => {
    setFormData((prev) => ({ ...prev, [field]: [...prev[field], item] }));
  };

  const removeArrayItem = (field, index) => {
    const updated = [...formData[field]];
    updated.splice(index, 1);
    setFormData((prev) => ({ ...prev, [field]: updated }));
  };

  const sanitizeFormData = () => {
    return {
      ...formData,
      coreObjectives: formData.coreObjectives.filter(
        (item) => item.trim() !== ""
      ),
      technicalSpecifications: formData.technicalSpecifications.filter(
        (spec) => spec.key.trim() !== "" && spec.value.trim() !== ""
      ),
      technologies: formData.technologies.filter((item) => item.trim() !== ""),
      gallery: formData.gallery.filter((item) => item.trim() !== ""),
      milestones: formData.milestones.filter(
        (m) =>
          m.title.trim() !== "" || m.description.trim() !== "" || m.date !== ""
      ),
      team: formData.team.filter((item) => item.trim() !== ''), 
      status: formData.status || "ongoing",
    };
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const sanitizedData = sanitizeFormData();
    onSubmit(sanitizedData);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-4xl mx-auto p-6 bg-black text-white rounded shadow space-y-6"
    >
      {/* Title */}
      <div>
        <label className="font-medium">Title</label>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          className="w-full p-2 border rounded mt-1"
          required
        />
      </div>

      {/* Main Image Upload */}
      <div>
        <label className="font-medium block mb-2">Main Image</label>
        {formData.img ? (
          <div className="mb-4 flex flex-col items-center">
            <img
              src={formData.img}
              alt="Preview"
              className="w-48 h-48 object-cover rounded-md border"
            />
            <button
              type="button"
              onClick={() => setFormData((prev) => ({ ...prev, img: "" }))}
              className="mt-2 text-red-500 cursor-pointer"
            >
              Remove Image
            </button>
          </div>
        ) : null}

        <div className="flex justify-center">
          <label className="cursor-pointer bg-blue-600 text-white py-2 px-4 rounded-md">
            {formData.img ? "Change Image" : "Upload Image"}
            <input
              type="file"
              accept="image/*"
              onChange={async (e) => {
                const file = e.target.files[0];
                if (file) {
                  const base64 = await fileToBase64(file);
                  setFormData((prev) => ({ ...prev, img: base64 }));
                }
                e.target.value = null; // <-- this line allows re-uploading same file
              }}
              className="hidden"
            />
          </label>
        </div>
      </div>

      {/* Short Description */}
      <div>
        <label className="font-medium">Short Description</label>
        <textarea
          name="shortDesc"
          value={formData.shortDesc}
          onChange={handleChange}
          className="w-full p-2 border rounded mt-1"
          rows={2}
        />
      </div>

      {/* Overview */}
      <div>
        <label className="font-medium">Overview</label>
        <textarea
          name="overview"
          value={formData.overview}
          onChange={handleChange}
          className="w-full p-2 border rounded mt-1"
          rows={3}
        />
      </div>

      {/* Description */}
      <div>
        <label className="font-medium">Description</label>
        <textarea
          name="desc"
          value={formData.desc}
          onChange={handleChange}
          className="w-full p-2 border rounded mt-1"
          rows={5}
        />
      </div>

      {/* Team Members */}
      <div className="mb-4">
        <label className="font-medium block mb-2">Team Members</label>
        {formData.team?.map((member, idx) => (
          <div key={idx} className="flex mb-2">
            <input
              type="text"
              value={member}
              onChange={(e) => handleArrayChange("team", idx, e.target.value)}
              className="w-full p-2 border rounded"
            />
            <button
              type="button"
              onClick={() => removeArrayItem("team", idx)}
              className="ml-2 text-red-500"
            >
              Remove
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={() => addArrayItem("team", "")}
          className="text-blue-500"
        >
          + Add Member
        </button>
      </div>

      {/* Core Objectives */}
      <div>
        <label className="font-medium">Core Objectives</label>
        {formData.coreObjectives.map((obj, idx) => (
          <div key={idx} className="flex mb-2">
            <input
              type="text"
              value={obj}
              onChange={(e) =>
                handleArrayChange("coreObjectives", idx, e.target.value)
              }
              className="w-full p-2 border rounded"
            />
            <button
              type="button"
              onClick={() => removeArrayItem("coreObjectives", idx)}
              className="ml-2 text-red-500"
            >
              Remove
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={() => addArrayItem("coreObjectives", "")}
          className="text-blue-500"
        >
          + Add
        </button>
      </div>

      {/* Technical Specifications */}
      <div>
        <label className="font-medium">Technical Specifications</label>
        {formData.technicalSpecifications.map((spec, idx) => (
          <div key={idx} className="flex mb-2 gap-2">
            <input
              type="text"
              placeholder="Key"
              value={spec.key}
              onChange={(e) =>
                handleNestedArrayChange(
                  "technicalSpecifications",
                  idx,
                  "key",
                  e.target.value
                )
              }
              className="w-1/2 p-2 border rounded"
            />
            <input
              type="text"
              placeholder="Value"
              value={spec.value}
              onChange={(e) =>
                handleNestedArrayChange(
                  "technicalSpecifications",
                  idx,
                  "value",
                  e.target.value
                )
              }
              className="w-1/2 p-2 border rounded"
            />
            <button
              type="button"
              onClick={() => removeArrayItem("technicalSpecifications", idx)}
              className="ml-2 text-red-500"
            >
              Remove
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={() =>
            addArrayItem("technicalSpecifications", { key: "", value: "" })
          }
          className="text-blue-500"
        >
          + Add
        </button>
      </div>

      {/* Technologies */}
      <div>
        <label className="font-medium">Technologies</label>
        {formData.technologies.map((tech, idx) => (
          <div key={idx} className="flex mb-2">
            <input
              type="text"
              value={tech}
              onChange={(e) =>
                handleArrayChange("technologies", idx, e.target.value)
              }
              className="w-full p-2 border rounded"
            />
            <button
              type="button"
              onClick={() => removeArrayItem("technologies", idx)}
              className="ml-2 text-red-500"
            >
              Remove
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={() => addArrayItem("technologies", "")}
          className="text-blue-500"
        >
          + Add
        </button>
      </div>

      {/* Gallery Upload */}
      <div>
        <label className="font-medium">Gallery</label>
        {formData.gallery.map((img, idx) => (
          <div key={idx} className="mb-4">
            {img && (
              <img
                src={img}
                alt="Gallery"
                className="w-32 h-32 object-cover rounded-md border mb-2"
              />
            )}
            <div className="flex gap-3">
              <label className="cursor-pointer bg-blue-600 text-white py-1 px-3 rounded-md">
                Upload
                <input
                  type="file"
                  accept="image/*"
                  onChange={async (e) => {
                    const file = e.target.files[0];
                    if (file) {
                      const base64 = await fileToBase64(file);
                      handleArrayChange("gallery", idx, base64);
                    }
                  }}
                  className="hidden"
                />
              </label>
              <button
                type="button"
                onClick={() => removeArrayItem("gallery", idx)}
                className="text-red-500"
              >
                Remove
              </button>
            </div>
          </div>
        ))}
        <button
          type="button"
          onClick={() => addArrayItem("gallery", "")}
          className="text-blue-500 mt-2"
        >
          + Add Image
        </button>
      </div>

      {/* Milestones */}
      <div>
        <label className="font-medium">Milestones</label>
        {formData.milestones.map((milestone, idx) => (
          <div key={idx} className="grid grid-cols-3 gap-2 mb-2">
            <input
              type="text"
              placeholder="Title"
              value={milestone.title}
              onChange={(e) =>
                handleNestedArrayChange(
                  "milestones",
                  idx,
                  "title",
                  e.target.value
                )
              }
              className="p-2 border rounded"
            />
            <input
              type="text"
              placeholder="Description"
              value={milestone.description}
              onChange={(e) =>
                handleNestedArrayChange(
                  "milestones",
                  idx,
                  "description",
                  e.target.value
                )
              }
              className="p-2 border rounded"
            />
            <input
              type="date"
              value={milestone.date?.substring(0, 10) || ""}
              onChange={(e) =>
                handleNestedArrayChange(
                  "milestones",
                  idx,
                  "date",
                  e.target.value
                )
              }
              className="p-2 border rounded"
            />
            <button
              type="button"
              onClick={() => removeArrayItem("milestones", idx)}
              className="text-red-500 col-span-3 text-left"
            >
              Remove
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={() =>
            addArrayItem("milestones", { title: "", description: "", date: "" })
          }
          className="text-blue-500"
        >
          + Add
        </button>
      </div>

      {/* Progress */}
      <div>
        <label className="font-medium">Progress (%)</label>
        <input
          type="number"
          name="progress"
          value={formData.progress}
          onChange={handleChange}
          className="w-full p-2 border rounded mt-1"
          min={0}
          max={100}
        />
      </div>

      {/* Category */}
      <div>
        <label className="font-medium">Category</label>
        <input
          type="text"
          name="category"
          value={formData.category}
          onChange={handleChange}
          className="w-full p-2 border rounded mt-1"
        />
      </div>

      {/* Status */}
      <div>
        <label className="font-medium">Status</label>
        <select
          name="status"
          value={formData.status}
          onChange={handleChange}
          className="w-full p-2 border rounded mt-1"
          required
        >
          <option value="">Select Status</option>
          <option value="ongoing">Ongoing</option>
          <option value="completed">Completed</option>
          <option value="upcoming">Upcoming</option>
        </select>
      </div>

      {/* Submit */}
      <button
        type="submit"
        className="w-full bg-blue-600 text-white p-3 rounded"
        onClick={(e) => {
          e.preventDefault();
          handleSubmit(e);
        }}
      >
        Submit
      </button>
    </form>
  );
};

export default ProjectForm;
