"use client";

import React, { useEffect, useState } from "react";
import Login from "@/components/shared/login";
import { useGlobalContext } from "@/context";
import { useSession } from "next-auth/react";
import ManageAccount from "@/components/shared/manage-account";
import Loader from "@/components/shared/loader";
import Common from "@/components/shared/common";
import {
  getTrandingMovies,
  getTopratedMovies,
  getPopularMovies,
  getFavourites,
} from "@/lib/api";
import { MovieDataProps, MovieProps } from "@/types";

const Page = () => {
  const { account, pageLoader, setPageLoader } = useGlobalContext();
  const { data: session }: any = useSession();
  const [moviesData, setMoviesData] = useState<MovieDataProps[]>([]);

  useEffect(() => {
    const getAllMovies = async () => {
      try {
        const [
          trendingTv,
          topRatedTv,
          popularTv,
          trendingMovies,
          topRatedMovies,
          popularMovies,
        ] = await Promise.all([
          getTrandingMovies("tv"),
          getTopratedMovies("tv"),
          getPopularMovies("tv"),
          getTrandingMovies("movie"),
          getTopratedMovies("movie"),
          getPopularMovies("movie"),

          getFavourites(session?.user?.id, session?._id),
        ]);
        const tvShows: MovieDataProps[] = [
          { title: "Trending TV Shows", data: trendingTv },
          { title: "Top Rated TV Shows", data: topRatedTv },
          { title: "Popular TV Shows", data: popularTv },
        ].map((item) => ({
          ...item,
          data: item.data.map((movie: MovieProps) => ({
            ...movie,
            type: "tv",
            addedToFavorites: false,
          })),
        }));

        const moviesShows: MovieDataProps[] = [
          { title: "Trending Movies Shows", data: trendingMovies },
          { title: "Top Rated Movies Shows", data: topRatedMovies },
          { title: "Popular Movies Shows", data: popularMovies },
        ].map((item) => ({
          ...item,
          data: item.data.map((movie: MovieProps) => ({
            ...movie,
            type: "movie",
            addedToFavorites: false,
          })),
        }));
        const allMovies: MovieDataProps[] = [...moviesShows, ...tvShows];
        setMoviesData(allMovies);
      } catch (error) {
        console.log(error);
      } finally {
        setPageLoader(false);
      }
    };
    getAllMovies();
  }, [session]);

  if (session === null) return <Login />;
  if (account === null) return <ManageAccount />;
  if (pageLoader) return <Loader />;

  return <Common moviesData={moviesData} />;
};

export default Page;
