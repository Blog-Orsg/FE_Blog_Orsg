import React from "react";
import HeroTitle from "./title";
import HeroImage from "./image";
import Hero from "./hero";
import Subtitle from "./subtitle";

const HomepageHero = () => {
  return (
    <Hero>
      <HeroTitle className="translate-y-[-1rem] animate-fade-in opacity-0 [--animation-delay:200ms]">
        Welcome to my Portfolio
      </HeroTitle>
      <Subtitle className="translate-y-[-1rem] animate-fade-in opacity-0 [--animation-delay:400ms]">
        Explore my projects and skills in web development
      </Subtitle>
      <HeroImage />
    </Hero>
  );
};

export default HomepageHero;
