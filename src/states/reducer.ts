interface VisibilityRating {
  type: "VISIBILITY_RATING";
  show: boolean;
}

interface SetSelectedMovie {
  type: "SET_SELECTED_MOVIE";
  movieId: number;
}

export interface GeneralAppState {
  rating: boolean;
  movieId: number;
}

export type AppAction = VisibilityRating | SetSelectedMovie;

const appReducer = (appState: GeneralAppState, action: AppAction) => {
  switch (action.type) {
    case "VISIBILITY_RATING":
      return { ...appState, rating: action.show };
    case "SET_SELECTED_MOVIE":
      return { ...appState, movieId: action.movieId };
  }
};

export default appReducer;
