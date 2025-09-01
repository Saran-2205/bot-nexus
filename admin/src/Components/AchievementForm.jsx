import { useState, useEffect } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { FiArrowLeft } from "react-icons/fi";

export default function AchievementForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const API = import.meta.env.VITE_API_URL;

  const [formData, setFormData] = useState({
    title: "",
    year: "",
    event: "",
    prize: "",
  });

  // If editing, fetch achievement data
  const { data } = useQuery({
    queryKey: ["achievement", id],
    queryFn: async () => {
      if (!id) return null;
      const res = await axios.get(`${API}/api/admin/achievements/${id}`);
      return res.data;
    },
    enabled: !!id,
  });

  useEffect(() => {
    if (data) setFormData(data);
  }, [data]);

  const mutation = useMutation({
    mutationFn: async (formData) => {
      if (id) {
        return axios.patch(`${API}/api/admin/achievements/${id}`, formData);
      } else {
        return axios.post(`${API}/api/admin/achievements/`, formData);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["achievements"] });
      navigate("/achievements");
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    mutation.mutate(formData);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-3xl mx-auto p-8 bg-black rounded-xl shadow-2xl space-y-8 font-['Orbitron']"
    >
      <h1 className="text-2xl font-bold flex items-center text-[#E93535] uppercase tracking-widest">
        <FiArrowLeft className="mr-2 cursor-pointer" onClick={() => navigate("/achievements")} />
        {id ? "Edit Achievement" : "Create Achievement"}
      </h1>

      {/* Title */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-[#E93535] uppercase tracking-wider">
          Title
        </label>
        <input
          type="text"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500"
          placeholder="Achievement Title"
          required
        />
      </div>

      {/* Year */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-[#E93535] uppercase tracking-wider">
          Year
        </label>
        <input
          type="number"
          value={formData.year}
          onChange={(e) => setFormData({ ...formData, year: Number(e.target.value) })}
          className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500"
          placeholder="Enter year"
          required
        />
      </div>

      {/* Event */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-[#E93535] uppercase tracking-wider">
          Event
        </label>
        <input
          type="text"
          value={formData.event}
          onChange={(e) => setFormData({ ...formData, event: e.target.value })}
          className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500"
          placeholder="Event name"
          required
        />
      </div>

      {/* Prize */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-[#E93535] uppercase tracking-wider">
          Prize
        </label>
        <input
          type="text"
          value={formData.prize}
          onChange={(e) => setFormData({ ...formData, prize: e.target.value })}
          className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500"
          placeholder="Prize won"
          required
        />
      </div>

      {/* Submit */}
      <div className="pt-6">
        <button
          type="submit"
          disabled={mutation.isPending}
          className="w-full px-6 py-3 bg-[#E93535] cursor-pointer text-white font-bold rounded-lg hover:bg-[#c52a2a] transition-colors shadow-lg uppercase tracking-wider disabled:opacity-50"
        >
          {mutation.isPending
            ? "Saving..."
            : id
            ? "Update Achievement"
            : "Create Achievement"}
        </button>
      </div>
    </form>
  );
}
