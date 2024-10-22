import { http } from "@/services/http.service";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AuthStore {
  isAuthed: boolean;
  token: string;
  authenticate: (token: string) => Promise<void>;
  refresh: () => Promise<void>;
  logout: () => void;
}

export const useAuth = create(
  persist<AuthStore>(
    set => ({
      isAuthed: false,
      token: undefined!,
      authenticate: async (token: string) => {
        set({ isAuthed: true, token });
      },
      refresh: async () => {
        try {
          const resp = await http<{ access_token: string }>(
            "GET",
            "/api/auth/token",
          );

          set({ isAuthed: true, token: resp.access_token });
        } catch (e) {
          console.error(e);
        }
      },
      logout: async () => {
        await http("GET", "/api/auth/logout");
        set({ isAuthed: false, token: undefined });
      },
    }),
    {
      name: "auth-store",
    },
  ),
);
