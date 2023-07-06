import axios from 'axios'
import { create } from 'zustand'

export const useChat = create((set) => ({
  token: '',
  getToken: async(token)=>{
    const response = await axios.get(`https://us-central1-test-c36b4.cloudfunctions.net/myFunction/chat/token`, {
      headers: {
        'authorization': `Bearer ${token}`
      }
    })
    set({ token: response.data })
    return response.data;
  },
  addUsers: async(data)=>{
    return axios.post(`https://us-central1-test-c36b4.cloudfunctions.net/myFunction/chat/add/user`,data)
  },
}))
