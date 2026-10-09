"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BlogPost } from "@/data/blogs";
import {
  X,
  Clock,
  Calendar,
  Share2,
  Check,
  ArrowLeft,
  Copy,
} from "lucide-react";

interface BlogArticleModalProps {
  post: BlogPost | null;
  onClose: () => void;
}

export function BlogArticleModal({ post, onClose }: BlogArticleModalProps) {
  const [copiedLink, setCopiedLink] = useState(false);
  const [copiedCodeIndex, setCopiedCodeIndex] = useState<number | null>(null);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    if (post) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [post, onClose]);

  const handleShare = async () => {
    if (!post) return;
    const url = window.location.origin + `/blogs?article=${post.id}`;
    if (navigator.clipboard) {
      await navigator.clipboard.writeText(url);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    }
  };

  const handleCopyCode = async (code: string, idx: number) => {
    if (navigator.clipboard) {
      await navigator.clipboard.writeText(code);
      setCopiedCodeIndex(idx);
      setTimeout(() => setCopiedCodeIndex(null), 2000);
    }
  };

  if (!post) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-80 flex items-center justify-center p-3 sm:p-6 md:p-10 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/80 backdrop-blur-md transition-opacity"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="relative z-10 w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-3xl border border-neutral-800 bg-neutral-950 p-6 sm:p-10 text-left shadow-2xl space-y-8 scroll-smooth text-neutral-200"
        >
          {/* Top action row */}
          <div className="flex items-center justify-between border-b border-neutral-800 pb-4">
            <button
              onClick={onClose}
              className="inline-flex items-center gap-1.5 text-xs font-mono text-neutral-400 hover:text-white transition-colors cursor-pointer"
            >
              <ArrowLeft className="size-3.5" />
              <span>Back</span>
            </button>

            <div className="flex items-center gap-2">
              <button
                onClick={handleShare}
                className="inline-flex items-center gap-1.5 rounded-full border border-neutral-800 bg-neutral-900 px-3 py-1 text-xs font-mono text-neutral-300 hover:text-white hover:border-neutral-700 transition-colors cursor-pointer"
                title="Share article"
              >
                {copiedLink ? (
                  <>
                    <Check className="size-3 text-white" />
                    <span>Copied!</span>
                  </>
                ) : (
                  <>
                    <Share2 className="size-3" />
                    <span>Share</span>
                  </>
                )}
              </button>

              <button
                onClick={onClose}
                className="rounded-full p-1.5 text-neutral-400 hover:bg-neutral-800 hover:text-white transition-colors cursor-pointer"
                aria-label="Close modal"
              >
                <X className="size-5" />
              </button>
            </div>
          </div>

          {/* Article Header */}
          <div className="space-y-3">
            <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-xs font-mono text-neutral-400">
              <span className="rounded-full bg-neutral-800 border border-neutral-700 text-neutral-300 font-medium px-2.5 py-0.5">
                {post.category}
              </span>
              <span className="inline-flex items-center gap-1">
                <Clock className="size-3" />
                {post.readTime}
              </span>
              <span>•</span>
              <span className="inline-flex items-center gap-1">
                <Calendar className="size-3" />
                {post.date}
              </span>
            </div>

            <h1 className="text-2xl sm:text-4xl font-sans font-medium tracking-tight text-white leading-tight">
              {post.title}
            </h1>

            <p className="text-sm sm:text-base text-neutral-400 font-sans leading-relaxed">
              {post.subtitle}
            </p>
          </div>

          {/* Cover Art Banner */}
          <div className="relative aspect-video w-full overflow-hidden rounded-2xl border border-neutral-800 bg-neutral-900">
            <img
              src={post.image}
              alt={post.title}
              className="size-full object-cover"
            />
          </div>

          {/* Article Overview */}
          <div className="rounded-2xl border border-neutral-800 bg-neutral-900/80 p-5 sm:p-6 text-neutral-300 leading-relaxed text-sm sm:text-base font-sans italic border-l-4 border-l-neutral-500">
            {post.content.overview}
          </div>

          {/* Article Sections */}
          <div className="space-y-8 font-sans">
            {post.content.sections.map((sec, idx) => (
              <div key={idx} className="space-y-3">
                <h2 className="text-lg sm:text-xl font-sans font-medium text-white">
                  {sec.heading}
                </h2>
                <p className="text-sm sm:text-base text-neutral-300 leading-relaxed">
                  {sec.body}
                </p>

                {sec.codeBlock && (
                  <div className="relative mt-3 rounded-xl border border-neutral-800 bg-black p-4 font-mono text-xs sm:text-sm text-neutral-200 overflow-x-auto">
                    <div className="flex items-center justify-between border-b border-neutral-800 pb-2 mb-3 text-[11px] text-neutral-400">
                      <span>{sec.codeBlock.language.toUpperCase()}</span>
                      <button
                        onClick={() => handleCopyCode(sec.codeBlock!.code, idx)}
                        className="inline-flex items-center gap-1 hover:text-white transition-colors cursor-pointer"
                      >
                        {copiedCodeIndex === idx ? (
                          <>
                            <Check className="size-3 text-white" />
                            <span>Copied</span>
                          </>
                        ) : (
                          <>
                            <Copy className="size-3" />
                            <span>Copy</span>
                          </>
                        )}
                      </button>
                    </div>
                    <pre className="overflow-x-auto leading-relaxed">
                      <code>{sec.codeBlock.code}</code>
                    </pre>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Key Takeaways Box */}
          <div className="rounded-2xl border border-neutral-800 bg-neutral-900/60 p-6 space-y-4">
            <h3 className="text-xs font-mono uppercase tracking-wider text-neutral-300 font-semibold">
              Key Engineering Takeaways
            </h3>
            <ul className="space-y-2 text-sm text-neutral-300 font-sans">
              {post.content.takeaways.map((takeaway, i) => (
                <li key={i} className="flex items-start gap-2.5">
                  <span className="mt-1 flex size-4 shrink-0 items-center justify-center rounded-full bg-neutral-800 text-neutral-300">
                    <Check className="size-2.5" />
                  </span>
                  <span>{takeaway}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-neutral-800">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-neutral-800 bg-neutral-900 px-2.5 py-0.5 text-xs font-mono text-neutral-400"
              >
                #{tag}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
