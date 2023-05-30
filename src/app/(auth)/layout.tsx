import { ReactNode } from "react"

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="fixed inset-0 flex justify-center items-center bg-neutral-800/40  backdrop-blur">
      {children}
    </div>
  )
}
