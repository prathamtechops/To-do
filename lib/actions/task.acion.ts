"use server";

import Todo, { ITodo } from "@/database/task.model";
import User from "@/database/user.model";
import { FilterQuery, Schema } from "mongoose";
import { revalidatePath } from "next/cache";
import { connectToDatabase } from "../mongoose";

export interface AddTaskParams {
  title: string;
  description: string;
  userId: Schema.Types.ObjectId;
  path: string;
}

export async function addTask(params: AddTaskParams) {
  try {
    connectToDatabase();

    const { title, description, userId, path } = params;
    const task: ITodo | null = await Todo.create({
      title,
      description,
      status: "toDo",
      userId,
    });

    if (!task) throw new Error("Task not created");
    const user = await User.findByIdAndUpdate(
      userId,
      {
        $push: { toDos: task._id },
      },
      { new: true }
    );

    if (!user) throw new Error("User not found");

    revalidatePath(path);
    return {
      success: 200,
      message: "Task added",
    };
  } catch (error) {
    throw new Error(error instanceof Error ? error.message : "Unknown error");
  }
}

export interface UpdateTaskParams {
  title: string;
  description: string;
  status: "toDo" | "inProgress" | "done";
  userId: Schema.Types.ObjectId;
  path: string;
  taskId: Schema.Types.ObjectId;
}

export async function updateTask(params: UpdateTaskParams) {
  try {
    connectToDatabase();

    const { title, description, status, path, taskId, userId } = params;

    const doesUserHaveTask = await User.findOne({ _id: userId, toDos: taskId });
    if (!doesUserHaveTask) throw new Error("User does not have task");

    const task: ITodo | null = await Todo.findOneAndUpdate(
      { _id: taskId },
      {
        title,
        description,
        status,
      },
      { new: true }
    );

    if (!task) throw new Error("Task not found");

    revalidatePath(path);

    return {
      success: 200,
      message: "Task updated",
    };
  } catch (error) {
    throw new Error(error instanceof Error ? error.message : "Unknown error");
  }
}

export interface DeleteTaskParams {
  path: string;
  taskId: Schema.Types.ObjectId;
  userId: Schema.Types.ObjectId;
}

export async function deleteTask(params: DeleteTaskParams) {
  try {
    connectToDatabase();

    const { path, taskId, userId } = params;

    const doesUserHaveTask = await User.findOne({ _id: userId, toDos: taskId });
    if (!doesUserHaveTask) throw new Error("User does not have task");

    const task: ITodo | null = await Todo.findOneAndDelete({ _id: taskId });
    if (!task) throw new Error("Task not found");

    revalidatePath(path);

    return {
      success: 200,
      message: "Task deleted",
    };
  } catch (error) {
    throw new Error(error instanceof Error ? error.message : "Unknown error");
  }
}

export interface FilterTaskParams {
  status: string;
  userId: Schema.Types.ObjectId;
  query?: string;
}

export async function getAllTasks(params: FilterTaskParams) {
  try {
    connectToDatabase();

    const { status, userId, query } = params;

    const filter: FilterQuery<typeof Todo> = query
      ? {
          $or: [
            { title: { $regex: query, $options: "i" } },
            { description: { $regex: query, $options: "i" } },
          ],
        }
      : {};
    if (status !== "") filter.status = status;
    const tasks = await Todo.find({ ...filter, userId }).sort({
      createdAt: -1,
    });

    return JSON.parse(JSON.stringify(tasks)) as ITodo[];
  } catch (error) {
    throw new Error(error instanceof Error ? error.message : "Unknown error");
  }
}
