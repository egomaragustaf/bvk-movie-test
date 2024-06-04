import { useContext, useEffect, useReducer, useState } from "react";
import { useParams } from "react-router-dom";

import AppContext from "~/states/context";
import apiClient from "~/services/apiClient";
import { Layout } from "~/components/layout/layout";
import { HeaderMovie } from "~/components/shared/header-movie";
import watchedReducer from "~/states/watched-reducer";
import { DescriptionMovie } from "~/components/shared/description-movie";
import { TopCastMovie } from "~/components/shared/top-cast-movie";

import { Movie as MovieType } from "../types";
import { FormCommentMovie } from "~/components/shared/form-comment-movie";

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

const loadCommentsFromLocalStorage = (movieId: number) => {
  const data = localStorage.getItem(`comments-${movieId}`);
  if (data) {
    return JSON.parse(data) as string[];
  }
  return [];
};

const saveCommentsToLocalStorage = (movieId: number, comments: string[]) => {
  localStorage.setItem(`comments-${movieId}`, JSON.stringify(comments));
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
  const [comments, setComments] = useState<string[]>([]);

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
        setComments(loadCommentsFromLocalStorage(parseInt(params.id!)));
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

  useEffect(() => {
    if (movie) {
      saveCommentsToLocalStorage(movie.id, comments);
    }
  }, [comments, movie]);

  const handleClick = (movie: MovieType) => {
    const isExist = watched.some((w) => w.id === movie.id);
    if (isExist) {
      dispatchWatched({ type: "DELETE_WATCHED", movieId: movie.id });
    } else {
      dispatchWatched({ type: "ADD_WATCHED", movie });
    }
  };

  const handleAddComment = (comment: string) => {
    setComments((prevComments) => [...prevComments, comment]);
  };

  const isWatched = watched.some((w) => w.id === movie?.id);
  return (
    <Layout>
      {movie ? (
        <>
          <HeaderMovie
            movie={movie}
            onClick={() => handleClick(movie)}
            isWatched={isWatched ? "checked" : "default"}
          />
          <DescriptionMovie
            movie={movie}
            onClick={() => handleClick(movie)}
            isWatched={isWatched ? "checked" : "default"}
          />
          <TopCastMovie credits={movie.credits} />
          {isWatched && (
            <>
              <FormCommentMovie
                movieId={movie.id}
                onAddComment={handleAddComment}
              />
              <div className="mt-4 space-y-2">
                <h2 className="text-xl font-semibold">Comments</h2>
                <ul className="list-disc pl-5 space-y-4">
                  {comments.map((comment, index) => (
                    <li key={index} className="border-b pb-4">
                      {comment}
                    </li>
                  ))}
                </ul>
              </div>
            </>
          )}
        </>
      ) : (
        <p>Loading...</p>
      )}
    </Layout>
  );
}
