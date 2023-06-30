import { create } from 'zustand'
import { persist, createJSONStorage  } from 'zustand/middleware'

export const useOrder = create(persist((set) => ({
  orders: [],
  setAdd: (payload) => set((state) => ({ orders: [...state.orders, { ...payload, id: Date.now() }] })),
}), {
  name: 'order-storage',
  storage: createJSONStorage(() => localStorage),
}))