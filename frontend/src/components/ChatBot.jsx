import React from "react";
import Lottie from "lottie-react";
import chatAnimation from "../assets/chatbot.json"; // adjust path if needed

export default function ChatBot({ size = 36, loop = true }) {
  return (
    <Lottie
      animationData={chatAnimation}
      loop={loop}
      autoplay
      style={{
        width: size,
        height: size,
        background: "transparent", // ensures no visible box
        pointerEvents: "none", // allows button clicks
      }}
    />
  );
}
