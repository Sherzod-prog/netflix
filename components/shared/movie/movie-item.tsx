"use client";
import React, { Dispatch, SetStateAction, useState } from "react";
import { FavouriteProps, MovieProps } from "@/types";
import { motion } from "framer-motion";
import Image from "next/image";
import { ChevronDown, Loader2, MinusIcon, PlusIcon } from "lucide-react";

interface Props {
  movie: MovieProps;
  favouriteId?: string;
  setFavourites?: Dispatch<SetStateAction<FavouriteProps[]>>;
}

const MovieItem = ({ movie, favouriteId = "", setFavourites }: Props) => {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <motion.div>
      <div
        className={
          "relative cardWrapper h-28 min-w-[180px] cursor-pointer md:h-36 md:min-w-[260px] transform transition duration-500 hover:scale-110 hover:z-[999]"
        }
      >
        <Image
          src={`${process.env.NEXT_PUBLIC_TMDB_IMAGE_BASE_URL}${
            movie?.backdrop_path || movie?.poster_path
          }`}
          alt="Media"
          fill
          className={"rounded sm object-cover md:rounded hover:rounded-sm"}
        />
        <div className={"space-x-3 hidden absolute p-2 bottom-0 buttonWrapper"}>
          <button
            className={`cursor-pointer border flex p-2 items-center gap-x-2 rounded-full  text-sm font-semibold transition hover:opacity-90 border-white bg-black opacity-75 text-black`}
          >
            {isLoading ? (
              <Loader2 className={"h-7 w-7 animate-spin text-red-600"} />
            ) : favouriteId?.length ? (
              <MinusIcon
                color="#ffffff"
                className="h-7 w-7"
                //   onClick={onRemove}
              />
            ) : (
              <PlusIcon
                color="#ffffff"
                className="h-7 w-7"
                //   onClick={onAdd}
              />
            )}
          </button>
          <button className="cursor-pointer p-2 border flex items-center gap-x-2 rounded-full  text-sm font-semibold transition hover:opacity-90  border-white  bg-black opacity-75 ">
            <ChevronDown
              color="#fff"
              className="h-7 w-7"
              //   onClick={onHandlerPopup}
            />
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default MovieItem;
