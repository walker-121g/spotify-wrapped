import { BASE_URL, http } from "@/services/http.service";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AuthStore {
  isAuthed: boolean;
  token: string;
  authenticate: (token: string) => Promise<void>;
  refresh: () => Promise<void>;
  logout: () => void;
  delete: () => void;
}

export const useAuth = create(
  persist<AuthStore>(
    (set, get) => ({
      isAuthed: false,
      token: undefined!,
      authenticate: async (token: string) => {
        set({ isAuthed: true, token });
      },
      refresh: async () => {
        console.log("[auth store refresh] old token", get().token);
        try {
          const resp = await fetch(`${BASE_URL}/auth/token`, {
            method: "GET",
            credentials: "include",
          });

          const info: { access_token: string; error?: string } =
            await resp.json();
          if (!resp.ok || !info.access_token || info.error) {
            throw (
              info.error ?? "Failed to authenticate, please try loggin in again"
            );
          }

          console.log("[auth store refresh] new token", info.access_token);
          set({ isAuthed: true, token: info.access_token });
        } catch (e) {
          console.log("[auth store refresh]", e);
          get().logout();
        }
      },
      logout: async () => {
        try {
          await http("GET", "/auth/logout", {
            omitAuth: true,
          });
        } catch (error) {
          console.log(error);
        }

        set({ ...get(), isAuthed: false, token: undefined });
      },
      delete: async () => {
        await http("POST", "/auth/delete");

        set({ ...get(), isAuthed: false, token: undefined });
      },
    }),
    {
      name: "auth-store",
    },
  ),
);
