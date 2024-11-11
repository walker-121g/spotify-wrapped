import { getUserQuiz } from "@/services/games.service"
import { useEffect } from "react"

export const Display = () => {
    useEffect(() => {
        const games = getUserQuiz()
        console.log(games)
    })

    return (
        <div>hey</div>
    )
}

