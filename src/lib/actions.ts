import { prisma } from "@/lib/db"
import { auth } from "@clerk/nextjs"

export async function postTweet(data: any) {
  "use server"
  console.log("postTweet", data)
  const { userId } = auth()
  if (!userId) {
    throw new Error("You must be signed in to add an item to your cart")
  }
  const tweet = prisma.tweets.create({
    data: {
      ...data,
      userId,
    },
  })
  console.log("add item server action", tweet)
  return tweet
}
