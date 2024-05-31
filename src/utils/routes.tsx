import { createBrowserRouter } from "react-router-dom";

import Home from "../routes/home";
import Movie from "../routes/movie";
import Watched from "../routes/watched";

const router = createBrowserRouter([
  { path: "/", element: <Home /> },
  { path: "/movie/:id", element: <Movie /> },
  { path: "/watched", element: <Watched /> },
]);

export default router;
