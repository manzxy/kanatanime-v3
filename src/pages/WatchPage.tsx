import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Button from '../components/Button';
import Loader from '../components/Loader';
import Badge from '../components/Badge';
import { DetailedAnime, OtakudesuEpisode } from '../types';

interface Mirror {
  nama: string;
  content: string;
}

interface MirrorGroup {
  m360p?: Mirror[];
  m480p?: Mirror[];
  m720p?: Mirror[];
}

interface Download {
  nama: string;
  href: string;
}

interface DownloadGroup {
  d360pmp4?: Download[];
  d480pmp4?: Download[];
  d720pmp4?: Download[];
  d1080pmp4?: Download[];
  d480pmkv?: Download[];
  d720pmkv?: Download[];
  d1080pmkv?: Download[];
}

interface EpisodeData {
  title: string;
  iframe: string;
  mirrors: MirrorGroup;
  downloads: DownloadGroup;
}

const WatchPage = () => {
  const { slug, episodeSlug } = useParams<{ slug: string, episodeSlug: string }>();
  const navigate = useNavigate();
  const [episodeData, setEpisodeData] = useState<EpisodeData | null>(null);
  const [animeDetail, setAnimeDetail] = useState<DetailedAnime | null>(null);
  const [loading, setLoading] = useState(true);
  const [changingMirror, setChangingMirror] = useState(false);
  const [currentIframe, setCurrentIframe] = useState<string>('');
  const [isUnlocked, setIsUnlocked] = useState(false);

  useEffect(() => {
    const fetchAllData = async () => {
      if (!episodeSlug || !slug) return;
      setLoading(true);
      try {
        // Fetch Episode Data
        const epRes = await fetch(`https://backend.ryzumi.vip/anime/episode/${episodeSlug}`);
        const epJson = await epRes.json();
        
        // Fetch Anime Detail (for episode list / next-prev)
        const detailRes = await fetch(`https://www.sankavollerei.com/anime/anime/${slug}`);
        const detailJson = await detailRes.json();

        if (epJson.judul) {
          setEpisodeData({
            title: epJson.judul,
            iframe: epJson.iframe,
            mirrors: epJson.mirror,
            downloads: epJson.download
          });
          setCurrentIframe(epJson.iframe);
        }

        if (detailJson.status === 'success') {
          setAnimeDetail(detailJson.data);
        }
      } catch (err) {
        console.error('Fetch Error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchAllData();
    window.scrollTo(0, 0);
  }, [slug, episodeSlug]);

  const getAdjacentEpisodes = () => {
    if (!animeDetail || !animeDetail.episodeList || !episodeSlug) return { prev: null, next: null };
    
    const list = animeDetail.episodeList;
    const currentIndex = list.findIndex(ep => ep.episodeId === episodeSlug);
    
    if (currentIndex === -1) return { prev: null, next: null };

    return {
      next: currentIndex > 0 ? list[currentIndex - 1] : null,
      prev: currentIndex < list.length - 1 ? list[currentIndex + 1] : null
    };
  };

  const { prev, next } = getAdjacentEpisodes();

  const handleMirrorChange = async (mirror: Mirror) => {
    setChangingMirror(true);
    try {
      const nonceRes = await fetch('https://backend.ryzumi.vip/anime/nonce');
      const nonce = await nonceRes.text();
      const cleanNonce = nonce.replace(/"/g, '');

      const iframeRes = await fetch(`https://backend.ryzumi.vip/anime/getIframe?content=${mirror.content}&nonce=${cleanNonce}`);
      const iframeHtml = await iframeRes.text();
      
      const match = iframeHtml.match(/src="([^"]+)"/);
      if (match && match[1]) {
        const cleanSrc = match[1].replace(/&amp;/g, '&');
        setCurrentIframe(cleanSrc);
      }
    } catch (e) {
      console.error('Mirror fetching failed', e);
    } finally {
      setChangingMirror(false);
    }
  };

  if (loading || !episodeData) return <Loader message="DECODING STREAM SIGNAL..." />;

  return (
    <div className="max-w-7xl mx-auto p-4 space-y-8 pb-20">
      <div className="flex justify-between items-center border-b-8 border-black pb-6">
        <Button variant="black" onClick={() => navigate(`/detail/${slug}`)}>← RETURN TO INTEL</Button>
        <div className="hidden md:block bg-[#FFCC00] border-4 border-black px-4 py-2 font-black oswald text-black transform rotate-2 shadow-[4px_4px_0px_0px_black]">
           ENCRYPTED CONNECTION : STABLE
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Main Player Area + Side Episode List */}
        <div className="lg:col-span-12 grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-3 space-y-8">
            <div className="relative">
              <div className="aspect-video bg-black border-8 border-black shadow-[16px_16px_0px_0px_#FF3B30] relative overflow-hidden z-10 group">
                {changingMirror && (
                  <div className="absolute inset-0 z-30 bg-black/80 backdrop-blur-md flex flex-col items-center justify-center">
                    <div className="bg-[#FFCC00] text-black font-black oswald px-8 py-4 border-4 border-black animate-bounce text-xl shadow-[8px_8px_0px_0px_black]">
                      SWITCHING FREQUENCY...
                    </div>
                  </div>
                )}
                
                <iframe 
                  src={currentIframe} 
                  className="w-full h-full relative z-10" 
                  allowFullScreen 
                  title={episodeData.title}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                ></iframe>

                {/* 
                  The "Neo Unlocker":
                  Blocks initial context menu and requires one click to access the player.
                */}
                {!isUnlocked && (
                  <div 
                    className="absolute inset-0 z-20 bg-black/40 backdrop-blur-sm flex items-center justify-center cursor-pointer group/unlock"
                    onContextMenu={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                    }}
                    onClick={() => setIsUnlocked(true)}
                  >
                     <div className="bg-[#FFCC00] border-4 border-black p-6 md:p-8 shadow-[8px_8px_0px_0px_black] transform group-hover/unlock:scale-110 group-hover/unlock:-rotate-2 transition-all">
                        <div className="flex flex-col items-center gap-4">
                           <span className="font-black oswald text-3xl md:text-5xl text-black">DECODE STREAM</span>
                           <span className="bg-black text-white px-4 py-1 font-bold text-xs animate-pulse">CLICK TO START SESSION</span>
                        </div>
                     </div>
                  </div>
                )}
              </div>

              {/* Episode Navigation Buttons */}
              <div className="grid grid-cols-3 text-black mt-6 gap-4">
                {prev ? (
                  <button 
                    onClick={() => navigate(`/watch/${slug}/${prev.episodeId}`)}
                    className="bg-white border-4 border-black p-3 font-black oswald uppercase text-sm md:text-lg hover:bg-[#FFCC00] shadow-[4px_4px_0px_0px_black] active:translate-x-1 active:translate-y-1 active:shadow-none transition-all cursor-pointer"
                  >
                    ← PREV
                  </button>
                ) : <div />}
                
                <button 
                  onClick={() => navigate(`/detail/${slug}`)}
                  className="bg-black text-white border-4 border-black p-3 font-black oswald uppercase text-sm md:text-lg hover:bg-gray-800 shadow-[4px_4px_0px_0px_black] active:translate-x-1 active:translate-y-1 active:shadow-none transition-all cursor-pointer"
                >
                  LIST
                </button>

                {next ? (
                  <button 
                    onClick={() => navigate(`/watch/${slug}/${next.episodeId}`)}
                    className="bg-white border-4 border-black p-3 font-black oswald uppercase text-sm md:text-lg hover:bg-[#FFCC00] shadow-[4px_4px_0px_0px_black] active:translate-x-1 active:translate-y-1 active:shadow-none transition-all cursor-pointer"
                  >
                    NEXT →
                  </button>
                ) : <div />}
              </div>

              <div className="absolute -inset-4 bg-[#FFCC00] -z-10 border-4 border-black transform rotate-1 opacity-20"></div>
            </div>

            <div className="bg-white border-8 border-black p-6 md:p-10 text-black shadow-[16px_16px_0px_0px_#007AFF] relative">
              <div className="relative mb-10">
                <div className="bg-[#FF3B30] text-white p-4 md:p-6 border-4 border-black transform -rotate-1 shadow-[8px_8px_0px_0px_black] inline-block mb-4">
                  <h1 className="text-xl md:text-3xl lg:text-4xl font-black oswald uppercase leading-none italic">
                    {episodeData.title}
                  </h1>
                </div>
                <div className="absolute -top-4 -right-4 bg-black text-[#FFCC00] px-3 py-1 font-black oswald transform rotate-3 border-2 border-white text-xs">
                  NOW_STREAMING
                </div>
              </div>
              
              <div className="space-y-8">
                <div className="border-t-4 border-black pt-6">
                  <div className="flex items-center gap-4 mb-6">
                    <h3 className="font-black oswald text-2xl uppercase italic bg-[#FFCC00] px-4 py-1 border-4 border-black">Mirror Servers</h3>
                    <div className="flex-1 h-1 bg-black"></div>
                  </div>

                  <div className="grid grid-cols-1 gap-4">
                    {Object.entries(episodeData.mirrors).map(([res, mirrors]) => {
                      const mList = mirrors as Mirror[];
                      return mList && mList.length > 0 && (
                        <div key={res} className="flex flex-col md:flex-row md:items-center gap-4 bg-gray-50 p-4 border-4 border-black shadow-[4px_4px_0px_0px_black] hover:bg-white transition-colors">
                          <div className="bg-black text-white px-4 py-1 font-black oswald text-lg min-w-[80px] text-center transform -rotate-2">
                            {res.replace('m', '')}
                          </div>
                          <div className="flex flex-wrap gap-2">
                            {mList.map((m, idx) => (
                              <button
                                key={idx}
                                onClick={() => handleMirrorChange(m)}
                                className="px-4 py-2 font-black oswald text-xs uppercase border-4 border-black bg-white hover:bg-[#FFCC00] hover:-translate-y-1 hover:shadow-[4px_4px_0px_0px_black] active:translate-y-0 active:shadow-none transition-all cursor-pointer"
                              >
                                {m.nama}
                              </button>
                            ))}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-1 space-y-8">
             <div className="space-y-4">
                <div className="bg-black text-[#FFCC00] p-4 border-4 border-white shadow-[4px_4px_0px_0px_black] text-center">
                    <h3 className="font-black oswald text-xl italic uppercase">Episode List</h3>
                </div>
                <div className="bg-white border-4 border-black shadow-[8px_8px_0px_0px_black] max-h-[300px] lg:max-h-[400px] overflow-y-auto scrollbar-thin scrollbar-thumb-black scrollbar-track-transparent">
                    {animeDetail?.episodeList?.map((ep, idx) => (
                    <button
                        key={idx}
                        onClick={() => navigate(`/watch/${slug}/${ep.episodeId}`)}
                        className={`w-full text-left p-3 border-b-2 border-black font-black oswald text-sm uppercase flex items-center gap-3 transition-colors ${
                        ep.episodeId === episodeSlug ? 'bg-[#FF3B30] text-white' : 'text-black hover:bg-[#FFCC00]'
                        }`}
                    >
                        <span className="w-8 h-8 flex items-center justify-center border-2 border-current italic">{ep.eps}</span>
                        <span className="truncate">Watch Eps {ep.title.split(' Episode ')[1]?.split(' ')[0] || `EP ${ep.eps}`}</span>
                    </button>
                    ))}
                </div>
             </div>

             <div className="bg-[#FFCC00] p-6 border-8 border-black shadow-[12px_12px_0px_0px_black] relative overflow-hidden">
                <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'radial-gradient(#000 2px, transparent 2px)', backgroundSize: '15px 15px' }}></div>
                <div className="relative z-10">
                  <div className="bg-black text-white p-4 border-4 border-white mb-8 transform rotate-1 shadow-[8px_8px_0px_0px_white]">
                    <h3 className="font-black oswald text-xl italic uppercase text-center">DATA OFFLOAD</h3>
                  </div>
                  <div className="space-y-8 max-h-[500px] overflow-y-auto pr-4 scrollbar-thin scrollbar-thumb-black scrollbar-track-transparent">
                    {Object.entries(episodeData.downloads).map(([key, links]) => {
                      const dList = links as Download[];
                      return dList && dList.length > 0 && (
                        <div key={key} className="space-y-3 bg-white p-4 border-4 border-black shadow-[6px_6px_0px_0px_black]">
                          <div className="flex items-center gap-2 mb-2">
                            <span className="font-black oswald text-white text-base uppercase bg-[#FF3B30] px-3 py-1 border-2 border-black transform -rotate-3">
                              {key.replace('d', '')}
                            </span>
                            <div className="flex-1 h-0.5 bg-black"></div>
                          </div>
                          <div className="grid grid-cols-1 gap-2">
                             {dList.map((dl, idx) => (
                               <a 
                                 key={idx} 
                                 href={dl.href} 
                                 target="_blank" 
                                 rel="noopener noreferrer"
                                 className="group flex items-center justify-between bg-white text-black text-xs font-black oswald p-3 border-2 border-black hover:bg-black hover:text-white transition-all transform hover:-translate-x-1"
                               >
                                 <span className="truncate mr-2 uppercase">{dl.nama}</span>
                                 <span className="bg-[#007AFF] text-white px-2 py-1 text-[8px] group-hover:bg-[#FFCC00] group-hover:text-black transition-colors">DL →</span>
                               </a>
                             ))}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
             </div>
          </div>
        </div>

        <div className="lg:col-span-12">
            <div className="bg-black text-white p-6 border-4 border-[#FF3B30] shadow-[8px_8px_0px_0px_#FF3B30]">
               <p className="font-black oswald text-xs uppercase italic leading-tight">
                 // WARNING: Some mirrors may contain ads. We recommend using an ad-blocker for the best experience.
               </p>
            </div>
        </div>
      </div>
    </div>
  );
};

export default WatchPage;