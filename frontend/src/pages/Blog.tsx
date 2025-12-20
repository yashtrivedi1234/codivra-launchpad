import { useState } from "react";
import { motion } from "framer-motion";
import { Calendar, Clock, ArrowRight, Tag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AnimatedSection, AnimatedStagger, AnimatedItem } from "@/components/AnimatedSection";
import PageBreadcrumb from "@/components/PageBreadcrumb";
import { Footer } from "@/components/Footer";
import { useGetBlogQuery, useSubmitSubscriptionMutation } from "@/lib/api";
import { useToast } from "@/hooks/use-toast";

const Blog = () => {
  const { data, isLoading } = useGetBlogQuery();
  const [activeCategory, setActiveCategory] = useState("All");
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [isSubscribing, setIsSubscribing] = useState(false);
  const [submitSubscription] = useSubmitSubscriptionMutation();
  const { toast } = useToast();

  const allPosts = data?.items || [];

  // Get unique categories
  const categories = [
    { name: "All", count: allPosts.length },
    ...Array.from(
      allPosts.reduce((acc, post) => {
        const existing = acc.get(post.category);
        acc.set(post.category, (existing || 0) + 1);
        return acc;
      }, new Map())
    ).map(([name, count]) => ({ name, count })),
  ];

  const filteredPosts = activeCategory === "All"
    ? allPosts
    : allPosts.filter((post) => post.category === activeCategory);

  const featuredPost = allPosts[0];

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block w-8 h-8 border-4 border-accent border-t-transparent rounded-full animate-spin mb-4"></div>
          <p className="text-muted-foreground">Loading blog posts...</p>
        </div>
      </div>
    );
  }

