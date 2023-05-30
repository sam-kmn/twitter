import { SignedOut } from "@clerk/nextjs"
import SignBar from "@/components/SignBar"
import Post from "@/components/Post"

export default function Home() {
  return (
    <>
      <SignedOut>
        <SignBar />
      </SignedOut>
      {Array.from(Array(10).keys()).map(() => (
        <Post />
      ))}
    </>
  )
}
