import React, { useState, useEffect } from 'react';
import UploadSection from '../components/New folder/UploadSection';
import ConfigPanel from '../components/New folder/ConfigPanel';
import NewsCardGrid from '../components/New folder/NewsCardGrid';
import { imageToHeadline, videoToHeadline } from '../services/api';

// Resize image and convert to base64 for localStorage storage
const resizeAndEncode = (file) =>
  new Promise((resolve) => {
    const img = new Image();
    const url = URL.createObjectURL(file);
    img.onload = () => {
      const MAX = 400;
      const scale = Math.min(1, MAX / img.width);
      const canvas = document.createElement('canvas');
      canvas.width = img.width * scale;
      canvas.height = img.height * scale;
      canvas.getContext('2d').drawImage(img, 0, 0, canvas.width, canvas.height);
      URL.revokeObjectURL(url);
      resolve(canvas.toDataURL('image/jpeg', 0.75));
    };
    img.onerror = () => { URL.revokeObjectURL(url); resolve(null); };
    img.src = url;
  });

// Extract thumbnail frame from video file (at 1.5s)
const videoToThumbnail = (file) =>
  new Promise((resolve) => {
    const video = document.createElement('video');
    const url = URL.createObjectURL(file);
    video.src = url;
    video.muted = true;
    video.playsInline = true;
    video.currentTime = 1.5;
    video.onloadeddata = () => {
      video.onseeked = () => {
        const MAX = 400;
        const scale = Math.min(1, MAX / video.videoWidth);
        const canvas = document.createElement('canvas');
        canvas.width = video.videoWidth * scale;
        canvas.height = video.videoHeight * scale;
        canvas.getContext('2d').drawImage(video, 0, 0, canvas.width, canvas.height);
        URL.revokeObjectURL(url);
        resolve(canvas.toDataURL('image/jpeg', 0.75));
      };
      video.currentTime = 1.5;
    };
    video.onerror = () => { URL.revokeObjectURL(url); resolve(null); };
    video.load();
  });

