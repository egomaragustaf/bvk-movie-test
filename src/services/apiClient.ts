import axios, { CanceledError } from "axios";

export default axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  params: {
    language: "en-US",
    api_key: import.meta.env.VITE_API_KEY,
    append_to_response: "credits,keywords,reviews",
  },
  headers: {
    Accept: "application/json",
    Authorization: `Bearer ${import.meta.env.VITE_API_SECRET}`,
  },
});

export { CanceledError };
