import axios from 'axios'
import { create } from 'zustand'

export const useChat = create((set) => ({
  token: '',
  getToken: async(token)=>{
    const response = await axios.get(`http://localhost:3000/chat/token`, {
      headers: {
        'authorization': `Bearer ${token}`
      }
    })
    set({ token: response.data })
    return response.data;
  },
  addUsers: async(data)=>{
    return axios.post(`http://localhost:3000/chat/add/user`,data)
  },
}))
