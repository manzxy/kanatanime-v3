<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Kanatanime V3 - Neo Brutalism

A modern, high-performance anime streaming web application featuring a bold **Neo-Brutalist** design aesthetic. This version is a complete rewrite focusing on speed, user experience, and a unique visual identity.

## 🚀 Features

- **Neo-Brutalist Design**: Striking visual style with bold colors, high contrast, and thick borders.
- **Vast Content Library**: Seamless access to Anime, Donghua, Movies, and Tokusatsu.
- **Real-time Scraper**: Powered by a robust Hono-based backend that scrapes content from reliable sources (AnimeKompi).
- **PWA Ready**: Fully installable as a Progressive Web App on mobile and desktop for a native-like experience.
- **Custom Video Player**: Integrated HLS.js player for smooth streaming of high-quality content.
- **Comprehensive Discovery**:
  - Daily release schedules.
  - Trending and popular series.
  - Genre and season-based navigation.
  - Advanced search functionality.
- **Favorites System**: Locally saved favorites to keep track of your must-watch series.
- **SEO Optimized**: Dynamic metadata and structured data for better search engine visibility.

## 🛠 Tech Stack

### Frontend
- **Framework**: React 19
- **Styling**: Tailwind CSS 4 (Neo-Brutalism theme)
- **Routing**: React Router 7
- **Icons**: Font Awesome 7
- **Video Player**: HLS.js
- **Build Tool**: Vite 6

### Backend
- **Framework**: Hono (Node.js)
- **Scraping**: Cheerio & Axios
- **Server**: @hono/node-server

### Infrastructure
- **Containerization**: Docker & Docker Compose
- **Reverse Proxy**: Nginx

## 🏁 Getting Started

### Local Development

**Prerequisites:** Node.js (v18+) and npm

1. **Clone the repository:**
   ```bash
   git clone git@github.com:idlanyor/kanatanime-v3.git
   cd kanatanime-v3
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start development server:**
   ```bash
   npm run dev
   ```
   This will start both the Vite frontend and the Hono backend concurrently.

### 🐳 Docker Deployment

The easiest way to deploy Kanatanime V3 is using Docker Compose.

```bash
# Build and run the entire stack
docker-compose up --build -d
```

The application will be accessible at `http://localhost`.

## 📂 Project Structure

- `src/`: React frontend application.
  - `components/`: Reusable UI components (AnimeCard, VideoPlayer, etc.).
  - `pages/`: Page-level components for different routes.
  - `hooks/`: Custom React hooks (useFavorites, useAuth).
  - `utils/`: Utility functions and API helpers.
- `server/`: Hono backend server and scraping logic.
  - `scraper.ts`: Core scraping algorithms.
  - `index.ts`: API route definitions.
- `public/`: Static assets and PWA configuration.

## 📜 License

This project is for educational purposes only. All content is scraped from third-party sources.
