import React from 'react';
import { Link } from 'react-router-dom';

const timeAgo = (isoString) => {
  const diff = Math.floor((Date.now() - new Date(isoString)) / 1000);
  if (diff < 60) return `${diff}s ago`;
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
  return `${Math.floor(diff / 86400)}d ago`;
};

const NewsCardGrid = ({ newsCards }) => {
  if (!newsCards || newsCards.length === 0) return null;

  return (
    <div className="mt-4 w-full">
      {/* Section Header */}
      <div className="flex items-center gap-3 mb-3 px-1">
        <div className="w-1 h-5 bg-red-500 rounded-full animate-pulse"></div>
        <span className="text-[10px] font-black uppercase tracking-[0.3em] text-cyan-400">
          Recent Broadcasts
        </span>
        <div className="flex-1 h-px bg-cyan-500/20"></div>
        <span className="text-[9px] uppercase tracking-widest text-cyan-600">
          {newsCards.length} stored
        </span>
      </div>

      {/* 4-Column Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {newsCards.map((card, index) => (
        <Link
            key={card.id}
            to={`/news/${card.id}`}
            className="rounded-2xl overflow-hidden border border-cyan-500/20 bg-[#0d1b2a]/90 backdrop-blur-sm shadow-[0_4px_20px_rgba(0,0,0,0.4)] hover:border-cyan-400/60 hover:shadow-[0_0_20px_rgba(6,182,212,0.2)] hover:scale-[1.02] transition-all duration-300 cursor-pointer no-underline block"
            style={{
              animation: `fadeSlideUp 0.4s ease both`,
              animationDelay: `${index * 0.06}s`,
            }}
          >
            {/* Thumbnail */}
            <div className="relative w-full h-[120px] bg-[#0a2347] overflow-hidden">
              {card.imageBase64 ? (
                <img
                  src={card.imageBase64}
                  alt={card.headline}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <div className="text-cyan-800 text-3xl">📷</div>
                </div>
              )}
              {/* Overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>

              {/* Category Badge */}
              {card.category && (
                <div className="absolute bottom-2 left-2">
                  <span className="text-[8px] font-black uppercase tracking-[0.2em] bg-red-600 text-white px-2 py-0.5 rounded-full shadow-lg">
                    {card.category}
                  </span>
                </div>
              )}

              {/* Latest badge for first card */}
              {index === 0 && (
                <div className="absolute top-2 right-2">
                  <span className="text-[7px] font-black uppercase tracking-widest bg-cyan-500 text-black px-2 py-0.5 rounded-full flex items-center gap-1">
                    <span className="w-1.5 h-1.5 bg-black rounded-full animate-pulse inline-block"></span>
                    LIVE
                  </span>
                </div>
              )}
            </div>

            {/* Content */}
            <div className="p-3">
              <p
                className="text-[11px] font-bold text-white leading-snug mb-2"
                style={{
                  display: '-webkit-box',
                  WebkitLineClamp: 3,
                  WebkitBoxOrient: 'vertical',
                  overflow: 'hidden',
                }}
              >
                {card.headline}
              </p>

              {/* Footer */}
              <div className="flex items-center justify-between">
                <span className="text-[8px] uppercase tracking-widest text-cyan-600 font-bold">
                  {card.tone || 'Breaking'}
                </span>
                <span className="text-[8px] text-cyan-500/50">
                  {timeAgo(card.timestamp)}
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>

      <style>{`
        @keyframes fadeSlideUp {
          from { opacity: 0; transform: translateY(12px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
};

export default NewsCardGrid;
