import React from 'react';

const Footer = ({ history }) => {
  return (
    <div className="fixed bottom-0 left-0 z-50 w-full overflow-hidden border-t border-cyan-500/30 bg-[#0d1b2a]/90 px-4 py-2 shadow-[0_-20px_60px_rgba(0,0,0,0.5)]">
      <div className="flex items-center justify-between text-[10px] uppercase tracking-[0.35em] text-cyan-400 mb-1.5">
        <span>Live Ticker</span>
        <span>Latest Headlines</span>
      </div>
      <div className="overflow-hidden">
        <div className="inline-flex animate-marquee whitespace-nowrap gap-10 text-[13px] font-black text-cyan-300">
          {history && history.concat(history).map((item, index) => (
            <span key={`${item.id}-${index}`} className="inline-flex items-center gap-3">
              <span className="inline-block h-2 w-2 rounded-full bg-red-500" />
              {item.text}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Footer;
