import { useState } from "react";
import axiosInstance from "../utils/axiosInstance";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    email: "",
    password: ""
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await axiosInstance.post("/auth/login", form);

      localStorage.setItem("user", JSON.stringify(res.data));

      navigate("/dashboard");
    } catch (err) {
      console.error(err);
      setError(err?.response?.data?.message || "Login failed.");
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: "40px auto" }}>
      <h2>Login</h2>

      {error && (
        <p style={{ color: "red", marginBottom: 10 }}>{error}</p>
      )}

      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: 10 }}>
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            required
            style={{ width: "100%", padding: 8 }}
          />
        </div>

        <div style={{ marginBottom: 10 }}>
          <label>Password</label>
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            required
            style={{ width: "100%", padding: 8 }}
          />
        </div>

        <button
          type="submit"
          style={{
            padding: "10px 15px",
            width: "100%",
            cursor: "pointer"
          }}
        >
          Login
        </button>
      </form>
    </div>
  );
}
