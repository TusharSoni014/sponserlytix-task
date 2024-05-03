import { AnimeResponse } from "@/App";
import { useState } from "react";

export default function AnimeCard({
  anime,
  rank,
}: {
  anime: AnimeResponse;
  rank: number;
}) {
  const [expand, setExpand] = useState<boolean>(false);

  const handleClick = () => {
    setExpand(true);
  };

  const handleRelease = () => {
    setExpand(false);
  };

  return (
    <div
      onMouseDown={handleClick}
      onMouseUp={handleRelease}
      className={`w-full aspect-[2/3] h-full transition ${
        expand ? "scale-110" : ""
      } cursor-pointer rounded bg-gray-900 relative overflow-hidden`}
    >
      <img className="w-full" src={anime.images.jpg.large_image_url} alt="" />
      <div className="absolute top-0 right-0 z-10 bg-white text-black font-bold p-2 py-1">
        {rank}
      </div>
      <div
        className={`absolute bottom-0 z-10 bg-white text-black w-full text-center transition-all duration-300 overflow-hidden rounded-b ${
          expand ? "max-h-96" : "max-h-8"
        }`}
      >
        <div className="p-1 font-bold">{anime.title_english}</div>
        {expand && (
          <div className="p-1">
            <div className="text-sm">
              <span className="font-semibold">Release Date:</span>{" "}
              {anime.aired.string}
            </div>
            <div className="text-sm">
              <span className="font-semibold">Latest:</span> {anime.status}
            </div>
            <div className="text-sm">
              <span className="font-semibold">Rating:</span> {anime.rating}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
