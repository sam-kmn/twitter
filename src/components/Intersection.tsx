"use client"

import { ReactNode, useEffect, useRef } from "react"
import { useIntersection } from "@/lib/hooks"

interface Props {
  callback: () => void
  children: ReactNode
}

const Intersection = ({ callback, children }: Props) => {
  const element = useRef(null)
  const isInViewport = useIntersection(element)

  useEffect(() => {
    if (isInViewport) {
      console.count("Intersection/Fetching")
      callback()
    }
  }, [isInViewport])

  return <div ref={element}>{children}</div>
}

export default Intersection
