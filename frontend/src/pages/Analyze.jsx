import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import AnimatedLogo from "../components/AnimatedLogo";
import { ArrowLeft } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";

export default function Analyze() {
  const { t } = useTranslation("analyze"); // Use analyze namespace

  const [npk, setNpk] = useState({ N: 0, P: 0, K: 0 });
  const [temp, setTemp] = useState(0);
  const [moisture, setMoisture] = useState(0);
  const [humidity, setHumidity] = useState(0);
  const [predictedFertilizer, setPredictedFertilizer] = useState(null);

  const [soilType, setSoilType] = useState("Loamy");
  const [cropType, setCropType] = useState("Wheat");
  const [history, setHistory] = useState(() => {
    try {
      const raw = localStorage.getItem("sf_history");
      return raw ? JSON.parse(raw) : [];
    } catch (e) {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem("sf_history", JSON.stringify(history));
  }, [history]);

  useEffect(() => {
    const fetchLiveData = () => {
      fetch("http://10.116.113.148:5000/live_data")
        .then((res) => {
          if (!res.ok) throw new Error("Failed to fetch live data");
          return res.json();
        })
        .then((data) => {
          setTemp(data.Temperature);
          setHumidity(data.Humidity);
          setMoisture(data.Moisture);
          setNpk({
            N: data.Nitrogen,
            P: data.Phosphorus,
            K: data.Potassium,
          });
        })
        .catch((err) => console.error("Error fetching live sensor data:", err));
    };

    fetchLiveData();
    const interval = setInterval(fetchLiveData, 3000);
    return () => clearInterval(interval);
  }, []);

  function handleSubmit(e) {
    e.preventDefault();
    const payload = { cropType, soilType };

    fetch("http://10.116.113.148:5000/predict", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Network response was not ok");
        return res.json();
      })
      .then((data) => {
        setTemp(data.Temperature);
        setHumidity(data.Humidity);
        setMoisture(data.Moisture);
        setNpk({
          N: data.Nitrogen,
          P: data.Phosphorus,
          K: data.Potassium,
        });
        setPredictedFertilizer(data.predicted_fertilizer);

        const record = {
          id: Date.now(),
          timestamp: new Date().toLocaleString(),
          cropType,
          soilType,
          npk: {
            N: data.Nitrogen,
            P: data.Phosphorus,
            K: data.Potassium,
          },
          temp: data.Temperature,
          moisture: data.Moisture,
          humidity: data.Humidity,
        };
        setHistory((h) => [record, ...h]);
      })
      .catch((err) => console.error("Error calling /predict:", err));
  }

  function handleClearHistory() {
    setHistory([]);
  }

  const CircularGauge = ({
    label,
    value = 0,
    max = 100,
    size = 120,
    colorClass = "text-teal-500",
  }) => {
    const strokeWidth = 10;
    const radius = (size - strokeWidth) / 2;
    const circumference = 2 * Math.PI * radius;
    const pct = max === 0 ? 0 : Math.max(0, Math.min(1, value / max));
    const dashOffset = circumference * (1 - pct);

    return (
      <div className="flex flex-col items-center gap-2">
        <svg
          width={size}
          height={size}
          viewBox={`0 0 ${size} ${size}`}
          className={colorClass}
          aria-label={label}
        >
          <g transform={`translate(${size / 2}, ${size / 2})`}>
            <circle
              r={radius}
              strokeWidth={strokeWidth}
              stroke="currentColor"
              className="text-gray-200"
              fill="transparent"
            />
            <circle
              r={radius}
              strokeWidth={strokeWidth}
              stroke="currentColor"
              className="transition-all duration-500"
              strokeDasharray={circumference}
              strokeDashoffset={dashOffset}
              strokeLinecap="round"
              fill="transparent"
              transform="rotate(-90)"
            />
            <text
              x={0}
              y={4}
              textAnchor="middle"
              fontSize={16}
              fill="#111827"
              className="font-medium"
            >
              {Math.round(value)}
            </text>
          </g>
        </svg>
        <div className="text-sm text-center text-gray-700">{label}</div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-6">
        <header className="flex items-center justify-between mb-8">
          <div>
            <Link
              to="/"
              className="inline-flex items-center gap-2 hover:bg-green-100 px-3 py-2 rounded-xl font-medium"
            >
              <ArrowLeft />
              <span className="hidden sm:inline">{t("header.title")}</span>
            </Link>
          </div>
          <div className="flex-1 flex flex-col items-center">
            <div className="w-30 h-30 flex items-center justify-center">
              <AnimatedLogo />
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-green-600">
              {t("header.title")}
            </h1>
            <p className="text-sm text-gray-500 mt-1">{t("header.subtitle")}</p>
          </div>
          <div className="w-24" />
        </header>

        <section className="bg-white border border-gray-300 rounded-lg p-6 shadow-sm mb-6">
          <div className="flex flex-col items-center">
            <div className="flex flex-wrap justify-center md:justify-between gap-8 w-full max-w-3xl mb-6">
              <CircularGauge
                label={t("gauges.temperature")}
                value={temp}
                max={100}
                size={150}
                colorClass="text-red-500"
              />
              <CircularGauge
                label={t("gauges.moisture")}
                value={moisture}
                max={100}
                size={150}
                colorClass="text-blue-500"
              />
              <CircularGauge
                label={t("gauges.humidity")}
                value={humidity}
                max={100}
                size={150}
                colorClass="text-blue-900"
              />
            </div>

            <AnimatePresence>
              {predictedFertilizer && (
                <motion.div
                  key="fertilizer-box"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ duration: 0.4 }}
                  className="mt-4 w-full max-w-2xl bg-green-100 border border-green-300 text-green-800 px-6 py-3 rounded-lg shadow-md text-center"
                >
                  <h2 className="text-lg font-semibold">
                    {t("predictedFertilizer")}
                    <span className="ml-2 text-green-700 font-bold">
                      {predictedFertilizer}
                    </span>
                  </h2>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="w-full max-w-3xl">
              <form onSubmit={handleSubmit} className="bg-white">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
                  <label className="text-sm text-gray-700 md:col-span-1 flex items-center">
                    {t("form.soilType")}
                  </label>
                  <select
                    value={soilType}
                    onChange={(e) => setSoilType(e.target.value)}
                    className="md:col-span-2 border rounded-md px-3 py-2 w-full"
                  >
                    {t("form.soilOptions", { returnObjects: true }).map(
                      (s, idx) => (
                        <option key={idx}>{s}</option>
                      )
                    )}
                  </select>

                  <label className="text-sm text-gray-700 md:col-span-1 flex items-center">
                    {t("form.crop")}
                  </label>
                  <select
                    value={cropType}
                    onChange={(e) => setCropType(e.target.value)}
                    className="md:col-span-2 border rounded-md px-3 py-2 w-full"
                  >
                    {t("form.cropOptions", { returnObjects: true }).map(
                      (c, idx) => (
                        <option key={idx}>{c}</option>
                      )
                    )}
                  </select>

                  <div className="md:col-span-3 flex gap-3 justify-start mt-2">
                    <button
                      type="submit"
                      className="px-4 py-2 bg-gray-900 text-white rounded-md hover:bg-gray-800"
                    >
                      {t("form.submit")}
                    </button>
                    <button
                      type="button"
                      onClick={handleClearHistory}
                      className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-400"
                    >
                      {t("form.clearHistory")}
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </section>

        <div className="flex flex-col md:flex-row gap-6">
          <aside className="w-full md:w-1/3 border border-gray-300 rounded-lg p-6 bg-white shadow-sm">
            <h3 className="text-lg font-medium mb-4 text-gray-800">
              {t("npk.title")}
            </h3>
            {["N", "P", "K"].map((key) => (
              <div key={key} className="mb-6">
                <div className="flex justify-between text-sm mb-2 text-gray-700">
                  <span className="font-medium">{t(`npk.${key}`)}</span>
                  <span>{npk[key]}</span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-2 overflow-hidden">
                  <div
                    className={`h-2 rounded-full ${
                      key === "N"
                        ? "bg-emerald-500"
                        : key === "P"
                        ? "bg-yellow-500"
                        : "bg-red-500"
                    }`}
                    style={{ width: `${Math.min(100, npk[key])}%` }}
                  />
                </div>
              </div>
            ))}
          </aside>

          <section className="flex-1 border border-gray-300 rounded-lg p-6 bg-white shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-lg font-medium text-gray-800">
                {t("history.title")}
              </h4>
              <div className="text-sm text-gray-500">
                {history.length} {t("history.records")}
              </div>
            </div>
            <div className="max-h-64 overflow-auto divide-y">
              {history.length === 0 && (
                <div className="text-gray-500">{t("history.noRecords")}</div>
              )}
              {history.map((rec) => (
                <div key={rec.id} className="py-3">
                  <div className="text-xs text-gray-600">{rec.timestamp}</div>
                  <div className="font-semibold text-gray-800">
                    {rec.cropType} — {rec.soilType}
                  </div>
                  <div className="text-sm text-gray-700 mt-1">
                    N:{rec.npk.N} P:{rec.npk.P} K:{rec.npk.K} • T:{rec.temp}°C •
                    M:{rec.moisture}% • H:{rec.humidity}%
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
