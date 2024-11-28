import { getClipQuiz } from "@/services/games.service"
import { Question } from "@/services/types/games";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"; 
import { Label } from "@/components/ui/label";
import { useEffect, useState } from "react"
import { Carousel, CarouselContent, CarouselItem, CarouselApi } from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";

export const ClipQuiz = () => {
    const [questions, setQuestions] = useState<Question[]>([]);
    const [choices, setChoices] = useState<string[]>([])
    const [carouselApi, setCarouselApi] = useState<CarouselApi>();

    useEffect(() => {
        async function createQuiz() {
            const clipQuiz = await getClipQuiz();

            setQuestions(clipQuiz.questions);
        }

        createQuiz()
    }, [])

    const handleSelection = (choice: string, index: number) => {
        const updatedItems = [...choices]

        updatedItems[index] = choice 

        console.log(updatedItems)

        setChoices(updatedItems)
    }

    return (
        <Carousel setApi={setCarouselApi} className="flex flex-wrap w-[80%] gap-4">
            <CarouselContent>
                {questions.map((question, index) => (
                    <CarouselItem className="flex flex-col gap-4 rounded-lg p-4"key={question.name}>
                        <a>{index + 1}. What song off of your playlist is this?</a>
                        <div className="flex flex-col gap-1">
                            <audio className="bg-primary rounded-lg w-1/2" controls>
                                <source src={question.clip_url} type="audio/mpeg" />
                                Your browser does not support the audio element.
                            </audio>
                            <a className="text-sm">**Imagine {question.name} is playing right now.**</a>
                        </div>
                        <div className="flex flex-row justify-between">
                            <RadioGroup onValueChange={(choice) => handleSelection(choice, index)} className="flex flex-col gap-2">
                                {question.options.map((option) => (
                                    <div key={option + question.name} className="flex items-center gap-1"> 
                                        <RadioGroupItem value={option} id={option + question.name}>
                                            {option}
                                        </RadioGroupItem>
                                        <Label htmlFor={option + question.name}>{option}</Label> 
                                    </div>
                                ))} 
                            </RadioGroup>

                            <div className="flex flex-row w-44 gap-2">
                                <Button disabled={index - 1 < 0} onClick={() => {carouselApi?.scrollPrev()}} className="w-1/2 self-end">
                                    Previous
                                </Button>
                                { index !== 4? 

                                    <Button onClick={() => {carouselApi?.scrollNext()}} className="w-1/2 self-end">
                                        Next
                                    </Button>

                                :

                                    <Button onClick={() => {}} className="w-1/2 self-end">
                                        Submit 
                                    </Button>

                                }
                            </div>
                        </div>
                    </CarouselItem>
                ))}
            </CarouselContent> 
        </Carousel>
    )
}
