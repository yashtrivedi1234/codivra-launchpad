import { ArrowRight, Calendar, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AnimatedSection, AnimatedStagger, AnimatedItem } from "./AnimatedSection";
import { useGetPageQuery, useGetBlogQuery } from "@/lib/api";

export const BlogSection = () => {
  const { data: pageData } = useGetPageQuery("home");
  const { data: blogData, isLoading } = useGetBlogQuery();
  
  const blogSection = pageData?.sections.find((s) => s.key === "blog")?.data;

  const heading: string =
    blogSection?.heading || "Latest Insights & Articles";
  const description: string =
    blogSection?.description ||
    "Stay updated with the latest trends, tips, and insights from our team of experts.";

  const blogPosts = (blogData?.items || []).slice(0, 3).map((post) => ({
    title: post.title,
    excerpt: post.excerpt,
    image: post.image || "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=600&h=400&fit=crop",
    category: post.category,
    date: new Date(post.created_at || "").toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    }),
    readTime: "5 min read",
    slug: post._id,
  }));

  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <AnimatedSection className="text-center mb-16">
          <span className="text-accent font-semibold text-sm uppercase tracking-wider">Our Blog</span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mt-2 mb-4">
            {heading}
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            {description}
          </p>
        </AnimatedSection>

        {isLoading ? (
          <div className="flex items-center justify-center min-h-64">
            <div className="text-center">
              <div className="inline-block w-8 h-8 border-4 border-accent border-t-transparent rounded-full animate-spin mb-4"></div>
              <p className="text-muted-foreground">Loading blog posts...</p>
            </div>
          </div>
        ) : blogPosts.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No blog posts yet.</p>
          </div>
        ) : (
          <>
            <AnimatedStagger className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
              {blogPosts.map((post) => (
                <AnimatedItem key={post.slug}>
                  <article className="bg-card rounded-2xl overflow-hidden shadow-soft hover:shadow-elevated transition-all duration-300 group h-full flex flex-col">
                    <div className="relative overflow-hidden bg-slate-200 dark:bg-slate-700">
                      {post.image && (
                        <img
                          src={post.image}
                          alt={post.title}
                          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      )}
                      <span className="absolute top-4 left-4 bg-accent text-accent-foreground text-xs font-semibold px-3 py-1 rounded-full">
                        {post.category}
                      </span>
                    </div>
                    <div className="p-6 flex flex-col flex-1">
                      <div className="flex items-center gap-4 text-muted-foreground text-sm mb-3">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {post.date}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          {post.readTime}
                        </span>
                      </div>
                      <h3 className="text-lg font-bold text-foreground mb-2 group-hover:text-accent transition-colors line-clamp-2">
                        {post.title}
                      </h3>
                      <p className="text-muted-foreground text-sm flex-1 line-clamp-3">
                        {post.excerpt}
                      </p>
                      <a
                        href={`/blog/${post.slug}`}
                        className="mt-4 text-accent font-semibold text-sm flex items-center gap-1 hover:gap-2 transition-all"
                      >
                        Read More <ArrowRight className="w-4 h-4" />
                      </a>
                    </div>
                  </article>
                </AnimatedItem>
              ))}
            </AnimatedStagger>

            <AnimatedSection className="text-center">
              <Button variant="outline" size="lg" asChild>
                <a href="/blog" className="group">
                  View All Articles
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </a>
              </Button>
            </AnimatedSection>
          </>
        )}
      </div>
    </section>
  );
};
