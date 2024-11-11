import { logErr } from "@/lib/utils";
import { http } from "./http.service";
import SafeError from "@/lib/safe-error";

export async function getUserQuiz() {
    try {
        const resp = await http(
            "GET",
            `/games/quiz`,
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

