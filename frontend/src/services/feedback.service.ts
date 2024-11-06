import SafeError from "@/lib/safe-error";
import { http } from "./http.service";
import { logErr } from "@/lib/utils";

export const createFeedback = async (feedback: {
  email: string;
  content: string;
}): Promise<boolean> => {
  try {
    const result = await http<{ success: boolean }>(
      "POST",
      "/feedback/create",
      {
        body: JSON.stringify(feedback),
      },
    );

    return result.success;
  } catch (error) {
    logErr(error);
    if (error instanceof SafeError) {
      throw error;
    } else {
      throw new SafeError("Failed to create feedback");
    }
  }
};
