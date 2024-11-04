import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/app/search')({
  component: () => <div>Hello /app/search!</div>,
})
