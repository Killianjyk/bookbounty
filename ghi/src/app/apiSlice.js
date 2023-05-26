import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";


export const bookBountyAPI = createApi({
    reducerPath: 'bookBountyAPI',
    baseQuery: fetchBaseQuery({
        baseUrl: process.env.REACT_APP_API_HOST
    }),
    endpoints: (builder) => ({
        login: builder.mutation({
            query: ({username, password}) => {
                const body = new FormData();
                body.append("username", username);
                body.append("password", password);
                return {
                    url: "/token",
                    method: "POST",
                    body,
                    credentials: "include",
                }
            },
            invalidatesTags: ["User"],
        }),
        logout: builder.mutation({
            query: () => ({
                url: "/token",
                method: "DELETE",
                credentials: "include",
            }),
            invalidatesTags: ["User"],
        }),
        signup: builder.mutation({
            query: ({username, password}) => {
                const body = FormData();
                body.append("username", username);
                body.append("password", password);
                return {
                    url: "/api/users/",
                    method: "POST",
                    body,
                    credentials: "include",
                }
            },
            invalidatesTags: ["User"],
        }),
        getUser: builder.query({
            query: () => ({
                url: '/token',
                credentials: 'include',
            }),
            transformResponse: (response) => response?.user || null,
            providesTags: ["User"],
        }),
        getAllUsers: builder.query({
            query: () => ({
                url: "/api/users/"
            }),
            transformResponse: (response) => response?.users || null,
        }),
        getBookSearch: builder.query({
            query: (search) => {
                return {
                    url: `/api/books/discover/${search}`
                };
            },
            transformResponse: (response) => response?.books || null,
        }),
        getBook: builder.query({
            query: (workId) => {
                return {
                    url: `/api/books/${workId}`
                };
            },
        }),
    })
});

export const {
    useLoginMutation,
    useLogoutMutation,
    useSignupMutation,
    useGetUserQuery,
    useGetAllUsersQuery,
    useGetBookSearchQuery,
    useGetBookQuery,
} = bookBountyAPI;
