import { RouterProvider } from "react-router-dom";
import router from "./utils/routes";

export default function App() {
  return <RouterProvider router={router} />;
}
