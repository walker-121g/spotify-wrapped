import { getClipQuiz } from "@/services/games.service"
import { Question } from "@/services/types/games";
import { useEffect, useState } from "react"

export const ClipQuiz = () => {
    const [questions, setQuestions] = useState<Question[]>([]);

    useEffect(() => {
        async function createQuiz() {
            const clipQuiz = await getClipQuiz();
            console.log(clipQuiz)

            setQuestions(clipQuiz.questions);
        }

        createQuiz()
    }, [])

    return (
        <div className="flex flex-row gap-4">
            {questions.map((question) => (
                <div key={question.name}>
                    <a>What song off of your playlist is this?</a>
                    <audio controls>
                        <source src={question.clip_url} type="audio/mpeg" />
                        Your browser does not support the audio element.
                    </audio>
                </div>
            ))}
        </div>
    )
}
