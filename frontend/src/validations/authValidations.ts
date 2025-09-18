import * as z from 'zod';

export const LoginSchema = z.object({
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password confirmation must be at least 6")
})

export type LoginSchemaType = z.infer<typeof LoginSchema>

export const RegisterSchema = z
    .object({
        name: z.string().min(2, "Name must be at least 2 characters"),
        username: z.string().min(2, "Username must be at least 2 characters"),
        email: z.string().email("Invalid email address"),
        password: z.string().min(1,"Password field is required"),
        password_confirmation: z.string().min(6, "Password confirmation must be at least 6 characters"),
    })
    .refine((data) => data.password === data.password_confirmation, {
        message: "Passwords do not match",
        path: ["password"],
    });

export type RegisterSchemaType = z.infer<typeof RegisterSchema>;
