import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
const CardComponent = ({ task }) => {
  return (
    <Card key={task.id}>
      <CardHeader>
        <CardTitle>{task.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p>{task.description}</p>
      </CardContent>
      <CardFooter className="flex items-center justify-between">
        <Select
          value={task.status}
          // onValueChange={(newStatus) => updateTaskStatus(task.id, newStatus)}
        >
          <SelectTrigger className="w-32">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="To Do">To Do</SelectItem>
            <SelectItem value="In Progress">In Progress</SelectItem>
            <SelectItem value="Done">Done</SelectItem>
          </SelectContent>
        </Select>
        <Badge
          variant={
            task.status === "To Do"
              ? "default"
              : task.status === "In Progress"
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
