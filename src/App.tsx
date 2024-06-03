import { RouterProvider } from "react-router-dom";
import { useReducer } from "react";

import router from "./utils/routes";
import AppContext from "./states/context";
import watchedReducer from "./states/watched-reducer";
import moviesReducer from "./states/movies-reducer";
import appReducer, { GeneralAppState } from "./states/reducer";

export default function App() {
  const [watchedMovies, dispatchWatched] = useReducer(watchedReducer, []);
  const [movies, dispatchMovies] = useReducer(moviesReducer, []);
  const [appState, dispatchApp] = useReducer(appReducer, {} as GeneralAppState);
  return (
    <AppContext.Provider
      value={{
        watchedMovies,
        dispatchWatched,
        movies,
        dispatchMovies,
        appState,
        dispatchApp,
      }}>
      <RouterProvider router={router} />
    </AppContext.Provider>
  );
}
