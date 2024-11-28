import { getClipQuiz } from "@/services/games.service"
import { Question } from "@/services/types/games";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"; 
import { Label } from "@/components/ui/label";
import { useEffect, useState } from "react"
import { Carousel, CarouselContent, CarouselItem, CarouselApi } from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CircleCheck, CircleX } from "lucide-react";

type ComponentMap = {
    [key: string]: JSX.Element;
}

type Answer = {
    status: string,
    userAnswer: string,
    correctAnswer: string,
    icon: JSX.Element 
}

export const ClipQuiz = () => {
    const [questions, setQuestions] = useState<Question[]>([]);
    const [choices, setChoices] = useState<string[]>([])
    const [componentState, setComponentState] = useState<string>("quiz");
    const [numCorrect, setNumCorrect] = useState<number>()
    const [answers, setAnswers] = useState<Answer[]>([]) 
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

    const handleSubmission = () => {
        let correct = 0 
        const answers: Answer[] = [] 

        for (let i = 0; i < questions.length; i++) {
            let status = "incorrect";
            let icon = <CircleX color="red"/> 

            if (choices[i] === questions[i].name) {
                status = "correct";
                icon = <CircleCheck color="green"/>
                correct++;
            }

            answers.push({
                status: status,
                userAnswer: choices[i],
                correctAnswer: questions[i].name, 
                icon: icon 
            })
        }

        setNumCorrect(correct)
        setAnswers(answers)
        setComponentState("submitted")
    }

    const componentMap: ComponentMap = {
        "quiz": (
            <Carousel setApi={setCarouselApi} className="flex flex-wrap w-full sm:w-[80%] gap-4">
                <CarouselContent>
                    {questions.map((question, index) => (
                        <CarouselItem className="flex flex-col gap-4 rounded-lg p-4"key={question.name}>
                            <a>{index + 1}. What song off of your playlist is this?</a>
                            <div className="flex flex-col gap-1">
                                <audio className="bg-primary rounded-lg sm:w-1/2" controls>
                                    <source src={question.clip_url} type="audio/mpeg" />
                                    Your browser does not support the audio element.
                                </audio>
                                <a className="text-sm">**Imagine {question.name} is playing right now.**</a>
                            </div>
                            <div className="flex flex-row justify-between">
                                <RadioGroup onValueChange={(choice) => handleSelection(choice, index)} className="flex flex-col gap-2">
                                    {question.options.map((option) => (
                                        <div key={option + question.name} className="flex items-center gap-1"> 
                                            <RadioGroupItem value={option} id={option + question.name + index}>
                                                {option}
                                            </RadioGroupItem>
                                            <Label htmlFor={option + question.name + index}>{option}</Label> 
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

                                        <Button onClick={handleSubmission} className="w-1/2 self-end">
                                            Submit 
                                        </Button>

                                    }
                                </div>
                            </div>
                        </CarouselItem>
                    ))}
                </CarouselContent> 
            </Carousel>
        ),
        "submitted": (
            <Card className="flex flex-col gap-2 w-full sm:w-[800px]">
               <CardHeader>
                <CardTitle className="text-2xl">
                    You answered {numCorrect} out of 5 correctly!
                </CardTitle>
               </CardHeader>
               <CardContent className="flex flex-col gap-3">
                {answers.map((answer, index) => (
                    <div key={answer.status + answer.correctAnswer} className="flex flex-col p-2 gap-2">
                        <div className="flex flex-row items-center gap-1">
                            {answer.icon}
                            <p className="text-lg font-bold">Question {index + 1}</p>
                        </div>
                        <p>Your Answer: {answer.userAnswer}</p>
                        <p>Correct Answer: {answer.correctAnswer}</p>
                    </div>
                ))} 
                <Button className="w-44 self-end" asChild>
                    <a href="/app/games/clipquiz">
                        Quiz Again
                    </a>
                </Button>
               </CardContent>
            </Card>
        )
    }


    return (
        componentMap[componentState]
    )
}
