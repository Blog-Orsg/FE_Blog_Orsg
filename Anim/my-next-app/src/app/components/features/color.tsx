import { CardProps } from "@/app/interface/card";
import React from "react";
import FeatureCard from "./card";

const Color = ({ id }: CardProps) => {
  return (
    <FeatureCard id={id} gradient="from-[#f5fbff] to-[#addeff]">
      <span />
    </FeatureCard>
  );
};

export default Color;
