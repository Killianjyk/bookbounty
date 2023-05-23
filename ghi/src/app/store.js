import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/dist/query'

import { bookBountyAPI } from './apiSlice'
import SearchReducer from './SearchSlice'

export const store = configureStore({
  reducer: {
    bookSearch: SearchReducer,
    [bookBountyAPI.reducerPath]: bookBountyAPI.reducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(bookBountyAPI.middleware)
})

setupListeners(store.dispatch);


// state and changing functions
