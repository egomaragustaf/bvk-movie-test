import { IconStarFilled } from "@tabler/icons-react";
import { Movie } from "~/types";
import { WatchedButton } from "./watched-button";

interface HeaderMovieProps {
  movie?: Movie;
  isWatched: "default" | "checked";
  onClick: () => void;
}

export function HeaderMovie({ movie, isWatched, onClick }: HeaderMovieProps) {
  return (
    <div className="relative w-full h-[600px] overflow-hidden">
      <img
        src={`https://image.tmdb.org/t/p/w1920_and_h800_multi_faces${movie?.backdrop_path}`}
        alt={movie?.title}
        width={1920}
        height={1080}
        className="absolute inset-0 w-full h-full object-cover brightness-50 blur-sm"
      />
      <div className="relative z-10 max-w-5xl mx-auto px-4 py-12 md:px-6 lg:py-24">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div className="flex justify-center">
            <img
              src={`https://image.tmdb.org/t/p/w300${movie?.poster_path}`}
              alt={movie?.title}
              width={300}
              height={450}
              className="w-full max-w-[300px] rounded-lg shadow-lg"
            />
          </div>
          <div className="space-y-4">
            <h1 className="text-3xl font-bold tracking-tight lg:text-4xl">
              {movie?.title}
            </h1>
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-0.5">
                <IconStarFilled className="text-yellow-400 mr-2" size={20} />
              </div>
              <span className="text-lg font-medium">
                {Math.floor((movie?.vote_average ?? 0) * 10) / 10}
              </span>
            </div>
            <p className="text-gray-200">{movie?.overview}</p>
            <WatchedButton isWatched={isWatched} onClick={onClick} />
          </div>
        </div>
      </div>
    </div>
  );
}
