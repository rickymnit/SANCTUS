import { motion } from 'framer-motion';
import { useInView } from '../../hooks/useInView';
import SectionTitle from '../ui/SectionTitle';

const stats = [
  { value: '5+', label: 'Years Active' },
  { value: '50+', label: 'Gigs Played' },
  { value: '10+', label: 'Cities' },
  { value: '5', label: 'Genres' },
];

const AboutSection = () => {
  const [ref, isInView] = useInView({ threshold: 0.2, triggerOnce: true });

  return (
    <section id="about" className="py-20 md:py-32 bg-dark-800">
      <div className="container mx-auto px-6 max-w-6xl">
        <SectionTitle title="About" subtitle="The story behind the sound" />

        <div ref={ref} className="grid md:grid-cols-2 gap-12 items-center mt-16">
          {/* Profile Image */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="relative mx-auto w-72 h-72 md:w-96 md:h-96">
              {/* Glow Effect */}
              <div className="absolute inset-0 bg-primary-500/20 rounded-2xl blur-3xl" />
              
              {/* Image */}
              <motion.img
                src="/assets/profile.jpeg"
                alt="SANCTUS DJ"
                className="relative w-full h-full object-cover rounded-2xl border-4 border-primary-500/30 shadow-2xl"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              />

              {/* Decorative Elements */}
              <motion.div
                className="absolute -top-4 -right-4 w-24 h-24 border-t-4 border-r-4 border-primary-500/50 rounded-tr-2xl"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: 0.3, duration: 0.5 }}
              />
              <motion.div
                className="absolute -bottom-4 -left-4 w-24 h-24 border-b-4 border-l-4 border-primary-500/50 rounded-bl-2xl"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: 0.4, duration: 0.5 }}
              />
            </div>
          </motion.div>

          {/* Bio Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-6">
              Ricky R. Nazareth
            </h3>
            
            <div className="space-y-4 text-gray-300 leading-relaxed">
              <p>
                Known on stage as <span className="text-primary-500 font-semibold">SANCTUS</span>, 
                I am a 22-year-old Jaipur-based DJ reshaping the soundscape with a fusion of global 
                underground energy and nostalgic soul.
              </p>
              <p>
                My sets weave through Afro, House, Techno, Drum & Bass, Grime, Hip-Hop, and Latin 
                rhythms, layered with the timeless charm of Bollywood/Punjabi classics and melodies. 
                Blending deep emotion with high-energy flow, I transform nostalgia into movement, 
                where vintage meets modern, and every beat tells a story.
              </p>
              <p>
                What began as pure fascination for the energy of Skrillex, Diplo, David Guetta, and 
                Avicii, slowly evolved into a deeper exploration of sounds. As I grew, my taste shifted 
                towards House and Afro, inspired by artists like Black Coffee and Keinemusik, and then 
                into the raw pulse of Drum & Bass, Jungle, and UK Garage.
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-10">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.4 + index * 0.1, duration: 0.5 }}
                  className="text-center p-4 bg-dark-700/50 rounded-xl border border-dark-600"
                >
                  <div className="text-3xl md:text-4xl font-black text-primary-500 font-rave">
                    {stat.value}
                  </div>
                  <div className="text-sm text-gray-400 mt-1">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
