import { create } from "zustand"

interface TweetStore {
  data: any[]
  page: number
  lastPage: boolean
  isLoading: boolean
  nextPage: () => void
  fetchDataPacket: () => void
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
  page: 0,
  lastPage: false,
  isLoading: false,

  addTweet: (tweet) => {
    set({
      data: [[{ ...tweet }], ...get().data],
    })
  },

  nextPage: async () => {
    if (get().lastPage) return
    try {
      set({ isLoading: true })
      const resposne = await fetch(`/api/tweets/explore?page=${get().page}`)
      const tweetPack = await resposne.json()
      console.log("fetch page", get().page)
      set({
        data: [...get().data, tweetPack],
        page: get().page + 1,
      })
    } catch (error) {
      set({ lastPage: true })
      console.log("Page dosnt exist!")
    } finally {
      set({ isLoading: false })
    }
  },
  // increasePopulation: () => set((state) => ({ bears: state.bears + 1 })),
  // removeAllBears: () => set({ bears: 0 }),
  fetchDataPacket: async () => {
    set({ isLoading: true })
    const resposne = await fetch(`/api/tweets/explore?page=${get().page}`)
    const tweetPack = await resposne.json()
    console.log(get().page)
    set({
      data: [...get().data, tweetPack],
    })
    set({ isLoading: false })
  },
}))
