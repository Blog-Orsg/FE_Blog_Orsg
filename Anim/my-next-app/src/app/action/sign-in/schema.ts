import { z } from "zod";

export const SignIn = z.object({
  username: z.string({
    required_error: "usernmae is required!",
    invalid_type_error: "usernmae is required!",
  }),
  password: z.string({
    required_error: "Password is required!",
    invalid_type_error: "Password is required!",
  }),
});
