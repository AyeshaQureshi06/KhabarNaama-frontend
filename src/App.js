import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/New folder/Navbar';
import Footer from './components/New folder/Footer';
import Home from './pages/Home';
import NewsDetail from './pages/NewsDetail';

function App() {
  const [time, setTime] = useState(new Date());
  const [mediaPreview, setMediaPreview] = useState(null);
  const [mediaFile, setMediaFile] = useState(null);
  const [language, setLanguage] = useState('English');
  const [mediaMode, setMediaMode] = useState('image');
  const defaultHistory = [
    { id: 1, text: "Market Volatility: Global Tech Stocks Take a Dip", tone: "Breaking" },
    { id: 2, text: "Artificial Intelligence Summit Scheduled for June", tone: "Breaking" }
  ];

  const [history, setHistory] = useState(() => {
    try {
      const saved = localStorage.getItem('khabarnaama_history');
      return saved ? JSON.parse(saved) : defaultHistory;
    } catch {
      return defaultHistory;
    }
  });

  const [newsCards, setNewsCards] = useState(() => {
    try {
      const saved = localStorage.getItem('khabarnaama_cards');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

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
    setHistory(prev => {
      const updated = [{ id: Date.now(), text: newHeadline, tone }, ...prev.slice(0, 4)];
      try {
        localStorage.setItem('khabarnaama_history', JSON.stringify(updated));
      } catch (e) {
        console.error('LocalStorage save failed:', e);
      }
      return updated;
    });
  };

  const addNewsCard = (headline, category, tone, imageBase64, mediaMode) => {
    setNewsCards(prev => {
      const updated = [
        { id: Date.now(), headline, category, tone, imageBase64, mediaMode, timestamp: new Date().toISOString() },
        ...prev.slice(0, 7)
      ];
      try {
        localStorage.setItem('khabarnaama_cards', JSON.stringify(updated));
      } catch (e) {
        console.error('NewsCard save failed:', e);
      }
      return updated;
    });
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/news/:id" element={<NewsDetail />} />
        <Route path="/" element={
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
                newsCards={newsCards}
                addNewsCard={addNewsCard}
              />
            </div>
            <div className="fixed bottom-0 left-0 w-full z-50">
              <Footer history={history} />
            </div>
          </div>
        } />
      </Routes>
    </BrowserRouter>
  );
}

export default App;