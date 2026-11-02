import { authClient } from "@/lib/auth-client";

const apiBaseUrl = process.env.NEXT_PUBLIC_API_URL;

export async function authenticatedApiFetch(
  path: string,
  init: RequestInit = {},
) {
  if (!apiBaseUrl) {
    throw new Error("NEXT_PUBLIC_API_URL must be configured");
  }
  if (!path.startsWith("/") || path.startsWith("//")) {
    throw new Error("API paths must be local absolute paths");
  }

  const { data, error } = await authClient.token();
  if (error || !data?.token) {
    throw new Error(error?.message ?? "A signed-in session is required");
  }

  const headers = new Headers(init.headers);
  headers.set("Authorization", `Bearer ${data.token}`);
  return fetch(new URL(path, apiBaseUrl), {
    ...init,
    headers,
    credentials: "include",
  });
}
