import z from "zod";

const createListBody = z.object({
  title: z.string(),
  description: z.string(),
  dueDate: z.date(),
  priority: z.string(),
});

export type CreateListType = z.infer<typeof createListBody>;

const paginateListBody = z.object({
  recordsPerPage: z.number(),
  pageNo: z.number(),
});

export type PaginateListType = z.infer<typeof paginateListBody>;

const updateTaskStatus = z.object({
  taskId: z.string(),
  status: z.string(),
});

export type UpdateTaskStatusType = z.infer<typeof updateTaskStatus>;
