"use client";
import { useParams } from "next/navigation";
import React from "react";
import { useDetailArticle } from "../api/articles/use-detail-article";
import Container from "../components/container";
import Image from "next/image";

const DetailArticle = () => {
  const params = useParams();
  const blogIdString = params.blogId;
  const blogId = blogIdString ? Number(blogIdString) : null;

  const { data: article, isLoading, isError } = useDetailArticle(blogId);

  if (isLoading) {
    return (
      <Container className="flex justify-center items-center h-[20rem]">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-500"></div>
      </Container>
    );
  }

  if (isError) {
    return <div>Error loading article.</div>;
  }

  if (!article) {
    return <div>Article not found.</div>;
  }

  return (
    <div>
      <Container className="translate-y-[-1rem] animate-fade-in opacity-0 [--animation-delay:500ms] mt-[5.4rem] p-6 w-full mx-auto">
        <h1 className="text-3xl font-bold mb-4">{article.a_name}</h1>
        <Image
          width={200}
          height={200}
          src={
            article.a_avatar?.startsWith("/") ||
            article.a_avatar?.startsWith("http")
              ? article.a_avatar
              : "/images/hero.webp"
          }
          alt={article.a_name}
          className="w-full h-auto mb-4 rounded-lg"
        />
        <p className="text-gray-400 mb-6 text-md">{article.a_content}</p>
      </Container>
    </div>
  );
};

export default DetailArticle;
