import { Button, buttonVariants } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { getUserQuiz } from "@/services/games.service"
import { useEffect } from "react"

type Game = {
    name: string,
    description: string,
    url: string,
}

export const Display = () => {
    useEffect(() => {
        const games = getUserQuiz()
        console.log(games)
    })

    const games: Game[] = [
        {
            name: "Clip Quiz",
            description: "Quiz yourself on your saved songs by listening to their clips.",
            url: "/clipquiz"
        }
    ]

    return (
        <div className="flex flex-row gap-4 w-screen">
            {games.map((game) => (
                <Card key={game.name}>
                    <CardHeader>
                        <CardTitle>{game.name}</CardTitle>
                        <CardDescription>{game.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Button asChild className="bg-primary">
                            <a href='/app/games/clipquiz'>Play Game</a> 
                        </Button>
                    </CardContent>
                </Card>
            ))}

        </div>
    )
}

