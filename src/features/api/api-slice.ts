import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { UserDTO, User, FollowerDTO, Follower } from "../../types";

export const apiSlice = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: "https://api.github.com/users/" }),
  endpoints: (build) => ({
    getUser: build.query<User, string>({
      query: (username) => username,
      transformResponse: (user: UserDTO) => ({
        name: user.name,
        avatarUrl: user.avatar_url,
        followersCount: user.followers
      })
    }),
    getFollowers: build.query<
      Follower[],
      { username: string; currentPage?: number; pageSize?: number }
    >({
      query: ({ username, currentPage = 1, pageSize = 30 }) =>
        `${username}/followers?per_page=${pageSize}&page=${currentPage}`,
      transformResponse: (followers: FollowerDTO[] = []) =>
        followers.map((follower) => ({
          username: follower.login,
          id: follower.id
        }))
    })
  })
});

export const { useGetUserQuery, useGetFollowersQuery } = apiSlice;
