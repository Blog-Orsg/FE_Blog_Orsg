"use client";
import React from "react";
import HompageArdCard from "../components/arc-card/hompage-ard-card";
import CreateArticle from "./create-article";

const BlogPage = () => {
  return (
    <div className="mt-[5.4rem] flex flex-col container mx-auto">
      <CreateArticle />
      <HompageArdCard />
    </div>
  );
};

export default BlogPage;
