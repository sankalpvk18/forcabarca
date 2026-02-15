"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";

interface Gallery {
  id: string;
  title: string;
  slug: string;
  thumbnail: string;
  date: string;
  photoCount: number;
  url: string;
}

export default function PicturesPage() {
  const [galleries, setGalleries] = useState<Gallery[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function fetchGalleries(refresh = false) {
    try {
      if (refresh) setRefreshing(true);
      else setLoading(true);

      const res = await fetch(
        `/api/pictures${refresh ? "?refresh=true" : ""}`
      );
      if (!res.ok) throw new Error("Failed to fetch galleries");

      const data = await res.json();
      setGalleries(data.galleries || []);
      setError(null);
    } catch {
      setError("Failed to load galleries. Please try again.");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }

  useEffect(() => {
    fetchGalleries();
  }, []);

  return (
    <div className="min-h-screen pt-28 pb-20">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-14"
        >
          <h1 className="text-6xl font-extrabold tracking-tight leading-none mb-4">
            PICTURES &<br />
            <span className="text-primary italic">GALLERIES</span>
          </h1>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <p className="text-slate-400 max-w-xl text-lg">
              The best photos from matches, training sessions, and behind the
              scenes at FC Barcelona.
            </p>
            <button
              onClick={() => fetchGalleries(true)}
              disabled={refreshing}
              className="flex items-center gap-2 border border-primary/30 hover:bg-primary hover:text-white rounded-xl px-6 py-3 font-semibold text-sm uppercase tracking-widest transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shrink-0"
            >
              <span
                className={`material-icons text-base ${
                  refreshing ? "animate-spin" : ""
                }`}
              >
                refresh
              </span>
              {refreshing ? "Refreshing..." : "Refresh"}
            </button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="section-divider mb-12"
        />

        {/* Loading State */}
        {loading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="rounded-xl overflow-hidden">
                <div className="aspect-[16/10] shimmer-loading rounded-xl" />
                <div className="pt-4 space-y-3">
                  <div className="h-5 w-3/4 shimmer-loading rounded" />
                  <div className="h-4 w-1/3 shimmer-loading rounded" />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Error State */}
        {error && !loading && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-20"
          >
            <span className="material-icons text-6xl text-slate-600 mb-4 block">
              error_outline
            </span>
            <p className="text-slate-400 text-lg mb-6">{error}</p>
            <button
              onClick={() => fetchGalleries()}
              className="border border-primary/30 hover:bg-primary hover:text-white rounded-xl px-8 py-4 font-semibold text-sm uppercase tracking-widest transition-all duration-300"
            >
              Try Again
            </button>
          </motion.div>
        )}

        {/* Empty State */}
        {!loading && !error && galleries.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-20"
          >
            <span className="material-icons text-6xl text-slate-600 mb-4 block">
              photo_library
            </span>
            <p className="text-slate-400 text-lg">
              No galleries found. Try refreshing.
            </p>
          </motion.div>
        )}

        {/* Gallery Grid */}
        {!loading && !error && galleries.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {galleries.map((gallery, index) => {
              const isFirst = index === 0;

              if (isFirst) {
                return (
                  <motion.div
                    key={gallery.id}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      delay: index * 0.05,
                      duration: 0.5,
                      ease: [0.25, 0.46, 0.45, 0.94],
                    }}
                    className="lg:col-span-2 group"
                  >
                    <Link
                      href={`/pictures/${gallery.id}?slug=${gallery.slug}`}
                    >
                      <div className="rounded-xl bg-primary/5 editorial-shadow transition-all hover:-translate-y-1 overflow-hidden">
                        <div className="relative aspect-[16/9] overflow-hidden">
                          {gallery.thumbnail ? (
                            <div
                              className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                              style={{
                                backgroundImage: `url('${gallery.thumbnail}')`,
                              }}
                            />
                          ) : (
                            <div className="absolute inset-0 barca-gradient flex items-center justify-center">
                              <span className="material-icons text-8xl text-white/20">
                                photo_library
                              </span>
                            </div>
                          )}
                          <div className="absolute inset-0 card-gradient" />
                          <div className="absolute bottom-6 left-6 right-6">
                            <div className="flex items-center gap-3 mb-4">
                              <span className="tag bg-primary/20 text-primary border-primary/30">
                                Gallery
                              </span>
                              {gallery.photoCount > 0 && (
                                <span className="tag bg-white/10 text-white/70 border-white/20">
                                  <span className="material-icons text-xs mr-1 align-middle">
                                    photo_camera
                                  </span>
                                  {gallery.photoCount} photos
                                </span>
                              )}
                            </div>
                            <h3 className="text-3xl font-extrabold leading-tight mb-3 drop-shadow-lg">
                              {gallery.title}
                            </h3>
                            {gallery.date && (
                              <div className="flex items-center gap-2 text-sm text-slate-400">
                                <span className="material-icons text-xs">
                                  schedule
                                </span>
                                <span>{gallery.date}</span>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                );
              }

              return (
                <motion.div
                  key={gallery.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    delay: index * 0.05,
                    duration: 0.5,
                    ease: [0.25, 0.46, 0.45, 0.94],
                  }}
                  className="group"
                >
                  <Link href={`/pictures/${gallery.id}?slug=${gallery.slug}`}>
                    <div className="rounded-xl bg-primary/5 editorial-shadow transition-all hover:-translate-y-1 overflow-hidden">
                      <div className="relative aspect-[4/3] overflow-hidden">
                        {gallery.thumbnail ? (
                          <div
                            className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                            style={{
                              backgroundImage: `url('${gallery.thumbnail}')`,
                            }}
                          />
                        ) : (
                          <div className="absolute inset-0 barca-gradient flex items-center justify-center">
                            <span className="material-icons text-6xl text-white/20">
                              photo_library
                            </span>
                          </div>
                        )}
                        <div className="absolute inset-0 card-gradient" />
                        <div className="absolute top-4 left-4">
                          {gallery.photoCount > 0 && (
                            <span className="tag bg-black/40 text-white border-white/20 backdrop-blur-sm">
                              <span className="material-icons text-xs mr-1 align-middle">
                                photo_camera
                              </span>
                              {gallery.photoCount}
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="p-6">
                        {gallery.date && (
                          <div className="flex items-center gap-2 text-xs text-slate-500 mb-3">
                            <span>{gallery.date}</span>
                          </div>
                        )}
                        <h3 className="text-lg font-bold leading-snug mb-4 group-hover:text-primary transition-colors duration-300 line-clamp-2">
                          {gallery.title}
                        </h3>
                        <span className="inline-flex items-center gap-1.5 text-primary font-semibold text-xs uppercase tracking-widest">
                          VIEW GALLERY
                          <span className="material-icons text-sm">east</span>
                        </span>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
