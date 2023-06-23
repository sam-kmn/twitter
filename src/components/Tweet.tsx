import type { Tweets } from "@prisma/client"

type TweetsWithUser = Tweets & {
  user: {
    username: string
    firstName: string
    lastName: string
    imageUrl: string
  }
}

export default function Tweet({ tweet }: { tweet: TweetsWithUser }) {
  if (!Object.keys(tweet).length) return <div>Skeleton</div>
  else
    return (
      <div className="flex items-center gap-4 p-7 border-b border-gray-700 ">
        <img
          src={tweet?.user?.imageUrl || "https://placehold.co/400"}
          className="w-16 aspect-square rounded-full object-cover"
          alt=""
        />
        <div className="flex flex-col gap-2">
          <div className="flex gap-2">
            <h3 className="text-lg font-bold">
              {tweet.user.firstName} {tweet.user.lastName}
            </h3>
            <p className="text-gray-400">{tweet.user.username} • 1h ago</p>
          </div>
          <p className="">{tweet.text}</p>
        </div>
      </div>
    )
}