const BlogHeader = () => (
  <header className="sticky top-0 z-50 bg-card/95 backdrop-blur-md shadow-soft">
    <div className="container mx-auto px-4 py-4 flex items-center justify-between">
      <a href="/" className="flex items-center gap-2">
        <div className="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center">
          <span className="text-primary-foreground font-bold text-lg">C</span>
        </div>
        <span className="text-xl font-bold text-foreground">
          Codivra Solutions<span className="text-accent">.</span>
        </span>
      </a>
      <nav className="hidden md:flex items-center gap-6">
        <a href="/services" className="text-muted-foreground hover:text-foreground transition-colors text-sm font-medium">
          Services
        </a>
        <a href="/about" className="text-muted-foreground hover:text-foreground transition-colors text-sm font-medium">
          About
        </a>
        <a href="/pricing" className="text-muted-foreground hover:text-foreground transition-colors text-sm font-medium">
          Pricing
        </a>
        <a href="/portfolio" className="text-muted-foreground hover:text-foreground transition-colors text-sm font-medium">
          Portfolio
        </a>
        <a href="/blog" className="text-foreground font-medium text-sm">
          Blog
        </a>
        <a href="/careers" className="text-muted-foreground hover:text-foreground transition-colors text-sm font-medium">
          Careers
        </a>
        <a href="/contact" className="text-muted-foreground hover:text-foreground transition-colors text-sm font-medium">
          Contact
        </a>
        <a href="/admin" className="text-muted-foreground hover:text-foreground transition-colors text-sm font-medium">
          Admin
        </a>
      </nav>
      <Button variant="accent" asChild>
        <a href="/#contact">Get a Quote</a>
      </Button>
    </div>
  </header>
);
  return (
    <div className="min-h-screen bg-background">
      <BlogHeader />
      <div className="pt-16">
        <PageBreadcrumb />
      </div>

      {/* Hero Section */}
      <section className="py-20 bg-gradient-subtle">
        <div className="container mx-auto px-4">
          <AnimatedSection className="text-center max-w-3xl mx-auto">
            <span className="inline-block text-accent font-semibold text-sm tracking-wider uppercase mb-4">
              Our Blog
            </span>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              Insights & Resources
            </h1>
            <p className="text-muted-foreground text-lg">
              Stay updated with the latest trends, tips, and insights in web development, 
              software engineering, and digital marketing.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Featured Post */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <AnimatedSection>
            <div className="max-w-6xl mx-auto">
              <h2 className="text-sm font-semibold text-accent uppercase tracking-wider mb-6">
                Featured Article
              </h2>
              {featuredPost ? (
                <a href={`/blog/${featuredPost._id}`} className="group block">
                  <div className="grid lg:grid-cols-2 gap-8 bg-card rounded-2xl overflow-hidden shadow-card border border-border/50 hover-lift">
                    <div className="aspect-[16/10] lg:aspect-auto overflow-hidden bg-slate-200 dark:bg-slate-700">
                      {featuredPost.image && (
                        <img
                          src={featuredPost.image}
                          alt={featuredPost.title}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      )}
                    </div>
                    <div className="p-8 flex flex-col justify-center">
                      <div className="flex items-center gap-4 mb-4">
                        <span className="text-xs font-semibold text-accent bg-accent/10 px-3 py-1 rounded-full">
                          {featuredPost.category}
                        </span>
                        <span className="text-sm text-muted-foreground flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {new Date(featuredPost.created_at || "").toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                          })}
                        </span>
                      </div>
                      <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-4 group-hover:text-accent transition-colors">
                        {featuredPost.title}
                      </h3>
                      <p className="text-muted-foreground mb-6 leading-relaxed">
                        {featuredPost.excerpt}
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          5 min read
                        </span>
                        <span className="text-accent font-semibold flex items-center gap-2 group-hover:gap-3 transition-all">
                          Read Article
                          <ArrowRight className="w-4 h-4" />
                        </span>
                      </div>
                    </div>
                  </div>
                </a>
              ) : (
                <div className="text-center py-12">
                  <p className="text-muted-foreground">No blog posts yet.</p>
                </div>
              )}
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Category Filter & Posts */}
      <section className="py-16 bg-gradient-subtle">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            {/* Categories */}
            <AnimatedSection className="mb-12">
              <div className="flex flex-wrap items-center gap-3">
                <Tag className="w-5 h-5 text-muted-foreground" />
                {categories.map((category) => (
                  <button
                    key={category.name}
                    onClick={() => setActiveCategory(category.name)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                      activeCategory === category.name
                        ? "bg-accent text-accent-foreground shadow-soft"
                        : "bg-card text-muted-foreground hover:bg-secondary border border-border/50"
                    }`}
                  >
                    {category.name}
                    <span className="ml-2 opacity-60">({category.count})</span>
                  </button>
                ))}
              </div>
            </AnimatedSection>

            {/* Posts Grid */}
            <AnimatedStagger className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPosts.map((post) => (
                <AnimatedItem key={post._id}>
                  <a href={`/blog/${post._id}`} className="group block h-full">
                    <article className="bg-card rounded-xl overflow-hidden shadow-soft border border-border/50 hover-lift h-full flex flex-col">
                      <div className="aspect-[16/10] overflow-hidden">
                        <img
                          src={post.image || "https://images.unsplash.com/photo-1455849318169-8728d338c3f7?w=800&q=80"}
                          alt={post.title}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                      </div>
                      <div className="p-6 flex flex-col flex-1">
                        <div className="flex items-center gap-3 mb-3">
                          <span className="text-xs font-semibold text-accent">
                            {post.category}
                          </span>
                          <span className="text-xs text-muted-foreground">
                            {new Date(post.created_at || "").toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })}
                          </span>
                        </div>
                        <h3 className="text-lg font-semibold text-foreground mb-3 group-hover:text-accent transition-colors line-clamp-2">
                          {post.title}
                        </h3>
                        <p className="text-muted-foreground text-sm mb-4 line-clamp-2 flex-1">
                          {post.excerpt}
                        </p>
                        <div className="flex items-center justify-between pt-4 border-t border-border/50">
                          <span className="text-xs text-muted-foreground flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {Math.ceil((post.content?.split(" ") || []).length / 200)} min read
                          </span>
                          <span className="text-accent text-sm font-medium flex items-center gap-1 group-hover:gap-2 transition-all">
                            Read
                            <ArrowRight className="w-3 h-3" />
                          </span>
                        </div>
                      </div>
                    </article>
                  </a>
                </AnimatedItem>
              ))}
            </AnimatedStagger>

            {/* Load More */}
            <AnimatedSection delay={0.2} className="text-center mt-12">
              <Button variant="outline" size="lg">
                Load More Articles
              </Button>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <AnimatedSection>
            <div className="max-w-4xl mx-auto bg-gradient-primary rounded-2xl p-8 md:p-12 text-center">
              <h2 className="text-2xl md:text-3xl font-bold text-primary-foreground mb-4">
                Subscribe to Our Newsletter
              </h2>
              <p className="text-primary-foreground/80 mb-8 max-w-xl mx-auto">
                Get the latest insights, tips, and industry news delivered straight to your inbox. No spam, just value.
              </p>
              <form
                className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto"
                onSubmit={async (e) => {
                  e.preventDefault();
                  if (!newsletterEmail.trim()) return;
                  setIsSubscribing(true);
                  try {
                    const res = await submitSubscription({ email: newsletterEmail.trim(), source: "blog" }).unwrap();
                    setNewsletterEmail("");
                    toast({ title: "Subscribed", description: res.message || "Thanks for subscribing!" });
                  } catch (err) {
                    toast({ title: "Subscription failed", description: "Please try again later.", variant: "destructive" });
                  } finally {
                    setIsSubscribing(false);
                  }
                }}
              >
                <input
                  type="email"
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="flex-1 h-12 px-4 rounded-lg bg-primary-foreground/10 text-primary-foreground placeholder:text-primary-foreground/50 text-sm focus:outline-none focus:ring-2 focus:ring-accent"
                  required
                />
                <Button variant="secondary" size="lg" type="submit" disabled={isSubscribing}>
                  {isSubscribing ? "Subscribing..." : "Subscribe"}
                </Button>
              </form>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Blog;
