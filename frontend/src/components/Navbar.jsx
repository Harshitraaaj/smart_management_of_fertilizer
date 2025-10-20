import { Link } from "react-router-dom";
import { Home } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { useTranslation } from "react-i18next";

export default function Navbar() {
  const { i18n } = useTranslation(); // hook works because React 18 + I18nextProvider
  const [showLanguages, setShowLanguages] = useState(false);
  const languageRef = useRef(null);

  const handleLanguageClick = () => setShowLanguages((prev) => !prev);

  // Close dropdown if clicked outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (languageRef.current && !languageRef.current.contains(event.target)) {
        setShowLanguages(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const changeLanguage = (langCode) => {
    i18n.changeLanguage(langCode);
    setShowLanguages(false);
  };

  const languages = [
    { code: "en", label: "English" },
    { code: "hi", label: "Hindi" },
    { code: "bn", label: "Bengali" },
    { code: "ta", label: "Tamil" },
    { code: "te", label: "Telugu" },
    { code: "ml", label: "Malayalam" },
    { code: "gu", label: "Gujarati" },
    { code: "mr", label: "Marathi" },
    { code: "pa", label: "Punjabi" },
    { code: "ur", label: "Urdu" },
    { code: "kn", label: "Kannada" },
    { code: "or", label: "Odia" },
    { code: "as", label: "Assamese" },
    { code: "ma", label: "Manipuri" },
    { code: "sat", label: "Santali" },
    { code: "ks", label: "Kashmiri" },
    { code: "kok", label: "Konkani" },
    { code: "ne", label: "Nepali" },
    { code: "snd", label: "Sindhi" },
    { code: "dog", label: "Dogri" },
    { code: "mai", label: "Maithili" },
  ];

  return (
    <nav
      className="fixed top-5 left-1/4 -translate-x-1/2 z-50 flex items-center gap-8 text-green-900 px-10 py-3 rounded-2xl 
                 backdrop-blur-md bg-green-200/40 shadow-lg border border-green-300/30"
    >
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

      {/* Language Dropdown */}
      <div className="relative" ref={languageRef}>
        <button
          onClick={handleLanguageClick}
          className="hover:text-orange-700 transition font-medium"
        >
          Language
        </button>

        {showLanguages && (
          <div className="absolute left-0 mt-2 w-48 bg-white border border-green-300 rounded-md shadow-md max-h-72 overflow-auto">
            <ul className="py-1 text-sm">
              {languages.map((lang) => (
                <li
                  key={lang.code}
                  onClick={() => changeLanguage(lang.code)}
                  className="px-3 py-1 hover:bg-green-100 cursor-pointer"
                >
                  {lang.label}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </nav>
  );
}
