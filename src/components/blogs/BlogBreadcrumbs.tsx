import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";

interface BlogBreadcrumbsProps {
  articleTitle: string;
}

export function BlogBreadcrumbs({ articleTitle }: BlogBreadcrumbsProps) {
  return (
    <nav
      aria-label="Breadcrumbs"
      className="w-full max-w-4xl mx-auto px-4 sm:px-6 pt-6 pb-2 text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-sans"
    >
      <ol className="flex items-center flex-wrap gap-1.5 sm:gap-2">
        <li className="inline-flex items-center">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 hover:text-slate-900 dark:hover:text-slate-100 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-500 rounded px-1 py-0.5"
          >
            <Home className="size-3.5" aria-hidden="true" />
            <span>Home</span>
          </Link>
        </li>

        <li className="inline-flex items-center text-slate-400 dark:text-slate-600">
          <ChevronRight className="size-3.5" aria-hidden="true" />
        </li>

        <li className="inline-flex items-center">
          <Link
            href="/blogs"
            className="hover:text-slate-900 dark:hover:text-slate-100 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-500 rounded px-1 py-0.5"
          >
            Blogs
          </Link>
        </li>

        <li className="inline-flex items-center text-slate-400 dark:text-slate-600">
          <ChevronRight className="size-3.5" aria-hidden="true" />
        </li>

        <li
          aria-current="page"
          className="font-medium text-slate-900 dark:text-slate-200 truncate max-w-[200px] sm:max-w-[340px] md:max-w-[480px]"
          title={articleTitle}
        >
          {articleTitle}
        </li>
      </ol>
    </nav>
  );
}
