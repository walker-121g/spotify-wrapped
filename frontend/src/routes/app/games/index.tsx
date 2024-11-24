import { Display } from '@/components/pages/games/display'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/app/games/')({
  component: () => <Display />,
})
