export default function Tweet({ tweet }: { tweet: any }) {
  return (
    <div className="flex p-2">
      <div className="w-10 h-10 bg-red-500"></div>
      <div className="flex flex-col gap-2">
        <div className="flex gap-2">
          <h3 className="text-lg font-medium">{tweet.userId}</h3>
          <p className="text-gray-400">@username</p>
        </div>
        <p className="">{tweet.text}</p>
      </div>
    </div>
  )
}
