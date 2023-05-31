import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/dist/query'
import { authAPI } from './authApiSlice'
import { booksAPI } from './booksApiSlice'
import { listAPI } from './listApiSlice'
import SearchReducer from './SearchSlice'

export const store = configureStore({
  reducer: {
    searchField: SearchReducer,
    [authAPI.reducerPath]: authAPI.reducer,
    [booksAPI.reducerPath]: booksAPI.reducer,
    [listAPI.reducerPath]: listAPI.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
     .concat(authAPI.middleware)
     .concat(booksAPI.middleware)
     .concat(listAPI.middleware),
})

setupListeners(store.dispatch);


// state and changing functions
