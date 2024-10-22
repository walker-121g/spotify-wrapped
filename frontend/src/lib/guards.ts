import { redirect } from "@tanstack/react-router";

type Guard = (ctx: { context: { isLoggedIn: boolean } }) => any;

const AuthedGuard: Guard = async ctx => {
  if (!ctx.context.isLoggedIn) {
    throw redirect({
      to: "/login",
      replace: true,
    });
  }
};

const UnAuthedGuard: Guard = async ctx => {
  if (ctx.context.isLoggedIn) {
    throw redirect({
      to: "/",
      replace: true,
    });
  }
};

export { AuthedGuard, UnAuthedGuard };
