import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getBlogBySlug, getAllBlogSlugs, getRelatedBlogs } from "@/data/blogs";
import { BlogBreadcrumbs } from "@/components/blogs/BlogBreadcrumbs";
import { BlogArticleHero } from "@/components/blogs/BlogArticleHero";
import { BlogArticleContent } from "@/components/blogs/BlogArticleContent";
import { BlogArticleFooter } from "@/components/blogs/BlogArticleFooter";
import { AestheticDesktopBackground } from "@/components/ui/AestheticDesktopBackground";

interface BlogPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = getAllBlogSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: BlogPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogBySlug(slug);

  if (!post) {
    return {
      title: "Article Not Found | Muhammed Rashid",
      description: "The requested blog article could not be found.",
    };
  }

  return {
    title: `${post.title} | Muhammed Rashid`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: [
        {
          url: post.coverImage,
          width: 1200,
          height: 630,
          alt: post.altText,
        },
      ],
    },
  };
}

export default async function BlogPostPage({ params }: BlogPageProps) {
  const { slug } = await params;
  const post = getBlogBySlug(slug);

  if (!post) {
    notFound();
  }

  const related = getRelatedBlogs(post.slug, 3);

  return (
    <main className="w-full min-h-screen pt-4 pb-28 font-sans selection:bg-rose-500 selection:text-white relative">
      {/* Aesthetic Four-Corner Background (Desktop Light Mode Only) */}
      <AestheticDesktopBackground />

      <div className="relative z-10 w-full">
        {/* Top Breadcrumbs */}
        <BlogBreadcrumbs articleTitle={post.title} />

        {/* Hero Section */}
        <BlogArticleHero post={post} />

        {/* Main Content Body */}
        <BlogArticleContent post={post} />

        {/* Footer Navigation & Related Articles */}
        <BlogArticleFooter relatedPosts={related} />
      </div>
    </main>
  );
}
