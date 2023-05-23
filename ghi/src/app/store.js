import { configureStore } from '@reduxjs/toolkit'
import SearchReducer from './SearchSlice'

export const store = configureStore({
  reducer: {
    bookSearch: SearchReducer,
  },
})



// state and changing functions
