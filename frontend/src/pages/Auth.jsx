import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signup, login } from "../services/api";

const Auth = () => {
  const navigate = useNavigate();
  const [mode, setMode] = useState("login"); // "login" | "signup"
  const [role, setRole] = useState("participant"); // participant | organizer
  const [form, setForm] = useState({ name: "", email: "", password: "", confirmPassword: "" });
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const validate = () => {
    const next = {};
    if (mode === "signup" && !form.name.trim()) next.name = "Name is required";
    if (!form.email.trim()) next.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) next.email = "Enter a valid email";
    if (!form.password.trim()) next.password = "Password is required";
    else if (form.password.length < 6) next.password = "Minimum 6 characters";
    if (mode === "signup" && form.password !== form.confirmPassword) next.confirmPassword = "Passwords do not match";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setSubmitting(true);

    try {
      let response;
      if (mode === "signup") {
        response = await signup({
          name: form.name,
          email: form.email,
          password: form.password,
          role: role
        });
      } else {
        response = await login({
          email: form.email,
          password: form.password,
          role: role
        });
      }

      // Save token to localStorage
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.user));

      // Redirect based on role
      if (role === "participant") {
        navigate("/home");
      } else {
        navigate("/dashboard");
      }
    } catch (error) {
      console.error("Auth error:", error);
      if (error.response?.data?.message) {
        alert(error.response.data.message);
      } else {
        alert("Something went wrong. Please try again.");
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 px-6 py-6 text-white">
          <h1 className="text-2xl font-bold">
            {mode === "login" ? "Welcome back" : "Create an account"}
          </h1>
          <p className="text-white/90 text-sm mt-1">
            {role === "participant" && "Register for events and access your tickets."}
            {role === "organizer" && "Manage event registrations and view participants."}
          </p>
        </div>

        <div className="px-6 pt-5">
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">{mode === "signup" ? "Sign up as" : "Sign in as"}</label>
            <select
              className="w-full border rounded px-2 py-2"
              value={role}
              onChange={(e) => setRole(e.target.value)}
            >
              <option value="participant">Participant</option>
              <option value="organizer">Organizer</option>
              {mode === "login" && <option value="admin">Admin</option>}
            </select>
          </div>

          <form onSubmit={handleSubmit} className="space-y-3">
          {mode === "signup" && (
            <input
              name="name"
              type="text"
              placeholder="Full Name"
              className="w-full p-2 border rounded"
              value={form.name}
              onChange={handleChange}
            />
          )}
          {errors.name && <p className="text-sm text-red-600">{errors.name}</p>}
          <input
            name="email"
            type="email"
            placeholder="Email"
            className="w-full p-2 border rounded"
            value={form.email}
            onChange={handleChange}
          />
          {errors.email && <p className="text-sm text-red-600">{errors.email}</p>}
          <input
            name="password"
            type="password"
            placeholder="Password"
            className="w-full p-2 border rounded"
            value={form.password}
            onChange={handleChange}
          />
          {errors.password && <p className="text-sm text-red-600">{errors.password}</p>}
          {mode === "signup" && (
            <input
              name="confirmPassword"
              type="password"
              placeholder="Confirm Password"
              className="w-full p-2 border rounded"
              value={form.confirmPassword}
              onChange={handleChange}
            />
          )}
          {errors.confirmPassword && (
            <p className="text-sm text-red-600">{errors.confirmPassword}</p>
          )}

          <button
            type="submit"
            disabled={submitting}
            className={`w-full bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 ${submitting ? "opacity-60 cursor-not-allowed" : ""}`}
          >
            {submitting ? "Please wait..." : mode === "login" ? "Login" : "Sign up"}
          </button>
          </form>

          <div className="mt-4 text-center text-sm text-gray-600 pb-6">
            {mode === "login" ? (
              <span>
                New here?{" "}
                <button
                  className="text-blue-600 hover:underline"
                  onClick={() => setMode("signup")}
                >
                  Create an account
                </button>
              </span>
            ) : (
              <span>
                Already have an account?{" "}
                <button
                  className="text-blue-600 hover:underline"
                  onClick={() => setMode("login")}
                >
                  Login
                </button>
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;


