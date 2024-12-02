import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

type Game = {
  name: string;
  description: string;
  url: string;
};

export const Display = () => {
  const games: Game[] = [
    {
      name: "Clip Quiz",
      description:
        "Quiz yourself on your saved songs by listening to their clips.",
      url: "/clipquiz",
    },
  ];

  return (
    <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {games.map((game) => (
        <Card key={game.name}>
          <CardHeader>
            <CardTitle>{game.name}</CardTitle>
            <CardDescription>{game.description}</CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild className="bg-primary">
              <a href="/app/games/clipquiz">Play Game</a>
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
