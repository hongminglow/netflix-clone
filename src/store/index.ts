import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export type User = { id: string; email: string }
export type Profile = { id: string; name: string }

interface AppState {
  session: {
    user: User | null
    profile: Profile | null
  }
  setSession: (updater: (prev: AppState['session']) => AppState['session']) => void
  
  myLists: Record<string, string[]> // profileId -> movieIds
  addToList: (profileId: string, movieId: string) => void
  removeFromList: (profileId: string, movieId: string) => void

  lang: 'en' | 'bm' | 'zh' | 'ms'
  setLang: (lang: 'en' | 'bm' | 'zh' | 'ms') => void
}

export const useStore = create<AppState>()(
  persist(
    (set) => ({
      session: {
        user: null,
        profile: null,
      },
      setSession: (updater) =>
        set((state) => ({ session: updater(state.session) })),

      myLists: {},
      addToList: (profileId, movieId) =>
        set((state) => {
          const list = state.myLists[profileId] || []
          if (list.includes(movieId)) return state
          return { myLists: { ...state.myLists, [profileId]: [...list, movieId] } }
        }),
      removeFromList: (profileId, movieId) =>
        set((state) => {
          const list = state.myLists[profileId] || []
          return {
            myLists: {
              ...state.myLists,
              [profileId]: list.filter((id) => id !== movieId),
            },
          }
        }),

      lang: 'en',
      setLang: (lang) => set({ lang }),
    }),
    {
      name: 'nf.store', // name of the item in the storage (must be unique)
    }
  )
)
