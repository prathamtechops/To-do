"use client";

import { Input } from "@/components/ui/input";
import { updateQueryParams } from "@/lib/utils";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { ChangeEvent, useMemo, useState } from "react";

// Debounce function
function debounce<T extends (...args: any[]) => void>(func: T, wait: number) {
  let timeout: ReturnType<typeof setTimeout>;
  return function (this: void, ...args: Parameters<T>) {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, args), wait);
  };
}

export function Search() {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const debouncedSearch = useMemo(
    () =>
      debounce((value: string) => {
        const url =
          value === ""
            ? updateQueryParams(pathname, "", "q", searchParams)
            : updateQueryParams(pathname, value, "q", searchParams);

        router.push(url);
      }, 500),
    [router, pathname, searchParams]
  );

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    debouncedSearch(e.target.value);
  };

  return (
    <Input
      value={search}
      onChange={handleSearch}
      className="w-80"
      placeholder="Search Task.."
      type="search"
    />
  );
}
