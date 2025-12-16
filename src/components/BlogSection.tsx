import { ArrowRight, Calendar, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AnimatedSection, AnimatedStagger, AnimatedItem } from "./AnimatedSection";

const blogPosts = [
  {
    title: "10 Essential Web Development Trends for 2024",
    excerpt: "Stay ahead of the curve with these emerging technologies and practices that are shaping the future of web development.",
    image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=600&h=400&fit=crop",
    category: "Development",
    date: "Dec 15, 2024",
    readTime: "5 min read",
    slug: "web-development-trends-2024"
  },
  {
    title: "How AI is Transforming Digital Marketing",
    excerpt: "Discover how artificial intelligence is revolutionizing marketing strategies and customer engagement.",
    image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=600&h=400&fit=crop",
    category: "AI & Marketing",
    date: "Dec 12, 2024",
    readTime: "7 min read",
    slug: "ai-transforming-digital-marketing"
  },
  {
    title: "Building Scalable Cloud Infrastructure",
    excerpt: "Learn best practices for designing and implementing cloud solutions that grow with your business.",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=600&h=400&fit=crop",
    category: "Cloud",
    date: "Dec 10, 2024",
    readTime: "6 min read",
    slug: "scalable-cloud-infrastructure"
  }
];

export const BlogSection = () => {
  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <AnimatedSection className="text-center mb-16">
          <span className="text-accent font-semibold text-sm uppercase tracking-wider">Our Blog</span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mt-2 mb-4">
            Latest Insights & Articles
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Stay updated with the latest trends, tips, and insights from our team of experts.
          </p>
        </AnimatedSection>

        <AnimatedStagger className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {blogPosts.map((post) => (
            <AnimatedItem key={post.slug}>
              <article className="bg-card rounded-2xl overflow-hidden shadow-soft hover:shadow-elevated transition-all duration-300 group h-full flex flex-col">
                <div className="relative overflow-hidden">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
                  />
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
      </div>
    </section>
  );
};
