"use client"
import { useTweets } from "@/lib/store"
// import { postTweet } from "@/lib/actions"
import { useUser } from "@clerk/nextjs"
import { FormEvent, useState } from "react"

export default function AddTweet() {
  const { user } = useUser()
  const addTweet = useTweets((store) => store.addTweet)
  const [data, setData] = useState({
    text: "",
  })

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!user?.id) return
    const response = await fetch("/api/tweets/", {
      method: "POST",
      body: JSON.stringify({
        ...data,
        userId: user.id,
      }),
    })
    setData({ ...data, text: "" })
    const responseData = await response.json()
    console.log(responseData)
    addTweet({
      ...responseData.tweet,
      user: {
        username: user.username,
        firstName: user.firstName,
        lastName: user.lastName,
        imageUrl: user.imageUrl,
      },
    })
  }

  return (
    <div className="w-full flex items-center gap-2 p-4 border-y border-gray-600">
      <img
        src={user?.imageUrl}
        alt=""
        className="w-14 h-14 object-cover rounded-full "
      />
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
