"use server";

import User, { IUser } from "@/database/user.model";
import { CreateUserParams, GetUserByClerkId, UpdateUserParams } from "@/types";
import { revalidatePath } from "next/cache";
import { connectToDatabase } from "../mongoose";

export async function createUser(params: CreateUserParams) {
  try {
    connectToDatabase();
    const user = await User.create(params);

    if (!user) throw new Error("User not created");

    return user;
  } catch (error) {
    throw new Error(error instanceof Error ? error.message : "Unknown error");
  }
}

export async function updateUser(params: UpdateUserParams) {
  try {
    connectToDatabase();

    const { clerkId, updateData, path } = params;
    await User.findOneAndUpdate({ clerkId }, updateData);

    revalidatePath(path);
  } catch (error) {
    throw new Error(error instanceof Error ? error.message : "Unknown error");
  }
}

export async function deleteUser(params: GetUserByClerkId) {
  try {
    connectToDatabase();
    const { clerkId } = params;
    const user: IUser | null = await User.findOneAndDelete({ clerkId });
    if (!user) throw new Error("User not found");
    return user;
  } catch (error) {
    throw new Error(error instanceof Error ? error.message : "Unknown error");
  }
}

export async function getUserByClerkId(params: GetUserByClerkId) {
  try {
    await connectToDatabase();
    const { clerkId } = params;

    const user = await User.findOne({ clerkId });
    if (!user) throw new Error("User not found");
    return user;
  } catch (error) {
    console.log(error);
  }
}
