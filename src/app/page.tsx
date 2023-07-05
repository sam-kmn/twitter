"use client"
import Header from "@/components/Header"
import Intersection from "@/components/Intersection"
import AddTweet from "@/components/AddTweet"
import Tweet from "@/components/Tweet"
import { useTweets } from "@/lib/store"

export default function Page() {
  const store = useTweets()

  return (
    <div className="flex-1">
      <Header title={"Home"} />
      <AddTweet />

      <div className="flex flex-col overflow-y-scroll">
        {store.isLoading && <div>Loading</div>}
        {store.data.map((tweets) => {
          return tweets.map((tweet: any) => (
            <Tweet key={tweet.id} tweet={tweet} />
          ))
        })}
      </div>

      <Intersection callback={store.nextPage}>
        <button
          className="m-10 mx-auto px-6 py-2 bg-blue-500 w-min rounded-full whitespace-nowrap"
          onClick={() => store.nextPage()}
        >
          Load more
        </button>
      </Intersection>
    </div>
  )
}
