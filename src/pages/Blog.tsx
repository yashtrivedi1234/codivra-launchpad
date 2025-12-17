import { useState } from "react";
import { motion } from "framer-motion";
import { Calendar, Clock, ArrowRight, Tag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AnimatedSection, AnimatedStagger, AnimatedItem } from "@/components/AnimatedSection";
import PageBreadcrumb from "@/components/PageBreadcrumb";

const categories = [
  { name: "All", count: 12 },
  { name: "Web Development", count: 4 },
  { name: "Software", count: 3 },
  { name: "SEO", count: 2 },
  { name: "Marketing", count: 2 },
  { name: "Design", count: 1 },
];

const featuredPost = {
  title: "The Future of Web Development: Trends to Watch in 2025",
  excerpt: "Explore the emerging technologies and methodologies shaping the future of web development, from AI-powered tools to edge computing and beyond.",
  image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=1200&h=600&fit=crop",
  category: "Web Development",
  date: "Dec 10, 2024",
  readTime: "8 min read",
  slug: "future-web-development-2025",
};

const posts = [
  {
    title: "How Custom Software Can Transform Your Business Operations",
    excerpt: "Discover how tailored software solutions can streamline workflows, reduce costs, and give you a competitive edge.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop",
    category: "Software",
    date: "Dec 8, 2024",
    readTime: "6 min read",
    slug: "custom-software-transform-business",
  },
  {
    title: "SEO Best Practices for 2025: A Complete Guide",
    excerpt: "Stay ahead of algorithm changes with our comprehensive guide to modern SEO strategies that drive organic traffic.",
    image: "https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?w=600&h=400&fit=crop",
    category: "SEO",
    date: "Dec 5, 2024",
    readTime: "10 min read",
    slug: "seo-best-practices-2025",
  },
  {
    title: "Building Scalable React Applications: Architecture Tips",
    excerpt: "Learn the architectural patterns and best practices for building React apps that scale with your business needs.",
    image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=600&h=400&fit=crop",
    category: "Web Development",
    date: "Dec 2, 2024",
    readTime: "7 min read",
    slug: "scalable-react-architecture",
  },
  {
    title: "Digital Marketing ROI: Measuring What Matters",
    excerpt: "Understand the key metrics and tools to effectively measure and optimize your digital marketing campaigns.",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop",
    category: "Marketing",
    date: "Nov 28, 2024",
    readTime: "5 min read",
    slug: "digital-marketing-roi",
  },
  {
    title: "UI/UX Design Principles for Higher Conversions",
    excerpt: "Apply these proven design principles to create user interfaces that engage visitors and drive conversions.",
    image: "https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=600&h=400&fit=crop",
    category: "Design",
    date: "Nov 25, 2024",
    readTime: "6 min read",
    slug: "ui-ux-design-conversions",
  },
  {
    title: "API Integration Strategies for Modern Applications",
    excerpt: "Master the art of API integration with best practices for security, performance, and maintainability.",
    image: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=600&h=400&fit=crop",
    category: "Software",
    date: "Nov 20, 2024",
    readTime: "8 min read",
    slug: "api-integration-strategies",
  },
];

const BlogHeader = () => (
  <header className="sticky top-0 z-50 bg-card/95 backdrop-blur-md shadow-soft">
    <div className="container mx-auto px-4 py-4 flex items-center justify-between">
      <a href="/" className="flex items-center gap-2">
        <div className="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center">
          <span className="text-primary-foreground font-bold text-lg">C</span>
        </div>
        <span className="text-xl font-bold text-foreground">
          Codivra<span className="text-accent">.</span>
        </span>
      </a>
      <nav className="hidden md:flex items-center gap-6">
        <a href="/" className="text-muted-foreground hover:text-foreground transition-colors text-sm font-medium">
          Home
        </a>
        <a href="/#services" className="text-muted-foreground hover:text-foreground transition-colors text-sm font-medium">
          Services
        </a>
        <a href="/blog" className="text-foreground font-medium text-sm">
          Blog
        </a>
        <a href="/#contact" className="text-muted-foreground hover:text-foreground transition-colors text-sm font-medium">
          Contact
        </a>
      </nav>
      <Button variant="accent" asChild>
        <a href="/#contact">Get a Quote</a>
      </Button>
    </div>
  </header>
);

const Blog = () => {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredPosts = activeCategory === "All" 
    ? posts 
    : posts.filter(post => post.category === activeCategory);

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
              <a href={`/blog/${featuredPost.slug}`} className="group block">
                <div className="grid lg:grid-cols-2 gap-8 bg-card rounded-2xl overflow-hidden shadow-card border border-border/50 hover-lift">
                  <div className="aspect-[16/10] lg:aspect-auto overflow-hidden">
                    <img
                      src={featuredPost.image}
                      alt={featuredPost.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-8 flex flex-col justify-center">
                    <div className="flex items-center gap-4 mb-4">
                      <span className="text-xs font-semibold text-accent bg-accent/10 px-3 py-1 rounded-full">
                        {featuredPost.category}
                      </span>
                      <span className="text-sm text-muted-foreground flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {featuredPost.date}
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
                        {featuredPost.readTime}
                      </span>
                      <span className="text-accent font-semibold flex items-center gap-2 group-hover:gap-3 transition-all">
                        Read Article
                        <ArrowRight className="w-4 h-4" />
                      </span>
                    </div>
                  </div>
                </div>
              </a>
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
                <AnimatedItem key={post.slug}>
                  <a href={`/blog/${post.slug}`} className="group block h-full">
                    <article className="bg-card rounded-xl overflow-hidden shadow-soft border border-border/50 hover-lift h-full flex flex-col">
                      <div className="aspect-[16/10] overflow-hidden">
                        <img
                          src={post.image}
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
                            {post.date}
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
                            {post.readTime}
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
              <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 h-12 px-4 rounded-lg bg-primary-foreground/10 text-primary-foreground placeholder:text-primary-foreground/50 text-sm focus:outline-none focus:ring-2 focus:ring-accent"
                  required
                />
                <Button variant="secondary" size="lg" type="submit">
                  Subscribe
                </Button>
              </form>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gradient-primary text-primary-foreground py-12">
        <div className="container mx-auto px-4 text-center">
          <a href="/" className="inline-flex items-center gap-2 mb-4">
            <div className="w-10 h-10 bg-primary-foreground/10 rounded-lg flex items-center justify-center">
              <span className="font-bold text-lg">C</span>
            </div>
            <span className="text-xl font-bold">
              Codivra<span className="text-accent">.</span>
            </span>
          </a>
          <p className="text-primary-foreground/60 text-sm">
            © {new Date().getFullYear()} Codivra Solution. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Blog;
