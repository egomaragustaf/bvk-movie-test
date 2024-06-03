import { useContext, useEffect, useReducer, useState } from "react";
import AppContext from "~/states/context";
import apiClient from "~/services/apiClient";
import { CardMovie } from "~/components/shared/card-movie";
import { Movie as MovieType } from "../types";
import watchedReducer from "~/states/watched-reducer";
import { Layout } from "~/components/layout/layout";

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

export default function Home() {
  const [movies, setMovies] = useState<MovieType[]>([]);
  const { dispatchMovies } = useContext(AppContext);
  const [watched, dispatchWatched] = useReducer(
    watchedReducer,
    [],
    loadFromLocalStorage
  );

  useEffect(() => {
    const fetchData = async () => {
      const response = await apiClient.get("/trending/movie/day");
      setMovies(response.data.results);
      dispatchMovies({ type: "ADD_MOVIES", movies: response.data.results });
    };
    fetchData();
  }, [dispatchMovies]);

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
      <h1 className="text-4xl">Movie List</h1>
      <ul className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 md:p-6">
        {movies &&
          movies.map((movie) => {
            const isWatched = watched.some((w) => w.id === movie.id)
              ? "checked"
              : "default";
            return (
              <li key={movie.id}>
                <CardMovie
                  movie={movie}
                  isWatched={isWatched}
                  onClick={() => handleClick(movie)}
                />
              </li>
            );
          })}
      </ul>
    </Layout>
  );
}
