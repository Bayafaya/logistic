import axios from 'axios'
import { create } from 'zustand'
import { persist, createJSONStorage  } from 'zustand/middleware'
import { API } from '../api/index'
export const useUserAuth = create(persist((set) => ({
    user: {},
    setUser: (newValue) => set((state) => ({ user: newValue })),
    removeUser: () => set({ user: {} }),
    signIn:async (data)=>{
      const response = await axios.post(`${API}/auth/signin`,data)
      set({user:response.data});
    },
    signUp:async (data)=>{
      const response = await axios.post(`${API}/auth/signup`,data)
      set({user:response.data});
    },
    logout: () => {
      set(() => ({ user: null }));
      localStorage.removeItem("user-storage")
    }
  }),
  {
    name: 'user-storage', 
    storage: createJSONStorage(() => localStorage), 
  }
  ))