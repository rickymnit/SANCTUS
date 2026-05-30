import { motion } from 'framer-motion';
import { Play, ExternalLink, Clock } from 'lucide-react';

/* ─── Data ────────────────────────────────────────────────────
   Genre-specific colors kept ONLY as a faint image scrim tint
   so thumbnails feel distinct without introducing new brand hues.
   All interactive chrome uses the site-standard cyan accent.
──────────────────────────────────────────────────────────────── */
const mixes = [
  {
    id: 5,
    title: 'Afro House — Early Morning Cinematics',
    description: 'Black Coffee, Keinemusik & more — sunrise sessions',
    genre: 'Afro House',
    duration: null,
    image: 'https://i.ytimg.com/vi/flMwXO-50As/hqdefault.jpg',
    url: 'https://youtu.be/flMwXO-50As',
  },
  {
    id: 1,
    title: 'Bolly Tech / Afro-House',
    description: 'Bollywood energy meets Afro-House grooves',
    genre: 'Afro-House',
    duration: '1:12:00',
    image: '/assets/mix-bolly-afrohouse.jpeg',
    url: 'https://youtu.be/-X48UMxQw9c',
  },
  {
    id: 4,
    title: 'Liquid DnB set in a Dorm',
    description: 'Late-night liquid vibes from the dorm room — pure Jaipur energy',
    genre: 'Liquid DnB',
    duration: null,
    image: 'https://i.ytimg.com/vi/nRYLjYj2EX0/hqdefault.jpg',
    url: 'https://youtu.be/nRYLjYj2EX0',
  },
  {
    id: 3,
    title: 'Liquid DnB / Jungle',
    description: 'Smooth Drum & Bass with soulful melodies',
    genre: 'Drum & Bass',
    duration: '1:05:00',
    image: '/assets/mix-liquid-dnb.jpeg',
    url: 'https://youtu.be/pRS0Du1DF1M',
  },
  {
    id: 2,
    title: 'Afro / Latin-House',
    description: 'Latin rhythms with modern House beats',
    genre: 'Latin-House',
    duration: '58:00',
    image: '/assets/mix-afro-latinhouse.jpeg',
    url: 'https://youtu.be/b2X7h0o_HPM',
  },
];

/* ─── Animation variants ─────────────────────────────────────
   Matches the duration / easing used in BookingSection & Hero
──────────────────────────────────────────────────────────────── */
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, delay: i * 0.1, ease: 'easeOut' },
  }),
};

