import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export async function fetchApi(endpoint: `/${string}`, config: RequestInit) {
  const resp = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}${endpoint}`, {
    ...config,
    credentials: "include",
  });

  return resp;
}
