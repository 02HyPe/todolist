import { NextFunction, Request, Response } from "express";
import { asyncHandler } from "../../util/async_wrapper";
import {
  CreateListType,
  PaginateListType,
  UpdateTaskStatusType,
} from "./list.schema";
import {
  createList,
  deleteTaskById,
  getListByUserId,
  getTaskByTitle,
  updateTaskById,
} from "./list.service";
import { ErrorResponse } from "../../util/errorHandler";

export const createListHandler = asyncHandler(
  async (
    req: Request<{}, {}, CreateListType>,
    res: Response,
    next: NextFunction
  ) => {
    const { description, dueDate, priority, title } = req.body;
    const DueDate = new Date(dueDate);
    const { userId } = req;
    const exists = await getTaskByTitle(title);
    if (exists) {
      throw next(new ErrorResponse(409, "task already added"));
    }
    const list = await createList({
      userId: userId,
      title: title,
      description: description,
      dueDate: DueDate,
      priority: priority,
    });
    if (!list) {
      throw next(new ErrorResponse(500, "failed to create task"));
    }
    res.json(list);
  }
);

export const getTaskHandler = asyncHandler(
  async (
    req: Request<{}, {}, PaginateListType>,
    res: Response,
    next: NextFunction
  ) => {
    const { pageNo, recordsPerPage } = req.body;
    const { userId } = req;
    const list = await getListByUserId(recordsPerPage, pageNo, userId);
    if (!list[0]) {
      throw next(new ErrorResponse(404, "no task found"));
    }
    res.json(list);
  }
);

export const updateTaskHandler = asyncHandler(
  async (
    req: Request<{}, {}, UpdateTaskStatusType>,
    res: Response,
    next: NextFunction
  ) => {
    const { taskId, status } = req.body;
    const update = await updateTaskById(taskId, status);
    if (!update) {
      throw next(new ErrorResponse(500, "failed to update"));
    }
    res.json({ msg: "updated" });
  }
);

export const deleteTaskByIdHandler = asyncHandler(
  async (
    req: Request<{}, {}, { title: string }>,
    res: Response,
    next: NextFunction
  ) => {
    const { title } = req.body;
    const task = await deleteTaskById(title);
    if (!task) {
      throw next(new ErrorResponse(500, "failed to delete"));
    }
    res.json({ deleted: task });
  }
);
