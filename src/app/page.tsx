import Hero from '@/components/Hero';
import About from '@/components/About';
import Members from '@/components/Members';
import Gallery from '@/components/Gallery';
import UpcomingShows from '@/components/UpcomingShows';
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
      <UpcomingShows />
      <Events />
      <Donations />
      <Contact />
    </main>
  );
}
