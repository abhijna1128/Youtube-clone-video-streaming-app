import { useState } from "react";
import { Routes, Route } from "react-router-dom";

// Pages
import Home from "./pages/Home";
import VideoDetails from "./pages/VideoDetails";
import SearchResults from "./pages/SearchResults";
import Layout from "./components/Layout";

export default function App() {
  // Sidebar collapsed state lives here
  const [collapsed, setCollapsed] = useState(true);

  return (
    <Routes>
      <Route
        path="/"
        element={
          <Layout collapsed={collapsed} setCollapsed={setCollapsed} />
        }
      >
        <Route index element={<Home />} />
        <Route path="video/:id" element={<VideoDetails />} />
        <Route path="search/:query" element={<SearchResults />} />
        <Route path="category/:name" element={<div>Category Page</div>} />
      </Route>
    </Routes>
  );
}
