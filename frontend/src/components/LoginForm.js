import React, { useState } from "react";
import axios from "axios";

export default function LoginForm({ switchToRegister }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("https://invento-management.onrender.com/api/login", {
        username,
        password,
      });
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("username", res.data.username);
      // alert("Login successful");
      window.location.href = "/dashboard";
    } catch (err) {
      alert(err.response?.data?.msg || "Login failed");
    }
  };

  return (
    <>
    
      <div className="form">
        <form onSubmit={handleLogin} className="space-y-4">
          <h2 className="text-xl font-semibold text-center">Login</h2>
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
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded"
          >
            Login
          </button>
        </form>
      </div>

      <div className="fottertype">
        Don't have an Account?{" "}
        <span
          onClick={switchToRegister}
          style={{
            textDecoration: "underline",
            color: "white",
            cursor: "pointer",
          }}
        >
          Register.
        </span>
      </div>
    </>
  );
}
