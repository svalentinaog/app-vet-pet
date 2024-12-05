import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react";

interface User {
  id: string;
  name: string;
  email: string;
}

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fakeBaseQuery(),
  endpoints: (builder) => ({
    // getUsers: builder.query<User[], void>({
    //   async queryFn() {
    //     try {
    //     } catch (error: any) {
    //       return { error: { message: error.message } };
    //     }
    //   },
    // }),
    // getUserById: builder.query<User,{id: string}>({
    // }),
  }),
});

// export const { useGetUsersQuery, useGetUserByIdQuery } = userApi;
