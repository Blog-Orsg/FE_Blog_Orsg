"use client";
import React, { useState, useTransition } from "react";
import { useCreateArticle } from "../api/articles/use-create-article";
import { Article } from "../types/article";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { createArticle } from "../action/create-article/schema";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import CustomDialog from "../components/custom-dialog";
import { toast } from "sonner";

const CreateArticle = () => {
  const generateArticle = useCreateArticle();
  const [isPending, startTransition] = useTransition();
  const [errorMessage, setErrorMessage] = useState("");
  const form = useForm<z.infer<typeof createArticle>>({
    resolver: zodResolver(createArticle),
    defaultValues: {
      a_name: "",
      a_slug: "",

      a_description: "",
      a_content: "",
      a_avatar: "",
    },
  });
  const [data, setData] = useState<Article>({
    a_name: "",
    a_slug: "",

    a_description: "",
    a_content: "",
    a_avatar: "",
  });

  const onSubmit = async (data: z.infer<typeof createArticle>) => {
    const newArticle: Article = {
      a_name: data.a_name,
      a_description: data.a_description,
      a_content: data.a_content,
      a_avatar: data.a_avatar,
      a_slug: data.a_slug,
    };

    try {
      await generateArticle.mutateAsync(newArticle);
      setData({
        a_name: "",
        a_description: "",
        a_content: "",
        a_avatar: "",
      });
      setErrorMessage("");
      toast.success("Article created successfully");
      startTransition(() => {
        generateArticle.reset();
      });
    } catch (error) {
      setErrorMessage("Failed to create article. Please try again.");
    }
  };

  if (generateArticle.isSuccess) {
    startTransition(() => {
      generateArticle.reset();
    });
  }

  return (
    <CustomDialog
      title={"Create New Blog"}
      description={
        "Create a new blog to share your thoughts and ideas with the world."
      }
      btnContentIcon="Create New Blog"
      btnSubmitContent="Create "
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="grid gap-4">
            <div className="grid grid-cols-1 items-center gap-4">
              <FormField
                control={form.control}
                name="a_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input
                        disabled={isPending}
                        placeholder="Name"
                        {...field}
                        type="text"
                        className="px-4 py-2 transition duration-300 border border-gray-300 rounded focus:border-transparent focus:outline-none focus:ring-4 focus:ring-blue-200"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="grid grid-cols-1 items-center gap-4">
              <FormField
                control={form.control}
                name="a_description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Input
                        disabled={isPending}
                        placeholder="Description"
                        {...field}
                        type="text"
                        className="px-4 py-2 transition duration-300 border border-gray-300 rounded focus:border-transparent focus:outline-none focus:ring-4 focus:ring-blue-200"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="grid grid-cols-1 items-center gap-4">
              <FormField
                control={form.control}
                name="a_content"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Content</FormLabel>
                    <FormControl>
                      <Input
                        disabled={isPending}
                        placeholder="Content"
                        {...field}
                        type="text"
                        className="px-4 py-2 transition duration-300 border border-gray-300 rounded focus:border-transparent focus:outline-none focus:ring-4 focus:ring-blue-200"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="grid grid-cols-1 items-center gap-4">
              <FormField
                control={form.control}
                name="a_avatar"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Image</FormLabel>
                    <FormControl>
                      <Input
                        disabled={isPending}
                        placeholder="Image"
                        {...field}
                        type="text"
                        className="px-4 py-2 transition duration-300 border border-gray-300 rounded focus:border-transparent focus:outline-none focus:ring-4 focus:ring-blue-200"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-1 items-center gap-4">
              <FormField
                control={form.control}
                name="a_slug"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Slug</FormLabel>
                    <FormControl>
                      <Input
                        disabled={isPending}
                        placeholder="Slug"
                        {...field}
                        type="text"
                        className="px-4 py-2 transition duration-300 border border-gray-300 rounded focus:border-transparent focus:outline-none focus:ring-4 focus:ring-blue-200"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="grid grid-cols-1 items-center gap-4">
              <Button
                type="submit"
                className="px-4 py-2 font-bold  bg-blue-500 rounded hover:bg-blue-700"
              >
                Create
              </Button>
            </div>
          </div>
        </form>
      </Form>
    </CustomDialog>
  );
};

export default CreateArticle;
