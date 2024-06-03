import { IconStarFilled } from "@tabler/icons-react";
import { Card, CardContent } from "~/components/ui/card";
import { Movie } from "~/types";
import { WatchedButton } from "~/components/shared/watched-button";

interface CardMovieProps {
  movie: Movie;
  isWatched: "default" | "checked";
  onClick: () => void;
}

export function CardMovie({ movie, isWatched, onClick }: CardMovieProps) {
  return (
    <Card className="flex flex-col h-full">
      <div className="relative flex-grow">
        <div className="absolute flex items-center justify-center bg-gray-900 top-2 left-2 px-2 py-1 rounded-md text-xs font-medium">
          <IconStarFilled className="text-yellow-400 mr-2" size={20} />
          <p className="text-white">
            {Math.floor(movie.vote_average! * 10) / 10}
          </p>
        </div>
        <img
          src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
          alt={movie.title}
          width={250}
          height={400}
          className="w-full h-full object-cover rounded-t-md"
        />
      </div>
      <CardContent className="p-4 flex flex-col justify-center items-center gap-2">
        <h3 className="font-semibold text-gray-900 dark:text-gray-50 line-clamp-2">
          {movie.title}
        </h3>
        <p className="text-gray-500 dark:text-gray-400 text-sm">
          {movie.release_date}
        </p>
        <div className="mt-auto">
          <WatchedButton isWatched={isWatched} onClick={onClick} />
        </div>
      </CardContent>
    </Card>
  );
}
