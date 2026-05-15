import { z } from "zod";

export const loginSchema = z.object({
    email: z.string().email("Please enter a valid email"),
    password: z.string().min(8, "Password must be at least 8 characters")
})

export type LoginSchemaType = z.infer<typeof loginSchema>

export const registerSchema = z.object({
    email: z.string().email("Please enter a valid email"),
    password: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string().min(8, "Confirm Password must be at least 8 characters"),
    name: z.string().min(2, "Name must be at least 2 characters")
})
export type RegisterSchemaType = z.infer<typeof registerSchema>;