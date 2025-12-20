import { useState, useEffect } from 'react';
import { Anime } from '../types';

export const useFavorites = () => {
  const [favorites, setFavorites] = useState<Anime[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem('kanata_favorites');
    if (stored) {
      try {
        setFavorites(JSON.parse(stored));
      } catch (e) {
        console.error("Error parsing favorites", e);
      }
    }
  }, []);

  const saveFavorites = (newFavorites: Anime[]) => {
    setFavorites(newFavorites);
    localStorage.setItem('kanata_favorites', JSON.stringify(newFavorites));
  };

  const toggleFavorite = (anime: Anime) => {
    const isFav = favorites.some(fav => fav.id === anime.id);
    if (isFav) {
      saveFavorites(favorites.filter(fav => fav.id !== anime.id));
    } else {
      saveFavorites([...favorites, anime]);
    }
  };

  const isFavorite = (animeId: string) => {
    return favorites.some(fav => fav.id === animeId);
  };

  return { favorites, toggleFavorite, isFavorite };
};
