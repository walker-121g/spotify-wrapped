import { ClipQuiz } from '@/components/pages/games/clipquiz'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/app/games/clipquiz')({
  component: () => <ClipQuiz/>,
})
