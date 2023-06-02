import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/dist/query'
import { authAPI } from './authApiSlice'
import { booksAPI } from './booksApiSlice'
import { listAPI } from './listApiSlice'
import { reviewAPI } from './reviewApiSlice'
import SearchReducer from './SearchSlice'

export const store = configureStore({
  reducer: {
    searchField: SearchReducer,
    [authAPI.reducerPath]: authAPI.reducer,
    [booksAPI.reducerPath]: booksAPI.reducer,
    [listAPI.reducerPath]: listAPI.reducer,
    [reviewAPI.reducerPath]: reviewAPI.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
     .concat(authAPI.middleware)
     .concat(booksAPI.middleware)
     .concat(listAPI.middleware)
     .concat(reviewAPI.middleware),
})

setupListeners(store.dispatch);


// state and changing functions
