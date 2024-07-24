import { Document, Schema, model, models } from "mongoose";

export interface IUser extends Document {
  _id: Schema.Types.ObjectId;
  username: string;
  email: string;
  avatar?: string;
  name: string;
  clerkId: string;
  toDos?: Schema.Types.ObjectId[];
}

export const UserSchema = new Schema<IUser>({
  username: { type: String, required: true },
  email: { type: String, required: true },
  avatar: { type: String },
  name: { type: String, required: true },
  clerkId: { type: String, required: true },
  toDos: [{ type: Schema.Types.ObjectId, ref: "ToDo" }],
});

const User = models.User || model<IUser>("User", UserSchema);

export default User;
