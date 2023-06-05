import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/db"

export async function GET(request: NextRequest) {
  const query = request.nextUrl.searchParams.get("page")
  if (!query || query == null)
    return NextResponse.json({ message: "Invalid params" }, { status: 400 })

  const page = parseInt(query)
  if (page < 0)
    return NextResponse.json({ message: "Invalid params" }, { status: 400 })

  const tweets = await prisma.tweets.findMany({
    orderBy: {
      likes: "desc",
    },
  })

  const splitedTweets = []
  const chunkSize = 2
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
