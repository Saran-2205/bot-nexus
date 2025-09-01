import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import LoadingSpinner from "../Components/LoadingSpinner.jsx";

export default function Achievements() {
  const queryClient = useQueryClient();
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("newest");
  const [deletingId, setDeletingId] = useState(null);

  const API = import.meta.env.VITE_API_URL;

  const { data: achievements = [], isLoading, error } = useQuery({
    queryKey: ["achievements"],
    queryFn: async () => {
      const res = await axios.get(`${API}/api/admin/achievements`);
      return res.data;
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id) => {
      setDeletingId(id);
      return axios.delete(`${API}/api/admin/achievements/${id}`);
    },
    onSuccess: () => {
      toast.success("Achievement deleted");
      queryClient.invalidateQueries({ queryKey: ["achievements"] });
    },
    onError: () => {
      toast.error("Failed to delete achievement");
    },
    onSettled: () => setDeletingId(null),
  });

  const filtered = achievements
    .filter((a) =>
      [a.title, a.event, a.prize, String(a.year)]
        .join(" ")
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      if (sortBy === "newest") return b.year - a.year;
      return a.year - b.year;
    });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-md mx-auto p-6 bg-red-900 text-red-100 rounded-lg shadow">
        <p className="font-medium">Failed to load achievements</p>
        <button
          onClick={() => queryClient.invalidateQueries({ queryKey: ["achievements"] })}
          className="mt-4 px-4 py-2 bg-red-600 text-white rounded"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 bg-black min-h-screen">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-extrabold text-[#E93535] mb-4 tracking-tight">
          Achievements
        </h1>
        <p className="text-lg text-gray-400 max-w-2xl mx-auto">
          Track and manage all recorded achievements
        </p>
      </div>

      <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
        <div className="relative w-full sm:w-64">
          <input
            type="text"
            placeholder="Search achievements..."
            className="block w-full pl-3 pr-3 py-2 border border-gray-700 rounded-lg bg-gray-800 text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-[#E93535] transition"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-400">Sort by:</span>
          <select
            className="border cursor-pointer border-gray-700 bg-gray-800 text-white rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#E93535] transition"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="newest">Newest Year</option>
            <option value="oldest">Oldest Year</option>
          </select>
        </div>

        <Link
          to="/achievements/add"
          className="px-4 py-2 bg-[#E93535] text-white rounded-lg shadow hover:bg-red-700 transition"
        >
          + Create Achievement
        </Link>
      </div>

      {filtered.length === 0 ? (
        <div className="text-center py-16 bg-gray-800 rounded-xl shadow-sm border border-[#E53935]/30">
          <h3 className="mt-2 text-lg font-medium text-white">
            No achievements found
          </h3>
          <p className="mt-1 text-gray-500">
            {searchTerm
              ? "Try a different search term"
              : "No achievements have been added yet"}
          </p>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2">
          {filtered.map((a) => (
            <div
              key={a._id}
              className="bg-gray-800 rounded-xl shadow-md border border-[#E53935]/30 transition-shadow duration-300"
            >
              <div className="p-6">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-lg font-semibold text-white">
                      {a.title} ({a.year})
                    </p>
                    <p className="text-sm text-gray-400">
                      {a.event} — {a.prize}
                    </p>
                  </div>

                  <div className="flex gap-2">
                    <Link
                      to={`/achievements/edit/${a._id}`}
                      className="px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600 transition"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => deleteMutation.mutate(a._id)}
                      disabled={deletingId === a._id}
                      className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 transition disabled:opacity-50 cursor-pointer"
                    >
                      {deletingId === a._id ? "..." : "Delete"}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
