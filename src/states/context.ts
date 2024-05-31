import { Dispatch, createContext } from "react";

import { Movie } from "../types";
import { AppAction, GeneralAppState } from "./reducer";
import { WatchedAction } from "./watched-reducer";
import { MoviesAction } from "./movies-reducer";

interface AppContextType {
  watchedMovies: Movie[];
  movies: Movie[];
  appState: GeneralAppState;
  dispatchWatched: Dispatch<WatchedAction>;
  dispatchMovies: Dispatch<MoviesAction>;
  dispatchApp: Dispatch<AppAction>;
}

const AppContext = createContext<AppContextType>({} as AppContextType);

export default AppContext;
