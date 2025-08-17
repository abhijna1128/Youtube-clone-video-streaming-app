import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import "./navbar.css";

export default function Navbar({ onToggleSidebar }) {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (search.trim()) {
      navigate(`/search/${encodeURIComponent(search.trim())}`);
      setSearch("");
    }
  };

  return (
    <nav className="navbar navbar-dark bg-dark d-flex align-items-center px-3 sticky-top">
      {/* Sidebar toggle */}
      <button
        className="btn btn-dark me-2"
        onClick={onToggleSidebar}
        style={{ fontSize: "20px" }}
        title="Menu"
      >
        ☰
      </button>

      {/* YouTube Logo using Font Awesome */}
      <div
        style={{ display: "flex", alignItems: "center", cursor: "pointer" }}
        onClick={() => navigate("/")}
      >
        <i className="fab fa-youtube text-danger" style={{ fontSize: "36px" }}></i>
        <span
          style={{
            color: "white",
            fontWeight: "bold",
            fontSize: "20px",
            marginLeft: "5px",
          }}
        >
          YouTube
        </span>
      </div>

      {/* Search Bar */}
      <form
        className="d-flex mx-auto"
        onSubmit={handleSubmit}
        style={{ width: "50%" }}
      >
        <input
          className="form-control me-2 rounded-pill"
          type="search"
          placeholder="Search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button className="btn btn-outline-light rounded-pill px-3" type="submit">
          <i className="fas fa-search"></i>
        </button>
        <button
          className="btn btn-link ms-2"
          style={{ fontSize: "18px", color: "white" }}
          title="Search with your voice"
        >
          <i className="fas fa-microphone"></i>
        </button>
      </form>

      {/* Right side buttons */}
      <div className="d-flex align-items-center gap-3 ms-auto">
        <button
          className="btn btn-link"
          style={{ fontSize: "18px", color: "white" }}
          title="Create"
        >
          <i className="fas fa-video"></i>
        </button>
        <button
          className="btn btn-link"
          style={{ fontSize: "18px", color: "white" }}
          title="Notifications"
        >
          <i className="fas fa-bell"></i>
        </button>
        <button
          onClick={toggleTheme}
          className="btn btn-outline-light"
          title="Toggle theme"
        >
          {theme === "light" ? "🌙" : "☀️"}
        </button>
        <img
          src="https://picsum.photos/40"
          alt="A"
          className="rounded-circle"
          style={{ width: 40, height: 40, cursor: "pointer" }}
          title="Profile"
        />
      </div>
    </nav>
  );
}
