# 🚀 Quick Start Guide - FC Barcelona Fan Website

## Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Set Up Environment Variables
The `.env.local` file is already configured with the API key:
```
FOOTBALL_DATA_API_KEY=bad6001e19c9752dca3841832e1871d2
```

### 3. Run Development Server
```bash
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000) in your browser.

### 4. Build for Production
```bash
npm run build
npm start
```

---

## 📁 Project Overview

### Pages
- **/** - Home page with hero, countdown, news
- **/standings** - La Liga table
- **/fixtures** - All Barcelona fixtures and results
- **/live** - Live match scores (refreshes every 30s)
- **/news** - News articles grid
- **/news/[slug]** - Individual article pages
- **/squad** - Player cards
- **/squad/[id]** - Individual player pages
- **/history** - Club history timeline

### API Routes
- **/api/standings** - Fetch La Liga standings
- **/api/fixtures** - Get Barcelona fixtures
- **/api/live** - Check for live matches
- **/api/next-match** - Get next upcoming match

### Mock Data
- **src/data/news.json** - 10 news articles
- **src/data/squad.json** - 20 players
- **src/data/history.json** - 20 historical milestones

---

## 🎨 Key Features

1. **Dark Mode by Default** - Beautiful navy/black theme
2. **Real-time Updates** - Live scores refresh every 30 seconds
3. **Countdown Timer** - Shows days/hours/minutes to next match
4. **Smooth Animations** - Framer Motion throughout
5. **Fully Responsive** - Mobile-first design
6. **API Integration** - Real data from api-football.com

---

## 🛠️ Tech Stack

- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- Framer Motion
- Lexend Font (Google Fonts)
- Material Icons

---

## 📝 Development Notes

### Adding New Articles
Edit `src/data/news.json` and add a new object with:
- id, slug, title, excerpt, content
- category, date, thumbnail

### Adding New Players
Edit `src/data/squad.json` and add player details:
- id, name, number, position
- nationality, age, stats, bio, image

### Changing API Key
If you need to use a different API key, update `.env.local`:
```
FOOTBALL_DATA_API_KEY=your_new_key_here
```

---

## 🌐 Deployment

This site is ready to deploy to:
- **Vercel** (recommended for Next.js)
- **Netlify**
- **Any Node.js hosting**

### Deploy to Vercel
```bash
npm i -g vercel
vercel
```

Make sure to add the `FOOTBALL_DATA_API_KEY` environment variable in your Vercel project settings.

---

## ✅ Build Status

✓ Build succeeds with 0 errors
✓ All 45 pages generated
✓ TypeScript checks pass
✓ ESLint passes (with warnings about img tags)

---

## 🎯 Next Steps

1. Replace placeholder images with real Barcelona assets
2. Add more player photos to `/public/players/`
3. Optimize images using Next.js Image component
4. Add more articles to news.json
5. Implement search functionality
6. Add user authentication for membership features

---

## 📧 Support

For questions or issues, refer to:
- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Framer Motion Documentation](https://www.framer.com/motion/)

---

**Visca Barça! 🔵🔴**

Built with ❤️ using Next.js, Tailwind CSS, and Framer Motion
