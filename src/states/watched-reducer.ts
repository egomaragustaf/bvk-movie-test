import { Movie } from "../types";

interface AddMovie {
  type: "ADD_WATCHED";
  movie: Movie;
}

interface DeleteMovie {
  type: "DELETE_WATCHED";
  movieId: number;
}

interface AddComment {
  type: "ADD_COMMENT";
  payload: {
    movieId: number;
    comment: string;
  };
}

interface SetRating {
  type: "SET_RATING";
  payload: {
    movieId: number;
    rate: number;
  };
}

export type WatchedAction = AddMovie | DeleteMovie | AddComment | SetRating;

const watchedReducer = (movies: Movie[], action: WatchedAction) => {
  switch (action.type) {
    case "ADD_WATCHED":
      action.movie.comment = null;
      action.movie.rating = 0;
      return [action.movie, ...movies];
    case "DELETE_WATCHED":
      return movies.filter((movie) => movie.id !== action.movieId);
    case "ADD_COMMENT":
      return movies.map((movie) => {
        if (movie.id === action.payload.movieId) {
          movie.comment = action.payload.comment;
          return movie;
        }
        return movie;
      });
    case "SET_RATING":
      return movies.map((movie) => {
        if (movie.id === action.payload.movieId) {
          movie.rating = action.payload.rate;
          return movie;
        }
        return movie;
      });
  }
};

export default watchedReducer;
