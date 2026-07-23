import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Planner from '@/components/Planner';
import Products from '@/components/Products';
import About from '@/components/About';
import Footer from '@/components/Footer';

export default function App() {
  return (
    <div className="min-h-screen bg-white text-slate-900 antialiased scroll-smooth">
      <Navbar />
      <main>
        <Hero />
        <Planner />
        <Products />
        <About />
      </main>
      <Footer />
    </div>
  );
}
