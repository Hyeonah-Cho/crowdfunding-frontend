import { Outlet } from "react-router-dom";
import NavBar from "./NavBar.jsx";

function Layout() {
  return (
    <div>
      <NavBar />
      <Outlet />
      <footer>By Hyeonah Cho</footer>
    </div>
  );
}

export default Layout;
