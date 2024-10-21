import { http } from "@/services/http.service";
import { redirect } from "@tanstack/react-router";
import { create } from "zustand";

interface AuthStore {
  isAuthed: boolean;
  token: string;
  authenticate: (token: string) => Promise<void>;
  refresh: () => Promise<void>;
  logout: () => void;
}

export const useAuth = create<AuthStore>(set => ({
  isAuthed: false,
  token: undefined!,
  authenticate: async (token: string) => {
    set({ isAuthed: true, token: token });
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
      set({ isAuthed: false, token: undefined });
      throw redirect({
        to: "/login",
        replace: true,
      });
    }
  },
  logout: () => {
    set({ isAuthed: false, token: undefined });
  },
}));
