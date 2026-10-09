"use client";

import * as React from "react";
import { Check, Copy, CheckCircle2 } from "lucide-react";
import type { BlogPost } from "@/data/blogs";

interface BlogArticleContentProps {
  post: BlogPost;
}

function CodeBlock({
  code,
  language,
  filename,
}: {
  code: string;
  language: string;
  filename?: string;
}) {
  const [copied, setCopied] = React.useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="my-6 rounded-xl overflow-hidden border border-slate-200 dark:border-slate-800 bg-slate-900 text-slate-100 shadow-sm font-mono text-xs sm:text-sm">
      <div className="flex items-center justify-between px-4 py-2.5 bg-slate-950/70 border-b border-slate-800 text-xs text-slate-400">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80 inline-block" />
          <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80 inline-block" />
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80 inline-block" />
          {filename && <span className="ml-2 text-slate-300 font-sans text-xs">{filename}</span>}
        </div>
        <div className="flex items-center gap-3">
          <span className="text-[11px] uppercase tracking-wider text-slate-400 font-sans font-medium">
            {language}
          </span>
          <button
            onClick={handleCopy}
            className="inline-flex items-center gap-1.5 px-2 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors cursor-pointer text-xs"
            aria-label="Copy code to clipboard"
          >
            {copied ? (
              <>
                <Check className="size-3.5 text-emerald-400" />
                <span className="text-emerald-400 text-[11px]">Copied</span>
              </>
            ) : (
              <>
                <Copy className="size-3.5" />
                <span className="text-[11px]">Copy</span>
              </>
            )}
          </button>
        </div>
      </div>
      <pre className="p-4 overflow-x-auto text-slate-200 leading-relaxed font-mono">
        <code>{code}</code>
      </pre>
    </div>
  );
}

export function BlogArticleContent({ post }: BlogArticleContentProps) {
  return (
    <article className="w-full max-w-3xl mx-auto px-4 sm:px-6 font-sans text-slate-800 dark:text-slate-200">
      {/* Overview Lead Paragraph */}
      <div className="mb-10 p-5 sm:p-6 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800/80">
        <h2 className="text-xs uppercase tracking-wider font-semibold text-rose-600 dark:text-rose-400 mb-2">
          Executive Overview
        </h2>
        <p className="text-base sm:text-lg leading-relaxed text-slate-700 dark:text-slate-300">
          {post.content.overview}
        </p>
      </div>

      {/* Sections */}
      <div className="space-y-10">
        {post.content.sections.map((section, idx) => (
          <section key={idx} className="space-y-4">
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
              {section.heading}
            </h2>

            <p className="text-base sm:text-[17px] leading-relaxed text-slate-700 dark:text-slate-300 font-normal">
              {section.body}
            </p>

            {section.bullets && section.bullets.length > 0 && (
              <ul className="space-y-2.5 my-4 pl-5 list-disc text-slate-700 dark:text-slate-300 text-sm sm:text-base leading-relaxed marker:text-rose-500">
                {section.bullets.map((bullet, bIdx) => (
                  <li key={bIdx} className="pl-1">
                    {bullet}
                  </li>
                ))}
              </ul>
            )}

            {section.codeBlock && (
              <CodeBlock
                code={section.codeBlock.code}
                language={section.codeBlock.language}
                filename={section.codeBlock.filename}
              />
            )}
          </section>
        ))}
      </div>

      {/* Key Takeaways */}
      {post.content.takeaways && post.content.takeaways.length > 0 && (
        <div className="mt-12 p-6 sm:p-7 rounded-2xl border border-rose-500/20 bg-rose-500/[0.03] dark:bg-rose-500/[0.05]">
          <div className="flex items-center gap-2 mb-4">
            <CheckCircle2 className="size-5 text-rose-500 shrink-0" />
            <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-slate-100">
              Key Engineering Takeaways
            </h3>
          </div>
          <ul className="space-y-3 text-sm sm:text-base text-slate-700 dark:text-slate-300 leading-relaxed">
            {post.content.takeaways.map((takeaway, tIdx) => (
              <li key={tIdx} className="flex items-start gap-2.5">
                <span className="size-1.5 rounded-full bg-rose-500 mt-2 shrink-0" />
                <span>{takeaway}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </article>
  );
}
