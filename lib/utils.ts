import { type ClassValue, clsx } from "clsx";
import { ReadonlyURLSearchParams } from "next/navigation";
import queryString from "query-string";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const updateQueryParams = (
  route: string | null,
  value: string,
  key: string,
  searchParams: ReadonlyURLSearchParams
) => {
  const existingParams = Object.fromEntries(searchParams); // Convert searchParams to an object
  const updatedParams = {
    ...existingParams,
    [key]: value === "" ? undefined : value,
  };

  if (updatedParams.q) {
    delete updatedParams.global;
    delete updatedParams.type;
  }

  if (updatedParams.global) {
    delete updatedParams.q;
  }

  const queryStringified = queryString.stringify(updatedParams);

  // const url = `${route}?${queryStringified}`;

  const url = `${route || ""}?${queryStringified}`;

  return url;
};
