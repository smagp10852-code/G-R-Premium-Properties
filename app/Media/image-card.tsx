"use client";

import { useEffect, useState } from "react";

interface ImageCardProps {
  images: {
    asset: {
      url: string;
    };
  }[];
  title: string;
  location: string;
}

export default function ImageCard({
  images,
  title,
  location,
}: ImageCardProps) {
  const [current, setCurrent] = useState(0);
  const [hovered, setHovered] = useState(false);

  // AUTO SLIDE (every 3.5 seconds)
  useEffect(() => {
    if (hovered || images.length <= 1) return;

    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 3500);

    return () => clearInterval(interval);
  }, [hovered, images.length]);

  return (
    <div
      className="group perspective h-72 relative"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="relative h-full w-full transition-transform duration-700 transform-style-preserve-3d group-hover:rotate-y-180">

        {/* ================= FRONT (IMAGE SLIDER) ================= */}
        <div className="absolute inset-0 backface-hidden rounded-xl overflow-hidden">
          <img
            src={images[current].asset.url}
            alt={title}
            className="h-full w-full object-cover transition-opacity duration-500"
          />

          {/* ================= DOT INDICATOR ================= */}
          {images.length > 1 && (
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2 opacity-0 group-hover:opacity-100 transition">
              {images.map((_, index) => (
                <button
                  key={index}
                  onClick={(e) => {
                    e.stopPropagation();
                    setCurrent(index);
                  }}
                  className={`w-2.5 h-2.5 rounded-full transition ${
                    current === index
                      ? "bg-white"
                      : "bg-white/40"
                  }`}
                />
              ))}
            </div>
          )}
        </div>

        {/* ================= BACK (TEXT) ================= */}
        <div className="absolute inset-0 rotate-y-180 backface-hidden rounded-xl bg-[#C9A227] flex flex-col items-center justify-center text-center p-5">
          <h4 className="text-white text-xl font-semibold">
            {title}
          </h4>
          <p className="text-white/90 text-sm mt-1">
            {location}
          </p>
        </div>

      </div>
    </div>
  );
}
