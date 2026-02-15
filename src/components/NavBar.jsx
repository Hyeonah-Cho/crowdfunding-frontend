import { Link } from "react-router-dom";
import { useAuth } from "../hooks/use-auth.js";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Menu } from "lucide-react";

function NavBar() {
  const { auth, setAuth } = useAuth();

  const handleLogout = () => {
    window.localStorage.removeItem("token");
    setAuth({ token: null });
  };

  return (
    <header className="border-b bg-background/80 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
        <Link to="/" className="flex items-center gap-2">
          <img
            src="/brand-icon.png"
            alt="Soothingnest logo"
            className="h-7 w-7"
          />
          <span className="font-semibold tracking-tight">Soothingnest</span>
        </Link>

        {/* Desktop menu */}
        <nav className="hidden md:flex items-center gap-2">
          <Button variant="ghost" asChild>
            <Link to="/">Home</Link>
          </Button>
          <Button variant="ghost" asChild>
            <Link to="/fundraisers">Lives</Link>
          </Button>
          <Button variant="ghost" asChild>
            <Link to="/about">About</Link>
          </Button>
          <Button variant="ghost" asChild>
            <Link to="/contact">Contact</Link>
          </Button>

          <div className="ml-2">
            {auth.token ? (
              <Button variant="outline" asChild>
                <Link to="/" onClick={handleLogout}>
                  Sign out
                </Link>
              </Button>
            ) : (
              <Button asChild>
                <Link to="/login">Sign in</Link>
              </Button>
            )}
          </div>
        </nav>

        {/* Mobile hamburger */}
        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>

            <SheetContent side="right" className="w-30">
              <SheetHeader>
                <SheetTitle>Menu</SheetTitle>
              </SheetHeader>

              <div className="mt-6 flex flex-col items-center gap-3">
                <Link to="/" className="text-sm font-medium">
                  Home
                </Link>
                <Link to="/fundraisers" className="text-sm font-medium">
                  Lives
                </Link>
                <Link to="/about" className="text-sm font-medium">
                  About
                </Link>
                <Link to="/contact" className="text-sm font-medium">
                  Contact
                </Link>

                <div className="pt-2">
                  {auth.token ? (
                    <button
                      type="button"
                      onClick={handleLogout}
                      className="text-sm font-medium text-left"
                    >
                      Sign out
                    </button>
                  ) : (
                    <Link to="/login" className="text-sm font-medium">
                      Sign in
                    </Link>
                  )}
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}

export default NavBar;
