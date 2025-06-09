import React from "react";

interface Props {
  children: React.ReactNode;
}

const Hero = ({ children }: Props) => {
  return <div className="text-center">{children}</div>;
};

export default Hero;
