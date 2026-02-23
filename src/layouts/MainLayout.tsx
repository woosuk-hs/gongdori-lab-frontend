import {Outlet} from "react-router-dom";
import Footer from "@components/Footer.tsx";

function MainLayout() {
  return (
    <>
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  )
}

export default MainLayout;