import { Toaster } from "@/components/ui/sonner";
import { Outlet } from "react-router-dom";
import NavBar from "./NavBar.jsx";

function Layout() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <NavBar />
      <main className="mx-auto w-full max-w-7xl px-4 py-6">
        <Outlet />
      </main>
      <footer className="mx-auto w-full max-w-8xl px-4 py-6 text-sm text-muted-foreground">
        By Hyeonah
      </footer>
      <Toaster />
    </div>
  );
}

export default Layout;
