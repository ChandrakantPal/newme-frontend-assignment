import Image from "next/image";
import { Inter } from "next/font/google";
import * as React from "react";
import Header from "@/components/Header";
import axios from "axios";
import MovieCard from "@/components/MovieCard";
import Loading from "@/components/Loading";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [movies, setMovies] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState(null);
  const [searchQuery, setSearchQuery] = React.useState("");
  const [debouncedSearchQuery, setDebouncedSearchQuery] = React.useState("");
  const searchMovies = React.useCallback(async () => {
    setIsLoading(true);
    setError("");
    console.log(process.env.NEXT_PUBLIC_API_KEY);
    try {
      const response = await axios.get("http://www.omdbapi.com/", {
        params: {
          apikey: process.env.NEXT_PUBLIC_API_KEY,
          s:
            debouncedSearchQuery !== ""
              ? debouncedSearchQuery.trim()
              : "bourne", // since OMDBAPI doesn't support empty string and doesn't have a default api to get latest movies
        },
      });

      const data = response.data;
      console.log({ data });
      if (data.Response === "True") {
        setMovies(data.Search);
      } else {
        setError(data.Error);
      }
      setIsLoading(false);
    } catch (e) {
      setError("Something went wrong please try again");
      setIsLoading(false);
    }
  }, [debouncedSearchQuery]);

  React.useEffect(() => {
    searchMovies();
  }, [searchMovies]);

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchQuery(searchQuery);
    }, 1000);
    return () => {
      clearTimeout(timer);
    };
  }, [searchQuery]);

  return (
    <>
      <Header searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      <main
        className={`flex min-h-screen flex-col items-center justify-between p-6 md:p-10 ${inter.className}`}
      >
        {error ? (
          <div className="text-lg text-red-500">{error}</div>
        ) : isLoading ? (
          <Loading />
        ) : (
          <div className="grid items-center grid-cols-2 gap-4 auto-rows-auto lg:grid-cols-4 md:grid-cols-3">
            {movies?.map((item) => (
              <MovieCard
                key={item.imdbID}
                imageSrc={item?.Poster}
                title={item?.Title}
                year={item?.Year}
              />
            ))}
          </div>
        )}
      </main>
    </>
  );
}
