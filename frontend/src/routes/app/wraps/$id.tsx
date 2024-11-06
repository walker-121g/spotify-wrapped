import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'
import { Fullscreen } from 'lucide-react' // Assuming this is an icon for fullscreen
import { Button } from '@/components/ui/button'
import { useQuery } from '@tanstack/react-query'
import { getWraps } from '@/services/wrap.service'

export const Route = createFileRoute('/app/wraps/$id')({
  component: WrapDetail,
})

function WrapDetail() {
  const { id: wrapId } = Route.useParams() as {
    id: string
  }
  const {
    data: wraps,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['wraps'],
    queryFn: async () => await getWraps(),
  })

  const [isFullscreen, setIsFullscreen] = useState(false)
  const [currentSlide, setCurrentSlide] = useState(0)

  if (isLoading) {
    return <div>Loading wrap details...</div>
  }

  if (error || !wraps || wraps.length === 0) {
    return <div>Error loading wrap details. Please try again.</div>
  }

  const wrap = wraps.find((wrap) => wrap.id === Number(wrapId))

  if (!wrap) {
    return <div>Wrap not found!</div>
  }
  const totalSlides = 8

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides)
  }

  return (
    <div className="wrap-detail">
      <header className="flex justify-between items-center p-4">
        <h1>{wrap.name}</h1>
        <Button
          variant="outline"
          onClick={() => setIsFullscreen(!isFullscreen)}
        >
          <Fullscreen />
          {isFullscreen ? 'Exit Fullscreen' : 'Fullscreen'}
        </Button>
      </header>

      <div className={`content ${isFullscreen ? 'fullscreen' : ''}`}>
        {/* placeholder content */}
        <div className="slide">
          <h2>{wrap.tracks[currentSlide].id}</h2>
        </div>

        {/* Slide navigation */}
        <div className="slide-navigation">
          <Button onClick={prevSlide}>Previous</Button>
          <Button onClick={nextSlide}>Next</Button>
        </div>
      </div>

      <style>{`
        .content {
          transition: all 0.3s ease;
        }
        .fullscreen {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: white;
          z-index: 1000;
          padding: 16px;
        }
        .slide-navigation {
          margin-top: 16px;
          display: flex;
          justify-content: space-between;
        }
      `}</style>
    </div>
  )
}
