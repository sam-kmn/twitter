import Link from "next/link"

export default function NewToTwitter() {
  return (
    <div className="flex flex-col gap-4 px-4 py-2 m-4 w-full h-min rounded-2xl border border-gray-600">
      <h1 className="font-semibold text-2xl">New to Twitter?</h1>
      <p className="text-gray-600 text-xs">
        Sign up now to get your own personalized timeline!
      </p>
      <Link
        href={"/sign-up"}
        className="bi bi-google flex justify-center items-center gap-2 bg-white text-black rounded-full py-2"
      >
        Sign up with Google
      </Link>

      <Link
        href={"/sign-up"}
        className="bi bi-apple flex justify-center items-center gap-2 bg-white text-black rounded-full py-2"
      >
        Sign up with Apple
      </Link>

      <Link
        href={"/sign-up"}
        className="bg-white text-black rounded-full py-2 text-center"
      >
        Create account
      </Link>

      <p className="text-gray-600 text-xs">
        By signing up, you agree to the Terms of Service and Privacy Policy,
        including Cookie Use.
      </p>
    </div>
  )
}
