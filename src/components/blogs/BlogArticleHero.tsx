import Image from "next/image";
import { Clock, Calendar } from "lucide-react";
import type { BlogPost } from "@/data/blogs";

interface BlogArticleHeroProps {
  post: BlogPost;
}

export function BlogArticleHero({ post }: BlogArticleHeroProps) {
  return (
    <header className="w-full max-w-4xl mx-auto px-4 sm:px-6 pt-4 pb-8 font-sans">
      {/* Category Pill & Meta */}
      <div className="flex flex-wrap items-center gap-3 mb-4">
        <span className="inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-semibold tracking-wider uppercase bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/20">
          {post.category}
        </span>
        <div className="flex items-center gap-4 text-xs text-slate-500 dark:text-slate-400">
          <span className="inline-flex items-center gap-1.5">
            <Clock className="size-3.5" aria-hidden="true" />
            <span>{post.readingTime}</span>
          </span>
          {post.date && (
            <span className="inline-flex items-center gap-1.5">
              <Calendar className="size-3.5" aria-hidden="true" />
              <span>{post.date}</span>
            </span>
          )}
        </div>
      </div>

      {/* Main Title */}
      <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-slate-900 dark:text-slate-50 leading-[1.15] mb-4">
        {post.title}
      </h1>

      {/* Subtitle / Excerpt */}
      <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed max-w-3xl mb-8">
        {post.subtitle}
      </p>

      {/* Restrained Cover Image */}
      <div className="relative w-full aspect-[16/9] sm:aspect-[21/9] rounded-2xl overflow-hidden border border-slate-200/80 dark:border-slate-800 shadow-sm bg-slate-100 dark:bg-slate-900">
        <Image
          src={post.coverImage}
          alt={post.altText || post.title}
          fill
          priority
          sizes="(max-width: 1024px) 100vw, 896px"
          className="object-cover"
        />
      </div>
    </header>
  );
}
