import { useEffect, useReducer } from "react";
import { CardMovie } from "~/components/shared/card-movie";
import { Movie as MovieType } from "../types";
import watchedReducer from "~/states/watched-reducer";

const loadFromLocalStorage = () => {
  const data = localStorage.getItem("watchedMovies");
  if (data) {
    return JSON.parse(data) as MovieType[];
  }
  return [];
};

const saveToLocalStorage = (movies: MovieType[]) => {
  localStorage.setItem("watchedMovies", JSON.stringify(movies));
};

export default function Watched() {
  const [watched, dispatchWatched] = useReducer(
    watchedReducer,
    [],
    loadFromLocalStorage
  );

  useEffect(() => {
    saveToLocalStorage(watched);
  }, [watched]);

  const handleClick = (movie: MovieType) => {
    const isExist = watched.some((w) => w.id === movie.id);
    if (isExist) {
      dispatchWatched({ type: "DELETE_WATCHED", movieId: movie.id });
    } else {
      dispatchWatched({ type: "ADD_WATCHED", movie });
    }
  };

  return (
    <div className="flex items-center justify-center flex-col">
      <h1>Watched Movies</h1>
      <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 p-4 md:p-6">
        {watched.length > 0 ? (
          watched.map((movie) => {
            return (
              <li key={movie.id}>
                <CardMovie
                  movie={movie}
                  isWatched="checked"
                  onClick={() => handleClick(movie)}
                />
              </li>
            );
          })
        ) : (
          <p>No watched movies found.</p>
        )}
      </ul>
    </div>
  );
}
