import { logErr } from "@/lib/utils";
import { http } from "./http.service"
import SafeError from "@/lib/safe-error";


export async function getGeminiStory(
    prompt: string
){
    try {
        console.log("You have called getGeminiStory");
        const resp = await http(
            "GET",
            "/gemini/story/create?prompt=" + prompt
        )
        return resp;
    } catch (e) {
        console.log(`GeminiService.getGeminiStory ${logErr(e)}`);
        if (e instanceof SafeError) {
            throw e;
        } else {
            throw new SafeError(
                "Failed to load Gemini AI, please try again later."
            )
        }
    }
}