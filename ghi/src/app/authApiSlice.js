import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";


export const authAPI = createApi({
    reducerPath: 'authAPI',
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
        getUser: builder.query({
            query: () => ({
                url: '/token',
                credentials: 'include',
            }),
            transformResponse: (response) => response?.user || null,
            providesTags: ["User"],
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
        getAllUsers: builder.query({
            query: () => ({
                url: "/api/users/"
            }),
            transformResponse: (response) => response?.users || null,
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
        getUserSearch: builder.query({
            query: (search) => {
                return {
                    url: `/api/users/${search}`
                };
            },
            transformResponse: (response) => response?.users || null,
        }),
    })
});

export const {
    useLoginMutation,
    useLogoutMutation,
    useSignupMutation,
    useGetUserQuery,
    useGetAllUsersQuery,
    useGetUserSearchQuery,
    useUpdateUserInfoMutation,
} = authAPI;
