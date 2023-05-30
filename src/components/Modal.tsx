import { ReactNode } from "react"

export default function Modal({ children }: { children: ReactNode }) {
  return (
    <div className="fixed inset-0 flex justify-center items-center">
      {children}
    </div>
  )
}
