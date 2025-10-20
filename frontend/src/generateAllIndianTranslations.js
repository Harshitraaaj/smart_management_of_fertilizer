import fetch from "node-fetch";
import fs from "fs";
import path from "path";

// Original English texts
const texts = {
  home: "Home",
  about: "About",
  store: "Store",
  headline: "Smart Crop Management",
  subtitle:
    "Optimize your crop yield with data-driven insights and recommendations",
  cta: "Get Started",
};

// 22 Official Indian languages with LibreTranslate codes
const languages = {
  hi: "Hindi",
  bn: "Bengali",
  te: "Telugu",
  mr: "Marathi",
  ta: "Tamil",
  ur: "Urdu",
  gu: "Gujarati",
  kn: "Kannada",
  or: "Odia",
  pa: "Punjabi",
  as: "Assamese",
  ma: "Maithili",
  sat: "Santali",
  ks: "Kashmiri",
  kok: "Konkani",
  ne: "Nepali",
  sd: "Sindhi",
  doi: "Dogri",
  bo: "Bodo",
  sa: "Sanskrit",
  manip: "Manipuri",
};

// LibreTranslate API endpoint
const API_URL = "https://libretranslate.com/translate";

// Translate a single text
async function translateText(text, targetLang) {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      q: text,
      source: "en",
      target: targetLang,
      format: "text",
    }),
  });
  const data = await response.json();
  return data.translatedText;
}

// Main function
async function generate() {
  const translationsDir = path.join("./src/translations");
  if (!fs.existsSync(translationsDir)) {
    fs.mkdirSync(translationsDir);
  }

  for (const [langCode, langName] of Object.entries(languages)) {
    const result = {};
    for (const key in texts) {
      try {
        const translated = await translateText(texts[key], langCode);
        result[key] = translated;
      } catch (err) {
        console.error(`Error translating ${key} to ${langName}:`, err);
        result[key] = texts[key]; // fallback to English
      }
    }
    fs.writeFileSync(
      `${translationsDir}/${langCode}.json`,
      JSON.stringify(result, null, 2),
      "utf-8"
    );
    console.log(`Generated ${langCode}.json for ${langName}`);
  }
}

generate();
