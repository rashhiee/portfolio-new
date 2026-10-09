"use client";

import * as React from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { WorksWheel, type WorksWheelItem } from "@/components/ui/works-wheel";
import { BLOG_POSTS, type BlogPost } from "@/data/blogs";
import { BlogArticleModal } from "@/components/blogs/BlogArticleModal";

export function BlogsClient() {
  const searchParams = useSearchParams();
  const router = useRouter();

  // Find initial active article if requested via URL
  const [selectedPost, setSelectedPost] = React.useState<BlogPost | null>(() => {
    const articleId = searchParams.get("article");
    if (!articleId) return null;
    return BLOG_POSTS.find((p) => p.id === articleId) || null;
  });

  // Sync with searchParams if they change
  React.useEffect(() => {
    const articleId = searchParams.get("article");
    if (articleId) {
      const match = BLOG_POSTS.find((p) => p.id === articleId);
      if (match) setSelectedPost(match);
    } else {
      setSelectedPost(null);
    }
  }, [searchParams]);

  const wheelItems: WorksWheelItem[] = React.useMemo(() => {
    return BLOG_POSTS.map((post) => ({
      id: post.id,
      title: post.title,
      image: post.image,
      category: post.category,
      date: post.date,
      readTime: post.readTime,
      description: post.subtitle,
      href: `#${post.id}`,
    }));
  }, []);

  const handleSelectPost = (item: WorksWheelItem) => {
    const matched = BLOG_POSTS.find(
      (p) => p.id === item.id || p.title === item.title
    );
    if (matched) {
      setSelectedPost(matched);
      const newUrl = `/blogs?article=${matched.id}`;
      window.history.replaceState({ ...window.history.state, as: newUrl, url: newUrl }, "", newUrl);
    }
  };

  const handleCloseModal = () => {
    setSelectedPost(null);
    window.history.replaceState(
      { ...window.history.state, as: "/blogs", url: "/blogs" },
      "",
      "/blogs"
    );
  };

  return (
    <div className="relative w-full h-[calc(100dvh-3.5rem)] sm:h-screen flex flex-col justify-center overflow-hidden bg-[var(--bg-primary)] select-none">
      {/* 3D Wheel Stage */}
      <div className="relative flex-1 w-full min-h-0">
        <WorksWheel
          items={wheelItems}
          onItemSelect={handleSelectPost}
          className="h-full w-full bg-transparent"
        />
      </div>

      {/* Bottom clearance for floating dock */}
      <div className="h-14 sm:h-16 shrink-0 pointer-events-none" />

      {/* Article Reader Modal */}
      <BlogArticleModal post={selectedPost} onClose={handleCloseModal} />
    </div>
  );
}
