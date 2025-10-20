import React from "react";
import { ShoppingCart } from "lucide-react";
import Navbar from "../components/NavBar/";
import { useTranslation } from "react-i18next";

export default function Store() {
  const { t } = useTranslation("store");

  const fertilizers = [
    "/vermicompost.png",
    "/DAP.png",
    "/NPK.png",
    "/UREA.png",
    "/potash.png",
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white text-gray-800">
      <Navbar />

      {/* Header Section */}
      <section className="text-center py-16">
        <h1 className="text-4xl md:text-5xl font-bold text-green-700 mb-4">
          {t("header.title")}
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          {t("header.subtitle")}
        </p>
      </section>

      {/* Store Grid */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 px-6 md:px-16 pb-20">
        {t("products", { returnObjects: true }).map((item, index) => (
          <div
            key={index}
            className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col"
          >
            <img
              src={fertilizers[index]}
              alt={item.name}
              className="h-56 w-full object-contain bg-gray-50 p-4"
            />
            <div className="p-5 flex flex-col justify-between flex-grow">
              <div>
                <h2 className="text-xl font-semibold text-green-700 mb-2">
                  {item.name}
                </h2>
                <p className="text-gray-600 text-sm mb-4">{item.desc}</p>
              </div>
              <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 bg-green-700 text-white py-2 rounded-lg hover:bg-green-800 transition"
              >
                <ShoppingCart size={18} />
                <span>{item.linkText}</span>
              </a>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}
