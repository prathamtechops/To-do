import User from "@/database/user.model";
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
    const user = await User.findOneAndDelete({ clerkId });
    return user;
  } catch (error) {
    throw new Error(error instanceof Error ? error.message : "Unknown error");
  }
}
