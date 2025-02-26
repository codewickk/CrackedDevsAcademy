import React from "react";
import underConstructionVideo from "../assets/UnderConstruction.mp4";

export default function FeatureUnderConstruction() {
  return (
    <div className="w-full min-h-screen flex flex-col items-center justify-center bg-white dark:bg-neutral-900 text-center p-4">
      <h1 className="text-3xl md:text-5xl font-bold text-neutral-800 dark:text-neutral-200">
        🚧 This Feature is Under Construction 🚧
      </h1>
      <p className="text-neutral-600 text-lg mt-4 max-w-xl dark:text-neutral-300">
        We're working hard to bring this feature to you soon. Stay tuned for
        updates!
      </p>
      <div className="relative w-full flex justify-center items-center">
  <video 
    className="w-[80%] md:w-[60%] h-auto max-h-[500px] rounded-lg shadow-lg z-50"
    autoPlay 
    loop 
    muted
  >
    <source src={underConstructionVideo} type="video/mp4" />
    Your browser does not support the video tag.
  </video>
</div>

    </div>
  );
}
