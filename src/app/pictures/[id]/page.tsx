"use client";

// Mark as dynamic to prevent static rendering at build time
export const dynamic = 'force-dynamic';

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

interface GalleryImage {
  url: string;
  alt: string;
}

interface GalleryDetail {
  id: string;
  title: string;
  images: GalleryImage[];
}

function withSize(url: string, width: number): string {
  if (url.includes("?")) return url;
  return `${url}?width=${width}`;
}

export default function GalleryDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const searchParams = useSearchParams();
  const slug = searchParams.get("slug") || "";

  const [gallery, setGallery] = useState<GalleryDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [downloading, setDownloading] = useState<Set<number>>(new Set());

  useEffect(() => {
    async function fetchGallery() {
      try {
        setLoading(true);
        const res = await fetch(
          `/api/pictures/${params.id}?slug=${encodeURIComponent(slug)}`
        );
        if (!res.ok) throw new Error("Failed to fetch gallery");

        const data = await res.json();
        setGallery(data.gallery);
        setError(null);
      } catch {
        setError("Failed to load gallery images. Please try again.");
      } finally {
        setLoading(false);
      }
    }

    fetchGallery();
  }, [params.id, slug]);

  const handleDownload = async (imageUrl: string, index: number) => {
    try {
      setDownloading((prev) => new Set(prev).add(index));
      const res = await fetch(
        `/api/download?url=${encodeURIComponent(imageUrl)}`
      );
      if (!res.ok) throw new Error("Download failed");

      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download =
        imageUrl.split("?")[0].split("/").pop() || `fcb-photo-${index + 1}.jpg`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    } catch {
      alert("Failed to download image. Please try again.");
    } finally {
      setDownloading((prev) => {
        const next = new Set(prev);
        next.delete(index);
        return next;
      });
    }
  };

  const openLightbox = (index: number) => setLightboxIndex(index);
  const closeLightbox = () => setLightboxIndex(null);

  const goNext = useCallback(() => {
    if (lightboxIndex === null || !gallery) return;
    setLightboxIndex((lightboxIndex + 1) % gallery.images.length);
  }, [lightboxIndex, gallery]);

  const goPrev = useCallback(() => {
    if (lightboxIndex === null || !gallery) return;
    setLightboxIndex(
      (lightboxIndex - 1 + gallery.images.length) % gallery.images.length
    );
  }, [lightboxIndex, gallery]);

  // Keyboard navigation for lightbox
  useEffect(() => {
    if (lightboxIndex === null) return;

    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowRight") goNext();
      if (e.key === "ArrowLeft") goPrev();
    }

    window.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [lightboxIndex, goNext, goPrev]);

  return (
    <div className="min-h-screen pt-28 pb-20">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Back Button + Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-14"
        >
          <Link
            href="/pictures"
            className="inline-flex items-center gap-2 text-slate-400 hover:text-white transition-colors mb-6 group"
          >
            <span className="material-icons text-base group-hover:-translate-x-1 transition-transform">
              arrow_back
            </span>
            <span className="text-sm font-semibold uppercase tracking-widest">
              All Galleries
            </span>
          </Link>

          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight leading-none mb-4">
            {loading ? (
              <div className="h-14 w-2/3 shimmer-loading rounded" />
            ) : (
              gallery?.title || "Gallery"
            )}
          </h1>

          {!loading && gallery && (
            <p className="text-slate-400 text-lg">
              {gallery.images.length} photos
            </p>
          )}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="section-divider mb-12"
        />

        {/* Loading State */}
        {loading && (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {Array.from({ length: 12 }).map((_, i) => (
              <div
                key={i}
                className="aspect-[4/3] shimmer-loading rounded-xl"
              />
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
              broken_image
            </span>
            <p className="text-slate-400 text-lg mb-6">{error}</p>
            <Link
              href="/pictures"
              className="border border-primary/30 hover:bg-primary hover:text-white rounded-xl px-8 py-4 font-semibold text-sm uppercase tracking-widest transition-all duration-300"
            >
              Back to Galleries
            </Link>
          </motion.div>
        )}

        {/* Images Grid */}
        {!loading && !error && gallery && gallery.images.length > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {gallery.images.map((image, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: Math.min(index * 0.03, 0.5),
                  duration: 0.4,
                  ease: [0.25, 0.46, 0.45, 0.94],
                }}
                className="relative group cursor-pointer rounded-xl overflow-hidden bg-primary/5"
              >
                {/* Image */}
                <div
                  className="aspect-[4/3] bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                  style={{ backgroundImage: `url('${image.url}?width=600')` }}
                  onClick={() => openLightbox(index)}
                />

                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-300 flex items-center justify-center">
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center gap-3">
                    {/* View */}
                    <button
                      onClick={() => openLightbox(index)}
                      className="bg-white/20 backdrop-blur-sm hover:bg-white/30 p-3 rounded-full transition-colors"
                      title="View full size"
                    >
                      <span className="material-icons text-white text-xl">
                        fullscreen
                      </span>
                    </button>

                    {/* Download */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDownload(withSize(image.url, 2560), index);
                      }}
                      disabled={downloading.has(index)}
                      className="bg-primary/80 backdrop-blur-sm hover:bg-primary p-3 rounded-full transition-colors disabled:opacity-50"
                      title="Download image"
                    >
                      <span
                        className={`material-icons text-white text-xl ${
                          downloading.has(index) ? "animate-spin" : ""
                        }`}
                      >
                        {downloading.has(index) ? "progress_activity" : "download"}
                      </span>
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Empty Gallery */}
        {!loading && !error && gallery && gallery.images.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-20"
          >
            <span className="material-icons text-6xl text-slate-600 mb-4 block">
              photo_library
            </span>
            <p className="text-slate-400 text-lg mb-6">
              No images found in this gallery.
            </p>
            <Link
              href="/pictures"
              className="border border-primary/30 hover:bg-primary hover:text-white rounded-xl px-8 py-4 font-semibold text-sm uppercase tracking-widest transition-all duration-300"
            >
              Back to Galleries
            </Link>
          </motion.div>
        )}
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {lightboxIndex !== null && gallery && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center"
            onClick={closeLightbox}
          >
            {/* Close button */}
            <button
              onClick={closeLightbox}
              className="absolute top-6 right-6 text-white/60 hover:text-white transition-colors z-10"
            >
              <span className="material-icons text-3xl">close</span>
            </button>

            {/* Counter */}
            <div className="absolute top-6 left-6 text-white/60 text-sm font-medium z-10">
              {lightboxIndex + 1} / {gallery.images.length}
            </div>

            {/* Download button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleDownload(
                  withSize(gallery.images[lightboxIndex].url, 2560),
                  lightboxIndex
                );
              }}
              disabled={downloading.has(lightboxIndex)}
              className="absolute top-6 right-20 text-white/60 hover:text-white transition-colors z-10 flex items-center gap-2"
            >
              <span
                className={`material-icons text-2xl ${
                  downloading.has(lightboxIndex) ? "animate-spin" : ""
                }`}
              >
                {downloading.has(lightboxIndex) ? "progress_activity" : "download"}
              </span>
            </button>

            {/* Prev button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                goPrev();
              }}
              className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 text-white/40 hover:text-white transition-colors z-10"
            >
              <span className="material-icons text-4xl md:text-5xl">
                chevron_left
              </span>
            </button>

            {/* Next button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                goNext();
              }}
              className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 text-white/40 hover:text-white transition-colors z-10"
            >
              <span className="material-icons text-4xl md:text-5xl">
                chevron_right
              </span>
            </button>

            {/* Image */}
            <motion.img
              key={lightboxIndex}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              src={withSize(gallery.images[lightboxIndex].url, 1920)}
              alt={gallery.images[lightboxIndex].alt || "Gallery image"}
              className="max-h-[85vh] max-w-[90vw] object-contain rounded-lg"
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
