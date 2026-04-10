import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Lock, Image as ImageIcon, Calendar, MessageSquare, Trash2, Upload, LogOut, CheckCircle, XCircle } from 'lucide-react';
import { galleryApi, eventsApi, contactApi } from '../services/api';

const Admin = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [activeTab, setActiveTab] = useState('gallery');
  const [gallery, setGallery] = useState([]);
  const [events, setEvents] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(false);

  // Check if already authenticated
  useEffect(() => {
    const auth = localStorage.getItem('admin_auth');
    if (auth === 'true') {
      setIsAuthenticated(true);
      fetchData();
    }
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [galleryRes, eventsRes, contactsRes] = await Promise.all([
        galleryApi.getAll(),
        eventsApi.getAll(),
        contactApi.getSubmissions(),
      ]);
      setGallery(galleryRes.data);
      setEvents(eventsRes.data);
      setContacts(contactsRes.data);
    } catch (error) {
      console.error('Failed to fetch data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = (e) => {
    e.preventDefault();
    // Simple password check - in production, use proper authentication
    if (password === 'admin123') {
      setIsAuthenticated(true);
      localStorage.setItem('admin_auth', 'true');
      setLoginError('');
      fetchData();
    } else {
      setLoginError('Invalid password');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('admin_auth');
    setPassword('');
  };

  const handleDeleteImage = async (id) => {
    if (!confirm('Are you sure you want to delete this image?')) return;
    try {
      await galleryApi.delete(id);
      setGallery(gallery.filter(img => img.id !== id));
    } catch (error) {
      alert('Failed to delete image');
    }
  };

  const handleDeleteEvent = async (id) => {
    if (!confirm('Are you sure you want to delete this event?')) return;
    try {
      await eventsApi.delete(id);
      setEvents(events.filter(event => event.id !== id));
    } catch (error) {
      alert('Failed to delete event');
    }
  };

  const handleUpdateContactStatus = async (id, status) => {
    try {
      await contactApi.updateStatus(id, status);
      setContacts(contacts.map(c => c.id === id ? { ...c, status } : c));
    } catch (error) {
      alert('Failed to update status');
    }
  };

  const handleDeleteContact = async (id) => {
    if (!confirm('Are you sure you want to delete this submission?')) return;
    try {
      await contactApi.delete(id);
      setContacts(contacts.filter(c => c.id !== id));
    } catch (error) {
      alert('Failed to delete submission');
    }
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);
    formData.append('category', 'live-shows');
    formData.append('title', file.name);

    try {
      const response = await galleryApi.upload(formData);
      setGallery([...gallery, response.data]);
      alert('Image uploaded successfully!');
    } catch (error) {
      alert('Failed to upload image');
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-dark-900 flex items-center justify-center px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md bg-dark-800 p-8 rounded-2xl border border-dark-700"
        >
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-primary-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Lock size={32} className="text-primary-500" />
            </div>
            <h1 className="text-2xl font-bold text-white font-rave">Admin Login</h1>
            <p className="text-gray-400 mt-2">Enter password to access admin panel</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="w-full px-4 py-3 bg-dark-700 border border-dark-600 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-primary-500"
            />
            {loginError && (
              <p className="text-red-400 text-sm">{loginError}</p>
            )}
            <button
              type="submit"
              className="w-full px-6 py-3 bg-primary-500 text-black font-bold rounded-xl hover:bg-primary-400 transition-colors"
            >
              Login
            </button>
          </form>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-dark-900">
      {/* Header */}
      <header className="bg-dark-800 border-b border-dark-700 sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-white font-rave">Admin Panel</h1>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 text-gray-400 hover:text-white transition-colors"
            >
              <LogOut size={18} />
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* Tabs */}
      <div className="container mx-auto px-6 py-6">
        <div className="flex flex-wrap gap-2 mb-8">
          {[
            { id: 'gallery', label: 'Gallery', icon: ImageIcon },
            { id: 'events', label: 'Events', icon: Calendar },
            { id: 'contacts', label: 'Messages', icon: MessageSquare },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-colors ${
                activeTab === tab.id
                  ? 'bg-primary-500 text-black'
                  : 'bg-dark-800 text-gray-400 hover:bg-dark-700'
              }`}
            >
              <tab.icon size={18} />
              {tab.label}
              {tab.id === 'contacts' && contacts.filter(c => c.status === 'new').length > 0 && (
                <span className="ml-2 px-2 py-0.5 bg-red-500 text-white text-xs rounded-full">
                  {contacts.filter(c => c.status === 'new').length}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Content */}
        {loading ? (
          <div className="text-center py-20">
            <div className="w-8 h-8 border-2 border-primary-500/30 border-t-primary-500 rounded-full animate-spin mx-auto" />
          </div>
        ) : (
          <AnimatePresence mode="wait">
            {/* Gallery Tab */}
            {activeTab === 'gallery' && (
              <motion.div
                key="gallery"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
              >
                <div className="mb-6">
                  <label className="flex items-center gap-3 px-6 py-3 bg-primary-500 text-black font-bold rounded-xl cursor-pointer hover:bg-primary-400 transition-colors w-fit">
                    <Upload size={20} />
                    Upload Image
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                  </label>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                  {gallery.map(image => (
                    <div key={image.id} className="group relative aspect-square rounded-xl overflow-hidden bg-dark-800">
                      <img
                        src={image.url}
                        alt={image.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <button
                          onClick={() => handleDeleteImage(image.id)}
                          className="p-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Events Tab */}
            {activeTab === 'events' && (
              <motion.div
                key="events"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
              >
                <div className="space-y-4">
                  {events.map(event => (
                    <div key={event.id} className="flex items-center justify-between p-4 bg-dark-800 rounded-xl">
                      <div className="flex items-center gap-4">
                        <div className="w-16 h-16 rounded-lg bg-dark-700 flex items-center justify-center text-2xl font-bold text-primary-500">
                          {new Date(event.date).getDate()}
                        </div>
                        <div>
                          <h3 className="font-bold text-white">{event.title}</h3>
                          <p className="text-gray-400 text-sm">{event.venue}</p>
                          <p className="text-gray-500 text-xs">
                            {new Date(event.date).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                      <button
                        onClick={() => handleDeleteEvent(event.id)}
                        className="p-2 text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Contacts Tab */}
            {activeTab === 'contacts' && (
              <motion.div
                key="contacts"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
              >
                <div className="space-y-4">
                  {contacts.map(contact => (
                    <div
                      key={contact.id}
                      className={`p-4 rounded-xl border ${
                        contact.status === 'new'
                          ? 'bg-primary-500/5 border-primary-500/30'
                          : 'bg-dark-800 border-dark-700'
                      }`}
                    >
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <h3 className="font-bold text-white">{contact.name}</h3>
                          <p className="text-gray-400 text-sm">{contact.email}</p>
                          {contact.phone && (
                            <p className="text-gray-500 text-sm">{contact.phone}</p>
                          )}
                        </div>
                        <div className="flex items-center gap-2">
                          {contact.status === 'new' ? (
                            <span className="px-2 py-1 bg-primary-500 text-black text-xs font-bold rounded">
                              NEW
                            </span>
                          ) : (
                            <span className="px-2 py-1 bg-green-500/20 text-green-400 text-xs rounded">
                              Read
                            </span>
                          )}
                          <button
                            onClick={() => handleDeleteContact(contact.id)}
                            className="p-1 text-gray-500 hover:text-red-400 transition-colors"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </div>
                      <div className="mb-3">
                        <span className="text-xs text-gray-500 uppercase tracking-wide">Event Type</span>
                        <p className="text-gray-300">{contact.event_type}</p>
                      </div>
                      <div className="mb-3">
                        <span className="text-xs text-gray-500 uppercase tracking-wide">Message</span>
                        <p className="text-gray-300 text-sm mt-1">{contact.message}</p>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-gray-500">
                          {new Date(contact.submitted_at).toLocaleString()}
                        </span>
                        {contact.status === 'new' && (
                          <button
                            onClick={() => handleUpdateContactStatus(contact.id, 'read')}
                            className="flex items-center gap-1 px-3 py-1 bg-green-500/20 text-green-400 text-sm rounded-lg hover:bg-green-500/30 transition-colors"
                          >
                            <CheckCircle size={14} />
                            Mark as Read
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        )}
      </div>
    </div>
  );
};

export default Admin;
