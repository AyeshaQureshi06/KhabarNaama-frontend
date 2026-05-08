import React, { useState, useEffect } from 'react';
import Navbar from './components/New folder/Navbar';
import Footer from './components/New folder/Footer';
import Home from './pages/Home';

function App() {
  const [time, setTime] = useState(new Date());
  const [mediaPreview, setMediaPreview] = useState(null);
  const [mediaFile, setMediaFile] = useState(null);
  const [language, setLanguage] = useState('English');
  const [mediaMode, setMediaMode] = useState('image');
  const [history, setHistory] = useState([
    { id: 1, text: "Market Volatility: Global Tech Stocks Take a Dip", tone: "Breaking" },
    { id: 2, text: "Artificial Intelligence Summit Scheduled for June", tone: "Breaking" }
  ]);

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    setMediaPreview(null);
    setMediaFile(null);
  }, [mediaMode]);

  const handleMedia = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setMediaFile(file);
    setMediaPreview(URL.createObjectURL(file));
  };

  const addToHistory = (newHeadline, tone) => {
    setHistory(prev => [{ id: Date.now(), text: newHeadline, tone }, ...prev.slice(0, 4)]);
  };

  return (
    <div className={`min-h-screen flex flex-col bg-[#001a2e] ${language === 'Urdu' ? 'font-serif' : ''}`}>
      <Navbar time={time} mediaMode={mediaMode} setMediaMode={setMediaMode} />
      <div className="flex-1 pb-24">
        <Home 
          mediaMode={mediaMode}
          mediaPreview={mediaPreview}
          mediaFile={mediaFile}
          handleMedia={handleMedia}
          history={history}
          addToHistory={addToHistory}
          language={language}
        />
      </div>
      <div className="fixed bottom-0 left-0 w-full z-50">
        <Footer history={history} />
      </div>
    </div>
  );
}

export default App;