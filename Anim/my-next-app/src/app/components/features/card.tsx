import { FeatureCardProps } from "@/app/interface/card";
import { useFeatureStore } from "@/app/store/store";
import classNames from "classnames";
import React from "react";


const FeatureCard = ({ gradient, children, id }: FeatureCardProps) => {
  const inViewFeature = useFeatureStore((state) => state.inViewFeature);
  const setFullscreenFeature = useFeatureStore(
    (state) => state.setFullscreenFeature
  );

  return (
    <div
      className={classNames(
        "absolute inset-0 h-full w-full rounded-2xl transition-opacity",
        inViewFeature === id
          ? "active-card opacity-100"
          : "pointer-events-none opacity-0"
      )}
    >
      <div
        className={classNames(
          "gradient absolute inset-0 origin-bottom-left rounded-2xl bg-gradient-to-br",
          gradient
        )}
      />
      {children}
      <button
        onClick={() => setFullscreenFeature(id)}
        className=""
      >
        Show me 
      </button>
      
    </div>
  );
};

export default FeatureCard;
