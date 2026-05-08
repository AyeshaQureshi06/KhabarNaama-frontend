import React from 'react';

const Navbar = ({ time, mediaMode, setMediaMode }) => {
  return (
    <header className="w-full bg-[#001a2e]/90 backdrop-blur-md text-white py-4 px-10 flex justify-between items-center border-b border-cyan-500/30 shadow-[0_0_20px_rgba(34,211,238,0.1)]">
      <div className="flex items-center gap-5">
        <div className="bg-cyan-500 px-4 py-1.5 skew-x-[-15deg] font-black italic text-xl shadow-[0_0_15px_rgba(34,211,238,0.5)]">
          <span className="inline-block skew-x-[15deg]">24 LIVE</span>
        </div>
        <h1 className="text-2xl font-black tracking-widest uppercase italic">
          Khabar<span className="text-cyan-400">Naama</span>
        </h1>
      </div>

      <div className="flex items-center gap-8">
        <div className="flex bg-[#1a3a52] rounded-full p-1 border border-cyan-400/20">
          {['image', 'video'].map((mode) => (
            <button
              key={mode}
              onClick={() => setMediaMode(mode)}
              className={`px-5 py-1.5 rounded-full text-[11px] font-black transition-all ${
                mediaMode === mode ? 'bg-cyan-500 text-white shadow-lg' : 'text-cyan-300/50 hover:text-white'
              }`}
            >
              {mode.toUpperCase()}
            </button>
          ))}
        </div>
        <div className="text-right border-l border-cyan-500/30 pl-6">
          <p className="text-[10px] font-black text-cyan-400 uppercase tracking-widest">Live Stream</p>
          <p className="text-lg font-mono font-bold text-white tracking-tighter">{time.toLocaleTimeString()}</p>
        </div>
      </div>
    </header>
  );
};

export default Navbar;