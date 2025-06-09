"use client";
import React, { useState } from "react";
import ArcCard from "./arc-card";
import Container from "../container";
import { useGetArticles } from "@/app/api/articles/use-get-articles";
import { useDeleteArticle } from "@/app/api/articles/use-delete-articles";
import { Article } from "@/app/types/article";
import EditArticleDialog from "@/app/blog/edit-blog";

const HompageArdCard = () => {
  const { data: articles, isLoading, isError } = useGetArticles();
  const { mutate: deleteArticle } = useDeleteArticle();
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  const handleEdit = (article: Article) => {
    setSelectedArticle(article);
    setIsEditDialogOpen(true);
  };

  const handleDelete = (id: number) => {
    if (confirm("Are you sure you want to delete this article?")) {
      deleteArticle(id);
    }
  };

  if (isLoading) {
    return (
      <Container className="flex justify-center items-center h-[20rem]">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-500"></div>
      </Container>
    );
  }

  if (isError) {
    return (
      <Container className="flex justify-center items-center h-[20rem]">
        <p className="text-red-500">Failed to load articles.</p>
      </Container>
    );
  }

  return (
    <div>
      <Container className="translate-y-[-1rem] animate-fade-in opacity-0 [--animation-delay:500ms] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.isArray(articles) && articles.length > 0 ? (
          articles.map(
            (article) =>
              article.id !== undefined && (
                <ArcCard
                  key={article.id}
                  image={article.a_avatar || ""}
                  name={article.a_name || "Untitled"}
                  title={article.a_content || "No content available"}
                  onDelete={() => handleDelete(article.id!)}
                  onEdit={() => handleEdit(article)}
                  id={article.id}
                />
              )
          )
        ) : (
          <p className="text-gray-500">No articles available.</p>
        )}
        {isEditDialogOpen && selectedArticle && (
          <EditArticleDialog
            isOpen={isEditDialogOpen}
            onClose={() => setIsEditDialogOpen(false)}
            article={selectedArticle}
          />
        )}
      </Container>
    </div>
  );
};

export default HompageArdCard;
