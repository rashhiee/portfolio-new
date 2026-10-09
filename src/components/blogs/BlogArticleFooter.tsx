import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Clock, ArrowRight } from "lucide-react";
import type { BlogPost } from "@/data/blogs";

interface BlogArticleFooterProps {
  relatedPosts: BlogPost[];
}

export function BlogArticleFooter({ relatedPosts }: BlogArticleFooterProps) {
  return (
    <footer className="w-full max-w-4xl mx-auto px-4 sm:px-6 pt-12 pb-24 font-sans">
      {/* Subtle Divider */}
      <hr className="border-t border-slate-200 dark:border-slate-800 mb-8" />

      {/* Back to Blogs Link */}
      <div className="mb-12">
        <Link
          href="/blogs"
          className="inline-flex items-center gap-2 text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-rose-600 dark:hover:text-rose-400 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-500 rounded px-2 py-1 -ml-2"
        >
          <ArrowLeft className="size-4" aria-hidden="true" />
          <span>Back to Blogs</span>
        </Link>
      </div>

      {/* More Articles Section */}
      {relatedPosts.length > 0 && (
        <section aria-labelledby="more-articles-heading" className="space-y-6">
          <div className="flex items-center justify-between">
            <h2
              id="more-articles-heading"
              className="text-lg sm:text-xl font-bold tracking-tight text-slate-900 dark:text-slate-100"
            >
              More Articles
            </h2>
            <Link
              href="/blogs"
              className="inline-flex items-center gap-1 text-xs font-semibold uppercase tracking-wider text-rose-500 hover:text-rose-600 dark:hover:text-rose-400 transition-colors"
            >
              <span>View All</span>
              <ArrowRight className="size-3" aria-hidden="true" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {relatedPosts.map((item) => (
              <Link
                key={item.slug}
                href={`/blogs/${item.slug}`}
                className="group flex flex-col rounded-xl overflow-hidden border border-slate-200/90 dark:border-slate-800/90 bg-white dark:bg-slate-900/60 hover:border-slate-300 dark:hover:border-slate-700 hover:shadow-md transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-500"
              >
                <div className="relative w-full aspect-[16/10] bg-slate-100 dark:bg-slate-800 overflow-hidden">
                  <Image
                    src={item.coverImage}
                    alt={item.altText || item.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 300px"
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-4 flex flex-col flex-1">
                  <div className="flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400 mb-2 font-medium">
                    <span className="uppercase text-rose-600 dark:text-rose-400 tracking-wider">
                      {item.category}
                    </span>
                    <span className="inline-flex items-center gap-1">
                      <Clock className="size-3" aria-hidden="true" />
                      {item.readingTime}
                    </span>
                  </div>
                  <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 group-hover:text-rose-600 dark:group-hover:text-rose-400 transition-colors line-clamp-2 leading-snug">
                    {item.title}
                  </h3>
                  <p className="mt-1.5 text-xs text-slate-600 dark:text-slate-400 line-clamp-2 leading-relaxed">
                    {item.excerpt}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}
    </footer>
  );
}
