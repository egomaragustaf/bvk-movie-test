import { IconStarFilled } from "@tabler/icons-react";
import { Movie } from "~/types";
import { yearReleased } from "~/utils/year-released";
import { WatchedButton } from "./watched-button";
import { BadgeMeta } from "./badge-meta";
import { runtime } from "~/utils/runtime";

interface DescriptionMovieProps {
  movie?: Movie;
  isWatched: "default" | "checked";
  onClick: () => void;
}

export function DescriptionMovie({
  movie,
  isWatched,
  onClick,
}: DescriptionMovieProps) {
  const genres = movie?.genres?.map((genre) => genre.name).join(", ");

  return (
    <div>
      <div className="space-y-4 block md:hidden">
        <h1 className="text-3xl font-bold tracking-tight lg:text-4xl">
          {movie?.title} ({yearReleased(movie?.release_date)})
        </h1>
        <div className="flex gap-2">
          <BadgeMeta>{yearReleased(movie?.release_date)}</BadgeMeta>
          <BadgeMeta>{genres}</BadgeMeta>
          <BadgeMeta>{runtime(movie?.runtime ?? 0)}</BadgeMeta>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-0.5">
            <IconStarFilled className="text-yellow-400 mr-2" size={20} />
          </div>
          <span className="text-lg font-medium">
            {Math.floor((movie?.vote_average ?? 0) * 10) / 10}
          </span>
        </div>
        <p>{movie?.overview}</p>
        <WatchedButton isWatched={isWatched} onClick={onClick} />
      </div>
    </div>
  );
}
