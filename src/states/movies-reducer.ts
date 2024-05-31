import { Movie } from "../types";

export interface MoviesAction {
  type: "ADD_MOVIES";
  movies: Movie[];
}

const moviesReducer = (movies: Movie[], action: MoviesAction) => {
  switch (action.type) {
    case "ADD_MOVIES":
      return [...action.movies, ...movies];
  }
};

export default moviesReducer;
