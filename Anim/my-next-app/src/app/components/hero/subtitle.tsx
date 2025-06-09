import classNames from "classnames";
import React from "react";

interface Props {
  className?: string;
  children: React.ReactNode;
}

const Subtitle = ({ className, children }: Props) => {
  return (
    <p
      className={classNames(
        "mb-12 text-lg text-primary-text md:text-xl",
        className
      )}
    >
      {children}
    </p>
  );
};

export default Subtitle;
