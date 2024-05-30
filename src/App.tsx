import { useEffect, useState } from "react";
import axios from "axios";

interface Movie {
  id: number;
  title: string;
  overview: string;
  poster_path: string;
}

export default function App() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTrendingMovies = async () => {
      try {
        const response = await axios.get(
          "https://api.themoviedb.org/3/trending/movie/day",
          {
            params: {
              api_key: import.meta.env.VITE_TMDB_API_KEY,
              language: "en-US",
            },
          }
        );
        const movies = response.data.results;
        setMovies(movies);
      } catch (err) {
        setError("Error");
      }
    };

    fetchTrendingMovies();
  }, []);

  return (
    <div>
      {error && <p>Error fetching data: {error}</p>}
      <pre>{JSON.stringify(movies, null, 2)}</pre>
    </div>
  );
}
