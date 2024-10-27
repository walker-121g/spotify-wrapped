import SafeError from "@/lib/safe-error";  
import { http } from "./http.service";
import { logErr } from "@/lib/utils";

export async function getUserAlbums(
    limit: number = 20,
    offset: number = 0 
) {
    try {
        const resp = await http(
            "GET",
            `/me/albums?limit=${limit}&offset=${offset}`
        )

        return resp;
    } catch (e) {
        console.log(`AlbumService.getUserAlbums ${logErr(e)}`);

        if (e instanceof SafeError) {
            throw e;
        } else {
            throw new SafeError(
                "Failed to load user albums, please try again later."
            )
        }
    }
}

export async function getAlbum(id: string) {
    try {
        const resp = await http(
            "GET",
            `/albums/${id}`,
        ) 

        return resp;
    } catch (e) {
        console.log(`[AlbumService.getAlbum ${logErr(e)}`)

        if (e instanceof SafeError) {
            throw e;
        } else {
            throw new SafeError(
                "Failed to load album, please try again later."
            );
        }
    } 
}

export async function getAlbums(ids: string[]) {
    try {
        const resp = await http(
            "GET",
            `/albums?ids=${ids.join(",")}`
        )

        return resp;
    } catch (e) {
        console.log(`AlbumService.getAlbums ${logErr(e)}`);

        if (e instanceof SafeError) {
            throw e;
        } else {
            throw new SafeError(
                "Failed to load albums, please try again later."
            );
        }
    }
}

export async function getAlbumTracks(id: string) {
    try {
        const resp = await http(
            "GET",
            `/albums/${id}/tracks`
        )

        return resp;
    } catch (e) {
        console.log(`AlbumService.getAlbumTracks ${logErr(e)}`)

        if (e instanceof SafeError) {
            throw e;
        } else {
            throw new SafeError(
                "Failed to load album tracks, please try again later."
            );
        }
    }
}

export async function saveAlbums(ids: string[]) {
    try {
        const resp = await http(
            "PUT",
            `/me/albums?ids=${ids.join(",")}`
        )

        return resp;
    } catch (e) {
        console.log(`AlbumService.saveAlbums ${logErr(e)}`)

        if (e instanceof SafeError) {
            throw e;
        } else {
            throw new SafeError(
                "Failed to save albums, please try again later."
            )
        }
    }
} 

export async function deleteAlbums(ids: string[]) {
    try {
        const resp = await http(
            "DELETE",
            `/me/albums?ids=${ids.join(",")}`
        )

        return resp;
    } catch (e) {
        console.log(`AlbumService.deleteAlbums ${logErr(e)}`)

        if (e instanceof SafeError) {
            throw e;
        } else {
            throw new SafeError(
                "Failed to delete albums, please try again later."
            )
        }
    }
}

export async function checkIfSaved(ids: string[]) {
    try {
        const resp = await http(
            "GET",
            `/me/albums/contains?ids=${ids.join(",")}`
        )

        return resp;
    } catch (e) {
        console.log(`AlbumService.checkIfSaved ${logErr(e)}`)

        if (e instanceof SafeError) {
            throw e;
        } else {
            throw new SafeError(
                "Failed to check for albums, please try again later."
            )
        }
    }
}
