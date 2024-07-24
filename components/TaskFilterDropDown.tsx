"use client";
import { updateQueryParams } from "@/lib/utils";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
const filters = [
  {
    name: "To Do",
    value: "toDo",
  },
  {
    name: "In Progress",
    value: "inProgress",
  },
  {
    name: "Done",
    value: "done",
  },
];

const TaskFilterDropDown = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const filter = searchParams.get("filter") || "";
  let url;
  const handleFilterQuery = (value: string) => {
    if (filter === value)
      url = updateQueryParams(pathname, "", "filter", searchParams);
    else url = updateQueryParams(pathname, value, "filter", searchParams);

    router.push(url, {
      scroll: false,
    });
  };

  return (
    <div className="flex items-center gap-2">
      <Select
        defaultValue={filter}
        onValueChange={(value) => {
          handleFilterQuery(value);
        }}
      >
        <SelectTrigger>
          <div className="line-clamp-1 flex-1 text-left">
            <SelectValue placeholder="Select a Filter" />
          </div>
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {filters.map((filter) => (
              <SelectItem key={filter.value} value={filter.value}>
                {filter.name}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
};

export default TaskFilterDropDown;
