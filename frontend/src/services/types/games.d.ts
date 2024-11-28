export type Question = {
    name: string,
    options: string[],
    clip_url: string
}

export type ClipQuiz = {
    questions: Question[],
}