/* ─── Mix Card ───────────────────────────────────────────────
   Surface / border / hover language mirrors BookingSection's
   contact cards:  bg-white/[0.03]  border-white/10
                   hover:border-cyan-500/30
──────────────────────────────────────────────────────────────── */
const MixCard = ({ mix, index, featured = false }) => (
  <motion.article
    custom={index}
    variants={fadeUp}
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true }}
    className={`group relative flex flex-col overflow-hidden rounded-2xl
      bg-white/[0.03] border border-white/10
      hover:border-cyan-500/30 transition-colors duration-500
      ${featured ? 'md:col-span-2 md:row-span-2' : ''}
    `}
  >
    {/* Thumbnail */}
    <a
      href={mix.url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Watch ${mix.title} on YouTube`}
      className="relative block overflow-hidden aspect-video"
    >
      <img
        src={mix.image}
        alt={mix.title}
        loading="lazy"
        className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
      />

      {/* Same scrim style used in LiveEnergy hover overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

      {/* Play button — cyan-400 to match nav underline & icon accent */}
      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <div className="w-14 h-14 rounded-full bg-cyan-400 flex items-center justify-center shadow-[0_0_30px_rgba(0,212,255,0.4)]">
          <Play className="w-5 h-5 text-black ml-0.5" fill="currentColor" aria-hidden="true" />
        </div>
      </div>

      {/* Duration badge — only shown when duration is known */}
      {mix.duration && (
        <div className="absolute bottom-3 right-3 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/70 backdrop-blur-sm border border-white/10 text-xs text-white/60">
          <Clock className="w-3 h-3 text-cyan-400" aria-hidden="true" />
          <span>{mix.duration}</span>
        </div>
      )}

      {/* Genre pill — same pattern as Hero genre pills:
          border color40, color10 bg, color text */}
      <div className="absolute top-3 left-3 px-3 py-1 rounded-full text-[11px] font-medium
        bg-cyan-400/10 border border-cyan-400/40 text-cyan-400">
        {mix.genre}
      </div>

      {/* Glow border on hover — mirrors LiveEnergy gallery card */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
        style={{ boxShadow: 'inset 0 0 30px rgba(0,212,255,0.15)' }}
        aria-hidden="true"
      />
    </a>

    {/* Card body */}
    <div className="flex flex-col flex-1 p-5 gap-3">
      {/* Cyan rule — matches accent lines in GenreExperience */}
      <div className="h-px w-10 rounded-full bg-cyan-400/60" />

      <h3 className={`font-bold text-white leading-snug ${featured ? 'text-xl md:text-2xl' : 'text-lg'}`}>
        {mix.title}
      </h3>

      {/* Body text opacity matches white/60 used in BookingSection */}
      <p className="text-sm text-white/60 leading-relaxed">{mix.description}</p>

      {/* CTA — cyan-400, same color as nav underline & icon accent */}
      <a
        href={mix.url}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-auto inline-flex items-center gap-1.5 text-xs font-semibold tracking-widest uppercase text-cyan-400 hover:text-cyan-300 transition-colors duration-200"
      >
        <span>Watch on YouTube</span>
        <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
      </a>
    </div>
  </motion.article>
);

/* ─── Section ────────────────────────────────────────────────── */
const SoundSection = () => (
  <section
    id="sound"
    className="relative py-32 px-6"
    aria-label="The Sound – featured mixes"
  >
    {/* Background — same gradient direction as BookingSection & LiveEnergy */}
    <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a] via-[#0d0d0d] to-[#0a0a0a]" />

    {/* Glow blobs — exactly mirrors BookingSection glow treatment:
        bg-cyan-500/10  blur-[150px] / bg-violet-500/10  blur-[150px] */}
    <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[150px] pointer-events-none" aria-hidden="true" />
    <div className="absolute bottom-1/4 left-0 w-[400px] h-[400px] bg-violet-500/10 rounded-full blur-[150px] pointer-events-none" aria-hidden="true" />

    <div className="relative z-10 max-w-6xl mx-auto">

      {/* ── Header ────────────────────────────────────────────
          Typography scale / opacity matches every other section:
          h2  font-black text-white  4xl→6xl
          sub text-white/50 text-lg
          eyebrow text-white/50 tracking-[0.3em] uppercase
      ──────────────────────────────────────────────────────── */}
      <motion.div
        className="text-center mb-16"
        variants={fadeUp}
        custom={0}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        {/* Eyebrow — matches Hero "Experience the Sound" */}
        <p className="text-white/50 text-sm tracking-[0.3em] uppercase mb-4">
          Curated Mixes
        </p>

        <h2 className="text-4xl md:text-6xl font-black text-white mb-4">
          The Sound
        </h2>

        <p className="text-white/50 text-lg max-w-2xl mx-auto">
          Every set is a journey — from peak-floor energy to deep groove sessions
        </p>
      </motion.div>

      {/* ── Bento Grid ────────────────────────────────────────
          5 cards across 2 rows:

          Row 1 — desktop: featured (col-span-2) + 1 card
                  tablet:  2-col equal
                  mobile:  1-col stack

          Row 2 — desktop + tablet: 2-col equal
                  mobile:  1-col stack
      ──────────────────────────────────────────────────────── */}

      {/* Row 1 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 mb-4 md:mb-6">
        {/* Featured — spans 2 of 3 desktop cols */}
        <MixCard mix={mixes[0]} index={1} featured />
        {/* Third col on desktop, second card on tablet/mobile */}
        <MixCard mix={mixes[1]} index={2} />
      </div>

      {/* Row 2 — 3 equal cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6">
        <MixCard mix={mixes[2]} index={3} />
        <MixCard mix={mixes[3]} index={4} />
        <MixCard mix={mixes[4]} index={5} />
      </div>

      {/* ── Instagram CTA ─────────────────────────────────────
          Positioned below grid, centred — same rhythm as the
          original section footer.
      ──────────────────────────────────────────────────────── */}
      <motion.div
        className="text-center mt-16"
        variants={fadeUp}
        custom={4}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <a
          href="https://www.instagram.com/sanctus.dj"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-3 px-8 py-4 rounded-full font-semibold text-white transition-transform duration-300 hover:scale-105"
          style={{
            background: 'linear-gradient(135deg, #833ab4, #fd1d1d, #fcb045)',
            boxShadow: '0 4px 30px rgba(253, 29, 29, 0.3)',
          }}
        >
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
          </svg>
          View All Reels @sanctus.dj
        </a>
      </motion.div>

    </div>
  </section>
);

export default SoundSection;
