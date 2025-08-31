// ProjectForm.js
import { useEffect, useState } from "react";
import axios from "axios";
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
  const [teamMemberInput, setTeamMemberInput] = useState("");
  const [teamMemberSuggestions, setTeamMemberSuggestions] = useState([]);
  const [showTeamSuggestions, setShowTeamSuggestions] = useState(false);
  const [allTeamMembers, setAllTeamMembers] = useState([]);
  const [isInputFocused, setIsInputFocused] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    shortDesc: "",
    img: "",
    overview: [""],
    desc: "",
    coreObjectives: [""],
    team: [],
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
      const isTeamObjects = initialData.team?.[0]?.name;
      setFormData({
        title: initialData.title || "",
        shortDesc: initialData.shortDesc || "",
        img: initialData.img || "",
        overview: initialData.overview || [""],
        desc: initialData.desc || "",
        coreObjectives: initialData.coreObjectives || [""],
        team: isTeamObjects
          ? initialData.team.map((m) => m._id)
          : initialData.team || [],
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
      if (isTeamObjects) {
        setAllTeamMembers(initialData.team);
      }
    }
  }, [initialData]);

  const API = import.meta.env.VITE_API_URL;

  // Add this function to fetch team members (call it in useEffect if needed)
  const fetchTeamMembers = async (searchTerm = "") => {
    try {
      const response = await axios.get(`${API}/api/admin/team?search=${searchTerm}`);
      const members = response?.data?.teamMembers || [];
      setTeamMemberSuggestions(Array.isArray(members) ? members : []);
    } catch (error) {
      console.error("Error fetching team members:", error);
    }
  };
  // Add this effect to load initial team members
  useEffect(() => {
    fetchTeamMembers();
  }, []);
  // Add these handlers for team member functionality
  const handleTeamMemberInputChange = async (e) => {
    const value = e.target.value;
    setTeamMemberInput(value);

    if (value.length > 1) {
      try {
        const response = await axios.get(`${API}/api/admin/team?search=${value}`);
        const filteredMembers =
          response.data?.teamMembers?.filter(
            (member) => !formData.team.includes(member._id) // Exclude already selected members
          ) || [];
        setTeamMemberSuggestions(filteredMembers);
        setShowTeamSuggestions(filteredMembers.length > 0);
      } catch (error) {
        console.error("Error searching team members:", error);
        setTeamMemberSuggestions([]);
        setShowTeamSuggestions(false);
      }
    } else {
      setTeamMemberSuggestions([]);
      setShowTeamSuggestions(false);
    }
  };

  const handleTeamMemberSelect = (member) => {
    if (!formData.team.includes(member._id)) {
      setFormData((prev) => ({
        ...prev,
        team: [...prev.team, member._id],
      }));
      setAllTeamMembers((prev) =>
        prev.some((m) => m._id === member._id) ? prev : [...prev, member]
      );
    }
    setTeamMemberInput("");
    setShowTeamSuggestions(false);
  };

  const removeTeamMember = (memberId) => {
    setFormData((prev) => ({
      ...prev,
      team: prev.team.filter((id) => id !== memberId),
    }));
    setAllTeamMembers((prev) => prev.filter((m) => m._id !== memberId));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: name === "progress" ? (value === "" ? "" : Number(value)) : value,
    }));
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
        ? formData.team.filter(
            (id) => typeof id === "string" && id.trim() !== ""
          )
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

      {/* Overview array */}
      <div className="space-y-4">
        <label className="block text-sm font-medium text-[#E93535] uppercase tracking-wider">
          Overview Paragraphs
        </label>
        <div className="space-y-3">
          {formData.overview.map((para, index) => (
            <div key={index} className="flex items-center space-x-3">
              <textarea
                value={para}
                onChange={(e) =>
                  handleArrayChange("overview", index, e.target.value)
                }
                rows={4}
                placeholder={`Paragraph ${index + 1}`}
                className="flex-1 px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white"
              />
              {formData.overview.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeArrayItem("overview", index)}
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
              )}
            </div>
          ))}
        </div>

        <button
          type="button"
          onClick={() => addArrayItem("overview")}
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
          Add Paragraph
        </button>
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

      {/* Team Members Section - Clean Design */}
      <div className="mb-8">
        <label className="block text-sm font-medium text-[#E93535] uppercase tracking-wider mb-5">
          Team Members
        </label>

        {/* Search Input */}
        <div className="relative mb-4">
          <div className="flex items-center bg-gray-800 rounded-md px-4 py-2 border border-gray-700 focus-within:border-[#FF6B6B] transition-colors">
            <svg
              className="w-5 h-5 text-gray-400 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
            <input
              type="text"
              value={teamMemberInput}
              onChange={handleTeamMemberInputChange}
              onFocus={() => setIsInputFocused(true)}
              onBlur={() => setTimeout(() => setIsInputFocused(false), 100)}
              className="flex-1 bg-transparent border-none text-white placeholder-gray-500 focus:ring-0 outline-none text-sm"
              placeholder="Search team members..."
            />
          </div>

          {/* Suggestions Dropdown */}
          {isInputFocused &&
            showTeamSuggestions &&
            teamMemberSuggestions.length > 0 && (
              <div className="absolute z-10 mt-1 w-full bg-gray-800 rounded-lg shadow-lg border border-gray-700 overflow-hidden max-h-60 overflow-y-auto">
                {teamMemberSuggestions
                  .filter(
                    (member) =>
                      member.name
                        .toLowerCase()
                        .includes(teamMemberInput.toLowerCase()) ||
                      (member.designation &&
                        member.designation
                          .toLowerCase()
                          .includes(teamMemberInput.toLowerCase()))
                  ) // This was the missing parenthesis
                  .map((member) => (
                    <div
                      key={member._id}
                      className="px-4 py-3 hover:bg-gray-700 cursor-pointer flex items-center transition-colors"
                      onMouseDown={() => handleTeamMemberSelect(member)}
                    >
                      <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gray-700 overflow-hidden flex items-center justify-center text-white font-medium">
                        {member.image ? (
                          <img
                            src={member.image}
                            alt={member.name}
                            className="h-full w-full object-cover rounded-full"
                          />
                        ) : (
                          member.name.charAt(0)
                        )}
                      </div>
                      <div className="ml-3">
                        <p className="text-sm font-medium text-white">
                          {member.name
                            .split(new RegExp(`(${teamMemberInput})`, "gi"))
                            .map((part, i) =>
                              part.toLowerCase() ===
                              teamMemberInput.toLowerCase() ? (
                                <span
                                  key={i}
                                  className="text-[#FF6B6B] font-bold"
                                >
                                  {part}
                                </span>
                              ) : (
                                part
                              )
                            )}
                        </p>
                        {member.designation && (
                          <p className="text-xs text-gray-400">
                            {member.designation
                              .split(new RegExp(`(${teamMemberInput})`, "gi"))
                              .map((part, i) =>
                                part.toLowerCase() ===
                                teamMemberInput.toLowerCase() ? (
                                  <span
                                    key={i}
                                    className="text-[#FF6B6B] font-bold"
                                  >
                                    {part}
                                  </span>
                                ) : (
                                  part
                                )
                              )}
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
              </div>
            )}
        </div>

        {/* Selected Members */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-400 mb-2">
            Added Team Members
          </label>
          {formData.team.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {allTeamMembers
                .filter((member) => formData.team.includes(member._id))
                .map((member) => (
                  <div
                    key={member._id}
                    className="flex items-center justify-between bg-gray-800 rounded-md px-3 py-2 border border-gray-700"
                  >
                    <div className="flex items-center">
                      <div className="w-10 h-10 rounded-full bg-gray-700 overflow-hidden flex items-center justify-center text-white text-xs font-medium mr-2">
                        {member.image ? (
                          <img
                            src={member.image}
                            alt={member.name}
                            className="h-full w-full object-cover  rounded-full"
                          />
                        ) : (
                          member.name.charAt(0)
                        )}
                      </div>
                      <span className="text-sm text-white">{member.name}</span>
                    </div>
                    <button
                      onClick={() => removeTeamMember(member._id)}
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
          ) : (
            <p className="text-sm text-gray-500 italic">
              No team members selected
            </p>
          )}
        </div>
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
            : "Add Project"}
        </button>
      </div>
    </form>
  );
};

export default ProjectForm;
