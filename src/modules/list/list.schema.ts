import z from "zod";

export const createListSchema = z.object({
  title: z.string(),
  description: z.string(),
  dueDate: z.date(),
  priority: z.string(),
});

export type CreateListType = z.infer<typeof createListSchema>;

export const paginateListSchema = z.object({
  recordsPerPage: z.number(),
  pageNo: z.number(),
});

export type PaginateListType = z.infer<typeof paginateListSchema>;

export const updateTaskStatusSchema = z.object({
  taskId: z.string(),
  status: z.string(),
});

export type UpdateTaskStatusType = z.infer<typeof updateTaskStatusSchema>;
