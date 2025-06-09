import { z } from "zod";

export const createArticle = z.object({
  a_name: z
    .string({
      required_error: "Name is required!",
      invalid_type_error: "Name is required!",
    })
    .min(3, {
      message: "Name is too short (must > 3 characters)!",
    }),
  a_description: z
    .string({
      required_error: "Description is required!",
      invalid_type_error: "Description is required!",
    })
    .min(3, {
      message: "Description is too short (must > 3 characters)!",
    }),
  a_content: z
    .string({
      required_error: "Content is required!",
      invalid_type_error: "Content is required!",
    })
    .min(3, {
      message: "Content is required!",
    }),
  a_avatar: z
    .string({
      required_error: "Avatar is required!",
      invalid_type_error: "Avatar is required!",
    })
    .min(3, {
      message: "Avatar is required!",
    }),
  a_slug: z.string({
    required_error: "Slug is required!",
    invalid_type_error: "Slug is required!",
  }),
});
