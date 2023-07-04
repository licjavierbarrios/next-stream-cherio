"use client";

import { useState } from "react";
import { Challenge } from "./types";

export default function HomePageClient({
  challenges: initialState,
}: {
  challenges: Challenge[];
}) {
  const [challenges, setChallenges] = useState<Challenge[]>(initialState);
  const [liked, setLiked] = useState<Challenge[]>([]);
  const [showLiked, setShowLiked] = useState<Boolean>(false);
  const [challenge] = challenges;

  const handleDisLike = () => {
    setChallenges((prev) => prev.slice(1));
  };

  const handleLike = () => {
    setLiked((prev) => [...prev, challenge]);
    setChallenges((prev) => prev.slice(1));
  };

  const handleReset = () => {
    setChallenges(initialState);
    setLiked([]);
  };

  const handleShowLiked = () => {
    setShowLiked(true);
  };

  const handleHideLiked = () => {
    setShowLiked(false);
  };
  const handleDeleteChallenge = (id) => {
    return () => {
      setLiked((prev) => prev.filter((challenge) => challenge.id !== id));
    };
  };

  if (showLiked) {
    return (
      <div className="flex flex-col gap-4 max-w-lg m-auto">
        <ul className="flex flex-col gap-4 text-sm">
          {liked.map((challenge) => (
            <li key={challenge.id}>
              <div className="flex items-center justify-between">
                <p>{challenge.title}</p>
                <div className="flex items-center gap-1">
                  <button
                    className="rounded bg-gray-500 p-2"
                    type="button"
                    onClick={handleDeleteChallenge(challenge.id)}
                  >
                    Eliminar
                  </button>
                  <a
                    className="rounded bg-gray-500 p-2"
                    href={`https://www.frontendmentor.io/challenges/${challenge.slug}`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    Ver reto
                  </a>
                </div>
              </div>
            </li>
          ))}
        </ul>

        <button
          className="rounded bg-gray-500 p-2 m-auto mb-4"
          type="button"
          onClick={handleHideLiked}
        >
          Volver
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4 bg-slate-800 pt-4 pb-4">
      <div
        className="bg-gray-900 rounded p-4 max-w-sm m-auto"
        key={challenge.id}
      >
        <div className="flex flex-col gap-4">
          <img src={challenge.heroImage} alt={challenge.title} />
          <div className="flex flex-col">
            <h3 className="text-xl font-medium">{challenge.title}</h3>
            <p className="line-clamp-3 text-white/80">
              {challenge.description}
            </p>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-evenly gap-4">
        <button
          className="rounded bg-red-500 p-2"
          type="button"
          onClick={handleDisLike}
        >
          No me gusta
        </button>
        <button
          className="rounded bg-green-500 p-2"
          type="button"
          onClick={handleLike}
        >
          Me gusta
        </button>
      </div>
      <div className="flex items-center justify-center gap-4">
        <button
          className="rounded bg-gray-500 p-2"
          type="button"
          onClick={handleReset}
        >
          Volver a empezar
        </button>
        <button
          className="rounded bg-gray-500 p-2"
          type="button"
          onClick={handleShowLiked}
        >
          Ver selección
        </button>
      </div>
    </div>
  );
}
