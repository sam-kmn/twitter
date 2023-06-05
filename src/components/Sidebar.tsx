import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs"
import Link from "next/link"
// import { auth } from "@clerk/nextjs"

const Sidebar = () => {
  // const { userId } = auth()
  return (
    <div className="sm:flex-1 p-5">
      <nav className="mx-auto w-min flex flex-col gap-8 items-start text-white">
        <i className="bi bi-twitter text-3xl"></i>
        <div className="flex items-center gap-4">
          <i className="bi bi-house-fill text-3xl"></i>
          <Link href={"/"} className="hidden sm:block text-xl  tracking-wider">
            Home
          </Link>
        </div>

        <SignedIn>
          {/*
          <div className="flex items-center gap-4">
            <i className="bi bi-bell-fill text-3xl"></i>
            <span className="hidden sm:block text-xl  tracking-wider">
              Notifications
            </span>
          </div>
          */}

          <div className="flex items-center gap-4">
            <UserButton />
            <span className="hidden sm:block text-xl  tracking-wider">
              Profile
            </span>
          </div>
        </SignedIn>

        <button className="hidden sm:block bg-blue-500 w-full py-2 rounded-full">
          Tweet
        </button>
      </nav>
    </div>
  )
}

export default Sidebar
