import { useEffect, useState, RefObject } from "react"

export function useIntersection(ref: RefObject<Element>) {
  const [isIntersecting, setIsIntersecting] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsIntersecting(true)
        // console.log("Intersection")
      }
    })

    ref.current && observer.observe(ref.current)

    return () => {
      observer.disconnect()
    }
  }, [])

  return isIntersecting
}
