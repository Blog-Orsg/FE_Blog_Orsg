import { z } from "zod";

export const SignUp = z.object({
  name: z
    .string({
      required_error: "Name is required!",
      invalid_type_error: "Name must be a string!",
    })
    .min(1, "Name is required!"),

  username: z
    .string({
      required_error: "Username is required!",
      invalid_type_error: "Username must be a string!",
    })
    .min(1, "Username is required!"),

  password: z
    .string({
      required_error: "Password is required!",
      invalid_type_error: "Password must be a string!",
    })
    .min(1, "Password is required!"),

  phone: z
    .string({
      required_error: "Phone is required!",
      invalid_type_error: "Phone must be a string!",
    })
    .min(1, "Phone is required!"),

  email: z
    .string({
      invalid_type_error: "Email must be a string!",
    })
    .email("Invalid email address")
    .optional(),

  address: z
    .string({
      required_error: "Address is required!",
      invalid_type_error: "Address must be a string!",
    })
    .min(1, "Address is required!"),

  avatar: z
    .string({
      required_error: "Avatar is required!",
      invalid_type_error: "Avatar must be a string!",
    })
    .min(1, "Avatar is required!"),
});
