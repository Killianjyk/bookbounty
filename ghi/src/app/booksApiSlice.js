import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";


export const booksAPI = createApi({
    reducerPath: 'booksAPI',
    baseQuery: fetchBaseQuery({
        baseUrl: process.env.REACT_APP_API_HOST
    }),
    endpoints: (builder) => ({
        getTopFavoriteBooks: builder.query({
            query: () => {
                return {
                    url: "/api/books/"
                };
            },
            transformResponse: (response) => response?.books || null,
        }),
        getBook: builder.query({
            query: (workId) => {
                return {
                    url: `/api/books/${workId}/`
                };
            },
        }),
        getBookSearch: builder.query({
            query: (search) => {
                return {
                    url: `/api/books/discover/${search}/`
                };
            },
            transformResponse: (response) => response?.books || null,
        }),
        getRandom: builder.query({
            query: () => ({
                url: "/api/books/discover/random/"
            }),
        }),
        getFavoriteBooks: builder.query({
            query: (username) => {
                return {
                    url: `/api/favorites/${username}/`
                };
            },
            transformResponse: (response) => response?.favorites || null,
        }),
        getPreviousBooks: builder.query({
            query: (username) => {
                return {
                    url: `/api/previous/${username}/`
                };
            },
            transformResponse: (response) => response?.previous || null,
        }),
        getNextBooks: builder.query({
            query: (username) => {
                return {
                    url: `/api/next/${username}/`
                };
            },
            transformResponse: (response) => response?.next || null,
        }),
    })
});

export const {
    useGetRandomQuery,
    useGetBookSearchQuery,
    useGetBookQuery,
    useGetTopFavoriteBooksQuery,
    useGetFavoriteBooksQuery,
    useGetPreviousBooksQuery,
    useGetNextBooksQuery,
} = booksAPI;
