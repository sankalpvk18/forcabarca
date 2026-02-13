import { notFound } from "next/navigation";
import Link from "next/link";
import newsData from "@/data/news.json";

interface Props {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  return newsData.map((article) => ({
    slug: article.slug,
  }));
}

const categoryColors: Record<string, string> = {
  transfers: "bg-barca-gold/20 text-barca-gold border-barca-gold/30",
  "match previews": "bg-green-500/20 text-green-400 border-green-500/30",
  "match reviews": "bg-barca-red/20 text-barca-red-light border-barca-red/30",
  analysis: "bg-barca-blue/20 text-barca-blue-light border-barca-blue/30",
};

export default function NewsArticlePage({ params }: Props) {
  const article = newsData.find((a) => a.slug === params.slug);

  if (!article) {
    notFound();
  }

  const relatedArticles = newsData
    .filter((a) => a.category === article.category && a.id !== article.id)
    .slice(0, 3);

  const formattedDate = new Date(article.date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const tags = article.category === "transfers"
    ? ["Transfers", "La Liga", "Squad Depth"]
    : article.category === "match reviews"
    ? ["Match Report", "La Liga", "Highlights"]
    : article.category === "match previews"
    ? ["Preview", "Champions League", "Tactics"]
    : ["Analysis", "Tactics", "Deep Dive"];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="relative h-[80vh] overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url('${article.thumbnail}')` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background-dark via-background-dark/40 to-transparent" />

        {/* Bottom overlay panel */}
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-12">
          <div className="max-w-5xl mx-auto">
            <div className="glass-panel p-8 md:p-12 rounded-xl">
              <div className="flex flex-wrap items-center gap-4 mb-6">
                <span className="bg-primary text-white text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full">
                  {article.category}
                </span>
                <span className="inline-flex items-center gap-1.5 text-slate-400 text-sm">
                  <span className="material-icons text-base">calendar_today</span>
                  {formattedDate}
                </span>
                <span className="text-slate-500 text-sm">8 min read</span>
              </div>
              <h1 className="text-4xl md:text-6xl font-extrabold leading-tight mb-6">
                {article.title}
              </h1>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-primary/30 flex items-center justify-center text-primary font-bold text-sm">
                  FC
                </div>
                <div>
                  <p className="font-semibold text-sm">Barcelona Editorial</p>
                  <p className="text-slate-500 text-xs">
                    Chief Football Correspondent
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-5xl mx-auto px-6 lg:px-8 py-16">
        <div className="flex gap-12">
          {/* Social Sidebar */}
          <aside className="hidden lg:flex flex-col items-center gap-5 pt-4 sticky top-32 self-start">
            <button
              aria-label="Share on Facebook"
              className="w-11 h-11 rounded-full border border-white/10 flex items-center justify-center text-slate-400 hover:border-primary/40 hover:text-primary transition-colors"
            >
              <span className="material-icons text-xl">facebook</span>
            </button>
            <button
              aria-label="Share via Email"
              className="w-11 h-11 rounded-full border border-white/10 flex items-center justify-center text-slate-400 hover:border-primary/40 hover:text-primary transition-colors"
            >
              <span className="material-icons text-xl">alternate_email</span>
            </button>
            <button
              aria-label="Bookmark"
              className="w-11 h-11 rounded-full border border-white/10 flex items-center justify-center text-slate-400 hover:border-primary/40 hover:text-primary transition-colors"
            >
              <span className="material-icons text-xl">bookmark_border</span>
            </button>
            <div className="w-px h-12 bg-white/10 my-2" />
            <span
              className="text-[0.65rem] uppercase tracking-[0.2em] text-slate-500 font-semibold"
              style={{ writingMode: "vertical-rl" }}
            >
              Share Article
            </span>
          </aside>

          {/* Article Body */}
          <article className="flex-1 max-w-3xl">
            {/* Excerpt */}
            <blockquote className="border-l-4 border-primary pl-8 italic text-xl text-slate-300 font-light mb-12 leading-relaxed">
              {article.excerpt}
            </blockquote>

            {/* Body Paragraphs */}
            <div className="space-y-6">
              {article.content.split("\n\n").map((paragraph, index) => (
                <p
                  key={index}
                  className="text-lg leading-relaxed text-slate-300 font-light"
                >
                  {paragraph}
                </p>
              ))}
            </div>

            {/* Tags */}
            <div className="mt-14 pt-8 border-t border-white/5">
              <div className="flex flex-wrap items-center gap-3">
                <span className="text-xs text-slate-500 font-semibold uppercase tracking-widest mr-2">
                  Tags
                </span>
                {tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-4 py-1.5 rounded-full text-xs font-medium border border-white/10 text-slate-400 hover:border-primary/30 hover:text-primary transition-colors cursor-pointer"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Back Link */}
            <div className="mt-10">
              <Link
                href="/news"
                className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-white font-medium transition-colors duration-300 group"
              >
                <svg
                  className="w-4 h-4 group-hover:-translate-x-1 transition-transform duration-300"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={1.5}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M10 19l-7-7m0 0l7-7m-7 7h18"
                  />
                </svg>
                Back to News
              </Link>
            </div>
          </article>
        </div>
      </div>

      {/* Related Articles */}
      {relatedArticles.length > 0 && (
        <section className="bg-neutral-navy/30 py-20 border-t border-white/5">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="flex items-center justify-between mb-12">
              <h3 className="text-2xl font-extrabold tracking-tight">
                Related Articles
              </h3>
              <Link
                href="/news"
                className="text-primary text-sm font-semibold uppercase tracking-widest hover:text-barca-blue-light transition-colors"
              >
                View All Editorial
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {relatedArticles.map((related) => (
                <Link key={related.id} href={`/news/${related.slug}`}>
                  <div className="glass-panel rounded-xl overflow-hidden group transition-all hover:-translate-y-1">
                    <div className="relative h-48 overflow-hidden">
                      <div
                        className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                        style={{
                          backgroundImage: `url('${related.thumbnail}')`,
                        }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-background-dark to-transparent" />
                    </div>
                    <div className="p-5">
                      <span
                        className={`tag ${
                          categoryColors[related.category] ||
                          "bg-primary/20 text-primary border-primary/30"
                        } mb-3 inline-block`}
                      >
                        {related.category}
                      </span>
                      <h4 className="font-bold leading-snug mb-3 group-hover:text-primary transition-colors duration-300 line-clamp-2">
                        {related.title}
                      </h4>
                      <span className="text-xs text-slate-500">
                        {new Date(related.date).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })}
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
