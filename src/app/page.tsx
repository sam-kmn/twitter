"use client"
import Header from "@/components/Header"
import Intersection from "@/components/Intersection"
import AddTweet from "@/components/AddTweet"
import Tweet from "@/components/Tweet"
import { useTweets } from "@/lib/store"
import { useMemo } from "react"

export default function Page() {
  const store = useTweets()
  const lastPage = useMemo(
    () => store.lastPage != undefined && store.nextPage > store.lastPage,
    [store]
  )

  return (
    <div className="flex-1">
      <Header title={"Home"} />
      <AddTweet />

      <div className="flex flex-col overflow-y-scroll">
        {store.isLoading && (
          <div className="text-center text-xl p-8">Loading</div>
        )}
        {store.data &&
          store.data.map((tweets) => {
            return tweets.map((tweet: any) => (
              <Tweet key={tweet.id} tweet={tweet} />
            ))
          })}
      </div>

      {lastPage ? (
        <div className="text-center text-xl p-8">
          There is no more tweets 🐦
        </div>
      ) : (
        <Intersection callback={store.fetchPage}>
          <button
            className="invisible m-10 mx-auto px-6 py-2 bg-blue-500 w-min rounded-full whitespace-nowrap"
            onClick={store.fetchPage}
          >
            Load more
          </button>
        </Intersection>
      )}
    </div>
  )
}
