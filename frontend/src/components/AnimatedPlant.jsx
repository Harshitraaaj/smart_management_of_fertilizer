import React from "react";
import Lottie from "lottie-react";
import plantAnimation from "../assets/plant.json"; 

export default function AnimatedPlant({ size = 120, loop = true }) {
  return (
    <div
      className="flex items-center justify-center"
      style={{ width: size, height: size }}
    >
      <Lottie
        animationData={plantAnimation}
        loop={loop}
        autoplay
        style={{ width: "100%", height: "100%" }}
      />
    </div>
  );
}
