import { useState } from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Planner from '@/components/Planner';
import Products from '@/components/Products';
import About from '@/components/About';
import Footer from '@/components/Footer';
import Dashboard from '@/components/Dashboard';
import LoadingScreen from '@/components/LoadingScreen';
import { useSearchHistory } from '@/hooks/useSearchHistory';

export default function App() {
  const { history, clearHistory } = useSearchHistory();
  const [historyVersion, setHistoryVersion] = useState(0);

  const handleClearHistory = () => {
    clearHistory();
    setHistoryVersion((v) => v + 1);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-purple-50/30 text-slate-900 antialiased scroll-smooth">
      <LoadingScreen />
      <Navbar />
      <main>
        <Hero />
        <Planner />
        <Products />
        <Dashboard key={historyVersion} history={history} onClearHistory={handleClearHistory} />
        <About />
      </main>
      <Footer />
    </div>
  );
}
