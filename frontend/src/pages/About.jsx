import React from "react";
import { useTranslation } from "react-i18next";
import { Users, Target, Lightbulb, Heart, Mail, Phone } from "lucide-react";
import heroImage from "../assets/hero-about.jpg";
import team1 from "../assets/team-1.jpg";
import team2 from "../assets/team-2.jpg";
import team3 from "../assets/team-3.jpg";
import team4 from "../assets/team-4.jpg";
import Navbar from "../components/Navbar/";
import i18n from "../i18n"; // make sure the path is correct


const About = () => {
  const { t } = useTranslation("about");

  // Simple Card component
  const Card = ({ children, className, style }) => (
    <div
      className={`rounded-2xl p-6 shadow-md bg-white ${className}`}
      style={style}
    >
      {children}
    </div>
  );

  // Simple Button component
  const Button = ({ children, className, onClick }) => (
    <button
      className={`bg-green-600 text-white font-bold py-4 px-8 rounded-xl shadow-lg hover:bg-green-700 hover:scale-105 transition-transform duration-300 ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );

  const values = [
    {
      key: "mission_driven",
      icon: Target,
    },
    {
      key: "innovation_first",
      icon: Lightbulb,
    },
    {
      key: "team_collaboration",
      icon: Users,
    },
    {
      key: "customer_focused",
      icon: Heart,
    },
  ];

  const team = [
    { name: "Harshit Raj", role: "harshit", image: team1 },
    { name: "Sachin Kumar", role: "sachin", image: team2 },
    { name: "Alok Kumar", role: "alok", image: team3 },
    { name: "Gaurav Tiwari", role: "gaurav", image: team4 },
  ];

  const stats = [
    { value: "500+", label: "customers" },
    { value: "98%", label: "satisfaction" },
    { value: "50+", label: "team" },
    { value: "24/7", label: "support" },
  ];

  return (
    <div className="min-h-screen">
      <Navbar />

      {/* Language Switcher */}
      <div className="flex justify-end gap-4 p-4">
        <button onClick={() => i18n.changeLanguage("en")}>English</button>
        <button onClick={() => i18n.changeLanguage("hi")}>हिंदी</button>
      </div>

      {/* Hero Section */}
      <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${heroImage})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-green-700/95 via-green-500/85 to-green-700/95 backdrop-blur-[2px]" />
        </div>
        <div className="relative z-10 text-center px-6 max-w-5xl mx-auto animate-fade-in py-20">
          <h1 className="text-6xl md:text-7xl font-bold text-green-50 mb-8 tracking-tight">
            {t("hero.title")}
          </h1>
          <p className="text-xl md:text-2xl text-green-50/95 leading-relaxed max-w-3xl mx-auto">
            {t("hero.description")}
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-24 px-6 bg-gradient-to-b from-background via-green-100/20 to-background">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-16 items-center animate-fade-in">
            <div className="space-y-6">
              <h2 className="text-5xl font-bold mb-8 bg-gradient-to-r from-green-600 to-green-400 bg-clip-text text-transparent">
                {t("mission.heading")}
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                {t("mission.para1")}
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                {t("mission.para2")}
              </p>
            </div>
            <div className="grid grid-cols-2 gap-6">
              {stats.map((stat, index) => (
                <Card
                  key={index}
                  className="text-center hover:shadow-2xl hover:scale-105 transition-all duration-300"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="text-5xl font-bold bg-gradient-to-br from-green-600 to-green-400 bg-clip-text text-transparent mb-3">
                    {stat.value}
                  </div>
                  <div className="text-sm font-medium text-muted-foreground">
                    {t(`mission.stats.${stat.label}`)}
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20 animate-fade-in">
            <h2 className="text-5xl font-bold mb-6 bg-gradient-to-r from-green-600 to-green-400 bg-clip-text text-transparent">
              {t("values.heading")}
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              {t("values.description")}
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <Card
                key={index}
                className="group hover:shadow-2xl hover:scale-105 transition-all duration-300"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-green-100/20 to-green-200/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <value.icon className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-xl font-bold mb-4">
                  {t(`values.list.${value.key}.title`)}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {t(`values.list.${value.key}.description`)}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-24 px-6 bg-gradient-to-b from-green-100/20 via-background to-green-100/20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20 animate-fade-in">
            <h2 className="text-5xl font-bold mb-6 bg-gradient-to-r from-green-600 to-green-400 bg-clip-text text-transparent">
              {t("team.heading")}
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              {t("team.description")}
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10">
            {team.map((member, index) => (
              <div
                key={index}
                className="group text-center animate-scale-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="relative mb-6 overflow-hidden rounded-2xl aspect-square shadow-lg group-hover:shadow-2xl transition-all duration-300">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-green-600/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
                <h3 className="text-xl font-bold mb-2">{member.name}</h3>
                <p className="text-muted-foreground font-medium">
                  {t(`team.members.${member.role}`)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-24 px-6 bg-gradient-to-br from-green-600 via-green-400 to-green-600 text-green-50 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-green-600/50 to-green-400/50 backdrop-blur-3xl" />
        <div className="max-w-5xl mx-auto text-center relative z-10 animate-fade-in">
          <h2 className="text-5xl md:text-6xl font-bold mb-6 tracking-tight">
            {t("contact.heading")}
          </h2>
          <p className="text-xl md:text-2xl mb-12 text-green-50/95 leading-relaxed max-w-3xl mx-auto">
            {t("contact.description")}
          </p>
          <div className="flex flex-col md:flex-row items-center justify-center gap-12 mb-12">
            <div className="flex items-center gap-4 bg-green-50/10 backdrop-blur-md rounded-2xl px-8 py-5 hover:bg-green-50/20 transition-all duration-300">
              <Mail className="h-7 w-7 text-green-50" />
              <span className="text-green-50 text-lg font-medium">
                {t("contact.email")}
              </span>
            </div>
            <div className="flex items-center gap-4 bg-green-50/10 backdrop-blur-md rounded-2xl px-8 py-5 hover:bg-green-50/20 transition-all duration-300">
              <Phone className="h-7 w-7 text-green-50" />
              <span className="text-green-50 text-lg font-medium">
                {t("contact.phone")}
              </span>
            </div>
          </div>
          <Button>{t("contact.button")}</Button>
        </div>
      </section>
    </div>
  );
};

export default About;
