import { Credit } from "./credit";
import { Genre } from "./genre";
import { Review } from "./review";

export type Movie = {
  id: number;
  title: string;
  overview: string;
  poster_path: string;
  release_date: string;
  genres?: Genre[];
  runtime?: number;
  status?: string;
  original_language?: string;
  budget?: string;
  revenue?: string;
  keywords?: {
    keywords: {
      id: number;
      name: string;
    }[];
  };
  vote_average?: number;
  reviews?: {
    page?: number;
    results: Review[];
  };
  comment?: string | null;
  rating?: number;
  backdrop_path?: string;
  credits?: {
    cast: Credit[];
    crew: Credit[];
  };
};
