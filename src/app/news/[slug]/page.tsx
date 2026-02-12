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

export default function NewsArticlePage({ params }: Props) {
  const article = newsData.find((a) => a.slug === params.slug);

  if (!article) {
    notFound();
  }

  const relatedArticles = newsData
    .filter((a) => a.category === article.category && a.id !== article.id)
    .slice(0, 3);

  return (
    <div className="min-h-screen">
      {/* Hero Image */}
      <div
        className="relative h-[65vh] bg-cover bg-center"
        style={{ backgroundImage: `url('${article.thumbnail}')` }}
      >
        <div className="absolute inset-0 gradient-overlay" />
      </div>

      <div className="max-w-3xl mx-auto px-6 lg:px-8 -mt-40 relative z-10">
        {/* Article Content */}
        <article className="glass-card rounded-2xl p-8 md:p-12">
          {/* Category & Date */}
          <div className="flex items-center gap-4 mb-8">
            <span className="tag text-barca-blue border-barca-blue/30">
              {article.category}
            </span>
            <span className="text-[0.7rem] text-white/30 font-body">
              {new Date(article.date).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </span>
          </div>

          {/* Title */}
          <h1 className="font-display text-3xl md:text-5xl font-bold leading-tight tracking-tight mb-8">
            {article.title}
          </h1>

          {/* Excerpt */}
          <p className="text-lg text-white/50 font-body mb-10 leading-relaxed border-l-2 border-barca-blue/30 pl-6">
            {article.excerpt}
          </p>

          {/* Divider */}
          <div className="section-divider mb-10" />

          {/* Content */}
          <div className="space-y-6">
            {article.content.split("\n\n").map((paragraph, index) => (
              <p
                key={index}
                className="text-white/40 font-body leading-[1.8] text-[0.95rem]"
              >
                {paragraph}
              </p>
            ))}
          </div>

          {/* Back Link */}
          <div className="mt-12 pt-8">
            <div className="section-divider mb-8" />
            <Link
              href="/news"
              className="inline-flex items-center gap-2 text-sm text-white/40 hover:text-white font-body font-medium transition-colors duration-300 group"
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

        {/* Related Articles */}
        {relatedArticles.length > 0 && (
          <div className="mt-20">
            <h2 className="font-display text-2xl font-bold tracking-tight mb-8">
              Related Articles
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {relatedArticles.map((related) => (
                <Link key={related.id} href={`/news/${related.slug}`}>
                  <div className="glass-card rounded-xl overflow-hidden group">
                    <div className="relative h-36 overflow-hidden">
                      <div
                        className="absolute inset-0 bg-cover bg-center group-hover:scale-105 transition-transform duration-700"
                        style={{
                          backgroundImage: `url('${related.thumbnail}')`,
                        }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-barca-navy to-transparent" />
                    </div>
                    <div className="p-4">
                      <span className="text-[0.6rem] uppercase tracking-[0.15em] text-barca-blue font-body">
                        {related.category}
                      </span>
                      <h3 className="font-display text-sm font-bold mt-1 leading-snug group-hover:text-barca-blue-light transition-colors line-clamp-2">
                        {related.title}
                      </h3>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
