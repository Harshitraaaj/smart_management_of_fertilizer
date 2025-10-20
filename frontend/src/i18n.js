import i18n from "i18next";
import { initReactI18next } from "react-i18next";

// English
import enAbout from "./locales/en/about.json";
import enHero from "./locales/en/home.json";
import enStore from "./locales/en/store.json";
import enBottom from "./locales/en/bottomSection.json";
import enAnalyze from "./locales/en/analyze.json";

// Hindi
import hiAbout from "./locales/hi/about.json";
import hiHero from "./locales/hi/home.json";
import hiStore from "./locales/hi/store.json";
import hiBottom from "./locales/hi/bottomSection.json";
import hiAnalyze from "./locales/hi/analyze.json";

// Bengali
import bnAbout from "./locales/bn/about.json";
import bnHero from "./locales/bn/home.json";
import bnStore from "./locales/bn/store.json";
import bnBottom from "./locales/bn/bottomSection.json";
import bnAnalyze from "./locales/bn/analyze.json";

// Tamil
import taAbout from "./locales/ta/about.json";
import taHero from "./locales/ta/home.json";
import taStore from "./locales/ta/store.json";
import taBottom from "./locales/ta/bottomSection.json";
import taAnalyze from "./locales/ta/analyze.json";

// Telugu
import teAbout from "./locales/te/about.json";
import teHero from "./locales/te/home.json";
import teStore from "./locales/te/store.json";
import teBottom from "./locales/te/bottomSection.json";
import teAnalyze from "./locales/te/analyze.json";

// Malayalam
import mlAbout from "./locales/ml/about.json";
import mlHero from "./locales/ml/home.json";
import mlStore from "./locales/ml/store.json";
import mlBottom from "./locales/ml/bottomSection.json";
import mlAnalyze from "./locales/ml/analyze.json";

// Gujarati
import guAbout from "./locales/gu/about.json";
import guHero from "./locales/gu/home.json";
import guStore from "./locales/gu/store.json";
import guBottom from "./locales/gu/bottomSection.json";
import guAnalyze from "./locales/gu/analyze.json";

// Marathi
import mrAbout from "./locales/mr/about.json";
import mrHero from "./locales/mr/home.json";
import mrStore from "./locales/mr/store.json";
import mrBottom from "./locales/mr/bottomSection.json";
import mrAnalyze from "./locales/mr/analyze.json";

// Punjabi
import paAbout from "./locales/pa/about.json";
import paHero from "./locales/pa/home.json";
import paStore from "./locales/pa/store.json";
import paBottom from "./locales/pa/bottomSection.json";
import paAnalyze from "./locales/pa/analyze.json";

// Urdu
import urAbout from "./locales/ur/about.json";
import urHero from "./locales/ur/home.json";
import urStore from "./locales/ur/store.json";
import urBottom from "./locales/ur/bottomSection.json";
import urAnalyze from "./locales/ur/analyze.json";

// Kannada
import knAbout from "./locales/kn/about.json";
import knHero from "./locales/kn/home.json";
import knStore from "./locales/kn/store.json";
import knBottom from "./locales/kn/bottomSection.json";
import knAnalyze from "./locales/kn/analyze.json";

// Odia
import orAbout from "./locales/or/about.json";
import orHero from "./locales/or/home.json";
import orStore from "./locales/or/store.json";
import orBottom from "./locales/or/bottomSection.json";
import orAnalyze from "./locales/or/analyze.json";

// Assamese
import asAbout from "./locales/as/about.json";
import asHero from "./locales/as/home.json";
import asStore from "./locales/as/store.json";
import asBottom from "./locales/as/bottomSection.json";
import asAnalyze from "./locales/as/analyze.json";

// Manipuri
import maAbout from "./locales/ma/about.json";
import maHero from "./locales/ma/home.json";
import maStore from "./locales/ma/store.json";
import maBottom from "./locales/ma/bottomSection.json";
import maAnalyze from "./locales/ma/analyze.json";

// Santali
import satAbout from "./locales/sat/about.json";
import satHero from "./locales/sat/home.json";
import satStore from "./locales/sat/store.json";
import satBottom from "./locales/sat/bottomSection.json";
import satAnalyze from "./locales/sat/analyze.json";

// Kashmiri
import ksAbout from "./locales/ks/about.json";
import ksHero from "./locales/ks/home.json";
import ksStore from "./locales/ks/store.json";
import ksBottom from "./locales/ks/bottomSection.json";
import ksAnalyze from "./locales/ks/analyze.json";

// Konkani
import kokAbout from "./locales/kok/about.json";
import kokHero from "./locales/kok/home.json";
import kokStore from "./locales/kok/store.json";
import kokBottom from "./locales/kok/bottomSection.json";
import kokAnalyze from "./locales/kok/analyze.json";

