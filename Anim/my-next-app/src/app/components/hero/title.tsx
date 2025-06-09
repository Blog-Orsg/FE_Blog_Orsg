import classNames from "classnames";
import React from "react";

interface Props {
  children: React.ReactNode;
  className?: string;
}

const HeroTitle = ({ children, className }: Props) => {
  return (
    <h1
      className={classNames(
        "text-gradient my-6 text-6xl md:text-8xl",
        className
      )}
    >
      {children}
    </h1>
  );
};

export default HeroTitle;
