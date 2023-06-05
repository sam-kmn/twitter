import { prisma } from "@/lib/db"
import { NextRequest, NextResponse } from "next/server"
// import { auth } from "@clerk/nextjs"

interface RequestBody {
  userId: string
  text: string
}

export async function GET(request: NextRequest) {
  const tweets = await prisma.tweets.findMany()
  //
  return NextResponse.json({ tweets }, { status: 200 })
}

export async function POST(request: Request) {
  const body: RequestBody = await request.json()

  if (!body.userId || !body.text)
    return NextResponse.json({ message: "Invalid params" }, { status: 400 })

  const tweet = await prisma.tweets.create({
    data: {
      ...body,
    },
  })

  if (!tweet)
    return NextResponse.json(
      { message: "Something went wrong!" },
      { status: 400 }
    )

  return NextResponse.json({ tweet }, { status: 200 })
}
