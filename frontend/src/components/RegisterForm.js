import React, { useState } from "react";
import axios from "axios";
import "../index.css";

export default function RegisterForm({ switchToLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      await axios.post("http://localhost:5000/api/register", {
        username,
        password,
      });
      alert("Registration successful. Now login.");
      switchToLogin(); // Automatically switch to login after successful register
    } catch (err) {
      alert(err.response?.data?.msg || "Registration failed");
    }
  };

  return (
    <>
    <div style={{backgroundImage:`url("/photos/bg_reg.jpg")`}}> </div>
      <form onSubmit={handleRegister} className="space-y-4">
        <h2 className="text-xl font-semibold text-center">Register</h2>
        <input
          type="text"
          placeholder="Username"
          className="w-full px-3 py-2 border rounded"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <br />
        <input
          type="password"
          placeholder="Password"
          className="w-full px-3 py-2 border rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <br />
        <input
          type="password"
          placeholder="Confirm Password"
          className="w-full px-3 py-2 border rounded"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
        <br />
        <button
          type="submit"
          className="w-full bg-green-600 text-white py-2 rounded"
        >
          Register
        </button>
      </form>

      <div className="fottertype">
        Already have an Account?{" "}
        <span
          onClick={switchToLogin}
          style={{
            textDecoration: "underline",
            color: "white",
            cursor: "pointer",
          }}
        >
          Login.
        </span>
      </div>
    </>
  );
}
