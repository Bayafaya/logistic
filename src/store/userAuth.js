import { create } from 'zustand'
import { persist, createJSONStorage  } from 'zustand/middleware'

export const useUserAuth = create(persist((set) => ({
    user: {},
    setUser: (newValue) => set((state) => ({ user: newValue })),
    removeUser: () => set({ user: {} }),
  }),
  {
    name: 'user-storage', 
    storage: createJSONStorage(() => localStorage), 
  }

  ))