import { authClient } from "@/lib/auth-client";

const apiBaseUrl = process.env.NEXT_PUBLIC_API_URL;

function getApiUrl(path: string) {
  if (!apiBaseUrl) {
    throw new Error("NEXT_PUBLIC_API_URL must be configured");
  }
  if (!path.startsWith("/") || path.startsWith("//")) {
    throw new Error("API paths must be local absolute paths");
  }
  return new URL(path.slice(1), `${apiBaseUrl.replace(/\/+$/, "")}/`);
}

export async function publicApiFetch(path: string, init: RequestInit = {}) {
  return fetch(getApiUrl(path), {
    ...init,
    cache: "no-store",
    credentials: "include",
  });
}

export async function authenticatedApiFetch(
  path: string,
  init: RequestInit = {},
) {
  const { data, error } = await authClient.token();
  if (error || !data?.token) {
    throw new Error(error?.message ?? "A signed-in session is required");
  }

  const headers = new Headers(init.headers);
  headers.set("Authorization", `Bearer ${data.token}`);
  return fetch(getApiUrl(path), {
    ...init,
    headers,
    credentials: "include",
    cache: "no-store",
  });
}

export async function apiErrorMessage(response: Response) {
  try {
    const body: unknown = await response.json();
    if (
      typeof body === "object" &&
      body !== null &&
      "error" in body &&
      typeof body.error === "string"
    ) {
      return body.error;
    }
  } catch {
    // The response may be empty or non-JSON; use its HTTP status below.
  }
  return response.statusText || `Request failed (${response.status})`;
}

export async function apiJson<T>(response: Response): Promise<T> {
  if (!response.ok) {
    throw new Error(await apiErrorMessage(response));
  }
  return response.json() as Promise<T>;
}

export async function uploadBookImage(file: File) {
  const key = process.env.NEXT_PUBLIC_IMGBB_API_KEY;
  if (!key) {
    throw new Error(
      "NEXT_PUBLIC_IMGBB_API_KEY must be configured to upload covers",
    );
  }

  const body = new FormData();
  body.append("image", file);
  const response = await fetch(
    `https://api.imgbb.com/1/upload?key=${encodeURIComponent(key)}`,
    { method: "POST", body },
  );
  if (!response.ok) {
    throw new Error("Image upload failed. Please try another image.");
  }

  const result: unknown = await response.json();
  if (
    typeof result !== "object" ||
    result === null ||
    !("data" in result) ||
    typeof result.data !== "object" ||
    result.data === null ||
    !("url" in result.data) ||
    typeof result.data.url !== "string"
  ) {
    throw new Error("Image upload returned an invalid response.");
  }
  return result.data.url;
}
