import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { setAuth } from "./slices/authSlice";

export const courseApi = createApi({
    reducerPath: "courseApi",
    baseQuery: fetchBaseQuery({
        baseUrl: import.meta.env.VITE_BASE_API_URL,
        prepareHeaders: (headers, { getState }) => {
            const token = getState().authSlice.auth?.token; 
            if (token) {
                headers.set("Authorization", `Bearer ${token}`);
            }
            headers.set("Content-Type", "application/json");
            return headers;
        },
    }),
    tagTypes: ["Courses"],
    endpoints: (builder) => ({
        register: builder.mutation({
            query: (data) => ({
                url: "/register",
                method: "POST",
                body: data,
            }),
            async onQueryStarted(arg, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled; 
                    if (data?.token) {
                        dispatch(setAuth({ token: data.token })); 
                    }
                } catch (error) {
                    console.error("Registration error:", error);
                }
            },
        }),
        login: builder.mutation({
            query: (data) => ({
                url: "/login",
                method: "POST",
                body: data,
            }),
            async onQueryStarted(arg, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled; 
                    if (data?.token) {
                        dispatch(setAuth({ token: data.token })); 
                    }
                } catch (error) {
                    console.error("Login error:", error);
                }
            },
        }),
        createCourse: builder.mutation({
            query: (data) => ({
                url: "/course",
                method: "POST",
                body: data,
            }),
            invalidatesTags: ["Courses"],
        }),
        courses: builder.query({
            query: () => "/course",
            providesTags: ["Courses"],
        }),
    }),
});

export const {
    useRegisterMutation,
    useLoginMutation,
    useCreateCourseMutation,
    useCoursesQuery,
} = courseApi;
