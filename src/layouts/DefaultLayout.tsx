import { Outlet } from "react-router-dom";
import NavBar from "./components/NavBar/NavBar";
import Footer from "./components/Footer/Footer";
import { Toaster } from "react-hot-toast";

function DefaultLayout() {
  return (
    <div>
      <Toaster />
      <NavBar />
      <div className="container px-3 sm:px-14 min-h-screen">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}

export default DefaultLayout;
