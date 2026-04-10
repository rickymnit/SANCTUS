# SANCTUS DJ Portfolio

A modern, production-ready full-stack DJ portfolio website built with React (Vite), Tailwind CSS, Framer Motion, and FastAPI.

![SANCTUS Portfolio](https://sanctusportfolio.vercel.app/)

## Features

- **Immersive Hero Section**: Fullscreen genre slider with 5 music genres (Drum & Bass, House, Afro, Trance, Techno)
- **Dynamic Gallery**: Masonry grid with category filtering and lightbox preview
- **Music Section**: Embedded YouTube mixes with hover effects
- **Events Management**: Upcoming gigs and past performances
- **Contact Form**: Booking inquiries with backend storage
- **Admin Panel**: Basic admin interface for managing content
- **Responsive Design**: Mobile-first approach with smooth animations
- **Dark Theme**: Club aesthetic with amber accents

## Tech Stack

### Frontend
- React 18 with Vite
- Tailwind CSS for styling
- Framer Motion for animations
- React Router for navigation
- Axios for API calls
- Lucide React for icons

### Backend
- FastAPI (Python)
- Pydantic for data validation
- JSON file storage (easily upgradable to database)
- CORS enabled
- Static file serving

## Project Structure

```
/
├── frontend/                 # React frontend
│   ├── src/
│   │   ├── components/       # Reusable components
│   │   │   ├── layout/       # Navbar, Footer, Layout
│   │   │   ├── hero/         # HeroSlider
│   │   │   ├── about/        # AboutSection
│   │   │   ├── music/        # MusicSection
│   │   │   ├── gallery/      # GalleryGrid
│   │   │   ├── events/       # EventsSection
│   │   │   ├── contact/      # ContactSection
│   │   │   └── ui/           # Button, SectionTitle, LoadingSpinner
│   │   ├── pages/            # Home, Admin
│   │   ├── hooks/            # useScrollPosition, useInView, useApi
│   │   ├── services/         # API service
│   │   └── App.jsx
│   ├── public/               # Static assets
│   ├── package.json
│   ├── tailwind.config.js
│   └── Dockerfile
│
├── backend/                  # FastAPI backend
│   ├── app/
│   │   ├── api/routes/       # API endpoints
│   │   ├── core/             # Configuration
│   │   ├── models/           # Pydantic models
│   │   ├── services/         # Business logic
│   │   └── main.py           # Application entry
│   ├── data/                 # JSON data storage
│   ├── requirements.txt
│   └── Dockerfile
│
├── assets/                   # Images and media
├── docker-compose.yml
└── README.md
```

## Quick Start

### Prerequisites
- Node.js 18+ and npm
- Python 3.11+
- Docker (optional)

### Option 1: Local Development

#### Backend Setup
```bash
cd backend

# Create virtual environment
python -m venv venv

# Activate (Linux/WSL)
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Run development server
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

The API will be available at `http://localhost:8000`
- API Documentation: `http://localhost:8000/api/docs`
- Health Check: `http://localhost:8000/api/health`

#### Frontend Setup
```bash
cd frontend

# Install dependencies
npm install

# Run development server
npm run dev
```

The frontend will be available at `http://localhost:5173`

### Option 2: Docker (Recommended for Production)

```bash
# Build and start all services
docker-compose up --build

# Or run in background
docker-compose up -d --build

# Stop services
docker-compose down
```

- Frontend: `http://localhost:3000`
- Backend API: `http://localhost:8000`

## API Endpoints

### Genres
- `GET /api/genres` - List all genres with hero images

### Gallery
- `GET /api/gallery` - List all images
- `GET /api/gallery?category={id}` - Filter by category
- `GET /api/gallery/categories` - List categories
- `POST /api/gallery/admin/upload` - Upload image (admin)
- `DELETE /api/gallery/admin/{id}` - Delete image (admin)

### Events
- `GET /api/events` - List all events
- `GET /api/events?upcoming=true` - Upcoming events
- `GET /api/events?past=true` - Past events
- `POST /api/events/admin/` - Create event (admin)
- `DELETE /api/events/admin/{id}` - Delete event (admin)

### Contact
- `POST /api/contact` - Submit contact form
- `GET /api/contact/admin/submissions` - List submissions (admin)
- `PATCH /api/contact/admin/submissions/{id}` - Update status (admin)
- `DELETE /api/contact/admin/submissions/{id}` - Delete submission (admin)

## Admin Panel

Access the admin panel at `/admin`

**Default Password**: `admin123`

Features:
- Gallery management (upload/delete images)
- Events management
- Contact form submissions viewer
- Submission status tracking

## Customization

### Changing Colors
Edit `frontend/tailwind.config.js`:
```javascript
colors: {
  primary: {
    500: '#f59e0b', // Change this to your brand color
  },
}
```

### Adding New Genres
Edit `backend/app/api/routes/genres.py`:
```python
Genre(
    id="new-genre",
    name="New Genre",
    description="Description here",
    hero_image="/assets/image.jpeg",
    color="#hexcolor",
    tagline="Tagline here"
),
```

### Adding Mixes
Edit `frontend/src/components/music/MusicSection.jsx` and add to the `mixes` array.

## Environment Variables

### Backend (.env)
```env
DEBUG=true
CORS_ORIGINS=["http://localhost:5173", "http://localhost:3000"]
ADMIN_PASSWORD=your-secure-password
```

### Frontend (.env)
```env
VITE_API_URL=http://localhost:8000/api
```

## Deployment

### Vercel (Frontend)
1. Connect your GitHub repo to Vercel
2. Set root directory to `frontend`
3. Add environment variable: `VITE_API_URL`
4. Deploy

### Railway/Render (Backend)
1. Connect your GitHub repo
2. Set root directory to `backend`
3. Add environment variables
4. Deploy

### Docker Deployment
```bash
# Build images
docker-compose build

# Push to registry
docker-compose push

# On server, pull and run
docker-compose pull
docker-compose up -d
```

## Performance Optimizations

- Lazy loading for images
- Code splitting by route
- Gzip compression enabled
- Static asset caching (1 year)
- Intersection Observer for scroll animations
- Optimized fonts with font-display: swap

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## License

MIT License - feel free to use this template for your own portfolio!

## Credits

- DJ Name: SANCTUS (Ricky R. Nazareth)
- Location: Jaipur, Rajasthan, India
- Built with love and bass drops

---

For questions or issues, please open a GitHub issue or contact directly.
