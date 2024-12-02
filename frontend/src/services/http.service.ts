import SafeError from "@/lib/safe-error";
import { useAuth } from "@/stores/auth.store";

type Method = "GET" | "POST" | "PUT" | "DELETE";
export const BASE_URL =
  import.meta.env.VITE_API_URL || "http://localhost:8000/api";

export async function http<T>(
  method: Method,
  path: string,
  req?: Omit<RequestInit, "method"> & {
    textResponse?: boolean;
    blobResponse?: boolean;
    reAuthed?: boolean;
    omitAuth?: boolean;
  },
): Promise<T> {
  try {
    const tok = useAuth.getState().token;
    const resp = await fetch(`${BASE_URL}${path}`, {
      ...req,
      method: method,
      credentials: "include",
      headers: tok
        ? { ...(req?.headers || {}), Authorization: `Bearer ${tok}` }
        : req?.headers,
    });

    if (resp.status === 200) {
      if (req?.textResponse) {
        return (await resp.text()) as T;
      } else if (req?.blobResponse) {
        return (await resp.blob()) as T;
      } else {
        return await resp.json();
      }
    } else if (resp.status === 401 && !req?.omitAuth) {
      await useAuth.getState().refresh();
      const newTok = useAuth.getState().token;
      if (!newTok) {
        throw 401;
      }

      const resp = await fetch(`${BASE_URL}${path}`, {
        ...req,
        method,
        credentials: "include",
        headers: {
          ...(req?.headers || {}),
          Authorization: `Bearer ${newTok}`,
        },
      });

      if (resp.status === 200) {
        if (req?.textResponse) {
          return (await resp.text()) as T;
        } else if (req?.blobResponse) {
          return (await resp.blob()) as T;
        } else {
          return await resp.json();
        }
      } else {
        const data = await resp.json();
        throw data.error ?? "An unknown error occurred, please try again later";
      }
    }

    const data = await resp.json();
    throw data.error ?? "An unknown error occurred, please try again later";
  } catch (error) {
    if (typeof error === "number" && error === 401) {
      console.log("[http service] caught reattempted auth error, logging out");
      throw new SafeError("You are not authenticated, please login again");
    } else if (typeof error === "string") {
      console.log("[http service] caught supplied error:", error);
      throw new SafeError(error);
    } else {
      console.log("[http service] caught generic error");
      throw new SafeError("An unknown error occurred, please try again later");
    }
  }
}