// Nepali
import neAbout from "./locales/ne/about.json";
import neHero from "./locales/ne/home.json";
import neStore from "./locales/ne/store.json";
import neBottom from "./locales/ne/bottomSection.json";
import neAnalyze from "./locales/ne/analyze.json";

// Sindhi
import sndAbout from "./locales/snd/about.json";
import sndHero from "./locales/snd/home.json";
import sndStore from "./locales/snd/store.json";
import sndBottom from "./locales/snd/bottomSection.json";
import sndAnalyze from "./locales/snd/analyze.json";

// Dogri
import dogAbout from "./locales/dog/about.json";
import dogHero from "./locales/dog/home.json";
import dogStore from "./locales/dog/store.json";
import dogBottom from "./locales/dog/bottomSection.json";
import dogAnalyze from "./locales/dog/analyze.json";

// Maithili
import maiAbout from "./locales/mai/about.json";
import maiHero from "./locales/mai/home.json";
import maiStore from "./locales/mai/store.json";
import maiBottom from "./locales/mai/bottomSection.json";
import maiAnalyze from "./locales/mai/analyze.json";

i18n.use(initReactI18next).init({
  resources: {
    en: {
      about: enAbout,
      hero: enHero,
      store: enStore,
      bottomSection: enBottom,
      analyze: enAnalyze,
    },
    hi: {
      about: hiAbout,
      hero: hiHero,
      store: hiStore,
      bottomSection: hiBottom,
      analyze: hiAnalyze,
    },
    bn: {
      about: bnAbout,
      hero: bnHero,
      store: bnStore,
      bottomSection: bnBottom,
      analyze: bnAnalyze,
    },
    ta: {
      about: taAbout,
      hero: taHero,
      store: taStore,
      bottomSection: taBottom,
      analyze: taAnalyze,
    },
    te: {
      about: teAbout,
      hero: teHero,
      store: teStore,
      bottomSection: teBottom,
      analyze: teAnalyze,
    },
    ml: {
      about: mlAbout,
      hero: mlHero,
      store: mlStore,
      bottomSection: mlBottom,
      analyze: mlAnalyze,
    },
    gu: {
      about: guAbout,
      hero: guHero,
      store: guStore,
      bottomSection: guBottom,
      analyze: guAnalyze,
    },
    mr: {
      about: mrAbout,
      hero: mrHero,
      store: mrStore,
      bottomSection: mrBottom,
      analyze: mrAnalyze,
    },
    pa: {
      about: paAbout,
      hero: paHero,
      store: paStore,
      bottomSection: paBottom,
      analyze: paAnalyze,
    },
    ur: {
      about: urAbout,
      hero: urHero,
      store: urStore,
      bottomSection: urBottom,
      analyze: urAnalyze,
    },
    kn: {
      about: knAbout,
      hero: knHero,
      store: knStore,
      bottomSection: knBottom,
      analyze: knAnalyze,
    },
    or: {
      about: orAbout,
      hero: orHero,
      store: orStore,
      bottomSection: orBottom,
      analyze: orAnalyze,
    },
    as: {
      about: asAbout,
      hero: asHero,
      store: asStore,
      bottomSection: asBottom,
      analyze: asAnalyze,
    },
    ma: {
      about: maAbout,
      hero: maHero,
      store: maStore,
      bottomSection: maBottom,
      analyze: maAnalyze,
    },
    sat: {
      about: satAbout,
      hero: satHero,
      store: satStore,
      bottomSection: satBottom,
      analyze: satAnalyze,
    },
    ks: {
      about: ksAbout,
      hero: ksHero,
      store: ksStore,
      bottomSection: ksBottom,
      analyze: ksAnalyze,
    },
    kok: {
      about: kokAbout,
      hero: kokHero,
      store: kokStore,
      bottomSection: kokBottom,
      analyze: kokAnalyze,
    },
    ne: {
      about: neAbout,
      hero: neHero,
      store: neStore,
      bottomSection: neBottom,
      analyze: neAnalyze,
    },
    snd: {
      about: sndAbout,
      hero: sndHero,
      store: sndStore,
      bottomSection: sndBottom,
      analyze: sndAnalyze,
    },
    dog: {
      about: dogAbout,
      hero: dogHero,
      store: dogStore,
      bottomSection: dogBottom,
      analyze: dogAnalyze,
    },
    mai: {
      about: maiAbout,
      hero: maiHero,
      store: maiStore,
      bottomSection: maiBottom,
      analyze: maiAnalyze,
    },
  },
  lng: "en",
  fallbackLng: "en",
  interpolation: { escapeValue: false },
  ns: ["about", "hero", "store", "bottomSection", "analyze"],
  defaultNS: "about",
});

export default i18n;
