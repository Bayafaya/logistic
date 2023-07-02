import { create } from 'zustand'
import { persist, createJSONStorage  } from 'zustand/middleware'
import axios from 'axios'

export const useOrder = create(persist((set) => ({
  orders: [],
  loading:false,
  errorMessage: '',
  setAdd: (payload) => set((state) => ({ orders: [...state.orders, { ...payload, id: Date.now() }] })),
  fetchOrders: async()=>{
    set({loading: true})
    try{
     const response = await axios.get(`https://us-central1-test-c36b4.cloudfunctions.net/myFunction/order/list`)
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
  postNewOrder: async(data)=>{
    try{
     const response = await axios.post(`https://us-central1-test-c36b4.cloudfunctions.net/myFunction/order`,data,{headers:{
      'Content-Type':'application/json'
     }})
      set(state=>({orders: [...state.orders,data]}))
    }
    catch(error){
      set({errorMessage:error})
      console.error(error)
    }
   
  },
}), {
  name: 'order-storage',
  storage: createJSONStorage(() => localStorage),
}))