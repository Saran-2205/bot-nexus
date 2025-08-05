{/* Main Image Upload */}
      <div className="space-y-4">
        <label className="block text-sm font-medium text-[#E93535] uppercase tracking-wider">
          Main Image
        </label>
        {formData.heroImg ? (
          <div className="flex flex-col items-start space-y-3">
            <div className="relative group">
              <img
                src={formData.heroImg}
                alt="Preview"
                className="w-full max-w-xs h-64 object-cover rounded-lg border-2 border-gray-700 shadow-lg group-hover:opacity-80 transition-opacity"
              />
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <button
                  type="button"
                  onClick={() => setFormData(prev => ({ ...prev, heroImg: "" }))}
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
                setFormData(prev => ({ ...prev, heroImg: base64 }));
              }
              e.target.value = null;
            }}
            className="hidden"
          />
        </label>
      </div>

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
</button>;

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
</button>;

