import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/db"
import { clerkClient } from "@clerk/nextjs"
import type { Tweets } from "@prisma/client"

export async function GET(request: NextRequest) {
  const query = request.nextUrl.searchParams.get("page")
  if (!query || query == null)
    return NextResponse.json({ message: "Invalid params" }, { status: 400 })

  const page = parseInt(query)
  if (page < 0)
    return NextResponse.json({ message: "Invalid params" }, { status: 400 })

  console.log("GET /api/tweets/explore?page=", page)

  const rawTweets = await prisma.tweets.findMany({
    orderBy: {
      likes: "desc",
    },
  })
  const users = await clerkClient.users.getUserList()

  const tweets = await Promise.all(
    rawTweets.map(async (tweet): Promise<Tweets> => {
      const user = users.find((user) => user.id === tweet.userId)
      if (!user) return tweet
      const newTweet = {
        ...tweet,
        user: {
          username: user.username,
          firstName: user.firstName,
          lastName: user.lastName,
          imageUrl: user.imageUrl,
        },
      }

      return newTweet
    })
  )

  const splitedTweets = []
  const chunkSize = 10
  for (let i = 0; i < tweets.length; i += chunkSize) {
    const chunk = tweets.slice(i, i + chunkSize)
    splitedTweets.push(chunk)
  }

  if (page < splitedTweets.length)
    return NextResponse.json(
      {
        payload: [...splitedTweets[page]],
        lastPage: splitedTweets.length - 1,
      },
      { status: 200 }
    )
  return NextResponse.json({ message: "Page doesn't exist" }, { status: 400 })
}
