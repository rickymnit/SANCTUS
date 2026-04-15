import { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, CheckCircle, Mail, Phone, MapPin } from 'lucide-react';
import { contactApi } from '../../services/api';
import GlassCard from '../ui/GlassCard';
import NeonButton from '../ui/NeonButton';

const eventTypes = [
  'Club Night',
  'House Party',
  'SunDowners',
  'Festival',
  'Other',
];

const contactInfo = [
  { icon: Phone, label: 'Phone', value: '+91 9602091364', href: 'tel:+919602091364' },
  { icon: Mail, label: 'Email', value: 'bookings.sanctus@gmail.com', href: 'mailto:bookings.sanctus@gmail.com' },
  { icon: MapPin, label: 'Location', value: 'Jaipur, India', href: '#' },
];

const BookingSection = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    eventType: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [focusedField, setFocusedField] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await contactApi.submit({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        event_type: formData.eventType,
        message: formData.message,
      });
      setIsSubmitted(true);
      setFormData({ name: '', email: '', phone: '', eventType: '', message: '' });
    } catch (error) {
      console.error('Form submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <section id="book" className="relative py-32 px-6">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a] via-[#0d0d0d] to-[#0a0a0a]" />

      {/* Glow effects */}
      <div className="absolute top-1/4 left-0 w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[150px]" />
      <div className="absolute bottom-1/4 right-0 w-[400px] h-[400px] bg-violet-500/10 rounded-full blur-[150px]" />

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl md:text-6xl font-black text-white mb-4">
            Book the Experience
          </h2>
          <p className="text-white/50 text-lg max-w-2xl mx-auto">
            Let's create something unforgettable together
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h3 className="text-2xl font-bold text-white mb-6">
              Get in Touch
            </h3>
            <p className="text-white/60 mb-8 leading-relaxed">
              Whether you're planning a club night, House party, SunDowners, Festival or any other event,
              I'd love to bring the energy to your occasion. Reach out and let's make it happen.
            </p>

            <div className="space-y-4">
              {contactInfo.map((item, index) => (
                <motion.a
                  key={item.label}
                  href={item.href}
                  className="flex items-center gap-4 p-4 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-cyan-500/30 transition-colors group"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ x: 5 }}
                >
                  <div className="w-12 h-12 rounded-xl bg-cyan-500/10 flex items-center justify-center group-hover:bg-cyan-500/20 transition-colors">
                    <item.icon className="w-5 h-5 text-cyan-400" />
                  </div>
                  <div>
                    <p className="text-white/40 text-sm">{item.label}</p>
                    <p className="text-white font-medium group-hover:text-cyan-400 transition-colors">
                      {item.value}
                    </p>
                  </div>
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <GlassCard className="p-8">
              {isSubmitted ? (
                <motion.div
                  className="text-center py-12"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', damping: 10 }}
                  >
                    <CheckCircle className="w-16 h-16 text-green-400 mx-auto mb-4" />
                  </motion.div>
                  <h3 className="text-2xl font-bold text-white mb-2">
                    Message Sent!
                  </h3>
                  <p className="text-white/60">
                    Thank you for reaching out. I'll get back to you soon.
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid sm:grid-cols-2 gap-6">
                    {/* Name */}
                    <div className="relative">
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        onFocus={() => setFocusedField('name')}
                        onBlur={() => setFocusedField(null)}
                        required
                        className="w-full px-4 py-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder-transparent focus:outline-none focus:border-cyan-500/50 transition-colors peer"
                        placeholder="Name"
                      />
                      <label
                        className={`absolute left-4 transition-all duration-200 pointer-events-none ${formData.name || focusedField === 'name'
                          ? '-top-2 text-xs text-cyan-400 bg-[#0a0a0a] px-2'
                          : 'top-4 text-white/40'
                          }`}
                      >
                        Your Name
                      </label>
                    </div>

                    {/* Email */}
                    <div className="relative">
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        onFocus={() => setFocusedField('email')}
                        onBlur={() => setFocusedField(null)}
                        required
                        className="w-full px-4 py-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder-transparent focus:outline-none focus:border-cyan-500/50 transition-colors peer"
                        placeholder="Email"
                      />
                      <label
                        className={`absolute left-4 transition-all duration-200 pointer-events-none ${formData.email || focusedField === 'email'
                          ? '-top-2 text-xs text-cyan-400 bg-[#0a0a0a] px-2'
                          : 'top-4 text-white/40'
                          }`}
                      >
                        Email Address
                      </label>
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-6">
                    {/* Phone */}
                    <div className="relative">
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        onFocus={() => setFocusedField('phone')}
                        onBlur={() => setFocusedField(null)}
                        className="w-full px-4 py-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder-transparent focus:outline-none focus:border-cyan-500/50 transition-colors peer"
                        placeholder="Phone"
                      />
                      <label
                        className={`absolute left-4 transition-all duration-200 pointer-events-none ${formData.phone || focusedField === 'phone'
                          ? '-top-2 text-xs text-cyan-400 bg-[#0a0a0a] px-2'
                          : 'top-4 text-white/40'
                          }`}
                      >
                        Phone Number
                      </label>
                    </div>

                    {/* Event Type */}
                    <div className="relative">
                      <select
                        name="eventType"
                        value={formData.eventType}
                        onChange={handleChange}
                        onFocus={() => setFocusedField('eventType')}
                        onBlur={() => setFocusedField(null)}
                        required
                        className="w-full px-4 py-4 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-cyan-500/50 transition-colors appearance-none cursor-pointer"
                      >
                        <option value="" disabled className="bg-[#111]"></option>
                        {eventTypes.map(type => (
                          <option key={type} value={type} className="bg-[#111]">{type}</option>
                        ))}
                      </select>
                      <label
                        className={`absolute left-4 transition-all duration-200 pointer-events-none ${formData.eventType || focusedField === 'eventType'
                          ? '-top-2 text-xs text-cyan-400 bg-[#0a0a0a] px-2'
                          : 'top-4 text-white/40'
                          }`}
                      >
                        Event Type
                      </label>
                    </div>
                  </div>

                  {/* Message */}
                  <div className="relative">
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      onFocus={() => setFocusedField('message')}
                      onBlur={() => setFocusedField(null)}
                      required
                      rows={4}
                      className="w-full px-4 py-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder-transparent focus:outline-none focus:border-cyan-500/50 transition-colors resize-none peer"
                      placeholder="Message"
                    />
                    <label
                      className={`absolute left-4 transition-all duration-200 pointer-events-none ${formData.message || focusedField === 'message'
                        ? '-top-2 text-xs text-cyan-400 bg-[#0a0a0a] px-2'
                        : 'top-4 text-white/40'
                        }`}
                    >
                      Tell me about your event...
                    </label>
                  </div>

                  {/* Submit */}
                  <NeonButton
                    variant="cyan"
                    size="lg"
                    className="w-full"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <span className="flex items-center justify-center gap-2">
                        <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                        </svg>
                        Sending...
                      </span>
                    ) : (
                      <span className="flex items-center justify-center gap-2">
                        <Send className="w-5 h-5" />
                        Send Message
                      </span>
                    )}
                  </NeonButton>
                </form>
              )}
            </GlassCard>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default BookingSection;
