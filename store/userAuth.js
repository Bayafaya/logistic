import { create } from 'zustand'

const useUserAuth = create((set) => ({
    user: {},
    increasePopulation: () => set((state) => ({ bears: state.bears + 1 })),
    removeAllBears: () => set({ bears: 0 }),
  }))