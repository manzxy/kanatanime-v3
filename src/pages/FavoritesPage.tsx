import React from 'react';
import { useFavorites } from '../hooks/useFavorites';
import AnimeCard from '../components/AnimeCard';
import Button from '../components/Button';
import { useNavigate } from 'react-router-dom';

const FavoritesPage = () => {
  const { favorites } = useFavorites();
  const navigate = useNavigate();

  return (
    <div className="max-w-7xl mx-auto p-4 space-y-12 min-h-[60vh]">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 border-b-8 border-black pb-8">
        <div className="bg-[#FF3B30] text-white px-6 py-3 border-4 border-black shadow-[8px_8px_0px_0px_black] transform -rotate-1">
          <h1 className="text-4xl md:text-6xl font-black oswald italic uppercase">My Intel List</h1>
        </div>
        <Button variant="black" onClick={() => navigate('/')}>← BACK TO BASE</Button>
      </div>

      {favorites.length === 0 ? (
        <div className="bg-white border-8 border-black p-12 text-center shadow-[16px_16px_0px_0px_#FFCC00] transform rotate-1">
          <h2 className="text-3xl md:text-5xl font-black oswald text-black mb-4 uppercase">Your list is empty</h2>
          <p className="font-bold text-gray-500 mb-8 uppercase tracking-widest">// NO BOOKMARKED ANIME DETECTED //</p>
          <Button variant="yellow" onClick={() => navigate('/')}>EXPLORE ANIME</Button>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 md:gap-10">
          {favorites.map(anime => (
            <AnimeCard key={anime.id} anime={anime} />
          ))}
        </div>
      )}
      
      {/* Decorative footer element for the page */}
      <div className="h-4 bg-[repeating-linear-gradient(90deg,#FFCC00,#FFCC00_20px,#000_20px,#000_40px)] opacity-30 border-y-2 border-black"></div>
    </div>
  );
};

export default FavoritesPage;
