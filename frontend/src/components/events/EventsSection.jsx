import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Calendar, MapPin, Ticket, ExternalLink } from 'lucide-react';
import { eventsApi } from '../../services/api';
import { useInView } from '../../hooks/useInView';
import SectionTitle from '../ui/SectionTitle';
import LoadingSpinner from '../ui/LoadingSpinner';

const EventsSection = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('upcoming');
  const [ref, isInView] = useInView({ threshold: 0.1, triggerOnce: true });

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await eventsApi.getAll();
        setEvents(response.data);
      } catch (error) {
        console.error('Failed to fetch events:', error);
        // Fallback data
        setEvents([
          {
            id: '1',
            title: 'Neon Nights Festival',
            venue: 'Jaipur Club',
            date: '2024-12-31T22:00:00',
            ticket_url: '#',
            image: '/assets/bg-drum-bass.jpeg',
            description: 'New Year\'s Eve special with Drum & Bass and House music',
            is_past: false,
          },
          {
            id: '2',
            title: 'Underground Sessions',
            venue: 'The Warehouse',
            date: '2024-11-15T21:00:00',
            ticket_url: '#',
            image: '/assets/bg-house.jpeg',
            description: 'Deep House and Techno all night long',
            is_past: true,
          },
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  const filteredEvents = events.filter(event => 
    activeTab === 'upcoming' ? !event.is_past : event.is_past
  );

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return {
      day: date.getDate(),
      month: date.toLocaleDateString('en-US', { month: 'short' }),
      year: date.getFullYear(),
      time: date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
    };
  };

  if (loading) {
    return (
      <section id="events" className="py-20 md:py-32 bg-dark-900">
        <div className="container mx-auto px-6 text-center">
          <LoadingSpinner size="lg" />
        </div>
      </section>
    );
  }

  return (
    <section id="events" className="py-20 md:py-32 bg-dark-900">
      <div className="container mx-auto px-6 max-w-6xl">
        <SectionTitle title="Events" subtitle="Upcoming gigs and past performances" />

        {/* Tabs */}
        <div ref={ref} className="flex justify-center gap-4 mb-12">
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            onClick={() => setActiveTab('upcoming')}
            className={`px-8 py-3 rounded-full font-medium transition-all duration-300 ${
              activeTab === 'upcoming'
                ? 'bg-primary-500 text-black'
                : 'bg-dark-700 text-gray-300 hover:bg-dark-600'
            }`}
          >
            Upcoming
          </motion.button>
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1 }}
            onClick={() => setActiveTab('past')}
            className={`px-8 py-3 rounded-full font-medium transition-all duration-300 ${
              activeTab === 'past'
                ? 'bg-primary-500 text-black'
                : 'bg-dark-700 text-gray-300 hover:bg-dark-600'
            }`}
          >
            Past Events
          </motion.button>
        </div>

        {/* Events Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {filteredEvents.length > 0 ? (
            filteredEvents.map((event, index) => {
              const date = formatDate(event.date);
              return (
                <motion.div
                  key={event.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  className="group bg-dark-800 rounded-2xl overflow-hidden border border-dark-700 hover:border-primary-500/50 transition-all duration-300"
                >
                  <div className="flex flex-col sm:flex-row">
                    {/* Date Badge */}
                    <div className="sm:w-28 flex-shrink-0 bg-primary-500/10 p-6 flex flex-col items-center justify-center border-b sm:border-b-0 sm:border-r border-dark-700">
                      <span className="text-4xl font-black text-primary-500 font-rave">
                        {date.day}
                      </span>
                      <span className="text-lg font-semibold text-white uppercase">
                        {date.month}
                      </span>
                      <span className="text-sm text-gray-500">{date.year}</span>
                    </div>

                    {/* Content */}
                    <div className="flex-grow p-6">
                      <h3 className="text-xl font-bold text-white mb-2 group-hover:text-primary-500 transition-colors">
                        {event.title}
                      </h3>
                      
                      <div className="space-y-2 mb-4">
                        <div className="flex items-center gap-2 text-gray-400">
                          <MapPin size={16} className="text-primary-500" />
                          <span>{event.venue}</span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-400">
                          <Calendar size={16} className="text-primary-500" />
                          <span>{date.time}</span>
                        </div>
                      </div>

                      {event.description && (
                        <p className="text-gray-500 text-sm mb-4 line-clamp-2">
                          {event.description}
                        </p>
                      )}

                      {event.ticket_url && activeTab === 'upcoming' && (
                        <motion.a
                          href={event.ticket_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 px-4 py-2 bg-primary-500 text-black font-semibold rounded-full text-sm hover:bg-primary-400 transition-colors"
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <Ticket size={16} />
                          Get Tickets
                          <ExternalLink size={14} />
                        </motion.a>
                      )}
                    </div>

                    {/* Image */}
                    {event.image && (
                      <div className="hidden lg:block w-48 flex-shrink-0">
                        <img
                          src={event.image}
                          alt={event.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
                  </div>
                </motion.div>
              );
            })
          ) : (
            <div className="col-span-2 text-center py-16">
              <p className="text-gray-500 text-lg">
                No {activeTab} events at the moment.
              </p>
              <p className="text-gray-600 mt-2">
                Check back soon for updates!
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default EventsSection;
