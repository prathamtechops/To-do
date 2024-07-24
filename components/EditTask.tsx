"use client";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Toaster } from "@/components/ui/sonner";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { ITodo } from "@/database/task.model";
import { deleteTask, updateTask } from "@/lib/actions/task.acion";
import { zodResolver } from "@hookform/resolvers/zod";
import { Schema } from "mongoose";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Textarea } from "./ui/textarea";

const formSchema = z.object({
  title: z.string().min(1, "Title is required").max(20, "Title is too long"),
  description: z
    .string()
    .min(1, "Description is required")
    .max(100, "Description is too long"),
  status: z.enum(["toDo", "inProgress", "done"]),
});

const EditTaskDialog = ({
  userId,
  task,
}: {
  userId: Schema.Types.ObjectId;
  task: ITodo;
}) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: task.title,
      description: task.description,
      status: task.status,
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const res = await updateTask({
        title: values.title,
        description: values.description,
        userId,
        path: "/",
        taskId: task._id,
        status: values.status,
      });
      if (res.success === 200) {
        toast(res.message);
      }
    } catch (err) {
      console.log(err);
      toast("Something went wrong");
    }
  }

  async function handleDelete() {
    try {
      const res = await deleteTask({
        userId,
        taskId: task._id,
        path: "/",
      });
      if (res.success === 200) {
        toast(res.message);
      }
    } catch (err) {
      console.log(err);
      toast("Something went wrong");
    }
  }

  return (
    <Dialog>
      <DialogTrigger>
        <Button>Edit Task</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <DialogHeader>
              <DialogTitle>Add a New Task</DialogTitle>
              <DialogDescription>
                Fill out the details for your new task.
              </DialogDescription>
            </DialogHeader>
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input placeholder="To Do.." {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Description..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Status</FormLabel>
                  <FormControl>
                    <Select onValueChange={field.onChange}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="toDO">To Do</SelectItem>
                        <SelectItem value="inProgress">In Progress</SelectItem>
                        <SelectItem value="done">Done</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            ></FormField>
            <DialogFooter>
              {
                <DialogClose asChild>
                  <Button variant="destructive" onClick={handleDelete}>
                    Delete
                  </Button>
                </DialogClose>
              }

              {form.formState.isValid && (
                <DialogClose>
                  <Button disabled={form.formState.isSubmitting} type="submit">
                    {form.formState.isSubmitting ? "Editing..." : "Edit Task"}
                  </Button>
                </DialogClose>
              )}
              {!form.formState.isValid && (
                <Button type="submit">Edit Task</Button>
              )}
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
      <Toaster />
    </Dialog>
  );
};

export default EditTaskDialog;
