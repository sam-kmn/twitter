import { useEffect, useState, RefObject } from "react"

export function useIntersection(ref: RefObject<Element>) {
  const [isIntersecting, setIsIntersecting] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      setIsIntersecting(entry.isIntersecting)
      // if (entry.isIntersecting) {
      //   setIsIntersecting(true)
      // } else setIsIntersecting(false)
    })

    ref.current && observer.observe(ref.current)

    return () => {
      observer.disconnect()
    }
  }, [ref])

  return isIntersecting
}
