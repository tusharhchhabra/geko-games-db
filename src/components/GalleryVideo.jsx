import React from "react";
import LazyImage from "./LazyImage";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay, faVideo } from "@fortawesome/free-solid-svg-icons";
import { faYoutube } from "@fortawesome/free-brands-svg-icons";

function GalleryVideo({ videoId }) {
  const videoUrl = `https://www.youtube.com/watch?v=${videoId}`;
  const posterUrl = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;

  return (
    <a
      data-lg-size="1280-720"
      data-src={videoUrl}
      data-poster={posterUrl}
      className="relative w-52 h-[117px] lg:w-60 lg:h-[135px] lg:mr-0.5 shrink-0 rounded-lg shadow-xl-center shadow-black/[0.3] border border-zinc-700/70 hover:border-none hover:z-10 hover:scale-[1.15] active:scale-90 hover:brightness-110 transition duration-[0.25s] ease-in-out cursor-pointer overflow-hidden"
    >
      <LazyImage src={posterUrl} alt="Video Thumbnail" />
      <div className="absolute bottom-1 left-3">
        <FontAwesomeIcon icon={faYoutube} className="text-3xl text-zinc-200" />
      </div>
    </a>
  );
}

export default GalleryVideo;
