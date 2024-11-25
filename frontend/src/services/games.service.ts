import { logErr } from "@/lib/utils";
import { http } from "./http.service";
import SafeError from "@/lib/safe-error";
import { ClipQuiz } from "./types/games";

export async function getClipQuiz(): Promise<ClipQuiz> {
    try {
        const resp: ClipQuiz = await http(
            "GET",
            `/games/clipquiz`,
        ) 

        return resp;
    } catch (e) {
        console.log(`[GameService.getUserQuiz ${logErr(e)}`)

        if (e instanceof SafeError) {
            throw e;
        } else {
            throw new SafeError(
                "Failed to load quiz, please try again later."
            );
        }
    } 
}

