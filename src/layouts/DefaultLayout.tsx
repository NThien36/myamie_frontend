import { Outlet } from "react-router-dom";
import NavBar from "./components/NavBar/NavBar";
import Footer from "./components/Footer/Footer";

function DefaultLayout() {
  return (
    <div>
      <NavBar />
      <div className="container px-14 min-h-screen">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}

export default DefaultLayout;
