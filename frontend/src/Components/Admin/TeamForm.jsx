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

const TeamForm = ({ onSubmit, initialData = {} }) => {
  const [formData, setFormData] = useState({
    name: "",
    designation: "",
    specialization: "",
    socialLinks: {
      linkedin: "",
      instagram: "",
      gmail: "",
    },
    comment: "",
    image: "",
    skills: [""],
  });

  // Update form data if initialData changes (for edit mode)
  useEffect(() => {
    if (initialData && Object.keys(initialData).length > 0) {
      setFormData({
        name: initialData.name || "",
        designation: initialData.designation || "",
        specialization: initialData.specialization || "",
        socialLinks: {
          linkedin: initialData.socialLinks?.linkedin || "",
          instagram: initialData.socialLinks?.instagram || "",
          gmail: initialData.socialLinks?.gmail || "",
        },
        comment: initialData.comment || "",
        image: initialData.image || "",
        skills: initialData.skills?.length ? initialData.skills : [""],
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    if (name.startsWith("socialLinks.")) {
      const socialField = name.split(".")[1];
      setFormData(prev => ({
        ...prev,
        socialLinks: {
          ...prev.socialLinks,
          [socialField]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleArrayChange = (field, index, value) => {
    setFormData(prev => {
      const newArray = [...prev[field]];
      newArray[index] = value;
      return { ...prev, [field]: newArray };
    });
  };

  const addArrayItem = (field, item) => {
    setFormData(prev => ({ ...prev, [field]: [...prev[field], item] }));
  };

  const removeArrayItem = (field, index) => {
    const updated = [...formData[field]];
    updated.splice(index, 1);
    setFormData(prev => ({ ...prev, [field]: updated }));
  };

  const sanitizeFormData = () => {
    return {
      ...formData,
      skills: formData.skills.filter(skill => skill.trim() !== ""),
      socialLinks: {
        linkedin: formData.socialLinks.linkedin.trim(),
        instagram: formData.socialLinks.instagram.trim(),
        gmail: formData.socialLinks.gmail.trim(),
      }
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
      {/* Name */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-[#E93535] uppercase tracking-wider">
          Name 
        </label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 transition-all"
          required
          placeholder="Team member name"
        />
      </div>

      {/* Image Upload */}
      <div className="space-y-4">
        <label className="block text-sm font-medium text-[#E93535] uppercase tracking-wider">
          Profile Image
        </label>
        {formData.image ? (
          <div className="flex flex-col items-start space-y-3">
            <div className="relative group">
              <img
                src={formData.image}
                alt="Preview"
                className="w-full max-w-xs h-64 object-cover rounded-lg border-2 border-gray-700 shadow-lg group-hover:opacity-80 transition-opacity"
              />
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <button
                  type="button"
                  onClick={() => setFormData(prev => ({ ...prev, image: "" }))}
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
          {formData.image ? "Change Image" : "Upload Image"}
          <input
            type="file"
            accept="image/*"
            onChange={async (e) => {
              const file = e.target.files[0];
              if (file) {
                const base64 = await fileToBase64(file);
                setFormData(prev => ({ ...prev, image: base64 }));
              }
              e.target.value = null;
            }}
            className="hidden"
          />
        </label>
      </div>

      {/* Designation */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-[#E93535] uppercase tracking-wider">
          Designation
        </label>
        <input
          type="text"
          name="designation"
          value={formData.designation}
          onChange={handleChange}
          className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 transition-all"
          placeholder="Team member designation"
        />
      </div>

      {/* Specialization */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-[#E93535] uppercase tracking-wider">
          Specialization
        </label>
        <input
          type="text"
          name="specialization"
          value={formData.specialization}
          onChange={handleChange}
          className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 transition-all"
          placeholder="Area of expertise"
        />
      </div>

      {/* Social Links */}
      <div className="space-y-4">
        <label className="block text-sm font-medium text-[#E93535] uppercase tracking-wider">
          Social Links
        </label>
        
        {/* LinkedIn */}
        <div className="space-y-2">
          <label className="block text-sm text-gray-400">LinkedIn</label>
          <div className="flex items-center bg-gray-800 rounded-md px-4 py-2 border border-gray-700">
            <svg className="w-5 h-5 text-[#0077b5] mr-2" fill="currentColor" viewBox="0 0 24 24">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
            </svg>
            <input
              type="url"
              name="socialLinks.linkedin"
              value={formData.socialLinks.linkedin}
              onChange={handleChange}
              className="flex-1 bg-transparent border-none text-white placeholder-gray-500 focus:ring-0 outline-none"
              placeholder="https://linkedin.com/in/username"
            />
          </div>
        </div>
        
        {/* Instagram */}
        <div className="space-y-2">
          <label className="block text-sm text-gray-400">Instagram</label>
          <div className="flex items-center bg-gray-800 rounded-md px-4 py-2 border border-gray-700">
            <svg className="w-5 h-5 text-[#E4405F] mr-2" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
            </svg>
            <input
              type="url"
              name="socialLinks.instagram"
              value={formData.socialLinks.instagram}
              onChange={handleChange}
              className="flex-1 bg-transparent border-none text-white placeholder-gray-500 focus:ring-0 outline-none"
              placeholder="https://instagram.com/username"
            />
          </div>
        </div>
        
        {/* Gmail */}
        <div className="space-y-2">
          <label className="block text-sm text-gray-400">Gmail</label>
          <div className="flex items-center bg-gray-800 rounded-md px-4 py-2 border border-gray-700">
            <svg className="w-5 h-5 text-[#DB4437] mr-2" fill="currentColor" viewBox="0 0 24 24">
              <path d="M22.288 21h-20.576c-.945 0-1.712-.767-1.712-1.712v-13.576c0-.945.767-1.712 1.712-1.712h20.576c.945 0 1.712.767 1.712 1.712v13.576c0 .945-.767 1.712-1.712 1.712zm-10.288-6.086l-9.342-6.483-.02 11.569h18.684v-11.569l-9.322 6.483zm8.869-9.914h-17.789l8.92 6.229s6.252-4.406 8.869-6.229z"/>
            </svg>
            <input
              type="email"
              name="socialLinks.gmail"
              value={formData.socialLinks.gmail}
              onChange={handleChange}
              className="flex-1 bg-transparent border-none text-white placeholder-gray-500 focus:ring-0 outline-none"
              placeholder="example@gmail.com"
            />
          </div>
        </div>
      </div>

      {/* Comment */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-[#E93535] uppercase tracking-wider">
          Quote
        </label>
        <textarea
          name="comment"
          value={formData.comment}
          onChange={handleChange}
          className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 transition-all"
          rows={3}
          placeholder="Text your quote here"
        />
      </div>

      {/* Skills */}
      <div className="space-y-4">
        <label className="block text-sm font-medium text-[#E93535] uppercase tracking-wider">
          Skills
        </label>
        <div className="space-y-3">
          {formData.skills.map((skill, idx) => (
            <div key={idx} className="flex items-center space-x-3">
              <input
                type="text"
                value={skill}
                onChange={(e) => handleArrayChange("skills", idx, e.target.value)}
                className="flex-1 px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white"
                placeholder="Skill"
              />
              <button
                type="button"
                onClick={() => removeArrayItem("skills", idx)}
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
          onClick={() => addArrayItem("skills", "")}
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
          Add Skill
        </button>
      </div>

      {/* Submit */}
      <div className="pt-6">
        <button
          type="submit"
          className="w-full px-6 py-3 bg-[#E93535] hover:cursor-pointer text-white font-bold rounded-lg hover:bg-[#c52a2a] transition-colors shadow-lg uppercase tracking-wider"
        >
          {initialData && Object.keys(initialData).length > 0
            ? "Update Team Member"
            : "Create Team Member"}
        </button>
      </div>
    </form>
  );
};

export default TeamForm;