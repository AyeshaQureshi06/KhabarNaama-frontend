import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const NewsDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [card, setCard] = useState(null);

  useEffect(() => {
    try {
      const saved = localStorage.getItem('khabarnaama_cards');
      if (saved) {
        const cards = JSON.parse(saved);
        const found = cards.find((c) => String(c.id) === String(id));
        setCard(found || null);
      }
    } catch {
      setCard(null);
    }
  }, [id]);

  if (!card) {
    return (
      <div className="min-h-screen bg-[#001a2e] flex flex-col items-center justify-center gap-6">
        <div className="text-6xl">📡</div>
        <p className="text-cyan-400 font-black uppercase tracking-widest text-sm">
          Broadcast Not Found
        </p>
        <button
          onClick={() => navigate('/')}
          className="px-6 py-3 bg-cyan-500 text-black font-black text-xs uppercase tracking-widest hover:bg-cyan-400 transition-all"
        >
          ← Back to Studio
        </button>
      </div>
    );
  }

  const timeAgo = (isoString) => {
    const diff = Math.floor((Date.now() - new Date(isoString)) / 1000);
    if (diff < 60) return `${diff} seconds ago`;
    if (diff < 3600) return `${Math.floor(diff / 60)} minutes ago`;
    if (diff < 86400) return `${Math.floor(diff / 3600)} hours ago`;
    return `${Math.floor(diff / 86400)} days ago`;
  };

  return (
    <div className="min-h-screen bg-[#001a2e] flex flex-col">

      {/* Top Bar */}
      <div className="flex items-center justify-between px-8 py-4 border-b border-cyan-500/20 bg-[#0d1b2a]">
        <button
          onClick={() => navigate('/')}
          className="flex items-center gap-2 text-cyan-400 hover:text-white transition-colors text-xs font-black uppercase tracking-widest"
        >
          ← Back to Studio
        </button>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
          <span className="text-[10px] font-black uppercase tracking-[0.3em] text-cyan-500">
            KhabarNaama Archive
          </span>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-12">
        <div className="w-full max-w-3xl">

          {/* Category + Time */}
          <div className="flex items-center gap-4 mb-6">
            {card.category && (
              <span className="text-[10px] font-black uppercase tracking-[0.3em] bg-red-600 text-white px-4 py-1.5 rounded-full shadow-[0_0_20px_rgba(220,38,38,0.4)]">
                {card.category}
              </span>
            )}
            <span className="text-[10px] uppercase tracking-widest text-cyan-500/70 font-bold">
              {card.tone || 'Breaking'}
            </span>
            <span className="ml-auto text-[10px] text-cyan-500/50 tracking-wider">
              {timeAgo(card.timestamp)}
            </span>
          </div>

          {/* Headline */}
          <h1 className="text-3xl md:text-5xl font-black text-white italic leading-tight mb-10 drop-shadow-[0_5px_15px_rgba(0,0,0,1)]">
            {card.headline}
          </h1>

          {/* Image */}
          {card.imageBase64 ? (
            <div className="relative w-full overflow-hidden rounded-2xl border-4 border-[#1a4d6d] shadow-[0_0_50px_rgba(0,0,0,0.6)]">
              <img
                src={card.imageBase64}
                alt={card.headline}
                className="w-full object-cover"
                style={{ maxHeight: '500px' }}
              />
              {/* Broadcast overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none"></div>

              {/* Breaking News bar */}
              <div className="absolute top-6 left-0 flex items-center">
                <div className="bg-red-600 text-white px-6 py-2 font-black italic text-lg skew-x-[-20deg] ml-[-10px] shadow-[10px_0_20px_rgba(0,0,0,0.4)]">
                  <span className="inline-block skew-x-[20deg]">BREAKING NEWS</span>
                </div>
              </div>

              {/* Live badge */}
              <div className="absolute bottom-4 left-4 flex items-center gap-3">
                <div className="bg-white text-red-600 font-black px-3 py-1 text-sm skew-x-[-10deg]">
                  <span className="inline-block skew-x-[10deg]">LIVE</span>
                </div>
                <span className="text-[10px] font-bold text-cyan-400 uppercase tracking-[0.3em]">
                  Broadcast Studio A
                </span>
              </div>
            </div>
          ) : (
            <div className="w-full h-64 bg-[#0d1b2a] border border-cyan-500/20 rounded-2xl flex items-center justify-center">
              <span className="text-cyan-800 text-5xl">📷</span>
            </div>
          )}

          {/* Card ID / URL info */}
          <div className="mt-6 flex items-center gap-3 px-4 py-3 bg-[#0d1b2a] border border-cyan-500/10 rounded-xl">
            <span className="text-[9px] uppercase tracking-[0.3em] text-cyan-600 font-black">Broadcast ID</span>
            <span className="text-[10px] font-mono text-cyan-400">{card.id}</span>
          </div>

        </div>
      </div>
    </div>
  );
};

export default NewsDetail;
