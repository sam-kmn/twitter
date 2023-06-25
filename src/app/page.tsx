"use client"
import Header from "@/components/Header"
import useSWRInfinite from "swr/infinite"
import Intersection from "@/components/Intersection"
import AddTweet from "@/components/AddTweet"
import Tweet from "@/components/Tweet"

const getKey = (pageIndex: number, previousPageData: any) => {
  if (previousPageData && !previousPageData.length) return null // reached the end
  return `/api/tweets/explore?page=${pageIndex}` // SWR key
}

export default function Page() {
  const { data, size, setSize, isLoading, mutate } = useSWRInfinite(
    getKey,
    (...args) => fetch(...args).then((res) => res.json())
  )
  if (!data) return "loading"

  const mutateData = () => {
    console.log("data", data)
    mutate([
      ...data,
      [
        {
          id: "648f1e0d46a3d3f5a120af4b",
          userId: "user_2RNoan3QaNzDtEuxSUakVl9tqin",
          text: "Lorem ipsum",
          image: null,
          likes: [],
          createdAt: "2023-06-18T15:09:01.751Z",
          updatedAt: "2023-06-18T15:09:01.751Z",
          user: {
            username: "mutatedata",
            firstName: "Mutate",
            lastName: "Data",
            imageUrl:
              "https://img.clerk.com/eyJ0eXBlIjoiZGVmYXVsdCIsImlpZCI6Imluc18yUU5kMEI3VU51R3hSaXkwOXQ3QlVOUGs5blEiLCJyaWQiOiJ1c2VyXzJSTm9hbjNRYU56RHRFdXhTVWFrVmw5dHFpbiIsImluaXRpYWxzIjoiU0sifQ",
          },
        },
        {
          id: "648f8dcc993bd6f29ecf5677",
          userId: "user_2ROmMk1jqv6aWhBxNgiec7FKKrq",
          text: "sup mutate?",
          image: null,
          likes: [],
          createdAt: "2023-06-18T23:05:47.897Z",
          updatedAt: "2023-06-18T23:05:47.897Z",
          user: {
            username: "vivixeen",
            firstName: "Oliwia",
            lastName: "Jabłońska",
            imageUrl:
              "https://img.clerk.com/eyJ0eXBlIjoicHJveHkiLCJzcmMiOiJodHRwczovL2ltYWdlcy5jbGVyay5kZXYvdXBsb2FkZWQvaW1nXzJST21WREJBandqQVZXUzJvT2RjMkl3dm1PbS5qcGVnIn0",
          },
        },
      ],
    ])
    console.log("mutateData")
  }

  return (
    <div className="flex-1">
      <Header title={"Home"} />

      <AddTweet />

      <button onClick={mutateData}>Mutate data</button>

      <div className="flex flex-col overflow-y-scroll">
        {isLoading && <div>Loading</div>}
        {data.map((tweets) => {
          return tweets.map((tweet: any) => (
            <Tweet key={tweet.id} tweet={tweet} />
          ))
        })}
      </div>

      <Intersection callback={() => setSize(size + 1)}>
        <button
          className="m-10 mx-auto px-6 py-2 bg-blue-500 w-min rounded-full whitespace-nowrap"
          onClick={() => setSize(size + 1)}
        >
          Load more
        </button>
      </Intersection>
    </div>
  )
}
