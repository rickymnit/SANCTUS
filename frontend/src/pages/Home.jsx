import HeroSlider from '../components/hero/HeroSlider';
import AboutSection from '../components/about/AboutSection';
import MusicSection from '../components/music/MusicSection';
import GalleryGrid from '../components/gallery/GalleryGrid';
import EventsSection from '../components/events/EventsSection';
import ContactSection from '../components/contact/ContactSection';

const Home = () => {
  return (
    <>
      <HeroSlider />
      <AboutSection />
      <MusicSection />
      <GalleryGrid />
      <EventsSection />
      <ContactSection />
    </>
  );
};

export default Home;
