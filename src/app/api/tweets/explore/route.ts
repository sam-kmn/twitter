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

  const rawTweets = await prisma.tweets.findMany({
    orderBy: {
      likes: "desc",
    },
  })
  const users = await clerkClient.users.getUserList()

  const tweets = await Promise.all(
    rawTweets.map(async (tweet): Promise<Tweets> => {
      // const user = await clerkClient.users.getUser(tweet.userId)
      const user = users.find((user) => user.id === tweet.userId)
      // console.log(user)
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

      // console.log({ tweet })
      // console.log({ newTweet })
      return newTweet
    })
  )

  // console.log(tweets)

  const splitedTweets = []
  const chunkSize = 4
  for (let i = 0; i < tweets.length; i += chunkSize) {
    const chunk = tweets.slice(i, i + chunkSize)
    splitedTweets.push(chunk)
  }

  if (page > splitedTweets.length)
    return NextResponse.json(
      { tweets: splitedTweets[splitedTweets.length] },
      { status: 200 }
    )
  return NextResponse.json([...splitedTweets[page]], { status: 200 })
  // return NextResponse.json(
  //   {
  //     tweets: splitedTweets[page],
  //     nextPage: page + 1 > splitedTweets.length ? null : page + 1,
  //     pages: splitedTweets.length,
  //   },
  //   { status: 200 }
  // )
}
