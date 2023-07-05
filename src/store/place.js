import { create } from 'zustand'

export const usePlace = create((set) => ({
    places: [],
    startAndEndAddressName:{
        start:'',
        end:'',
    },
    setPlaces: (newPlace)=> set(state=>({places:[...state.places, newPlace]})),
    setStartAddress: (newValue)=> set(state=>({startAndEndAddressName:{
        start:newValue,
        end:state.startAndEndAddressName.end
    }})),
    setEndAddress: (newValue)=> set(state=>({startAndEndAddressName:{
        start: state.startAndEndAddressName.start,
        end:newValue
    }})),

  }))