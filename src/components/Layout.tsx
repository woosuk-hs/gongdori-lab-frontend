import { Outlet } from "react-router-dom";
import Footer from "@components/Footer";
import Navbar from "@components/Navbar.tsx";

function Layout() {
  return (
    <div className="layout">
      <Navbar />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default Layout;