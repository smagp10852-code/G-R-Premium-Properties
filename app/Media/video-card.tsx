"use client";

import { useState } from "react";

const getYouTubeId = (url: string) => {
  const regExp =
    /^.*(youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
  const match = url.match(regExp);
  return match && match[2].length === 11 ? match[2] : null;
};

export default function VideoCard({ youtubeUrl }: { youtubeUrl: string }) {
  const [play, setPlay] = useState(false);
  const videoId = getYouTubeId(youtubeUrl);

  if (!videoId) return null;

  return (
    <div
      className="h-72 rounded-xl overflow-hidden bg-black cursor-pointer"
      onMouseEnter={() => setPlay(true)}
      onMouseLeave={() => setPlay(false)}
    >
      {!play ? (
        <img
          src={`https://img.youtube.com/vi/${videoId}/hqdefault.jpg`}
          className="h-full w-full object-cover"
        />
      ) : (
        <iframe
          src={`https://www.youtube.com/embed/${videoId}?autoplay=1&mute=0&controls=1&rel=0`}
          className="h-full w-full"
          allow="autoplay; encrypted-media"
          allowFullScreen
        />
      )}
    </div>
  );
}
