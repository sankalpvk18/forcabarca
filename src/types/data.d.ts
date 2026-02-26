declare module "@/data/news.json" {
  export interface NewsArticle {
    id: string;
    slug: string;
    title: string;
    excerpt: string;
    content: string;
    category: string;
    date: string;
    thumbnail: string;
  }

  const news: NewsArticle[];
  export default news;
}

declare module "@/data/squad.json" {
  export interface Player {
    id: string;
    name: string;
    number: number;
    position: string;
    nationality: string;
    age: number;
    appearances: number;
    goals: number;
    assists: number;
    bio: string;
    image: string;
  }

  const squad: Player[];
  export default squad;
}

declare module "@/data/history.json" {
  export interface HistoryItem {
    id: string;
    year: number;
    title: string;
    description: string;
    category: string;
    image: string;
  }

  const history: HistoryItem[];
  export default history;
}
