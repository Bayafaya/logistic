import { create } from 'zustand'
import axios from 'axios'

export const useDriver = create((set) => ({
  driver: {},
  recomendations: [],
  loading:false,
  errorMessage: '',
  fetchDriver: async(id)=>{
    set({loading: true})
    try{
     const response = await axios.get(`https://us-central1-test-c36b4.cloudfunctions.net/myFunction/driver/list?author=${id}`)
      set({driver: response.data[0]})
    }
    catch(error){
      set({errorMessage:error})
      console.error(error)
    }
    finally{
      set({loading: false})
    }
  },
  createDriver: async(data, token)=>{
    try{
     await axios.post(`https://us-central1-test-c36b4.cloudfunctions.net/myFunction/driver`,data,{headers:{
      'Content-Type':'application/json',
      'Authorization': `Bearer ${token}`
     }})
    }
    catch(error){
      set({errorMessage:error})
      console.error(error)
      throw error;
    }
  },
  updateDriver: async(id, data, token)=>{
    try{
     await axios.patch(`https://us-central1-test-c36b4.cloudfunctions.net/myFunction/driver/${id}`,data,{headers:{
      'Content-Type':'application/json',
      'Authorization': `Bearer ${token}`
     }})
    }
    catch(error){
      set({errorMessage:error})
      console.error(error)
      throw error;
    }
  },
  getRecomendations: async(token)=>{
    const response = await axios.get(`https://us-central1-test-c36b4.cloudfunctions.net/myFunction/driver/recomendations`, {
      headers: {
        'authorization': `Bearer ${token}`
      }
    })
    set({ recomendations: response.data })
  },
}))
