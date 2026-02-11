# FC Barcelona Fan Website

A complete, modern FC Barcelona fan website built with Next.js 14, React, Tailwind CSS, and Framer Motion.

## 🎨 Features

### Pages
- **Home (/)** - Hero section with Camp Nou background, live score banner, match countdown timer, latest news, and quick stats
- **Standings (/standings)** - La Liga table with Barcelona highlighted, real-time data from football-data.org API
- **Fixtures & Results (/fixtures)** - Complete match schedule with filters by status and competition
- **Live Score (/live)** - Real-time match updates with 30-second polling, match statistics, and live indicators
- **News (/news)** - News grid with category filters and individual article pages with related articles
- **Squad (/squad)** - Player cards with position filters and detailed player pages with stats and bios
- **Club History (/history)** - Interactive timeline with parallax effects showcasing key moments since 1899

### Design Features
- Dark mode as default with Barcelona's blaugrana color scheme (#004D98 blue, #A50044 red, #1A1A2E navy)
- Fully responsive mobile-first design
- Smooth animations with Framer Motion (fade-in on scroll, hover effects, page transitions)
- Clean Inter font from Google Fonts
- Gradient overlays on hero images
- Loading skeletons with Tailwind animate-pulse
- Generous whitespace and minimalist aesthetic

### Technical Features
- Next.js 14 App Router with TypeScript
- Server-side rendering and static generation
- API routes to proxy football-data.org API
- SEO optimized with proper metadata and Open Graph tags
- Image optimization with next/image
- Automatic code splitting
- Type-safe with TypeScript

## 📁 Project Structure

```
website/
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   ├── fixtures/route.ts
│   │   │   ├── live/route.ts
│   │   │   └── standings/route.ts
│   │   ├── fixtures/page.tsx
│   │   ├── history/page.tsx
│   │   ├── live/page.tsx
│   │   ├── news/
│   │   │   ├── [slug]/page.tsx
│   │   │   └── page.tsx
│   │   ├── squad/
│   │   │   ├── [id]/page.tsx
│   │   │   └── page.tsx
│   │   ├── standings/page.tsx
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── components/
│   │   ├── Footer.tsx
│   │   └── Navigation.tsx
│   ├── data/
│   │   ├── history.json (20 milestones)
│   │   ├── news.json (10 articles)
│   │   └── squad.json (17 players)
│   └── types/
│       └── data.d.ts
├── .env.local
├── next.config.mjs
├── package.json
├── tailwind.config.ts
└── tsconfig.json
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. Install dependencies:
```bash
npm install
```

2. Set up environment variables:
Create or edit the `.env.local` file in the root directory:
```env
FOOTBALL_DATA_API_KEY=your_api_key_here
```

Get your free API key from [football-data.org](https://www.football-data.org/)

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

### Build for Production

```bash
npm run build
npm start
```

## 🎯 Data Sources

### External API
- **football-data.org** - Free tier API for:
  - La Liga standings (Competition code: PD)
  - Barcelona fixtures (Team ID: 81)
  - Live match data

### Mock Data
All mock data files are in `src/data/`:
- **news.json** - 10 sample articles with categories: transfers, match previews, match reviews, analysis
- **squad.json** - 17 current first-team players with stats, positions, and bios
- **history.json** - 20 key milestones from 1899 to 2026

## 🎨 Design System

### Colors
```css
--barca-blue: #004D98
--barca-red: #A50044
--barca-navy: #1A1A2E
```

### Typography
- Font Family: Inter (Google Fonts)
- Headings: Bold, large sizes
- Body: Regular weight, clean and readable

### Components
- Reusable Navigation with mobile menu
- Footer with links and social media
- Card components with hover effects
- Loading states with skeletons
- Error boundaries with fallback UI

## 📱 Responsive Breakpoints

```css
sm: 640px   /* Mobile landscape */
md: 768px   /* Tablet */
lg: 1024px  /* Desktop */
xl: 1280px  /* Large desktop */
```

## 🔧 Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint

## 📄 License

This is a fan-made project for educational purposes. FC Barcelona and all related trademarks are property of Futbol Club Barcelona.

## 🙏 Acknowledgments

- Images from Unsplash
- Data from football-data.org
- Built with Next.js, React, Tailwind CSS, and Framer Motion

---

**Més que un club** 💙❤️
