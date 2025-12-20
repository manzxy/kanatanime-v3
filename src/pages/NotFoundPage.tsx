import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../components/Button';

const NotFoundPage = () => {
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center p-4">
      <div className="relative bg-[#FFCC00] border-8 border-black p-8 md:p-16 shadow-[16px_16px_0px_0px_#FF3B30] max-w-2xl text-center transform -rotate-1">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'radial-gradient(#000 2px, transparent 2px)', backgroundSize: '20px 20px' }}></div>
        
        <div className="relative z-10 space-y-6">
          <h1 className="text-8xl md:text-9xl font-black oswald text-black mb-4 drop-shadow-[4px_4px_0px_rgba(255,255,255,1)]">
            404
          </h1>
          
          <div className="bg-black text-white px-6 py-2 text-2xl md:text-4xl font-black oswald uppercase transform rotate-2 inline-block border-4 border-white">
            PAGE NOT FOUND
          </div>
          
          <p className="text-black font-bold text-lg md:text-xl font-mono mt-8 border-4 border-black bg-white p-4 shadow-[8px_8px_0px_0px_black] transform -rotate-1">
            // ERROR: The requested anime dimension does not exist.
            <br/>
            // SYSTEM: Returning to base coordinates.
          </p>

          <div className="mt-12 flex justify-center">
            <Link to="/">
              <Button variant="black" className="text-xl px-12 py-4 hover:scale-110 transition-transform">
                RETURN HOME
              </Button>
            </Link>
          </div>
        </div>

        {/* Decorative corner elements */}
        <div className="absolute -top-4 -left-4 w-12 h-12 bg-[#FF3B30] border-4 border-black"></div>
        <div className="absolute -bottom-4 -right-4 w-12 h-12 bg-[#007AFF] border-4 border-black"></div>
      </div>
    </div>
  );
};

export default NotFoundPage;
