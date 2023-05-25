import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/dist/query'

import { bookBountyAPI } from './apiSlice'
import { booksApi } from './booksApi'
import SearchReducer from './SearchSlice'

export const store = configureStore({
  reducer: {
    searchField: SearchReducer,
    [bookBountyAPI.reducerPath]: bookBountyAPI.reducer,
    [booksApi.reducerPath]: booksApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(bookBountyAPI.middleware).concat(booksApi.middleware),
})

setupListeners(store.dispatch);


// state and changing functions
