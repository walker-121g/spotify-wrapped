import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/app/profiles/$id')({
  component: () => <div>Hello /app/profiles/$id!</div>,
})
