import React, { useState, useContext } from "react";
// import AuthContext from "../path/to/AuthContext"; // Uncomment if using context

const RegisterPage = ({ isAuthenticated }) => {
    // If using context:
    // const { isAuthenticated } = useContext(AuthContext);

    if (!isAuthenticated) {
        return <div>Access denied. Please log in.</div>;
    }

    const [form, setForm] = useState({
        username: "",
        email: "",
        password: "",
    });
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
        setError("");
        setSuccess("");
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setSuccess("");
        try {
            const res = await fetch("/api/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(form),
            });
            const data = await res.json();
            if (!res.ok) {
                setError(data.error || "Registration failed");
            } else {
                setSuccess("Registration successful!");
                setForm({ username: "", email: "", password: "" });
            }
        } catch (err) {
            setError("Network error");
        }
    };

    return (
        <div style={{ maxWidth: 400, margin: "40px auto" }}>
            <h2>Sign Up</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Username</label>
                    <input
                        name="username"
                        type="text"
                        value={form.username}
                        onChange={handleChange}
                        required
                        minLength={3}
                        autoFocus
                    />
                </div>
                <div>
                    <label>Email</label>
                    <input
                        name="email"
                        type="email"
                        value={form.email}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Password</label>
                    <input
                        name="password"
                        type="password"
                        value={form.password}
                        onChange={handleChange}
                        required
                        minLength={6}
                    />
                </div>
                <button type="submit" style={{ marginTop: 16 }}>
                    Register
                </button>
                {error && <div style={{ color: "red", marginTop: 8 }}>{error}</div>}
                {success && <div style={{ color: "green", marginTop: 8 }}>{success}</div>}
            </form>
        </div>
    );
};

export default RegisterPage;