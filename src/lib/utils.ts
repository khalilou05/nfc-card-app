import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export async function fetchApi(
  endpoint: `/${string}`,
  config: RequestInit = {}
) {
  const resp = await fetch(
    `${
      process.env.NODE_ENV === "development"
        ? "http://localhost:8787"
        : "https://nfc-card-backend.khalilbenmeziane.workers.dev"
    }${endpoint}`,
    {
      ...config,
      credentials: "include",
    }
  );

  return resp;
}
