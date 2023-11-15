"use client";

import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useGlobalContext } from "@/context";
import { getMovieDetails } from "@/lib/api";
import { MovieDetailsProps } from "@/types";
import ReactStars from "react-stars";

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
  }, [movie, open]);

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
          <div className={"flex flex-row flex-wrap gap-2 items-center"}>
            <ReactStars
              value={movieDetails?.vote_average}
              count={10}
              edit={false}
            />
            <p className={"text-[#e5b109]"}>{movieDetails?.vote_count}</p>
            {/* <div className={"text-green-400 font-semibold flex gap-2"}> */}
            <span className={"text-green-400 font-semibold flex gap-2"}>
              {movieDetails?.release_date
                ? movieDetails.release_date.split("-")
                : "2023"}
            </span>
            <div
              className={
                "inline-flex border-2 text-green-400 font-semibold border-white/40 rounded px-2"
              }
            >
              HD
            </div>
            {/* </div> */}
          </div>
        </div>
        {movie?.title}
      </DialogContent>
    </Dialog>
  );
};

export default MoviePopup;
