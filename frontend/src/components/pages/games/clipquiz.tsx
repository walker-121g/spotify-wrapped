import { getClipQuiz } from "@/services/games.service"
import { Question } from "@/services/types/games";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"; 
import { Label } from "@/components/ui/label";
import { useEffect, useState, useRef } from "react"
import { Carousel, CarouselContent, CarouselItem, CarouselApi } from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";

export const ClipQuiz = () => {
    const [questions, setQuestions] = useState<Question[]>([]);
    const [carouselApi, setCarouselApi] = useState<CarouselApi>();

    useEffect(() => {
        async function createQuiz() {
            const clipQuiz = await getClipQuiz();
            console.log(clipQuiz)

            setQuestions(clipQuiz.questions);
        }

        createQuiz()
    }, [])

    return (
        <Carousel setApi={setCarouselApi} className="flex flex-wrap w-[80%] gap-4">
            <CarouselContent>
                {questions.map((question, index) => (
                    <CarouselItem className="flex flex-col gap-4 rounded-lg p-4"key={question.name}>
                        <a>{index + 1}. What song off of your playlist is this?</a>
                        <audio className="bg-primary rounded-lg w-1/2" controls>
                            <source src={question.clip_url} type="audio/mpeg" />
                            Your browser does not support the audio element.
                        </audio>
                        <div className="flex flex-row justify-between">
                            <RadioGroup className="flex flex-col gap-2">
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
                                <Button onClick={() => {carouselApi?.scrollNext()}} className="w-1/2 self-end">
                                    Next
                                </Button>
                            </div>
                        </div>
                    </CarouselItem>
                ))}
            </CarouselContent> 
        </Carousel>
    )
}
