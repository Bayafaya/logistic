import { create } from 'zustand'
import axios from 'axios'

export const useOrder = create((set) => ({
  orders: [],
  recomendations: [],
  loading:false,
  errorMessage: '',
  setAdd: (payload) => set((state) => ({ orders: [...state.orders, { ...payload, id: Date.now() }] })),
  fetchOrders: async(params = {})=>{
    set({loading: true})
    try{
     const response = await axios.get(`https://us-central1-test-c36b4.cloudfunctions.net/myFunction/order/list`, { params })
      set({orders: [...response.data]})
    }
    catch(error){
      set({errorMessage:error})
      console.error(error)
    }
    finally{
      set({loading: false})
    }
  },
  postNewOrder: async(data,token)=>{
    try{
      await axios.post(`https://us-central1-test-c36b4.cloudfunctions.net/myFunction/order`,data,{headers:{
      'Content-Type':'application/json',
      'Authorization': `Bearer ${token}`
     }})
      set(state=>({orders: [...state.orders,data]}))
    }
    catch(error){
      set({errorMessage:error})
      console.error(error)
      throw error;
    }
  },
  getRecomendations: async(token)=>{
    const response = await axios.get(`https://us-central1-test-c36b4.cloudfunctions.net/myFunction/order/recomendations`, {
      headers: {
        'authorization': `Bearer ${token}`
      }
    })
    set({ recomendations: response.data })
  },
  sendOffer: async(data, token)=>{
    return axios.post(`https://us-central1-test-c36b4.cloudfunctions.net/myFunction/order/send-offer`, data, {
      headers: {
        'Authorization': `Bearer ${token}`
      },
    })
  },
  cancelOffer: async(data)=>{
    return axios.post(`https://us-central1-test-c36b4.cloudfunctions.net/myFunction/order/cancel-offer`, data)
  },
  acceptOffer: async(data)=>{
    return axios.post(`https://us-central1-test-c36b4.cloudfunctions.net/myFunction/order/accept-offer`, data)
  },
}))
