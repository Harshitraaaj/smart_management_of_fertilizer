import React from "react";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";


export default function Error() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-green-50 to-white text-gray-800 px-6">
      {/* Animated GIF */}
      <img
        src="https://cdn.dribbble.com/users/285475/screenshots/2083086/dribbble_1.gif"
        alt="404 Animation"
        className="w-72 md:w-96 mb-6"
      />

      {/* Text Section */}
      <h1 className="text-5xl font-extrabold text-green-700 mb-3">404</h1>
      <p className="text-lg text-gray-600 mb-6 text-center max-w-md">
        Oops! The page you’re looking for doesn’t exist or has been moved.
      </p>

      {/* Go Home Button */}
      <Link
        to="/"
        className="flex items-center gap-2 bg-green-700 text-white px-6 py-3 rounded-xl shadow hover:bg-green-800 transition"
      >
        <ArrowLeft size={20} />
        Go Back Home
      </Link>
    </div>
  );
}
