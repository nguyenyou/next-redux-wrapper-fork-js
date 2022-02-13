import { createWrapper } from 'next-redux'
import { configureStore, createSlice } from '@reduxjs/toolkit'

export const counterSlice = createSlice({
  name: 'counter',
  initialState: {
    value: 0,
  },
  reducers: {
    increment: (state) => {
      state.value += 1
    },
    decrement: (state) => {
      state.value -= 1
    },
  },
})

export const { increment, decrement } = counterSlice.actions

export const makeStore = () => {
  return configureStore({
    reducer: {
      [counterSlice.name]: counterSlice.reducer,
    },
  })
}

export const wrapper = createWrapper(makeStore)
