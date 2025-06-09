import React from "react";
import { ZapIllustration } from "./zap";
import Subtitle from "./hero/subtitle";

const Intro = () => {
  return (
    <div className="mx-auto flex  flex-row w-full items-center justify-between translate-y-[-1rem] animate-fade-in opacity-0 [--animation-delay:500ms]">
      <Subtitle>
        <br />
        <span className="text-primary">Portfolio</span> is a collection of
        <br />
        <span className="text-primary">projects</span> that showcase my skills
        <br />
        <span className="text-primary">experience</span> and
        <br />
        <span className="text-primary">achievements</span> in the field of
      </Subtitle>
      <ZapIllustration />
    </div>
  );
};

export default Intro;
