import SafeError from "@/lib/safe-error";  
import { http } from "./http.service";
import { logErr } from "@/lib/utils";

export async function getArtist(id: string) {
    try {
        const resp = await http(
            "GET",
            `/artists/${id}`
        ) 

        return resp; 
    } catch (e) {
        console.log(`ArtistService.getArtist ${logErr(e)}`)

        if (e instanceof SafeError) {
            throw e;
        } else {
            throw new SafeError(
                "Failed to load artist, please try again later."
            )
        }
    } 
} 

export async function getArtists(ids: string[]) {
    try {
        const resp = await http(
            "GET",
            `/artists?ids=${ids.join(",")}`
        )

        return resp;
    } catch (e) {
        console.log(`ArtistService.getArtists ${logErr(e)}`)

        if (e instanceof SafeError) {
            throw e;
        } else {
            throw new SafeError(
                "Failed to load artists, please try again later."
            )
        }
    }
}

export async function getArtistAlbums(id: string) {
    try {
        const resp = await http(
            "GET",
            `/artists/${id}/albums`
        )

        return resp;
    } catch (e) {
        console.log(`ArtistService.getArtistAlbums ${logErr(e)}`)

        if (e instanceof SafeError) {
            throw e;
        } else {
            throw new SafeError(
                "Failed to load artist albums, please try again later."
            )
        }
    }
} 

export async function getTopTracks(id: string) {
    try {
        const resp = await http(
            "GET",
            `/artists/${id}/top-tracks`
        )

        return resp;
    } catch (e) {
        console.log(`ArtistService.getTopTracks ${logErr(e)}`)

        if (e instanceof SafeError) {
            throw e;
        } else {
            throw new SafeError(
                "Failed to load artist top tracks, please try again later."
            )
        }
    }
} 

export async function getRelatedArtists(id: string) {
    try {
        const resp = await http(
            "GET",
            `/artists/${id}/related-artists`
        )

        return resp;
    } catch (e) {
        console.log(`ArtistService.getRelatedArtists ${logErr(e)}`)

        if (e instanceof SafeError) {
            throw e;
        } else {
            throw new SafeError(
                "Failed to load artist top tracks, please try again later."
            )
        }
    }
} 
