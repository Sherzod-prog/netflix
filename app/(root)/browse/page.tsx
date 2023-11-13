"use client";

import React, { useEffect } from "react";
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
} from "@/lib/api";

const Page = () => {
  const { account, pageLoader, setPageLoader } = useGlobalContext();
  const { data: session } = useSession();

  useEffect(() => {
    const getAllMovies = async () => {
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
      ]);
      const tvShows = [
        { title: "Trending TV Shows", data: trendingTv },
        { title: "Top Rated TV Shows", data: topRatedTv },
        { title: "Popular TV Shows", data: popularTv },
      ];
      const moviesShows = [
        { title: "Trending Movies Shows", data: trendingMovies },
        { title: "Top Rated Movies Shows", data: topRatedMovies },
        { title: "Popular Movies Shows", data: popularMovies },
      ];
    };
    setPageLoader(false);
    getAllMovies();
  }, []);

  if (session === null) return <Login />;
  if (account === null) return <ManageAccount />;
  if (pageLoader) return <Loader />;

  return <Common />;
};

export default Page;
