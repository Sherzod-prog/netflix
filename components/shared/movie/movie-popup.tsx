"use client";

import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useGlobalContext } from "@/context";
import { getMovieDetails } from "@/lib/api";
import { MovieDetailsProps } from "@/types";

import React, { useEffect, useState } from "react";

const MoviePopup = () => {
  const [movieDetails, setMovieDetails] = useState<MovieDetailsProps | null>(
    null
  );

  const { open, setOpen, movie } = useGlobalContext();

  useEffect(() => {
    const getMovie = async () => {
      try {
        const extractMovieDetails = await getMovieDetails(
          movie?.type,
          movie?.id
        );
        setMovieDetails(extractMovieDetails);
      } catch (error) {
        console.log(error);
      } finally {
      }
    };
    getMovie();
  }, [movie]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className={" max-w-4xl"}>
        <div className={"h-56 w-full bg-black"}></div>
        <div className={"flex flex-col space-y-4"}>
          <h1
            className={
              " text-2xl md:text-4xl lg:text-4xl font-bold line-clamp-1"
            }
          >
            {movie?.title || movie?.name || movie?.original_name}
          </h1>
          <p className={"text-shadow-md text-sm text-slate-500"}>
            {movie?.overview}
          </p>
        </div>
        {movie?.title}
      </DialogContent>
    </Dialog>
  );
};

export default MoviePopup;
