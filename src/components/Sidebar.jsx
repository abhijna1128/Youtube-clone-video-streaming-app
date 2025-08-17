import { NavLink, useLocation } from "react-router-dom";
import {
  FaHome,
  FaFire,
  FaMusic,
  FaGamepad,
  FaMicrochip,
  FaNewspaper,
  FaFutbol,
  FaGraduationCap,
  FaLaugh,
  FaRocket
} from "react-icons/fa";
import "./sidebar.css";

const categories = [
  { name: "Home", path: "/", icon: <FaHome />, query: "" },
  { name: "Trending", path: "/", icon: <FaFire />, query: "trending" },
  { name: "Music", path: "/", icon: <FaMusic />, query: "music" },
  { name: "Gaming", path: "/", icon: <FaGamepad />, query: "gaming" },
  { name: "Technology", path: "/", icon: <FaMicrochip />, query: "technology" },
  { name: "News", path: "/", icon: <FaNewspaper />, query: "news" },
  { name: "Sports", path: "/", icon: <FaFutbol />, query: "sports" },
  { name: "Education", path: "/", icon: <FaGraduationCap />, query: "education" },
  { name: "Entertainment", path: "/", icon: <FaLaugh />, query: "entertainment" },
  { name: "Science", path: "/", icon: <FaRocket />, query: "science" },
];

export default function Sidebar({ collapsed, isMobile }) {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const activeCategory = params.get("cat") || "";

  return (
    <aside className={`sidebar ${collapsed ? "collapsed" : ""} ${isMobile && !collapsed ? "mobile-open" : ""}`}>
      <ul className="list-unstyled">
        {categories.map((c) => {
          // Determine if this category is active
          const isActive = (c.query === "" && activeCategory === "") || c.query === activeCategory;

          return (
            <li key={c.name}>
              <NavLink
                to={c.query ? `/?cat=${c.query}` : "/"}
                className={`sidebar-item ${isActive ? "active-link" : ""}`}
              >
                <span className="icon">{c.icon}</span>
                {(!collapsed || isMobile) && <span className="label">{c.name}</span>}
              </NavLink>
            </li>
          );
        })}
      </ul>
    </aside>
  );
}
