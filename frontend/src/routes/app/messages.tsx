import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/app/messages')({
  component: () => <div>Hello /app/messages!</div>,
})
