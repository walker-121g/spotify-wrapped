import SafeError from "@/lib/safe-error";
import { http } from "./http.service";
import { logErr } from "@/lib/utils";
import { Wrap, WrapPreview } from "./types/wrap";

export const getWraps = async (): Promise<Wrap[]> => {
  try {
    const result = await http<Wrap[]>("GET", "/wraps");
    return result;
  } catch (error) {
    logErr(error);
    if (error instanceof SafeError) {
      throw error;
    } else {
      throw new SafeError("Failed to fetch wraps");
    }
  }
};

export const getSharedWraps = async (): Promise<Wrap[]> => {
  try {
    const result = await http<Wrap[]>("GET", "/wraps/shared");
    return result;
  } catch (error) {
    logErr(error);
    if (error instanceof SafeError) {
      throw error;
    } else {
      throw new SafeError("Failed to fetch shared wraps");
    }
  }
};

export const createWrap = async (wrap: {
  name: string;
  period: Wrap["period"];
  users: string[];
}): Promise<boolean> => {
  try {
    const result = await http<boolean>("POST", "/wraps/create", {
      body: JSON.stringify(wrap),
    });

    return result;
  } catch (error) {
    logErr(error);
    if (error instanceof SafeError) {
      throw error;
    } else {
      throw new SafeError("Failed to create wrap");
    }
  }
};

export const updateWrap = async (
  id: number,
  accept: boolean,
): Promise<boolean> => {
  try {
    const result = await http<boolean>(
      "POST",
      accept ? "/wraps/accept" : "/wraps/decline",
      {
        body: JSON.stringify({ wrap_id: id }),
      },
    );

    return result;
  } catch (error) {
    logErr(error);
    if (error instanceof SafeError) {
      throw error;
    } else {
      throw new SafeError(
        "Failed to " + accept ? "accept" : "decline" + " wrap",
      );
    }
  }
};

export const previewWrap = async (
  period: Wrap["period"],
): Promise<WrapPreview> => {
  try {
    const result = await http<WrapPreview>(
      "GET",
      "/wraps/preview?period=" + period,
    );

    return result;
  } catch (error) {
    logErr(error);
    if (error instanceof SafeError) {
      throw error;
    } else {
      throw new SafeError("Failed to get wrap preview");
    }
  }
};
