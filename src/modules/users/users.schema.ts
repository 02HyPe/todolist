import z from "zod";

const createUserBodySchema = z.object({
  userName: z.string(),
  email: z.string().email(),
  password: z.string().min(6),
});

export type CreateUserBodyType = z.infer<typeof createUserBodySchema>;

const loginUserBodySchema = z.object({
  userName: z.string(),
  password: z.string(),
});

export type LoginUserBodyType = z.infer<typeof loginUserBodySchema>;
