// ProjectForm.js
import { useEffect, useState } from "react";
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
  const [allMembers, setAllMembers] = useState([]);
  const [isInputFocused, setIsInputFocused] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    shortDesc: "",
    img: "",
    overview: "",
    desc: "",
    coreObjectives: [""],
    team: [""],
    technicalSpecifications: [{ key: "", value: "" }],
    technologies: [""],
    progress: 0,
    category: "",
    gallery: [""],
    status: "ongoing",
    milestones: [{ title: "", description: "", date: "" }],
  });

  // Update form data if initialData changes (for edit mode)
  useEffect(() => {
    if (initialData && Object.keys(initialData).length > 0) {
      setFormData({
        title: initialData.title || "",
        shortDesc: initialData.shortDesc || "",
        img: initialData.img || "",
        overview: initialData.overview || "",
        desc: initialData.desc || "",
        coreObjectives: initialData.coreObjectives || [""],
        team: initialData.team || [""],
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
    }
  }, [initialData]);

  useEffect(() => {
    const fetchTeamMembers = async () => {
      try {
        const response = await fetch("/api/admin/team"); // or your correct endpoint
        const data = await response.json();
        setAllMembers(data.teamMembers.map((m) => m.name)); // ✅ array of strings
      } catch (error) {
        console.error("Error fetching members:", error);
      }
    };

    fetchTeamMembers();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleArrayChange = (key, index, value) => {
    setFormData((prev) => {
      const newArray = [...prev[key]];
      newArray[index] = value;
      return { ...prev, [key]: newArray };
    });
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
      team: Array.isArray(formData.team)
        ? formData.team
            .map((member) => member._id)
            .filter((id) => typeof id === "string" && id.trim() !== "")
        : [],
      status: formData.status || "ongoing",
    };
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const sanitizedData = sanitizeFormData();
    await onSubmit(sanitizedData);
  };
  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-5xl mx-auto p-8 bg-black rounded-xl shadow-2xl space-y-8 font-['Orbitron']"
    >
      {/* Title */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-[#E93535] uppercase tracking-wider">
          Title
        </label>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 transition-all"
          required
          placeholder="Project title"
        />
      </div>

      {/* Main Image Upload */}
      <div className="space-y-4">
        <label className="block text-sm font-medium text-[#E93535] uppercase tracking-wider">
          Main Image
        </label>
        {formData.img ? (
          <div className="flex flex-col items-start space-y-3">
            <div className="relative group">
              <img
                src={formData.img}
                alt="Preview"
                className="w-full max-w-xs h-64 object-cover rounded-lg border-2 border-gray-700 shadow-lg group-hover:opacity-80 transition-opacity"
              />
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <button
                  type="button"
                  onClick={() => setFormData((prev) => ({ ...prev, img: "" }))}
                  className="px-4 py-2 bg-[#E93535] text-white rounded-md hover:cursor-pointer hover:bg-[#c52a2a] transition-colors"
                >
                  Remove Image
                </button>
              </div>
            </div>
          </div>
        ) : null}

        <label className="inline-flex items-center px-6 py-3 bg-[#E93535] text-white font-medium rounded-lg hover:bg-[#c52a2a] transition-colors cursor-pointer shadow-md">
          <svg
            className="w-5 h-5 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
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
              e.target.value = null;
            }}
            className="hidden"
          />
        </label>
      </div>

      {/* Short Description */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-[#E93535] uppercase tracking-wider">
          Short Description
        </label>
        <textarea
          name="shortDesc"
          value={formData.shortDesc}
          onChange={handleChange}
          className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 transition-all"
          rows={3}
          placeholder="Brief project description"
        />
      </div>

      {/* Overview */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-[#E93535] uppercase tracking-wider">
          Overview
        </label>
        <textarea
          name="overview"
          value={formData.overview}
          onChange={handleChange}
          className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 transition-all"
          rows={4}
          placeholder="Detailed project overview"
        />
      </div>

      {/* Description */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-[#E93535] uppercase tracking-wider">
          Description
        </label>
        <textarea
          name="desc"
          value={formData.desc}
          onChange={handleChange}
          className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 transition-all"
          rows={6}
          placeholder="Complete project description"
        />
      </div>

      {/* Team Members */}
      <div className="space-y-4">
        <label className="block text-sm font-medium text-[#E93535] uppercase tracking-wider">
          Team Members
        </label>

        <div className="space-y-3">
          {formData.team?.map((member, idx) => {
            const filteredSuggestions = allMembers.filter(
              (name) =>
                name.toLowerCase().includes(member.toLowerCase()) &&
                !formData.team.includes(name)
            );

            return (
              <div key={idx} className="flex items-center space-x-3">
                <div className="relative w-full">
                  <input
                    type="text"
                    value={member}
                    onChange={(e) =>
                      handleArrayChange("team", idx, e.target.value)
                    }
                    onFocus={() => setIsInputFocused(true)}
                    onBlur={() =>
                      setTimeout(() => setIsInputFocused(false), 100)
                    }
                    className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white"
                    placeholder="Team member name"
                    autoComplete="off"
                  />

                  {/* Suggestions */}
                  {member && isInputFocused && filteredSuggestions.length > 0 && (
                    <ul className="absolute z-10 mt-1 w-full bg-gray-900 border border-gray-700 rounded-lg shadow-lg max-h-40 overflow-auto">
                      {filteredSuggestions.map((suggestion, sidx) => (
                        <li
                          key={sidx}
                          className="px-4 py-2 hover:bg-[#E93535] text-white hover:text-white cursor-pointer"
                          onMouseDown={() => handleArrayChange("team", idx, suggestion)}
                        >
                          {suggestion}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>

                <button
                  type="button"
                  onClick={() => removeArrayItem("team", idx)}
                  className="p-2 text-[#E93535] hover:text-white hover:cursor-pointer hover:bg-[#E93535] rounded-full transition-colors"
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                    />
                  </svg>
                </button>
              </div>
            );
          })}
        </div>

        <button
          type="button"
          onClick={() => addArrayItem("team", "")}
          className="flex items-center px-4 py-2 text-[#E93535] border border-[#E93535] rounded-lg hover:cursor-pointer hover:bg-[#E93535] hover:text-white transition-colors"
        >
          <svg
            className="w-4 h-4 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 6v6m0 0v6m0-6h6m-6 0H6"
            />
          </svg>
          Add Member
        </button>
      </div>

      {/* Core Objectives */}
      <div className="space-y-4">
        <label className="block text-sm font-medium text-[#E93535] uppercase tracking-wider">
          Core Objectives
        </label>
        <div className="space-y-3">
          {formData.coreObjectives.map((obj, idx) => (
            <div key={idx} className="flex items-center space-x-3">
              <input
                type="text"
                value={obj}
                onChange={(e) =>
                  handleArrayChange("coreObjectives", idx, e.target.value)
                }
                className="flex-1 px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white"
                placeholder="Objective"
              />
              <button
                type="button"
                onClick={() => removeArrayItem("coreObjectives", idx)}
                className="p-2 text-[#E93535] hover:text-white hover:cursor-pointer hover:bg-[#E93535] rounded-full transition-colors"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                  />
                </svg>
              </button>
            </div>
          ))}
        </div>
        <button
          type="button"
          onClick={() => addArrayItem("coreObjectives", "")}
          className="flex items-center px-4 py-2 text-[#E93535] border border-[#E93535] rounded-lg hover:cursor-pointer hover:bg-[#E93535] hover:text-white transition-colors"
        >
          <svg
            className="w-4 h-4 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 6v6m0 0v6m0-6h6m-6 0H6"
            />
          </svg>
          Add Objective
        </button>
      </div>

      {/* Technical Specifications */}
      <div className="space-y-4">
        <label className="block text-sm font-medium text-[#E93535] uppercase tracking-wider">
          Technical Specifications
        </label>
        <div className="space-y-3">
          {formData.technicalSpecifications.map((spec, idx) => (
            <div key={idx} className="flex items-center space-x-3">
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
                className="flex-1 px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white"
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
                className="flex-1 px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white"
              />
              <button
                type="button"
                onClick={() => removeArrayItem("technicalSpecifications", idx)}
                className="p-2 text-[#E93535] hover:text-white hover:cursor-pointer hover:bg-[#E93535] rounded-full transition-colors"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                  />
                </svg>
              </button>
            </div>
          ))}
        </div>
        <button
          type="button"
          onClick={() =>
            addArrayItem("technicalSpecifications", { key: "", value: "" })
          }
          className="flex items-center px-4 py-2 text-[#E93535] border border-[#E93535] rounded-lg hover:cursor-pointer hover:bg-[#E93535] hover:text-white transition-colors"
        >
          <svg
            className="w-4 h-4 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 6v6m0 0v6m0-6h6m-6 0H6"
            />
          </svg>
          Add Specification
        </button>
      </div>

      {/* Technologies */}
      <div className="space-y-4">
        <label className="block text-sm font-medium text-[#E93535] uppercase tracking-wider">
          Technologies
        </label>
        <div className="space-y-3">
          {formData.technologies.map((tech, idx) => (
            <div key={idx} className="flex items-center space-x-3">
              <input
                type="text"
                value={tech}
                onChange={(e) =>
                  handleArrayChange("technologies", idx, e.target.value)
                }
                className="flex-1 px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white"
                placeholder="Technology name"
              />
              <button
                type="button"
                onClick={() => removeArrayItem("technologies", idx)}
                className="p-2 text-[#E93535] hover:text-white hover:cursor-pointer hover:bg-[#E93535] rounded-full transition-colors"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                  />
                </svg>
              </button>
            </div>
          ))}
        </div>
        <button
          type="button"
          onClick={() => addArrayItem("technologies", "")}
          className="flex items-center px-4 py-2 text-[#E93535] border border-[#E93535] rounded-lg hover:cursor-pointer hover:bg-[#E93535] hover:text-white transition-colors"
        >
          <svg
            className="w-4 h-4 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 6v6m0 0v6m0-6h6m-6 0H6"
            />
          </svg>
          Add Technology
        </button>
      </div>

      {/* Gallery Upload */}
      <div className="space-y-4">
        <label className="block text-sm font-medium text-[#E93535] uppercase tracking-wider">
          Gallery
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {formData.gallery.map((img, idx) => (
            <div
              key={idx}
              className="border border-gray-700 rounded-lg p-3 space-y-3 bg-gray-800"
            >
              {img && (
                <img
                  src={img}
                  alt="Gallery"
                  className="w-full h-32 object-cover rounded-md"
                />
              )}
              <div className="flex justify-between items-center">
                <label className="inline-flex items-center px-3 py-1 border border-[#E93535] text-sm font-medium rounded-md text-[#E93535] hover:bg-[#E93535] hover:text-white transition-colors cursor-pointer">
                  {img ? "Change" : "Upload"}
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
                  className="p-1 text-[#E93535] hover:text-white hover:cursor-pointer hover:bg-[#E93535] rounded-full transition-colors"
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                    />
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>
        <button
          type="button"
          onClick={() => addArrayItem("gallery", "")}
          className="flex items-center px-4 py-2 text-[#E93535] border border-[#E93535] rounded-lg hover:cursor-pointer hover:bg-[#E93535] hover:text-white transition-colors"
        >
          <svg
            className="w-4 h-4 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 6v6m0 0v6m0-6h6m-6 0H6"
            />
          </svg>
          Add Image
        </button>
      </div>

      {/* Milestones */}
      <div className="space-y-4">
        <label className="block text-sm font-medium text-[#E93535] uppercase tracking-wider">
          Milestones
        </label>
        <div className="space-y-4">
          {formData.milestones.map((milestone, idx) => (
            <div
              key={idx}
              className="border border-gray-700 rounded-lg p-4 space-y-3 bg-gray-800"
            >
              <div className="grid grid-cols-1 gap-3">
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
                  className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white"
                />
                <textarea
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
                  className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white"
                  rows={2}
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
                  className="w-full px-4 py-2 bg-gray-800 border hover:cursor-pointer border-gray-700 rounded-lg text-white"
                />
              </div>
              <button
                type="button"
                onClick={() => removeArrayItem("milestones", idx)}
                className="text-sm text-[#E93535] hover:text-white hover:cursor-pointer hover:bg-[#E93535] px-3 py-1 rounded transition-colors"
              >
                Remove Milestone
              </button>
            </div>
          ))}
        </div>
        <button
          type="button"
          onClick={() =>
            addArrayItem("milestones", { title: "", description: "", date: "" })
          }
          className="flex items-center px-4 py-2 text-[#E93535] border border-[#E93535] rounded-lg hover:cursor-pointer hover:bg-[#E93535] hover:text-white transition-colors"
        >
          <svg
            className="w-4 h-4 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 6v6m0 0v6m0-6h6m-6 0H6"
            />
          </svg>
          Add Milestone
        </button>
      </div>

      {/* Progress */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-[#E93535] uppercase tracking-wider">
          Progress (%)
        </label>
        <input
          type="number"
          name="progress"
          value={formData.progress}
          onChange={handleChange}
          className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white"
          min={0}
          max={100}
        />
      </div>

      {/* Category */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-[#E93535] uppercase tracking-wider">
          Category
        </label>
        <input
          type="text"
          name="category"
          value={formData.category}
          onChange={handleChange}
          className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white"
          placeholder="Project category"
        />
      </div>

      {/* Status */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-[#E93535] uppercase tracking-wider">
          Status
        </label>
        <select
          name="status"
          value={formData.status}
          onChange={handleChange}
          className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg hover:cursor-pointer text-white"
          required
        >
          <option value="ongoing">Ongoing</option>
          <option value="completed">Completed</option>
          <option value="upcoming">Upcoming</option>
        </select>
      </div>

      {/* Submit */}
      <div className="pt-6">
        <button
          type="submit"
          className="w-full px-6 py-3 bg-[#E93535] hover:cursor-pointer text-white font-bold rounded-lg hover:bg-[#c52a2a] transition-colors shadow-lg uppercase tracking-wider"
        >
          {initialData && Object.keys(initialData).length > 0
            ? "Update Project"
            : "Create Project"}
        </button>
      </div>
    </form>
  );
};

export default ProjectForm;
