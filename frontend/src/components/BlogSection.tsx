import { ArrowRight, ArrowUpRight, Sparkles } from "lucide-react"; // added Sparkles
import { Button } from "@/components/ui/button";
import { AnimatedSection, AnimatedStagger, AnimatedItem } from "./AnimatedSection";
import { useGetPageQuery, useGetBlogQuery } from "@/lib/api";
import { motion } from "framer-motion";

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
    image:
      post.image,
    category: post.category,
    slug: post._id,
  }));

  return (
    <section className="relative py-12 sm:py-16 md:py-24 lg:py-32 bg-gradient-to-b from-[#070B14] to-[#0A0F1C] overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 right-0 w-96 h-96 bg-[#00D9FF]/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 left-0 w-96 h-96 bg-[#0066FF]/5 rounded-full blur-[120px]" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
        {/* Section Header */}
        <AnimatedSection className="text-center max-w-3xl mx-auto mb-20">
          <div className="flex justify-center">
            <motion.div
              className="inline-flex items-center gap-3 mb-6 bg-gradient-to-r from-[#00D9FF]/10 to-[#0066FF]/10 border border-[#00D9FF]/30 rounded-full px-6 py-3"
              whileHover={{ scale: 1.05 }}
            >
              <Sparkles className="w-4 h-4 text-[#00D9FF]" />
              <span className="text-[#00D9FF] font-bold text-sm tracking-[0.15em] uppercase">
                Our Blog
              </span>
              <Sparkles className="w-4 h-4 text-[#00D9FF]" />
            </motion.div>
          </div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block mb-4"
          >
          </motion.div>
          <h2
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white mb-4 sm:mb-6 leading-tight px-2 sm:px-0"
            style={{ fontFamily: "'Outfit', sans-serif" }}
          >
            {heading.split(" ").slice(0, 2).join(" ")} <span className="text-[#00D9FF]">{heading.split(" ").slice(2).join(" ")}</span>
          </h2>
          <p className="text-lg text-white/60 leading-relaxed">
            {description}
          </p>
        </AnimatedSection>

        {isLoading ? (
          <div className="flex items-center justify-center min-h-64">
            <div className="text-center">
              <div className="inline-block w-10 h-10 border-4 border-[#00D9FF] border-t-transparent rounded-full animate-spin mb-4"></div>
              <p className="text-white/60">Loading blog posts...</p>
            </div>
          </div>
        ) : blogPosts.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-white/50 text-lg">No blog posts yet.</p>
          </div>
        ) : (
          <>
            <AnimatedStagger className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16 max-w-7xl mx-auto">
              {blogPosts.map((post, index) => (
                <AnimatedItem key={post.slug}>
                  <motion.a
                    href={`/blog/${post.slug}`}
                    whileHover={{ y: -8 }}
                    transition={{ duration: 0.3 }}
                    className="group relative block h-full"
                  >
                    {/* Glow Effect */}
                    <div className="absolute inset-0 bg-gradient-to-br from-[#00D9FF]/10 to-[#0066FF]/10 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    
                    {/* Card */}
                    <article className="relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden h-full hover:bg-white/10 hover:border-white/20 transition-all duration-500">
                      {/* Image */}
                      <div className="relative overflow-hidden h-56">
                        <motion.img
                          src={post.image}
                          alt={post.title}
                          className="w-full h-full object-cover"
                          whileHover={{ scale: 1.1 }}
                          transition={{ duration: 0.6 }}
                          loading="lazy"
                          decoding="async"
                          fetchPriority="low"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#0A0F1C] via-transparent to-transparent" />
                        
                        {/* Category Badge */}
                        <div className="absolute top-4 left-4">
                          <span className="inline-block bg-gradient-to-r from-[#00D9FF] to-[#0066FF] text-white text-xs font-bold px-4 py-2 rounded-full">
                            {post.category}
                          </span>
                        </div>

                        {/* Arrow Icon */}
                        <div className="absolute top-4 right-4 w-10 h-10 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <ArrowUpRight className="w-5 h-5 text-white" />
                        </div>
                      </div>

                      {/* Content */}
                      <div className="p-6">
                        {/* Meta */}
                        {/* Removed Meta section */}

                        {/* Title */}
                        <h3 className="text-xl font-bold text-white mb-3 group-hover:text-[#00D9FF] transition-colors line-clamp-2 leading-tight">
                          {post.title}
                        </h3>

                        {/* Read More Link */}
                        <div className="mt-4 flex items-center gap-2 text-[#00D9FF] font-semibold text-sm group-hover:gap-3 transition-all">
                          Read Article
                          <ArrowRight className="w-4 h-4" />
                        </div>
                      </div>

                      {/* Decorative Corner */}
                      <div className="absolute bottom-0 right-0 w-20 h-20 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                        <div className="absolute bottom-4 right-4 w-12 h-[2px] bg-gradient-to-r from-[#00D9FF] to-transparent" />
                        <div className="absolute bottom-4 right-4 w-[2px] h-12 bg-gradient-to-t from-[#00D9FF] to-transparent" />
                      </div>
                    </article>
                  </motion.a>
                </AnimatedItem>
              ))}
            </AnimatedStagger>

            {/* View All Button */}
            <AnimatedSection className="text-center">
              <Button
                asChild
                className="group relative bg-white/5 backdrop-blur-sm border-2 border-white/10 text-white font-semibold px-8 py-6 text-lg rounded-xl hover:bg-white/10 hover:border-[#00D9FF] transition-all duration-300"
              >
                <a href="/blog" className="flex items-center gap-3">
                  View All Articles
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </a>
              </Button>
            </AnimatedSection>
          </>
        )}
      </div>
    </section>
  );
};