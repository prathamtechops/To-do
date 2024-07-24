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
import { addTask } from "@/lib/actions/task.acion";
import { zodResolver } from "@hookform/resolvers/zod";
import { Schema } from "mongoose";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { Textarea } from "./ui/textarea";

const formSchema = z.object({
  title: z.string().min(1, "Title is required").max(20, "Title is too long"),
  description: z
    .string()
    .min(1, "Description is required")
    .max(100, "Description is too long"),
});

const AddTaskDialog = ({ userId }: { userId: Schema.Types.ObjectId }) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const res = await addTask({
        title: values.title,
        description: values.description,
        userId,
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
        <Button>Add Task</Button>
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

            <DialogFooter>
              {form.formState.isValid && (
                <DialogClose>
                  <Button type="submit">
                    {form.formState.isSubmitting ? "Adding..." : "Add Task"}
                  </Button>
                </DialogClose>
              )}
              {!form.formState.isValid && (
                <Button type="submit">Add Task</Button>
              )}
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
      <Toaster />
    </Dialog>
  );
};

export default AddTaskDialog;
