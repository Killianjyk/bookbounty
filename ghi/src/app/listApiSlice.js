import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";


export const listAPI = createApi({
    reducerPath: 'listAPI',
    baseQuery: fetchBaseQuery({
        baseUrl: process.env.REACT_APP_API_HOST
    }),
    endpoints: (builder) => ({
        addFavoriteStatus: builder.mutation({
            query: (work_id) => {
                return {
                    url: "/api/favorites/",
                    method: "POST",
                    body: {"work_id": work_id},
                    credentials: "include",
                }
            }
        }),
        getFavoriteBooks: builder.query({
            query: (username) => {
                return {
                    url: `/api/favorites/${username}/`
                };
            },
            transformResponse: (response) => response?.favorites || null,
        }),
        getFavoriteStatus: builder.query({
            query: ({ username, work_id }) => {
                return {
                    url: `/api/favorites/${username}/${work_id}/`,
                    credentials: "include",
                };
            },
        }),
        removeFavoriteStatus: builder.mutation({
            query: ({ username, work_id }) => {
                return {
                    url: `/api/favorites/${username}/${work_id}/`,
                    method: "DELETE",
                    credentials: "include",
                };
            },
        }),
        addNextStatus: builder.mutation({
            query: (work_id) => {
                return {
                    url: "/api/next/",
                    method: "POST",
                    body: {"work_id": work_id},
                    credentials: "include",
                }
            }
        }),
        getNextBooks: builder.query({
            query: (username) => {
                return {
                    url: `/api/next/${username}/`
                };
            },
            transformResponse: (response) => response?.next || null,
        }),
        getNextStatus: builder.query({
            query: ({ username, work_id }) => {
                return {
                    url: `/api/next/${username}/${work_id}/`,
                    credentials: "include",
                };
            },
        }),
        removeNextStatus: builder.mutation({
            query: ({ username, work_id }) => {
                return {
                    url: `/api/next/${username}/${work_id}/`,
                    method: "DELETE",
                    credentials: "include",
                };
            },
        }),
        addPreviousStatus: builder.mutation({
            query: (work_id) => {
                return {
                    url: "/api/previous/",
                    method: "POST",
                    body: {"work_id": work_id},
                    credentials: "include",
                }
            }
        }),
        getPreviousBooks: builder.query({
            query: (username) => {
                return {
                    url: `/api/previous/${username}/`
                };
            },
            transformResponse: (response) => response?.previous || null,
        }),
        getPreviousStatus: builder.query({
            query: ({ username, work_id }) => {
                return {
                    url: `/api/previous/${username}/${work_id}/`,
                    credentials: "include",
                };
            },
        }),
        removePreviousStatus: builder.mutation({
            query: ({ username, work_id }) => {
                return {
                    url: `/api/previous/${username}/${work_id}/`,
                    method: "DELETE",
                    credentials: "include",
                };
            },
        }),
    })
});

export const {
    useGetFavoriteBooksQuery,
    useGetFavoriteStatusQuery,
    useRemoveFavoriteStatusMutation,
    useAddFavoriteStatusMutation,
    useGetNextBooksQuery,
    useGetNextStatusQuery,
    useRemoveNextStatusMutation,
    useAddNextStatusMutation,
    useGetPreviousBooksQuery,
    useGetPreviousStatusQuery,
    useRemovePreviousStatusMutation,
    useAddPreviousStatusMutation,
} = listAPI;
