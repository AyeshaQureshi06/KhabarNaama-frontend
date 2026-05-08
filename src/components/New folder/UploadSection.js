import React from 'react';

const UploadSection = ({ mediaMode, mediaPreview, handleMedia, imageLanguage, setImageLanguage, isUrdu }) => {
  const handleFileChange = (event) => {
    handleMedia(event);
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="text-[10px] text-cyan-400/70 font-black tracking-[0.3em] uppercase mb-1">
            {mediaMode === 'video' ? 'Source Video' : 'Source Image'}
          </p>
          <p className="text-[9px] uppercase tracking-[0.35em] text-cyan-400/50">Upload source media for headline generation</p>
        </div>
        {mediaPreview ? (
          <span className="text-[9px] font-bold text-emerald-400 uppercase tracking-[0.35em] flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-emerald-400 block" /> LIVE_FEED
          </span>
        ) : (
          <span className="text-[9px] font-bold text-slate-500 uppercase tracking-[0.35em]">No file selected</span>
        )}
      </div>
      
      <div className="relative group">
        <input
          type="file"
          accept={mediaMode === 'video' ? 'video/*' : 'image/*'}
          onChange={handleFileChange}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-20"
        />
        
        <div className={`relative min-h-[240px] w-full rounded-[2rem] border border-dashed border-cyan-500/30 bg-[#0d1b2a]/40 transition-all duration-500 overflow-hidden flex items-center justify-center ${mediaPreview ? 'border-cyan-500/20 bg-[#0d1b2a]/60' : 'hover:border-cyan-400'}`}>
          
          {mediaPreview ? (
            <div className="relative w-full h-full overflow-hidden rounded-[1.75rem]">
              {mediaMode === 'video' ? (
                <video
                  src={mediaPreview}
                  className="w-full h-full object-cover"
                  muted
                  loop
                  playsInline
                  controls
                />
              ) : (
                <img 
                  src={mediaPreview} 
                  alt="Preview" 
                  className="w-full h-full object-cover" 
                />
              )}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center gap-4 text-cyan-400/50 pointer-events-none px-4">
              <div className="h-16 w-16 rounded-3xl bg-[#1a3a52] flex items-center justify-center">
                <span className="text-2xl">{mediaMode === 'video' ? '🎬' : '📷'}</span>
              </div>
              <div>
                <p className="text-base font-black text-cyan-400">{mediaMode === 'video' ? 'Upload Video' : 'Upload Image'}</p>
                <p className="text-[10px] uppercase tracking-[0.35em] text-cyan-400/50 mt-1">
                  {mediaMode === 'video' ? 'SUPPORTED: MP4, AVI, MOV' : 'SUPPORTED: JPG, PNG, WEBP'}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
      {mediaMode === 'image' && mediaPreview && (
        <div className="mt-4 rounded-2xl border border-cyan-500/30 bg-[#0d1b2a]/40 p-4">
          <p className="text-[10px] font-black uppercase tracking-[0.35em] text-cyan-400 mb-3">
            {isUrdu ? 'ہیڈ لائن کی زبان' : 'Headline Language'}
          </p>
          <div className="grid grid-cols-2 gap-3">
            {['english', 'urdu'].map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => setImageLanguage(item)}
                className={`py-3 rounded-2xl text-sm font-black uppercase tracking-[0.2em] transition-all duration-200 ${imageLanguage === item ? 'bg-red-600 text-white shadow-[0_10px_20px_rgba(220,38,38,0.3)]' : 'bg-[#1a3a52] text-cyan-300 hover:bg-[#2a4a62]'}`}
              >
                {item === 'english' ? 'English' : 'Urdu'}
              </button>
            ))}
          </div>
        </div>
      )}
      {mediaPreview && (
        <div className="mt-4 rounded-2xl border border-amber-600/40 bg-amber-950/30 p-3 text-[11px] text-amber-200">
          <p className="font-black uppercase tracking-[0.25em] text-amber-300 mb-1">AI Warning</p>
          <p className="leading-relaxed text-amber-100/80">
            Generated headlines may not always be accurate. Please verify the content before broadcasting.
          </p>
        </div>
      )}
    </div>
  );
};

export default UploadSection;
