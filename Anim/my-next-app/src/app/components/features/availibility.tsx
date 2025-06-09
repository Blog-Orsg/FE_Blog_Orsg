import React from "react";
import FeatureCard from "./card";
import { CardProps } from "@/app/interface/card";

export const Availability = ({ id }: CardProps) => {
  return (
    <FeatureCard id={id} gradient="from-[#f5fff7] to-[#adf8ff]">
      <span />
    </FeatureCard>
  );
};
