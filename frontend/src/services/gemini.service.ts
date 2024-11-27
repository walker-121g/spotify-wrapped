import { logErr } from "@/lib/utils";
import { http } from "./http.service";
import SafeError from "@/lib/safe-error";

export async function getGeminiStory(prompt: string) {
  try {
    const resp = await http("POST", "/gemini/story/create", {
      body: JSON.stringify({
        prompt,
      }),
      textResponse: true,
    });
    return resp;
  } catch (e) {
    console.log(`GeminiService.getGeminiStory ${logErr(e)}`);
    if (e instanceof SafeError) {
      throw e;
    } else {
      throw new SafeError("Failed to load Gemini AI, please try again later.");
    }
  }
}
