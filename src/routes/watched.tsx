import { useEffect, useReducer } from "react";
import { CardMovie } from "~/components/shared/card-movie";
import watchedReducer from "~/states/watched-reducer";
import { Layout } from "~/components/layout/layout";

import { Movie as MovieType } from "../types";
import { Link } from "react-router-dom";
import { Button } from "~/components/ui/button";

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
    <Layout>
      <h1 className="text-4xl">Watched Movies</h1>
      <ul className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 p-4 md:p-6">
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
          <div className="flex flex-col space-y-2">
            <p>No watched movies found.</p>
            <Button asChild>
              <Link to="/">Add movie!</Link>
            </Button>
          </div>
        )}
      </ul>
    </Layout>
  );
}
