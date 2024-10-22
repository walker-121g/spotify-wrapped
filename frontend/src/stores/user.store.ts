import { create } from "zustand";

export type UserContext = {
  country: string;
  email: string;
  display_name: string;
  explicit_content: {
    filter_enabled: boolean;
    filter_locked: boolean;
  };
  external_urls: {
    spotify: string;
  };
  followers: {
    href: string;
    total: number;
  };
  href: string;
  id: string;
  images: {
    height: number;
    url: string;
    width: number;
  }[];
  product: string;
  type: string;
  uri: string;
};

interface UserStore {
  user: UserContext;
  clearUser: () => void;
  setUser: (user: UserContext) => void;
}

export const useContext = create<UserStore>(set => ({
  user: undefined!,
  setUser: (user: UserContext) => {
    set({ user });
  },
  clearUser: () => {
    set({ user: undefined! });
  },
}));
