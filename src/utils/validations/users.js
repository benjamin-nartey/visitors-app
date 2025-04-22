import * as z from "zod";

export const UsersValidationSchema = z.object({
  name: z.string().min(1, { message: "name is required" }),
  email: z.string().min(1, { message: "email is required" }),
  password: z.string().min(1, { message: "password is required" }),
  role: z.string().min(1, { message: "role is required" }),
});
