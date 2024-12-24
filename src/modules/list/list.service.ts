import { ListModel } from "../../config/mongoose.models";

export const createList = async (data: {
  userId: string;
  title: string;
  description: string;
  dueDate: Date;
  priority: string;
}) => {
  const list = new ListModel({
    user: data.userId,
    title: data.title,
    description: data.description,
    priority: data.priority || null,
    dueDate: data.dueDate,
  });
  await list.save();
  return list;
};

export const getTaskByTitle = async (title: string) => {
  const task = await ListModel.findOne({ title: title });
  if (!task) {
    return false;
  }
  return task;
};

export const getListByUserId = async (
  recordsPerPage: number,
  pageNo: number,
  userId: string
) => {
  pageNo = pageNo ? pageNo - 1 : 0;
  recordsPerPage = recordsPerPage ? recordsPerPage : 0;

  const skipto = pageNo * recordsPerPage;

  const list = await ListModel.find({ user: userId })
    .skip(skipto)
    .limit(recordsPerPage);
  return list;
};

export const updateTaskById = async (taskId: string, status: string) => {
  const task = await ListModel.findOneAndUpdate(
    { _id: taskId },
    { status: status }
  );
  return task;
};

export const deleteTaskById = async (taskTitle: string) => {
  const taskId = await getTaskByTitle(taskTitle);
  if (!taskId) {
    return false;
  }
  const task = await ListModel.findOneAndDelete(taskId._id);
  return task;
};
