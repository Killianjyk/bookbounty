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
            query: (user) => {
                const body = user;
                return {
                    url: '/api/users/',
                    method: "POST",
                    body: body,
                    credentials: "include",
                };
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
                    url: `/api/books/discover/${search}/`
                };
            },
            transformResponse: (response) => response?.books || null,
        }),
        getUserSearch: builder.query({
            query: (search) => {
                return {
                    url: `/api/users/${search}`
                };
            },
            transformResponse: (response) => response?.users || null,
        }),
        getBook: builder.query({
            query: (workId) => {
                return {
                    url: `/api/books/${workId}/`
                };
            },
        }),
        getTopFavoriteBooks: builder.query({
            query: () => {
                return {
                    url: "/api/books/"
                };
            },
            transformResponse: (response) => response?.books || null,
        }),
        updateUserInfo: builder.mutation({
            query: ({ email, password, full_name }) => {
                const body = {
                    "email": email,
                    "password": password,
                    "full_name": full_name
                };
                return {
                    url: '/api/users/',
                    method: "PUT",
                    body: body,
                    credentials: "include",
                };
            },
            invalidatesTags: ["User"],
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
    useLoginMutation,
    useLogoutMutation,
    useSignupMutation,
    useGetUserQuery,
    useGetAllUsersQuery,
    useGetBookSearchQuery,
    useGetBookQuery,
    useGetTopFavoriteBooksQuery,
    useGetUserSearchQuery,
    useUpdateUserInfoMutation,
    useGetFavoriteBooksQuery,
    useGetPreviousBooksQuery,
    useGetNextBooksQuery,
} = bookBountyAPI;
