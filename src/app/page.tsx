"use client"
import useSWRInfinite from "swr/infinite"
import Intersection from "@/components/Intersection"
import Tweet from "@/components/Tweet"
import { SignedOut } from "@clerk/nextjs"
import SignBar from "@/components/SignBar"
import AddTweet from "@/components/AddTweet"
import Header from "@/components/Header"
import { useEffect, useState } from "react"

export default async function Home() {
  return (
    <>
      <Header title={"Home"} />
      <SignedOut>
        <SignBar />
      </SignedOut>
      <AddTweet />
    </>
  )
}
