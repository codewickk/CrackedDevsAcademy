"use client";
import React from "react";
import { BackgroundBeams } from "../ui/background-beams";

export function BackgroundBeamsDemo() {
  return (
    <div className="h-[40rem] w-full rounded-md bg-neutral-950 relative flex flex-col items-center justify-center antialiased">
      <div className="max-w-2xl mx-auto p-4">
        <h1 className="relative z-10 text-lg md:text-7xl  bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-600  text-center font-sans font-bold">
          Welcome to CrackedDevs Academy
        </h1>
        <p></p>
        <p className="text-neutral-500 max-w-lg mx-auto my-2 text-sm text-center relative z-10">
          The ultimate destination for
          software developers striving to become 100x developers. At Cracked
          Devs Academy, we offer expert-driven resources, tutorials, and
          mentorship to help you unlock your full potential. Whether you’re
          mastering new programming languages, improving your problem-solving
          skills, or accelerating your career growth, we’ve got you covered.
          Join our community of ambitious developers and take your coding skills
          to the next level!
        </p>
       
      </div>
      <BackgroundBeams />
    </div>
  );
}
