import "./globals.css"
import "bootstrap-icons/font/bootstrap-icons.css"
// import { Poppins } from "next/font/google"
import { ClerkProvider } from "@clerk/nextjs"
import Sidebar from "@/components/Sidebar"
import NewToTwitter from "@/components/NewToTwitter"

import { SignedIn, SignedOut } from "@clerk/nextjs"
import SignBar from "@/components/SignBar"

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body>
          <main className="flex justify-center overflow-hidden">
            <Sidebar />

            <div className="flex-1 sm:basis-1/2 max-w-2xl flex flex-col border-x border-gray-700 h-screen overflow-scroll relative">
              {children}
            </div>

            <div className="hidden lg:flex flex-1 h-screen">
              <SignedOut>
                <NewToTwitter />
                <SignBar />
              </SignedOut>
              <SignedIn>
                <div className="w-full text-center p-5">
                  <p className="text-xl xl:text-2xl font-medium">
                    Popular tags
                  </p>
                  <p>Work in Progress 🚧</p>
                </div>
              </SignedIn>
            </div>
          </main>
        </body>
      </html>
    </ClerkProvider>
  )
}
