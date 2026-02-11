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
    <div className="min-h-screen py-12">
      {/* Hero Image */}
      <div
        className="relative h-[60vh] bg-cover bg-center"
        style={{ backgroundImage: `url('${article.thumbnail}')` }}
      >
        <div className="absolute inset-0 gradient-overlay" />
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 -mt-32 relative z-10">
        {/* Article Content */}
        <article className="bg-barca-navy/95 backdrop-blur-sm border border-white/10 rounded-lg p-8 md:p-12">
          {/* Category & Date */}
          <div className="flex items-center gap-4 mb-6 text-sm">
            <span className="text-barca-blue uppercase tracking-wider">
              {article.category}
            </span>
            <span className="text-gray-400">
              {new Date(article.date).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </span>
          </div>

          {/* Title */}
          <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
            {article.title}
          </h1>

          {/* Excerpt */}
          <p className="text-xl text-gray-300 mb-8 leading-relaxed">
            {article.excerpt}
          </p>

          {/* Content */}
          <div className="prose prose-invert prose-lg max-w-none">
            {article.content.split("\n\n").map((paragraph, index) => (
              <p key={index} className="mb-6 leading-relaxed text-gray-300">
                {paragraph}
              </p>
            ))}
          </div>

          {/* Back Link */}
          <div className="mt-12 pt-8 border-t border-white/10">
            <Link
              href="/news"
              className="inline-flex items-center text-barca-blue hover:text-barca-red transition-colors font-medium"
            >
              <svg
                className="w-5 h-5 mr-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 19l-7-7m0 0l7-7m-7 7h18"
                />
              </svg>
              Back to News
            </Link>
          </div>
        </article>

        {/* Related Articles */}
        {relatedArticles.length > 0 && (
          <div className="mt-16">
            <h2 className="text-3xl font-bold mb-8">Related Articles</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedArticles.map((related) => (
                <Link key={related.id} href={`/news/${related.slug}`}>
                  <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg overflow-hidden hover:border-barca-blue/50 transition-all group">
                    <div
                      className="h-40 bg-cover bg-center"
                      style={{ backgroundImage: `url('${related.thumbnail}')` }}
                    />
                    <div className="p-4">
                      <div className="text-xs text-barca-blue uppercase tracking-wider mb-2">
                        {related.category}
                      </div>
                      <h3 className="font-bold group-hover:text-barca-blue transition-colors line-clamp-2">
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
