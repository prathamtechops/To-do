import AddTaskDialog from "@/components/AddTask";
import { Search } from "@/components/SearchInput";
import TaskFilterDropDown from "@/components/TaskFilterDropDown";
import { getUserByClerkId } from "@/lib/actions/user.action";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function Home({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const { userId } = auth();

  if (!userId) {
    redirect("/sign-in");
  }

  const user = await getUserByClerkId({ clerkId: userId });

  console.log(user, "user");

  return (
    <div className=" flex size-full flex-col  gap-6 p-12">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">To-Do List</h1>
        <Search />
        <div className="flex gap-2">
          <TaskFilterDropDown />
          <AddTaskDialog />
        </div>
      </div>
      {/* <div className="flex flex-col gap-4">
        {task.length === 0 && <p className="text-center">No tasks found</p>}

        {task.length > 0 &&
          task.map((task) => <CardComponent key={task.id} task={task} />)}
      </div> */}
    </div>
  );
}
