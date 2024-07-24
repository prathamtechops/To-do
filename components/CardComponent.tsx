"use client";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { ITodo } from "@/database/task.model";
import { Schema } from "mongoose";
import EditTaskDialog from "./EditTask";
import { Badge } from "./ui/badge";
const CardComponent = ({
  task,
  userId,
}: {
  task: ITodo;
  userId: Schema.Types.ObjectId;
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{task.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p>{task.description}</p>
      </CardContent>
      <CardFooter className="flex items-center justify-between">
        <EditTaskDialog userId={userId} task={task} />
        <Badge
          variant={
            task.status === "toDo"
              ? "default"
              : task.status === "inProgress"
              ? "secondary"
              : "outline"
          }
        >
          {task.status}
        </Badge>
      </CardFooter>
    </Card>
  );
};

export default CardComponent;
