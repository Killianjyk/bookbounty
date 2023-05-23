import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const bookBountyAPI = createApi({
    reducerPath: 'bookBountyAPI',
    baseQuery: fetchBaseQuery({
        baseUrl: process.env.REACT_APP_API_HOST
    }),
    endpoints: (builder) => ({
        getUser: builder.query({
            query: () => ({
                url: '/token',
                credentials: 'include',
            }),
            transformResponse: (response) => response?.user || null,
            providesTags: ["User"]
        }),
    })
});

export const {useGetUserQuery} = bookBountyAPI;
