import { Document, Schema, model, models } from "mongoose";

export interface ITodo extends Document {
  _id: Schema.Types.ObjectId;
  title: string;
  description: string;
  status: "toDo" | "inProgress" | "done";
  userId: Schema.Types.ObjectId;
}

const TodoSchema: Schema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["toDo", "inProgress", "done"],
      required: true,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Todo = models.Todo || model<ITodo>("Todo", TodoSchema);
export default Todo;
