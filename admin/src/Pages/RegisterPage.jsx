import React, { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const RegisterPage = () => {
    const [form, setForm] = useState({
        username: "",
        email: "",
        password: "",
    });

    const API = import.meta.env.VITE_API_URL;
    const navigate = useNavigate();

    const {
        mutate: registerMutation,
        isError,
        isLoading,
        error,
        isSuccess,
    } = useMutation({
        mutationFn: async ({ username, email, password }) => {
            try {
                const res = await axios.post(
                    `${API}/api/register`,
                    { username, email, password },
                    { withCredentials: true }
                );
                return res.data;
            } catch (error) {
                throw new Error(error.response?.data?.error || "Registration failed");
            }
        },
        onSuccess: () => {
            toast.success("Registration successful!");
            navigate("/login");
        },
        onError: (error) => {
            toast.error(error.message || "Registration failed. Please try again.");
        },
    });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        registerMutation(form);
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
                    Register
                </h2>
                <div>
                    <label className="block text-sm mb-1">Username</label>
                    <input
                        name="username"
                        type="text"
                        value={form.username}
                        onChange={handleChange}
                        required
                        minLength={3}
                        autoFocus
                        className="w-full px-4 py-2 bg-gray-700 rounded border border-gray-700 focus:outline-none focus:border-[#E93535]/50"
                    />
                </div>
                <div>
                    <label className="block text-sm mb-1">Email</label>
                    <input
                        name="email"
                        type="email"
                        value={form.email}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 bg-gray-700 rounded border border-gray-700 focus:outline-none focus:border-[#E93535]/50"
                    />
                </div>
                <div>
                    <label className="block text-sm mb-1">Password</label>
                    <input
                        name="password"
                        type="password"
                        value={form.password}
                        onChange={handleChange}
                        required
                        minLength={6}
                        className="w-full px-4 py-2 bg-gray-700 rounded border border-gray-700 focus:outline-none focus:border-[#E93535]/50"
                    />
                </div>
                <button
                    type="submit"
                    className="w-full bg-[#E93535] hover:bg-[#2196f3] py-2 rounded font-semibold"
                >
                    {isLoading ? "Registering..." : "Register"}
                </button>
                {isError && (
                    <div className="text-red-500 text-sm mt-2">
                        {error.message || "Registration failed. Please try again."}
                    </div>
                )}
                {isSuccess && (
                    <div className="text-green-500 text-sm mt-2">
                        Registration successful!
                    </div>
                )}
            </form>
        </div>
    );
};

export default RegisterPage;