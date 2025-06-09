import React from "react";
import FeatureCard from "./card";
import { CardProps } from "@/app/interface/card";

export const Todo = ({ id }: CardProps) => {
  return (
    <FeatureCard id={id} gradient="from-[#f7f0ff] to-[#a78afe]">
      <span />
    </FeatureCard>
  );
};
