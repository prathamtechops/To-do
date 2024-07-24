import AddTaskDialog from "@/components/AddTask";
import CardComponent from "@/components/CardComponent";
import { Search } from "@/components/SearchInput";
import TaskFilterDropDown from "@/components/TaskFilterDropDown";
import { ITodo } from "@/database/task.model";
import { getAllTasks } from "@/lib/actions/task.acion";
import { getUserByClerkId } from "@/lib/actions/user.action";
import { SignedIn, UserButton } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function Home({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) {
  const { userId } = auth();

  if (!userId) {
    redirect("/sign-in");
  }

  const user = await getUserByClerkId({ clerkId: userId });

  console.log(user);

  const tasks = await getAllTasks({
    userId: user?._id,
    status: searchParams.filter ? searchParams.filter : "",
    query: searchParams.q ? searchParams.q : "",
  });

  console.log(tasks);

  return (
    <div className=" flex size-full flex-col  gap-6 p-12">
      <SignedIn>
        <UserButton
          appearance={{
            elements: {
              avatarBox: "h-10 w-10",
            },
          }}
        />
      </SignedIn>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">To-Do List</h1>
        <div className="flex gap-2">
          <Search />
          <TaskFilterDropDown />
          <AddTaskDialog userId={user?._id} />
        </div>
      </div>
      <div className="flex flex-col gap-4">
        {tasks.length === 0 && <p className="text-center">No tasks found</p>}

        {tasks.length > 0 &&
          tasks.map((task: ITodo) => (
            <CardComponent key={task.id} task={task} userId={user?._id} />
          ))}
      </div>
    </div>
  );
}
