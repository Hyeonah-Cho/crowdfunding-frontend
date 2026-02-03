import { Outlet } from "react-router-dom";
import NavBar from "./NavBar.jsx";
import "./Layout.css";

function Layout() {
  return (
    <div>
      <NavBar />
      <main id="app-container">
        <Outlet />
      </main>
      <footer>By Hyeonah Cho</footer>
    </div>
  );
}

export default Layout;
