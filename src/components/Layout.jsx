import { Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import "./layout.css";

export default function Layout({ collapsed, setCollapsed }) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    // Handle body scroll when mobile menu is open
    if (isMobile && !collapsed) {
      document.body.classList.add('sidebar-open');
    } else {
      document.body.classList.remove('sidebar-open');
    }
    
    return () => {
      document.body.classList.remove('sidebar-open');
    };
  }, [isMobile, collapsed]);

  return (
    <div className="app-layout">
      {/* Navbar stays fixed at top */}
      <Navbar onToggleSidebar={() => setCollapsed((prev) => !prev)} />

      <div className="main-content">
        {/* Sidebar collapsible */}
        <Sidebar collapsed={collapsed} isMobile={isMobile} />
        
        {/* Overlay for mobile */}
        {isMobile && !collapsed && (
          <div 
            className="sidebar-overlay active" 
            onClick={() => setCollapsed(true)}
          />
        )}

        {/* Page content */}
        <div className={`page-content ${collapsed || isMobile ? "expanded" : ""}`}>
          <Outlet />
        </div>
      </div>
    </div>
  );
}
