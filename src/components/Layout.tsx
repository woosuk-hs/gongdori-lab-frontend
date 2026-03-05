import { Outlet } from "react-router-dom";
import Footer from "@components/Footer";
import Navbar from "@components/Navbar.tsx";
import "@styles/layout.css"

function Layout() {
  return (
    <div className="layout">
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
}

export default Layout;