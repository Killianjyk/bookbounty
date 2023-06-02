import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { createSlice } from "@reduxjs/toolkit";


export const reviewAPI = createApi({
    reducerPath: 'reviewAPI',
    baseQuery: fetchBaseQuery({
        baseUrl: process.env.REACT_APP_API_HOST
    }),
    endpoints: (builder) => ({
        getBooksReviews: builder.query({
            query: (work_id) => {
                return `/api/reviews/${work_id}/`;
            }, 
            transformResponse: (response) => response?.reviews || null,
        }),
        deleteBookReview: builder.mutation({
            query: (work_id) => {
                return {
                    url: `/api/reviews/${work_id}/`,
                    method: "DELETE",
                    credentials: "include",
                };
            }
        }),
        getUserReviews: builder.query({
            query: () => {
                return {
                    url: "/api/reviews/",
                    credentials: "include",
                };
            }
        }),
        makeReview: builder.mutation({
            query: (review) => {
                review = {
                    "stars": review["stars"],
                    "work_id": review["work_id"],
                    "text": review["text"],
                }
                return {
                    url: "/api/reviews/",
                    method: "POST",
                    body: review,
                    credentials: "include",
                };
            }
        }),
        updateReview: builder.mutation({
            query: (review) => {
                return {
                    url: "/api/reviews/",
                    method: "PUT",
                    body: review,
                    credentials: "include",
                };
            }
        })
    })
});

export const {
    useMakeReviewMutation,
    useUpdateReviewMutation,
    useDeleteBookReviewMutation,
    useGetBooksReviewsQuery,
    useGetUserReviewsQuery,
} = reviewAPI;

