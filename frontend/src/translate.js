import fs from "fs";
import path from "path";
import fetch from "node-fetch";

// Languages you want to generate
const languages = [
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

// Recursive function to translate JSON
async function translateJSON(obj, targetLang) {
  if (typeof obj === "string") {
    const response = await fetch("https://libretranslate.com/translate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        q: obj,
        source: "en",
        target: targetLang,
      }),
    });
    const data = await response.json();
    return data.translatedText;
  } else if (typeof obj === "object" && obj !== null) {
    if (Object.keys(obj).length === 0) return {};
    const result = {};
    for (const key in obj) {
      result[key] = await translateJSON(obj[key], targetLang);
    }
    return result;
  } else {
    return obj;
  }
}

// Function to get all JSON files recursively in a folder
function getAllJSONFiles(dirPath, arrayOfFiles = []) {
  const files = fs.readdirSync(dirPath);
  files.forEach(function (file) {
    const fullPath = path.join(dirPath, file);
    if (fs.statSync(fullPath).isDirectory()) {
      getAllJSONFiles(fullPath, arrayOfFiles);
    } else if (file.endsWith(".json")) {
      arrayOfFiles.push(fullPath);
    }
  });
  return arrayOfFiles;
}

async function generateTranslations() {
  const enDir = "./locales/en";
  const jsonFiles = getAllJSONFiles(enDir);

  for (const lang of languages) {
    console.log(`\nTranslating to ${lang.label}...`);

    for (const filePath of jsonFiles) {
      const relativePath = path.relative(enDir, filePath);
      const outputDir = `./locales/${lang.code}/${path.dirname(relativePath)}`;

      if (!fs.existsSync(outputDir))
        fs.mkdirSync(outputDir, { recursive: true });

      const englishJSON = JSON.parse(fs.readFileSync(filePath, "utf-8"));
      const translated = await translateJSON(englishJSON, lang.code);

      const outputFile = path.join(outputDir, path.basename(filePath));
      fs.writeFileSync(outputFile, JSON.stringify(translated, null, 2));
      console.log(`Saved ${outputFile}`);
    }
  }

  console.log("\nAll translations completed!");
}

generateTranslations();
