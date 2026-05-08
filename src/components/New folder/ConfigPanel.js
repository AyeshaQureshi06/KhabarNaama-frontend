import React from 'react';

const ConfigPanel = ({ activeTone, setActiveTone }) => {
  const primaryTones = ['Breaking', 'Formal'];
  const availableStyles = ['Dramatic', 'Neutral', 'Urgent', 'Analytical'];

  return (
    <div className="flex flex-col gap-6">
      <div>
        <p className="text-[10px] text-cyan-400/70 font-black tracking-[0.3em] uppercase mb-3">Primary Tone</p>
        <div className="space-y-3">
          {primaryTones.map((tone, index) => (
            <button
              key={tone}
              onClick={() => setActiveTone(tone)}
              className={`w-full flex items-center justify-between rounded-[1.25rem] px-4 py-4 text-left text-sm font-black uppercase tracking-[0.15em] transition-all duration-300 ${activeTone === tone ? 'bg-[#1a3a52] border border-red-500 text-red-300 shadow-[0_15px_35px_rgba(200,16,46,0.18)]' : 'bg-[#0d1b2a] border border-cyan-600 text-cyan-300 hover:border-cyan-400'}`}
            >
              <span>{tone}</span>
              <span className="text-[10px] text-cyan-400/50">0{index + 1}</span>
            </button>
          ))}
        </div>
      </div>

      <div>
        <p className="text-[10px] text-cyan-400/70 font-black tracking-[0.3em] uppercase mb-3">Available Styles</p>
        <div className="grid grid-cols-2 gap-3">
          {availableStyles.map((tone) => (
            <button
              key={tone}
              onClick={() => setActiveTone(tone)}
              className={`rounded-2xl px-4 py-3 text-[11px] font-black uppercase tracking-[0.15em] transition-all duration-300 ${activeTone === tone ? 'bg-[#1a3a52] border border-red-500 text-red-300 shadow-[0_15px_35px_rgba(200,16,46,0.18)]' : 'bg-[#0d1b2a] border border-cyan-600 text-cyan-300 hover:border-cyan-400'}`}
            >
              {tone}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ConfigPanel;