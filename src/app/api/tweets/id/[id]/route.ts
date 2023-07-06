// import { prisma } from "@/lib/db"
import { NextRequest, NextResponse } from "next/server"
// import { auth } from "@clerk/nextjs"

export async function GET() {
  // const tweets = await prisma.tweets.findMany()
  return NextResponse.json({ message: "Success" }, { status: 200 })
}
