import { IUser } from "@/database/user.model";

export type CreateUserParams = {
  username: string;
  email: string;
  name: string;
  clerkId: string;
  avatar: string;
};

export interface GetUserByClerkId {
  clerkId: string | null;
}

export interface UpdateUserParams {
  clerkId: string;
  updateData: Partial<IUser>;
  path: string;
}
