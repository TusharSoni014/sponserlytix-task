export interface AnimeResponse {
  mal_id: number;
  url: string;
  images: {
    jpg: {
      image_urlstring: string;
      small_image_url: string;
      large_image_url: string;
    };
    webp: {
      image_url: string;
      small_image_url: string;
      large_image_url: string;
    };
  };
  trailer: {
    youtube_id: string;
    url: string;
    embed_url: string;
    images: {
      image_url: string;
      small_image_url: string;
      medium_image_url: string;
      large_image_url: string;
      maximum_image_url: string;
    };
  };
  approved: true;
  titles: { type: string; title: string }[];
  title: string;
  title_english: string;
  title_japanese: string;
  title_synonyms: string[];
  type: string;
  source: string;
  episodes: number;
  status: string;
  airing: boolean;
  aired: {
    from: string;
    to: string;
    prop: {
      from: { day: number; month: number; year: number };
      to: { day: number; month: number; year: number };
    };
    string: string;
  };
  duration: string;
  rating: string;
  score: number;
  scored_by: number;
  rank: number;
  popularity: number;
  members: number;
  favorites: number;
  synopsis: string;
  background: string;
  season: string;
  year: number;
  broadcast: {
    day: string;
    time: string;
    timezone: string;
    string: string;
  };
  producers: {
    mal_id: number;
    type: string;
    name: string;
    url: string;
  }[];
  licensors: {
    mal_id: number;
    type: string;
    name: string;
    url: string;
  }[];

  studios: {
    mal_id: number;
    type: string;
    name: string;
    url: string;
  }[];

  genres: {
    mal_id: number;
    type: string;
    name: string;
    url: string;
  }[];

  explicit_genres: [];
  themes: {
    mal_id: number;
    type: string;
    name: string;
    url: string;
  }[];
  demographics: {
    mal_id: number;
    type: string;
    name: string;
    url: string;
  }[];
}

import { useEffect, useState } from "react";
import AnimeCard from "./components/AnimeCard";
import axios from "axios";
import AnimeChart from "./components/AnimeChart";

function App() {
  const [animeList, setAnimeList] = useState<AnimeResponse[]>([]);

  const fetchTop20Anime = async () => {
    const response = await axios.get(
      "https://api.jikan.moe/v4/top/anime?filter=bypopularity&limit=20"
    );
    const animeData = response.data.data;
    setAnimeList(animeData);
  };

  useEffect(() => {
    fetchTop20Anime();
  }, []);

  function groupAnimeByYear(animeData: AnimeResponse[]): {
    [year: number]: { count: number; titles: string[] };
  } {
    const animeByYear: { [year: number]: { count: number; titles: string[] } } =
      {};
    for (const anime of animeData) {
      const year = anime.year;
      if (!animeByYear[year]) {
        animeByYear[year] = { count: 0, titles: [] };
      }
      animeByYear[year].count++;
      animeByYear[year].titles.push(anime.title);
    }
    return animeByYear;
  }

  const animeByYear = groupAnimeByYear(animeList);

  const chartDataNew = Object.entries(animeByYear).map(
    ([year, { count, titles }]) => ({
      year: parseInt(year),
      count,
      titles,
    })
  );

  return (
    <div className="relative w-full min-h-screen p-5 bg-black text-white">
      <div className="w-full min-h-screen p-5 gap-5 bg-black text-white grid grid-cols-[repeat(auto-fill,minmax(180px,1fr))]">
        {animeList?.map((anime, index) => {
          return <AnimeCard anime={anime} rank={index + 1} />;
        })}
      </div>
      <AnimeChart chartData={chartDataNew} />
    </div>
  );
}

export default App;
