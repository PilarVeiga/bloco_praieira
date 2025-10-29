import Hero from '@/components/Hero';
import About from '@/components/About';
import Members from '@/components/Members';
import Gallery from '@/components/Gallery';
import Events from '@/components/Events';
import Donations from '@/components/Donations';
import Contact from '@/components/Contact';

export default function Home() {
  return (
    <main className="min-h-screen">
      <Hero />
      <About />
      <Members />
      <Gallery />
      <Events />
      <Donations />
      <Contact />
    </main>
  );
}
