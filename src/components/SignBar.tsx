import Link from "next/link"

export default function SignBar() {
  return (
    <div className="fixed inset-x-0 bottom-0 p-3 bg-blue-500 ">
      <div className="ml-auto w-4/6 flex justify-between pr-7">
        <div className="flex flex-col">
          <h1 className="text-xl font-semibold">
            Don&apos;t miss what&apos;s happening
          </h1>
          <h3>People on Twitter are the first to know.</h3>
        </div>

        <div className=" my-auto flex gap-2">
          <Link
            href={"/sign-in"}
            className="px-4 py-1 h-min border rounded-full"
          >
            Log In
          </Link>
          <Link
            href={"/sign-up"}
            className="px-4 py-1 h-min bg-white text-black border rounded-full"
          >
            Sign Up
          </Link>
        </div>
      </div>
    </div>
  )
}
