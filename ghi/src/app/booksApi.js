import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";


export const booksApi = createApi({
    reducerPath: 'books',
    baseQuery: fetchBaseQuery({
        baseUrl: process.env.REACT_APP_API_HOST
    }),
    endpoints: (builder) => ({
        getRandom: builder.query({
            query: () => ({
                url: "/api/books/discover/random/"
            }),
        }),
    })
});

export const {
    useGetRandomQuery
} = booksApi;
