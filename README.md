# 🌍 TravelGo – Your Smart Travel Companion

TravelGo is a modern, full-stack travel companion web app that empowers users to discover restaurants, plan trips, explore interactive maps, and engage with a vibrant travel community. With personalized recommendations, a sleek UI, and mobile-first design, TravelGo offers a seamless and intelligent experience for modern explorers.

---

## 🚀 Elevator Pitch

> “Find, plan, and enjoy your journey — smarter. TravelGo is your all-in-one travel partner for food discovery, trip planning, and community-driven exploration.”

---

## ✨ Key Features

- 🔍 **Restaurant Discovery** – Search by cuisine, rating, price, and location
- 🤖 **Personalized Recommendations** – Machine learning–powered suggestions based on preferences and behavior
- 🗺️ **Interactive Map View** – Real-time filtering, clustering, and detailed markers using Leaflet
- 💾 **Favorites System** – Save and organize favorite restaurants
- ✍️ **User Reviews & Ratings** – Share experiences with a robust review system
- 📍 **Trip Planner** – Add stops, calculate distance, and plan custom routes
- 🧑‍🤝‍🧑 **Community Feed** – Engage with travel activity from users worldwide
- 🌕🌑 **Dark/Light Mode** – Responsive, themeable UI
- 🔔 **Notifications** – Stay updated with activity alerts
- 🔒 **Authentication** – Secure auth with Supabase

---

## 🛠️ Built With

### 💻 Frontend
- [React 18](https://reactjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [shadcn/ui](https://ui.shadcn.dev/)
- [Zustand](https://github.com/pmndrs/zustand) – state management
- [React Router DOM](https://reactrouter.com/)
- [React Query (TanStack)](https://tanstack.com/query) – data fetching
- [React Hook Form](https://react-hook-form.com/) + [Zod](https://zod.dev/) – form validation
- [Lucide Icons](https://lucide.dev/) – icon library

### 🧭 Maps & Location
- [Leaflet](https://leafletjs.com/) + [React Leaflet](https://react-leaflet.js.org/)
- [Leaflet MarkerCluster](https://github.com/Leaflet/Leaflet.markercluster)
- OpenStreetMap Tiles

### 🔙 Backend & Database
- [Supabase](https://supabase.com/)
  - PostgreSQL
  - Supabase Auth
  - Row-Level Security (RLS)
  - Edge Functions
  - Realtime Subscriptions

### 📊 Additional Tools
- [Recharts](https://recharts.org/) – analytics and charts
- [Framer Motion](https://www.framer.com/motion/) – animations
- [i18next](https://www.i18next.com/) – internationalization
- Web Share API, LocalStorage

---

## 📁 Folder Structure

src/
├── components/ # UI components (organized by feature)
├── hooks/ # Custom React hooks
├── pages/ # Route-based pages
├── data/ # Mock data and types
├── utils/ # Utility functions
└── integrations/ # External service integrations (e.g., Supabase)

yaml
Copy
Edit

---

## 📦 Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/travelgo.git
cd travelgo

# Install dependencies
npm install

# Setup environment
cp .env.example .env
# Add your Supabase project URL and anon key to .env

# Start the development server
npm run dev
Access your app at http://localhost:5173.

🔐 Environment Variables
Add the following to your .env file:

env
Copy
Edit
VITE_SUPABASE_URL=your-supabase-url
VITE_SUPABASE_ANON_KEY=your-supabase-anon-key
🧠 What We Learned
Building scalable, responsive UIs with Tailwind and shadcn/ui

Leveraging Supabase for authentication, real-time data, and RLS

Managing user preferences and recommendation logs with PostgreSQL

Implementing Leaflet maps with clustering and filters

Structuring large-scale applications with clean component architecture

🧱 Challenges Faced
Debugging base64 icon issues in MapView

Rendering map markers dynamically based on filters and user location

Ensuring dark/light mode compatibility across all components

Making pages like Trip Planner, Settings, and Community fully responsive

Structuring the Discover page content and implementing real-time data views

📲 Planned Improvements
Full PWA support with offline functionality

i18n language switching UI

AI trip planner with smart routing

React Native version of TravelGo

Deployment on Vercel/Netlify with Supabase integration

📸 Screenshots
(You can insert your screenshots here)

🧑‍💻 Contributing
We welcome contributions! Please open an issue or submit a pull request for fixes, improvements, or new features.

📄 License
MIT License

🙌 Acknowledgements
Supabase

Leaflet

OpenStreetMap

shadcn/ui

Lucide Icons

Crafted with 💙 by the TravelGo Team.
