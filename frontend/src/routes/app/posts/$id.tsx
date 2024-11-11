import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/app/posts/$id')({
  component: () => <div>Hello /app/posts/$id!</div>,
})
