import React from "react";
import { ShoppingCart } from "lucide-react";
import Navbar from "../components/NavBar";

export default function Store() {
  const fertilizers = [
    {
      name: "Vermicompost Organic",
      desc: "Eco-friendly organic compost that enriches soil and improves aeration.",
      img: "/vermicompost.png",
      link: "https://amzn.in/d/de03dlt",
    },
    {
      name: "DAP (Diammonium Phosphate)",
      desc: "Rich source of nitrogen and phosphorus for healthy roots and flowering.",
      img: "/DAP.png",
      link: "https://amzn.in/d/43ct8lN",
    },
    {
      name: "NPK 19:19:19",
      desc: "Balanced nutrient mix ensuring overall plant growth and yield improvement.",
      img: "/NPK.png",
      link: "https://amzn.in/d/erTNAL9",
    },
    {
      name: "Urea Fertilizer",
      desc: "High nitrogen content for rapid plant growth and greener leaves.",
      img: "/UREA.png",
      link: "https://amzn.in/d/gLUL46x",
    },
    {
      name: "Potash (MOP)",
      desc: "Essential potassium fertilizer to improve fruit quality and disease resistance.",
      img: "/potash.png",
      link: "https://amzn.in/d/1f80PlB",
    },
     {
      name: "Potash (MOP)",
      desc: "Essential potassium fertilizer to improve fruit quality and disease resistance.",
      img: "/potash.png",
      link: "https://amzn.in/d/1f80PlB",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white text-gray-800">

        <Navbar />
        
      {/* Header Section */}
      <section className="text-center py-16">
        <h1 className="text-4xl md:text-5xl font-bold text-green-700 mb-4">
          Fertilizer Store
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Browse our curated selection of top fertilizers to enhance your crop yield and soil health.
        </p>
      </section>

      {/* Store Grid */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 px-6 md:px-16 pb-20">
        {fertilizers.map((item, index) => (
          <div
            key={index}
            className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col"
          >
            <img
              src={item.img}
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
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 bg-green-700 text-white py-2 rounded-lg hover:bg-green-800 transition"
              >
                <ShoppingCart size={18} />
                <span>Buy on Amazon</span>
              </a>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}
