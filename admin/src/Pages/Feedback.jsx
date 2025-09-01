import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import LoadingSpinner from "../Components/LoadingSpinner.jsx";

const Feedback = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [deletingId, setDeletingId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("newest");

  const API = import.meta.env.VITE_API_URL;

  useEffect(() => {
    fetch(`${API}/api/admin/feedback`, {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        setFeedbacks(data.feedbacks);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [API]);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this feedback?")) return;

    setDeletingId(id);

    try {
      const response = await fetch(`${API}/api/admin/feedback/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });


      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || "Failed to delete feedback");
      }

      setFeedbacks((prev) => prev.filter((fb) => fb._id !== id));
      toast.success("Feedback deleted successfully");
    } catch (error) {
      console.error("Delete error:", error);
      toast.error(error.message || "Failed to delete feedback");
    } finally {
      setDeletingId(null);
    }
  };

  const getRandomColor = () => {
    const colors = [
      "#E93535", "#3B82F6", "#10B981", "#F59E0B",
      "#8B5CF6", "#EC4899", "#14B8A6", "#F97316",
      "#6366F1", "#EF4444", "#06B6D4", "#84CC16",
    ];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  const filteredFeedbacks = feedbacks
    .filter((fb) => {
      const searchLower = searchTerm.toLowerCase();
      return (
        fb.name?.toLowerCase().includes(searchLower) ||
        fb.email?.toLowerCase().includes(searchLower) ||
        fb.message?.toLowerCase().includes(searchLower)
      );
    })
    .sort((a, b) => {
      if (sortBy === "newest") {
        return new Date(b.createdAt) - new Date(a.createdAt);
      } else {
        return new Date(a.createdAt) - new Date(b.createdAt);
      }
    });

  if (loading)
    return (
      <div className="flex justify-center items-center min-h-screen ">
        <LoadingSpinner />
      </div>
    );

  if (error)
    return (
      <div className="max-w-md mx-auto p-6 bg-red-900 text-red-100 rounded-lg shadow">
        <div className="flex items-center">
          <svg
            className="w-6 h-6 text-red-400 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <p className="font-medium">{error}</p>
        </div>
        <button
          onClick={() => window.location.reload()}
          className="mt-4 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
        >
          Retry
        </button>
      </div>
    );

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 bg-black min-h-screen">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-extrabold text-[#E93535] mb-4 tracking-tight">
          User Feedback
        </h1>
        <p className="text-lg text-gray-400 max-w-2xl mx-auto">
          Valuable insights from our users to help us improve
        </p>
      </div>

      <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
        <div className="relative w-full sm:w-64">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg className="w-5 h-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
            </svg>
          </div>
          <input
            type="text"
            placeholder="Search feedback..."
            className="block w-full pl-10 pr-3 py-2 border border-gray-700 rounded-lg bg-gray-800 text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-[#E93535] focus:border-transparent transition"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-400">Sort by:</span>
          <select
            className="border cursor-pointer border-gray-700 bg-gray-800 text-white rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#E93535] focus:border-transparent transition"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="newest">Newest First</option>
            <option value="oldest">Oldest First</option>
          </select>
        </div>
      </div>

      {filteredFeedbacks.length === 0 ? (
        <div className="text-center py-16 bg-gray-800 rounded-xl shadow-sm border border-[#E53935]/30">
          <svg className="mx-auto h-12 w-12 text-[#E53935]/80" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <h3 className="mt-2 text-lg font-medium text-white">
            No feedback found
          </h3>
          <p className="mt-1 text-gray-500">
            {searchTerm ? "Try a different search term" : "No feedback has been submitted yet"}
          </p>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2">
          {filteredFeedbacks.map(({ _id, name, email, message, createdAt }) => (
            <div
              key={_id}
              className="bg-gray-800 rounded-xl shadow-md hover:shadow-lg border border-[#E53935]/30 transition-shadow duration-300 overflow-hidden"
            >
              <div className="p-6">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <div
                      className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-lg select-none"
                      style={{ backgroundColor: getRandomColor() }}
                    >
                      {getInitials(name)}
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-lg font-semibold text-white truncate">
                      {name || "Anonymous"}
                    </p>
                    <p className="text-sm text-gray-400 truncate">
                      {email || "No email provided"}
                    </p>
                  </div>
                  <div className="flex-shrink-0">
                    <button
                      onClick={() => handleDelete(_id)}
                      disabled={deletingId === _id}
                      className="text-gray-500 hover:text-red-500 transition-colors disabled:opacity-50 cursor-pointer"
                      title="Delete Feedback"
                    >
                      {deletingId === _id ? (
                        <svg className="h-5 w-5 animate-spin" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                      ) : (
                        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      )}
                    </button>
                  </div>
                </div>

                <div className="mt-4">
                  <p className="text-gray-300 whitespace-pre-wrap">
                    {message || (
                      <span className="text-gray-500 italic">No message provided.</span>
                    )}
                  </p>
                </div>

                <div className="mt-4 pt-4 border-t border-gray-700 flex justify-between items-center">
                  <span className="text-xs text-gray-500">
                    {new Date(createdAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-700 text-gray-300">
                    {email ? "Verified" : "Anonymous"}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const getInitials = (name) => {
  if (!name) return "?";
  const parts = name.trim().split(" ");
  if (parts.length === 1) return parts[0][0].toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
};

export default Feedback;
