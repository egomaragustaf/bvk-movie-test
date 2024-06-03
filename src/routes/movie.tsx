import { useContext, useEffect, useReducer, useState } from "react";
import { useParams } from "react-router-dom";
import AppContext from "~/states/context";
import apiClient from "~/services/apiClient";
import { Layout } from "~/components/layout/layout";
import { HeaderMovie } from "~/components/shared/header-movie"; // assuming this is the correct path
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

export default function MovieDetail() {
  const params = useParams();
  const { watchedMovies, dispatchApp } = useContext(AppContext);
  const [movie, setMovie] = useState<MovieType | undefined>(undefined);
  const [watched, dispatchWatched] = useReducer(
    watchedReducer,
    [],
    loadFromLocalStorage
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await apiClient.get(`/movie/${params.id}`);
        setMovie(res.data);
        dispatchApp({
          type: "SET_SELECTED_MOVIE",
          movieId: parseInt(params.id!),
        });

        document.title = `${res.data.title} (${res.data.release_date}) - BVK Movie`;
      } catch (error) {
        console.error("Failed to fetch movie details:", error);
      }
    };

    fetchData();

    return () => {
      dispatchApp({ type: "SET_SELECTED_MOVIE", movieId: 0 });
    };
  }, [params.id, watchedMovies, dispatchApp]);

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

  const isWatched = watched.some((w) => w.id === movie?.id)
    ? "checked"
    : "default";

  return (
    <Layout>
      {movie ? (
        <HeaderMovie
          movie={movie}
          onClick={() => handleClick(movie)}
          isWatched={isWatched}
        />
      ) : (
        <p>Loading...</p>
      )}
    </Layout>
  );
}
