import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

const charset =
  "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function randInt(min: number, max: number) {
  return Math.floor(Math.random() * max) + min;
}

export function randString(length: number = 16) {
  let ret = "";

  for (let i = 0; i < length; i++) {
    ret += charset[randInt(0, charset.length)];
  }

  return ret;
}
