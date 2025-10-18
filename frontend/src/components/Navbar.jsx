import { Link } from "react-router-dom";
import { Home } from "lucide-react";

export default function Navbar() {
  return (
    <nav className="fixed top-5 left-1/4 -translate-x-1/2 z-50 flex items-center gap-8 text-green-900 px-10 py-3 rounded-2xl 
                    backdrop-blur-md bg-green-200/40 shadow-lg border border-green-300/30">
      {/* Home */}
      <Link
        to="/"
        className="flex items-center gap-2 hover:text-orange-700 transition"
      >
        <Home className="h-5 w-5" />
        <span className="font-semibold text-lg">Home</span>
      </Link>

      <Link
        to="/about"
        className="hover:text-orange-700 transition font-medium"
      >
        About
      </Link>

      <Link
        to="/store"
        className="hover:text-orange-700 transition font-medium"
      >
        Store
      </Link>
    </nav>
  );
}
