import { useTranslation } from "react-i18next";
import Navbar from "../components/Navbar";
import { ArrowRight } from "lucide-react";
import AnimatedPlant from "./AnimatedPlant";

export default function Home() {
  const { t } = useTranslation("hero"); // "hero" namespace

  const scrollToBottom = () => {
    window.scrollTo({
      top: document.body.scrollHeight,
      behavior: "smooth",
      block: "end",
    });
  };

  return (
    <header className="relative min-h-screen overflow-hidden">
      <Navbar />

      <img
        src="/hero-bg.jpg"
        alt="Field background"
        className="absolute inset-0 w-full h-full object-cover object-center"
        loading="eager"
        draggable="false"
      />

      <div
        aria-hidden="true"
        className="absolute inset-0 bg-green-700/60 backdrop-blur-sm"
      />

      <div className="relative z-10 flex min-h-screen items-center justify-center px-6">
        <div className="text-center max-w-4xl">
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center">
            <AnimatedPlant size={120} />
          </div>

          <h1 className="mb-4 text-white text-5xl sm:text-6xl md:text-7xl font-extrabold leading-tight drop-shadow-lg">
            {t("headline")}
          </h1>

          <p className="mx-auto mb-8 max-w-2xl text-white/90 text-lg sm:text-xl">
            {t("subtitle")}
          </p>

          <div className="flex justify-center">
            <button
              className="inline-flex items-center gap-3 rounded-2xl bg-orange-500 px-6 py-3 text-white text-lg font-medium shadow-lg hover:bg-orange-600 focus:outline-none focus:ring-4 focus:ring-orange-300 transition"
              onClick={scrollToBottom}
            >
              {t("cta")}
              <ArrowRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
