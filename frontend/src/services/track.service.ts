import SafeError from "@/lib/safe-error";  
import { http } from "./http.service";
import { logErr } from "@/lib/utils";

export async function getTrack(id: string) {
    try {
        const resp = await http(
            "GET",
            `/tracks/${id}`,
        ) 

        return resp;
    } catch (e) {
        console.log(`[TrackService.getTrack ${logErr(e)}`)

        if (e instanceof SafeError) {
            throw e;
        } else {
            throw new SafeError(
                "Failed to load track, please try again later."
            );
        }
    } 
}