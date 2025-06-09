import { CardProps } from "@/app/interface/card";
import React from "react";
import FeatureCard from "./card";

export const Team = ({ id }: CardProps) => {
  return (
    <FeatureCard id={id} gradient="from-[#fef5ff] to-[#ffade1]">
      <span />
    </FeatureCard>
  );
};
