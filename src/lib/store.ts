import { create } from "zustand"

interface TweetStore {
  data: any[]
  nextPage: number
  lastPage: number | undefined
  isLoading: boolean
  fetchPage: () => void
  addTweet: (data: Tweet) => void
}

type Tweet = {
  id: string
  userId: string
  text: string
  image: null
  likes: []
  createdAt: string
  updatedAt: string
  user: {
    username: string
    firstName: string
    lastName: string
    imageUrl: string
  }
}

export const useTweets = create<TweetStore>((set, get) => ({
  data: [],
  nextPage: 0,
  lastPage: undefined,
  isLoading: false,

  addTweet: (tweet) => {
    set({
      data: [[{ ...tweet }], ...get().data],
    })
  },

  fetchPage: async () => {
    if (get().lastPage != undefined && get().nextPage > get().lastPage)
      return console.warn("You are already at last page!")
    try {
      set({ isLoading: true })
      const resposne = await (
        await fetch(`/api/tweets/explore?page=${get().nextPage}`)
      ).json()

      // console.log("store.fetchPage() ", get().nextPage)
      set({
        data: [...get().data, resposne.payload],
        nextPage: get().nextPage + 1,
        lastPage: resposne.lastPage,
      })
    } catch (error) {
      console.warn("Page dosnt exist!")
    } finally {
      set({ isLoading: false })
    }
  },
}))
