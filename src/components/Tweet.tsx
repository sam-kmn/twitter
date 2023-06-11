const users = [
  {
    userId: "user_2QNfapThvrhiXi0ommgcYXcbtO2",
    username: "@samkmn",
    nickname: "Samuel Kaminski",
    img: "https://placehold.co/400",
  },
]

export default function Tweet({ tweet }: { tweet: any }) {
  const user = users.find((user) => user.userId === tweet.userId)
  if (user)
    return (
      <div className="flex items-center gap-4 p-7 border-b border-gray-700 ">
        <img
          src={user.img}
          className="w-16 aspect-square rounded-full"
          alt=""
        />
        <div className="flex flex-col gap-2">
          <div className="flex gap-2">
            <h3 className="text-lg font-bold">{user.nickname}</h3>
            <p className="text-gray-400">{user.username} • 1h ago</p>
          </div>
          <p className="">{tweet.text}</p>
        </div>
      </div>
    )
  else return <div>couldn't fetch user</div>
}
