import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const LoginPage = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const API = import.meta.env.VITE_API_URL;

  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const {
    mutate: loginMutation,
    isError,
    isLoading,
    error,
  } = useMutation({
    mutationFn: async ({ username, password }) => {
      try {
        const res = await axios.post(
          `${API}/api/admin/auth/login`,
          { username, password },
          { withCredentials: true }
        );

        return res.data;
      } catch (error) {
        throw new Error(error.response?.data?.error || "Something went wrong");
      }
    },
    onSuccess: (data) => {
      localStorage.setItem("token", data.token); // store JWT
      toast.success("Logged in Successfully");
      queryClient.invalidateQueries({ queryKey: ["user"] });
      navigate("/dashboard");
    },
    onError: (error) => {
      toast.error(error.message || "Login failed. Please try again.");
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    loginMutation(formData);
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen font-['Orbitron'] flex items-center justify-center bg-black text-white">
      <div>
        <img src="../nav-logo.png" alt="Bot Nexus Logo" width={425} />
      </div>
      <form
        onSubmit={handleSubmit}
        className="bg-[#1a1a2e]/50 border border-[#E53935]/30 rounded-2xl p-8 w-full max-w-md space-y-6 shadow-[0_0_30px_rgba(255,0,0,0.3)]"
      >
        <h2 className="text-3xl text-[#E93535] font-bold text-center">
          Admin Login
        </h2>
        <div>
          <label className="block text-sm mb-1">Username</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleInputChange}
            required
            className="w-full px-4 py-2 bg-gray-700 rounded border border-gray-700 focus:outline-none focus:border-[#E93535]/50"
          />
        </div>
        <div>
          <label className="block text-sm mb-1">Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            required
            className="w-full px-4 py-2 bg-gray-700 rounded border border-gray-700 focus:outline-none focus:border-[#E93535]/50"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-[#E93535] hover:bg-[#2196f3] py-2 rounded font-semibold"
        >
          {isLoading ? "Logging in..." : "Login"}
        </button>
        {isError && (
          <div className="text-red-500 text-sm mt-2">
            {error.message || "Login failed. Please try again."}
          </div>
        )}
      </form>
    </div>
  );
};

export default LoginPage;
