"use client"
// import { postTweet } from "@/lib/actions"
import { useAuth } from "@clerk/nextjs"
import { FormEvent, useState } from "react"

export default function AddTweet() {
  const [data, setData] = useState({
    text: "",
  })
  const { userId } = useAuth()

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!userId) return
    const response = await fetch("/api/tweets/", {
      method: "POST",
      body: JSON.stringify({
        ...data,
        userId,
      }),
    })
    setData({ ...data, text: "" })
    const tweet = await response.json()
    console.log(tweet)
  }

  return (
    <div className="w-full flex gap-2 p-4 border-y border-gray-600">
      <img src="https://placehold.co/80x80" alt="" className="w-14 " />
      <form
        onSubmit={(e) => handleSubmit(e)}
        className="flex-1 p-2 flex flex-col divide-y divide-gray-700"
      >
        <input
          type="text"
          value={data.text}
          onChange={(event) =>
            setData({ ...data, text: event.currentTarget.value })
          }
          placeholder="What is happening?!"
          className="text-lg text-white bg-transparent placeholder:text-gray-500 p-5 outline-none"
        />
        <nav className="w-full flex justify-between items-center p-4">
          <div>
            <button
              type="button"
              className="bi bi-image text-blue-500"
            ></button>
          </div>
          <button
            type="submit"
            className="text-lg px-6 py-1 bg-blue-500 rounded-full"
          >
            Tweet
          </button>
        </nav>
      </form>
    </div>
  )
}
