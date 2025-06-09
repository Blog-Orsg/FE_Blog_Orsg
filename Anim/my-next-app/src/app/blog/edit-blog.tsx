import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { Article } from "@/app/types/article";
import { useEditArticle } from "@/app/api/articles/use-edit-articles";
import { toast } from "sonner";
import { createArticle } from "@/app/action/create-article/schema";
import CustomDialog from "../components/custom-dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormField,
  FormItem,
  FormControl,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { z } from "zod";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  article: Article | null;
};

const EditArticleDialog = ({ isOpen, onClose, article }: Props) => {
  const { mutateAsync } = useEditArticle();
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

  useEffect(() => {
    if (article) {
      form.reset({
        a_name: article.a_name || "",
        a_slug: article.a_slug || "",
        a_description: article.a_description || "",
        a_content: article.a_content || "",
        a_avatar: article.a_avatar || "",
      });
    }
  }, [article, form]);

  const onSubmit = async (data: z.infer<typeof createArticle>) => {
    if (!article) return;
    try {
      await mutateAsync({ id: article.id!, updatedData: data });
      toast.success("Article updated successfully");
      onClose();
    } catch (error) {
      toast.error("Failed to update article. Please try again.");
    }
  };

  return (
    <CustomDialog
      isOpen={isOpen}
      onClose={onClose}
      title="Edit Article"
      description="Update the article details."
      btnContentIcon="Edit Article"
      btnSubmitContent="Save Changes"
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="grid gap-4">
            <FormField
              control={form.control}
              name="a_name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="a_slug"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Slug</FormLabel>
                  <FormControl>
                    <Input placeholder="Slug" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="a_description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Input placeholder="Description" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="a_content"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Content</FormLabel>
                  <FormControl>
                    <Input placeholder="Content" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="a_avatar"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Image</FormLabel>
                  <FormControl>
                    <Input placeholder="Image" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="bg-blue-500 text-white">
              Save Changes
            </Button>
          </div>
        </form>
      </Form>
    </CustomDialog>
  );
};

export default EditArticleDialog;
