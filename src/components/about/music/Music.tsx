// app/components/Music.tsx (ou où tu veux)
// version client, TypeScript compatible
"use client";
import { useState } from "react";
import Image from "next/image";
// @ts-ignore
import MusicCode from "./MusicCode.mdx";
import TopArtistSkeleton from "@/components/loading-skeleton/TopArtistSkeleton";

const YOUTUBE_PLAYLIST_ID =
  process.env.NEXT_PUBLIC_YT_PLAYLIST_ID || "PLxxxxxxxxxxxxxxxx";

const mockArtists = [
  {
    name: "Ludwig van Beethoven",
    imageUrl: "/artists/beethoven.jpg",
    songUrl: "https://www.youtube.com/results?search_query=beethoven",
    genres: "Classical, Romantic",
    hashImage: "", // facultatif, plaiceholder non requise ici
  },
  {
    name: "Johann Sebastian Bach",
    imageUrl: "/artists/bach.jpg",
    songUrl: "https://www.youtube.com/results?search_query=bach",
    genres: "Baroque",
    hashImage: "",
  },
  {
    name: "Wolfgang Amadeus Mozart",
    imageUrl: "/artists/mozart.jpg",
    songUrl: "https://www.youtube.com/results?search_query=mozart",
    genres: "Classical",
    hashImage: "",
  },
  // ajoute tes artistes / morceaux préférés
];

const Music = () => {
  return (
    <section className="grid md:grid-cols-2 h-full">
      <div className="border-r border-line overflow-auto md:block hidden">
        <MusicCode />
      </div>

      <div className="overflow-auto px-4 py-4">
        <div>
          <h4 className="text-base font-medium text-secondary">
            //_my-top-artists
          </h4>

          <div>
            {/* Ici on affiche la liste locale */}
            {mockArtists.map((artist, index) => (
              <a
                key={artist.name}
                href={artist.songUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex gap-4 border-b border-line py-4"
              >
                <span className="text-right w-6">{index + 1}</span>
                <div className="w-20 h-20 relative">
                  {/* si tu n'as pas d'images locales, remplace par une div ou une image générique */}
                  <Image
                    src={artist.imageUrl}
                    alt={artist.name}
                    fill
                    className="object-cover rounded"
                    placeholder={artist.hashImage ? "blur" : undefined}
                    blurDataURL={artist.hashImage || undefined}
                  />
                </div>

                <div className="space-y-2">
                  <h5 className="text-secondary [word-spacing:-4px]">
                    {artist.name}
                  </h5>
                  <p className="[word-spacing:-4px]">{artist.genres}</p>
                </div>
              </a>
            ))}
          </div>
        </div>
        {/* change this part */}
        <div>
          <h4 className="pb-4 mt-6 text-base font-medium text-secondary">
            //_my-top-playlist
          </h4>

          <iframe
            width="100%"
            height="380"
            src={`https://www.youtube.com/embed?listType=playlist&list=${YOUTUBE_PLAYLIST_ID}`}
            frameBorder="0"
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            allowFullScreen
            title="My YouTube Playlist"
          />
        </div>
      </div>
    </section>
  );
};

export default Music;