const Home = ({ mediaMode, mediaPreview, mediaFile, handleMedia, history, addToHistory, language, newsCards, addNewsCard }) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [headlineData, setHeadlineData] = useState(null);
  const [currentHeadline, setCurrentHeadline] = useState(
    language === 'Urdu' ? "بریکنگ نیوز: آپ کی سرخی یہاں آئے گی۔" : "BREAKING NEWS: YOUR HEADLINE WILL APPEAR HERE"
  );
  const [showMedia, setShowMedia] = useState(false);
  const [imageLanguage, setImageLanguage] = useState('english');
  const [selectedTone, setSelectedTone] = useState('Breaking');

  useEffect(() => {
    setHeadlineData(null);
    setShowMedia(false);
    setCurrentHeadline(
      language === 'Urdu' ? "بریکنگ نیوز: آپ کی سرخی یہاں آئے گی۔" : "BREAKING NEWS: YOUR HEADLINE WILL APPEAR HERE"
    );
  }, [mediaMode, mediaPreview, language]);

  const triggerAI = async () => {
    if (!mediaFile) return;

    setIsProcessing(true);
    setHeadlineData(null);

    try {
      const toneMap = {
        'Breaking': 'breaking news',
        'Formal': 'formal',
        'Dramatic': 'dramatic',
        'Neutral': 'neutral',
        'Urgent': 'urgent',
        'Analytical': 'analytical'
      };
      const toneValue = toneMap[selectedTone] || 'breaking news';

      const response = mediaMode === 'video'
        ? await videoToHeadline(mediaFile, 'english')
        : await imageToHeadline(mediaFile, toneValue, imageLanguage);

      if (response.success) {
        setHeadlineData({
          headline: response.data.headline,
          category: response.data.category,
        });
        setCurrentHeadline(response.data.headline);
        addToHistory(response.data.headline, selectedTone);
        setShowMedia(true);

        // Save news card with image or video thumbnail
        const imageBase64 = mediaFile
          ? (mediaMode === 'video' ? await videoToThumbnail(mediaFile) : await resizeAndEncode(mediaFile))
          : null;
        addNewsCard(response.data.headline, response.data.category, selectedTone, imageBase64, mediaMode);
      } else {
        console.error('API error:', response.error);
      }
    } catch (error) {
      console.error('Unexpected error:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  const isUrdu = language === 'Urdu';

  return (
    <>
      <main className={`p-6 md:p-10 flex flex-col xl:flex-row gap-8 max-w-[1700px] mx-auto ${isUrdu ? 'flex-row-reverse' : ''}`}>
      
      {/* LEFT: STUDIO CONTROLS */}
      <aside className="w-full xl:w-[400px] xl:self-start">
        <div className="bg-[#0d1b2a] border border-cyan-500/20 p-8 shadow-2xl rounded-br-[3rem]">
          <h2 className={`text-xs font-black uppercase tracking-[0.3em] mb-8 text-cyan-400 ${isUrdu ? 'text-right' : ''}`}>
            {isUrdu ? 'کنٹرول پینل' : 'Broadcast Center'}
          </h2>
          <UploadSection
            mediaMode={mediaMode}
            mediaPreview={mediaPreview}
            handleMedia={handleMedia}
            imageLanguage={imageLanguage}
            setImageLanguage={setImageLanguage}
            isUrdu={isUrdu}
          />
          <div className="mt-10">
            <ConfigPanel activeTone={selectedTone} setActiveTone={setSelectedTone} />
          </div>
          <button 
            onClick={triggerAI}
            className="w-full mt-10 py-5 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-red-600 hover:to-red-700 text-white font-black text-xs uppercase tracking-[0.2em] transition-all duration-500 shadow-[0_10px_20px_rgba(0,0,0,0.3)] border-b-4 border-black/20"
          >
            {isProcessing ? 'SCANNING PIXELS...' : (isUrdu ? 'خبر تیار کریں' : 'Transmit Headline')}
          </button>
        </div>
      </aside>

      {/* MIDDLE: BROADCAST CANVAS + CARDS BELOW */}
      <div className="flex-1 flex flex-col gap-4">
      <section>
        <div className="relative h-[calc(100vh-160px)] bg-[#0a2347] border-4 border-[#1a4d6d] overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.5)]">
          
          {/* World Map Background Pattern */}
          <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] z-0"></div>
          
          {/* Full Canvas Media Preview */}
          {showMedia && mediaPreview && (
            <div className="absolute inset-0 w-full h-full z-0">
              {mediaMode === 'video' ? (
                <video
                  src={mediaPreview}
                  className="absolute inset-0 w-full h-full object-cover"
                  autoPlay
                  muted
                  loop
                  playsInline
                />
              ) : (
                <img
                  src={mediaPreview}
                  alt="Broadcast preview"
                  className="absolute inset-0 w-full h-full object-cover"
                />
              )}
            </div>
          )}

          <div className="absolute inset-0 bg-gradient-to-b from-blue-900/30 via-black/20 to-black/90 z-0"></div>
          
          {/* Top Breaking Bar */}
          <div className="absolute top-10 left-0 right-0 flex items-center z-10">
            <div className="bg-red-600 text-white px-8 py-3 font-black italic text-2xl skew-x-[-20deg] ml-[-20px] shadow-[10px_0_20px_rgba(0,0,0,0.3)]">
              <span className="inline-block skew-x-[20deg]">BREAKING NEWS</span>
            </div>
            <div className="flex-1 h-1 bg-gradient-to-r from-red-600 via-cyan-500 to-transparent"></div>
          </div>

          {/* Main Content Area */}
          <div className="relative z-10 h-full flex flex-col justify-between p-12 md:p-20 pt-32 pb-24">
             {isProcessing ? (
               <div className="flex-1 flex flex-col items-center justify-center gap-4">
                  <div className="w-20 h-20 border-4 border-cyan-500 border-t-red-600 rounded-full animate-spin"></div>
                  <p className="text-cyan-400 font-black tracking-widest animate-pulse bg-black/50 px-4 py-2 rounded">CONNECTING TO SATELLITE...</p>
               </div>
             ) : (
               <>
                 {/* Top: Category */}
                 <div className="flex justify-start">
                   {headlineData?.category && (
                     <div className="inline-flex items-center rounded-full bg-red-600/95 px-6 py-2 text-sm font-black uppercase tracking-[0.3em] text-white shadow-[0_5px_15px_rgba(220,38,38,0.5)] animate-in fade-in slide-in-from-top duration-700">
                       {headlineData.category}
                     </div>
                   )}
                 </div>

                 {/* Bottom: Headline */}
                 <div className="flex justify-start animate-in fade-in slide-in-from-bottom duration-700 mt-auto">
                   <h1 className={`text-4xl md:text-5xl lg:text-6xl font-black text-white leading-tight drop-shadow-[0_5px_15px_rgba(0,0,0,1)] ${isUrdu ? 'text-right w-full' : 'text-left italic'}`}>
                     {headlineData?.headline || currentHeadline}
                   </h1>
                 </div>
               </>
             )}
          </div>

          {/* Bottom Ticker/Live Info */}
          <div className="absolute bottom-0 left-0 right-0 p-6 flex justify-between items-end bg-gradient-to-t from-black to-transparent z-10">
             <div className="flex items-center gap-4">
                <div className="bg-white text-red-600 font-black px-4 py-1 skew-x-[-10deg]">
                  <span className="inline-block skew-x-[10deg]">LIVE</span>
                </div>
                <p className="text-[10px] font-bold text-cyan-400 uppercase tracking-[0.4em]">Broadcast Studio A</p>
             </div>
             <div className="flex gap-2">
                <div className="w-3 h-3 bg-red-600 rounded-full animate-pulse shadow-[0_0_10px_red]"></div>
                <div className="w-3 h-3 bg-cyan-500 rounded-full"></div>
             </div>
          </div>
        </div>
      </section>

      {/* NEWS CARDS GRID — below canvas */}
      <NewsCardGrid newsCards={newsCards} />

      </div>

      {/* RIGHT: EDITORIAL QUEUE - TEMPORARILY COMMENTED OUT */}
      {/*
      <aside className="w-full xl:w-[320px]">
        <div className="bg-[#0d1b2a]/80 backdrop-blur-md border border-cyan-500/20 p-6 h-full shadow-2xl">
          <div className="flex items-center justify-between mb-6">
            <h3 className={`text-[10px] font-black text-cyan-400 uppercase tracking-widest ${isUrdu ? 'text-right' : ''}`}>
              Editorial Queue
            </h3>
            <span className="text-[9px] uppercase tracking-[0.35em] text-cyan-600">Active</span>
          </div>
          <div className="space-y-4">
            {history.map((item, index) => (
              <div key={item.id} className={`relative group cursor-pointer rounded-3xl border ${index === 0 ? 'border-red-500 bg-[#1a3a52]' : 'border-cyan-600 bg-[#0d1b2a]'} p-4`}> 
                <div className="flex items-center justify-between mb-3">
                  <span className={`text-[8px] font-black uppercase tracking-[0.35em] ${index === 0 ? 'text-red-400' : 'text-cyan-400/50'}`}>
                    {index === 0 ? 'Ready to Transmit' : `Draft`}
                  </span>
                  <span className="text-[8px] uppercase tracking-[0.35em] text-cyan-400/50">{index === 0 ? 'NOW' : `${String(index * 4).padStart(2, '0')}m ago`}</span>
                </div>
                <p className={`text-sm font-bold leading-relaxed ${index === 0 ? 'text-white' : 'text-cyan-300'}`}>
                  “{item.text}”
                </p>
              </div>
            ))}
          </div>
        </div>
      </aside>
      */}
    </main>

    </>
  );
};

export default Home;