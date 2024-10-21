import { useAuth } from "@/stores/auth.store";
import { redirect } from "@tanstack/react-router";

type Method = "GET" | "POST" | "PUT" | "DELETE";
const BASE_URL = "http://localhost:8000";

export async function http<T>(
  method: Method,
  path: string,
  req?: Omit<RequestInit, "method"> & {
    textResponse?: boolean;
    blobResponse?: boolean;
    reAuthed?: boolean;
  },
): Promise<T> {
  try {
    let tok = useAuth.getState().token;
    const resp = await fetch(`${BASE_URL}${path}`, {
      ...req,
      method: method,
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
    } else if (resp.status === 401) {
      if (req?.reAuthed) {
        throw 401;
      }

      if (useAuth.getState().token) {
        await useAuth.getState().refresh();
        return await http(method, path, {
          ...req,
          reAuthed: true,
        });
      }
    }

    let data = await resp.json();
    throw data.error ?? "An unknown error occurred, please try again later";
  } catch (error) {
    console.log(error);

    if (error === 401) {
      useAuth.getState().logout();
      throw redirect({
        to: "/login",
        replace: true,
      });
    }

    throw {
      error: "There was an error making the request",
    };
  }
}
