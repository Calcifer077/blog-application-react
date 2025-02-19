import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function AppLayout() {
  return (
    <>
      <Navbar />
      <div>
        {/* It is used in the componenet to render whatever is the current nested route. */}
        <Outlet />
      </div>
      <Footer />
    </>
  );
}

export default AppLayout;
