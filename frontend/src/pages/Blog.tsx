import { useState } from "react";
import { motion } from "framer-motion";
import { Calendar, Clock, ArrowRight, Tag, Search, Sparkles, TrendingUp, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AnimatedSection, AnimatedStagger, AnimatedItem } from "@/components/AnimatedSection";
import PageBreadcrumb from "@/components/PageBreadcrumb";
import { Footer } from "@/components/Footer";
import { useGetBlogQuery, useSubmitSubscriptionMutation } from "@/lib/api";
import { useToast } from "@/hooks/use-toast";
import { Header } from "@/components/Header";
import { Link } from "react-router-dom"; // Add this import

const Blog = () => {
  const { data, isLoading } = useGetBlogQuery();
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [isSubscribing, setIsSubscribing] = useState(false);
  const [submitSubscription] = useSubmitSubscriptionMutation();
  const { toast } = useToast();

  const allPosts = data?.items || [];

  const categories = [
    { name: "All", count: allPosts.length },
    ...Array.from(
      allPosts.reduce((acc, post) => {
        const key = (post.category || "Other").trim().toLowerCase();
        const label = post.category || "Other";
        const existing = acc.get(key);
        acc.set(key, { label, count: (existing?.count || 0) + 1 });
        return acc;
      }, new Map<string, { label: string; count: number }>())
    ).map(([key, value]) => ({
      key,
      name: value.label,
      count: value.count,
    })),
  ];

  const filteredPosts =
    activeCategory === "all"
      ? allPosts
      : allPosts.filter(
          (post) =>
            (post.category || "Other").trim().toLowerCase() === activeCategory
        );

  const featuredPost = allPosts[0];

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#0A0F1C] flex items-center justify-center">
        <div className="text-center">
          <div className="relative w-20 h-20 mx-auto">
            <motion.div 
              className="absolute inset-0 border-4 border-[#00D9FF]/30 rounded-full"
              animate={{ rotate: 360, scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div 
              className="absolute inset-2 border-4 border-[#0066FF] rounded-full border-t-transparent"
              animate={{ rotate: -360 }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
            />
          </div>
          <motion.p 
            className="text-white/60 mt-6 font-semibold text-lg"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            Loading Articles...
          </motion.p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0A0F1C] overflow-hidden">
      <Header />
      
      {/* Animated Background Elements */}
      <div className="fixed inset-0 pointer-events-none">
        <motion.div 
          className="absolute top-0 right-0 w-[800px] h-[800px] bg-[#00D9FF]/3 rounded-full blur-[150px]"
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.03, 0.05, 0.03]
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div 
          className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-[#0066FF]/3 rounded-full blur-[150px]"
          animate={{ 
            scale: [1.2, 1, 1.2],
            opacity: [0.03, 0.05, 0.03]
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <div className="pt-20 relative z-10">
        <PageBreadcrumb />
      </div>

      {/* Hero Section - Magazine Editorial Style */}
      <section className="relative py-12 sm:py-16 md:py-20 lg:py-32">
        <div className="container mx-auto px-4 sm:px-6 lg:px-12">
          <div className="max-w-7xl mx-auto">
            <AnimatedSection>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="text-center mb-8"
              >
                <motion.div 
                  className="inline-flex items-center gap-3 mb-6 bg-gradient-to-r from-[#00D9FF]/10 to-[#0066FF]/10 border border-[#00D9FF]/30 rounded-full px-6 py-3"
                  whileHover={{ scale: 1.05 }}
                >
                  <Sparkles className="w-4 h-4 text-[#00D9FF]" />
                  <span className="text-[#00D9FF] font-bold text-sm tracking-[0.15em] uppercase">
                    Latest Insights
                  </span>
                  <Sparkles className="w-4 h-4 text-[#00D9FF]" />
                </motion.div>
                
                <h1 
                  className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black text-white mb-4 sm:mb-6 leading-[0.9] tracking-tight px-2 sm:px-0"
                  style={{ fontFamily: "'Oswald', 'Impact', sans-serif" }}
                >
                  DISCOVER{" "}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00D9FF] to-[#0066FF]">
                    THE FUTURE
                  </span>
                </h1>
                
                <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-white/70 max-w-3xl mx-auto leading-relaxed font-light px-4 sm:px-0" style={{ fontFamily: "'Crimson Pro', serif" }}>
                  Deep dives into web development, software architecture, and the bleeding edge of digital innovation
                </p>
              </motion.div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Featured Post - Dramatic Layout */}
      {featuredPost && (
        <section className="py-12 relative">
          <div className="container mx-auto px-4 sm:px-6 lg:px-12">
            <AnimatedSection>
              <div className="max-w-7xl mx-auto">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="flex items-center gap-3 mb-8"
                >
                  <TrendingUp className="w-6 h-6 text-[#00D9FF]" />
                  <h2 className="text-2xl font-black text-white uppercase tracking-[0.1em]" style={{ fontFamily: "'Oswald', sans-serif" }}>
                    Featured Story
                  </h2>
                  <div className="flex-1 h-[2px] bg-gradient-to-r from-[#00D9FF] to-transparent" />
                </motion.div>
                
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  className="group block relative"
                >
                  <Link to={`/blog/${featuredPost._id}`} className="block">
                    <div className="relative overflow-hidden rounded-3xl">
                      {/* Glow effect */}
                      <motion.div 
                        className="absolute -inset-1 bg-gradient-to-r from-[#00D9FF] to-[#0066FF] opacity-0 group-hover:opacity-50 blur-xl transition-opacity duration-700"
                        animate={{ 
                          backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                        }}
                        transition={{ duration: 3, repeat: Infinity }}
                      />
                      
                      <div className="relative bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 rounded-3xl overflow-hidden backdrop-blur-sm">
                        <div className="grid lg:grid-cols-5 gap-0">
                          {/* Image Section */}
                          <div className="lg:col-span-3 relative overflow-hidden aspect-[16/9] lg:aspect-auto">
                            <div className="absolute inset-0 bg-gradient-to-t from-[#0A0F1C] via-transparent to-transparent z-10" />
                            {featuredPost.image && (
                              <motion.img
                                src={featuredPost.image}
                                alt={featuredPost.title}
                                className="w-full h-full object-cover"
                                whileHover={{ scale: 1.1 }}
                                transition={{ duration: 0.7 }}
                              />
                            )}
                            
                            {/* Floating badge */}
                            <motion.div 
                              className="absolute top-6 left-6 z-20"
                              initial={{ rotate: -5 }}
                              whileHover={{ rotate: 0, scale: 1.1 }}
                            >
                              <div className="bg-gradient-to-r from-[#00D9FF] to-[#0066FF] text-white font-black px-6 py-3 rounded-full text-sm uppercase tracking-wider shadow-[0_0_30px_rgba(0,217,255,0.5)]">
                                {featuredPost.category}
                              </div>
                            </motion.div>
                          </div>
                          
                          {/* Content Section */}
                          <div className="lg:col-span-2 p-8 lg:p-12 flex flex-col justify-center">
                            <h3 
                              className="text-3xl lg:text-4xl font-black text-white mb-6 leading-tight group-hover:text-[#00D9FF] transition-colors duration-300"
                              style={{ fontFamily: "'Oswald', sans-serif" }}
                            >
                              {featuredPost.title}
                            </h3>
                            
                            <motion.div 
                              className="inline-flex items-center gap-3 text-[#00D9FF] font-bold text-lg group-hover:gap-5 transition-all duration-300"
                              whileHover={{ x: 5 }}
                            >
                              <span className="uppercase tracking-wider">Continue Reading</span>
                              <ArrowRight className="w-6 h-6" />
                            </motion.div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              </div>
            </AnimatedSection>
          </div>
        </section>
      )}

      {/* Category Pills - Floating Design */}
      <section className="py-16 relative">
        <div className="container mx-auto px-4 sm:px-6 lg:px-12">
          <div className="max-w-7xl mx-auto">
            <AnimatedSection>
              <motion.div 
                className="flex items-center gap-4 mb-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <Tag className="w-5 h-5 text-[#00D9FF]" />
                <span className="text-white/60 font-bold text-sm uppercase tracking-wider">Filter by Topic</span>
              </motion.div>
              
              <div className="flex flex-wrap gap-3">
                {categories.map((category, idx) => (
                  <motion.button
                    key={category.key ?? category.name}
                    onClick={() => setActiveCategory(category.key ?? "all")}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: idx * 0.05 }}
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className={`relative px-6 py-3 rounded-full font-bold text-sm transition-all duration-300 ${
                      activeCategory === (category.key ?? "all")
                        ? "bg-gradient-to-r from-[#00D9FF] to-[#0066FF] text-white shadow-[0_0_30px_rgba(0,217,255,0.4)]"
                        : "bg-white/5 text-white/70 hover:bg-white/10 border border-white/10 hover:border-[#00D9FF]/30"
                    }`}
                  >
                    <span className="uppercase tracking-wider">{category.name}</span>
                    <span className={`ml-2 ${activeCategory === (category.key ?? "all") ? 'opacity-90' : 'opacity-50'}`}>
                      ({category.count})
                    </span>
                  </motion.button>
                ))}
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Posts Grid - Card Masonry Style */}
      <section className="py-12 relative">
        <div className="container mx-auto px-4 sm:px-6 lg:px-12">
          <div className="max-w-7xl mx-auto">
            <AnimatedStagger
              key={activeCategory}
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {filteredPosts.map((post, idx) => (
                <AnimatedItem key={`${activeCategory}-${post._id}`}>
                  <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    whileHover={{ y: -10 }}
                    className="group block h-full"
                  >
                    <Link to={`/blog/${post._id}`} className="block h-full">
                      <div className="relative h-full">
                        {/* Glow on hover */}
                        <motion.div 
                          className="absolute -inset-1 bg-gradient-to-br from-[#00D9FF]/20 to-[#0066FF]/20 rounded-3xl opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500"
                        />
                        
                        <article className="relative bg-gradient-to-br from-white/[0.07] to-white/[0.02] backdrop-blur-sm border border-white/10 rounded-3xl overflow-hidden group-hover:border-[#00D9FF]/40 transition-all duration-500 h-full flex flex-col">
                          {/* Image */}
                          <div className="aspect-[16/10] overflow-hidden relative">
                            <motion.img
                              src={post.image || "https://images.unsplash.com/photo-1455849318169-8728d338c3f7?w=800&q=80"}
                              alt={post.title}
                              className="w-full h-full object-cover"
                              whileHover={{ scale: 1.15 }}
                              transition={{ duration: 0.6 }}
                              loading="lazy"
                              decoding="async"
                              fetchPriority="low"
                            />
                            
                            {/* Gradient overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-[#0A0F1C]/80 via-[#0A0F1C]/20 to-transparent" />
                            
                            {/* Category badge */}
                            <motion.div 
                              className="absolute top-4 left-4"
                              whileHover={{ scale: 1.1, rotate: 5 }}
                            >
                              <span className="inline-flex items-center gap-2 bg-gradient-to-r from-[#00D9FF] to-[#0066FF] text-white text-xs font-black px-4 py-2 rounded-full uppercase tracking-wider shadow-lg">
                                <Zap className="w-3 h-3" />
                                {post.category}
                              </span>
                            </motion.div>
                          </div>
                          
                          {/* Content */}
                          <div className="p-6 flex flex-col flex-1">
                            {/* Title */}
                            <h3 
                              className="text-xl lg:text-2xl font-black text-white mb-4 leading-tight group-hover:text-[#00D9FF] transition-colors duration-300 line-clamp-3"
                              style={{ fontFamily: "'Oswald', sans-serif" }}
                            >
                              {post.title}
                            </h3>
                            
                            {/* Spacer */}
                            <div className="flex-1" />
                            
                            {/* Read more */}
                            <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                              <motion.span 
                                className="text-[#00D9FF] font-bold text-sm uppercase tracking-wider group-hover:tracking-[0.15em] transition-all"
                                whileHover={{ x: 5 }}
                              >
                                Read More
                              </motion.span>
                              <motion.div
                                className="w-10 h-10 rounded-full bg-[#00D9FF]/10 group-hover:bg-[#00D9FF]/20 flex items-center justify-center border border-[#00D9FF]/30"
                                whileHover={{ rotate: 45 }}
                                transition={{ type: "spring", stiffness: 300 }}
                              >
                                <ArrowRight className="w-5 h-5 text-[#00D9FF]" />
                              </motion.div>
                            </div>
                          </div>
                        </article>
                      </div>
                    </Link>
                  </motion.div>
                </AnimatedItem>
              ))}
            </AnimatedStagger>
          </div>
        </div>
      </section>

      {/* Newsletter - Bold CTA */}
      <section className="py-12 sm:py-16 md:py-20 lg:py-24 relative">
        <div className="container mx-auto px-4 sm:px-6 lg:px-12">
          <AnimatedSection>
            <div className="max-w-5xl mx-auto relative">
              {/* Animated background */}
              <motion.div 
                className="absolute inset-0 bg-gradient-to-r from-[#00D9FF]/10 via-[#0066FF]/10 to-[#00D9FF]/10 rounded-[3rem] blur-3xl"
                animate={{ 
                  scale: [1, 1.05, 1],
                  opacity: [0.5, 0.8, 0.5]
                }}
                transition={{ duration: 4, repeat: Infinity }}
              />
              
              <div className="relative bg-gradient-to-br from-[#00D9FF]/10 via-[#0066FF]/5 to-transparent backdrop-blur-xl border-2 border-[#00D9FF]/30 rounded-[3rem] p-12 md:p-20 overflow-hidden">
                {/* Decorative elements */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-[#00D9FF]/5 rounded-full blur-[100px]" />
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#0066FF]/5 rounded-full blur-[100px]" />
                
                <div className="relative z-10">
                  <div className="flex justify-center">
                    <motion.div
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      transition={{ type: "spring", duration: 0.8 }}
                      className="inline-flex items-center gap-2 bg-[#00D9FF]/10 border border-[#00D9FF]/30 rounded-full px-6 py-2 mb-8"
                    >
                      <Sparkles className="w-4 h-4 text-[#00D9FF]" />
                      <span className="text-[#00D9FF] font-bold text-sm uppercase tracking-wider">
                        Join the Community
                      </span>
                    </motion.div>
                  </div>
                  
                  <h2 
                    className="text-4xl md:text-6xl font-black text-white mb-6 text-center leading-tight"
                    style={{ fontFamily: "'Oswald', sans-serif" }}
                  >
                    NEVER MISS{" "}
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00D9FF] to-[#0066FF]">
                      AN UPDATE
                    </span>
                  </h2>
                  
                  <p className="text-white/60 mb-12 text-center max-w-2xl mx-auto text-lg leading-relaxed font-light" style={{ fontFamily: "'Crimson Pro', serif" }}>
                    Subscribe to receive cutting-edge insights, exclusive tutorials, and industry trends delivered directly to your inbox.
                  </p>
                  
                  <form
                    className="flex flex-col sm:flex-row gap-4 max-w-2xl mx-auto"
                    onSubmit={async (e) => {
                      e.preventDefault();
                      if (!newsletterEmail.trim()) return;
                      setIsSubscribing(true);
                      try {
                        const res = await submitSubscription({ 
                          email: newsletterEmail.trim(), 
                          source: "blog" 
                        }).unwrap();
                        setNewsletterEmail("");
                        toast({ 
                          title: "Welcome aboard! 🎉", 
                          description: res.message || "Thanks for subscribing!" 
                        });
                      } catch (err) {
                        toast({ 
                          title: "Subscription failed", 
                          description: "Please try again later.", 
                          variant: "destructive" 
                        });
                      } finally {
                        setIsSubscribing(false);
                      }
                    }}
                  >
                    <motion.input
                      whileFocus={{ scale: 1.02 }}
                      type="email"
                      value={newsletterEmail}
                      onChange={(e) => setNewsletterEmail(e.target.value)}
                      placeholder="your@email.com"
                      className="flex-1 h-16 px-8 rounded-2xl bg-white/5 border-2 border-white/20 text-white placeholder:text-white/40 focus:outline-none focus:border-[#00D9FF] focus:bg-white/10 transition-all text-lg font-semibold"
                      required
                    />
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                      <Button
                        type="submit"
                        disabled={isSubscribing}
                        className="bg-gradient-to-r from-[#00D9FF] to-[#0066FF] text-white font-black px-10 h-16 rounded-2xl hover:shadow-[0_0_60px_rgba(0,217,255,0.6)] transition-all duration-300 text-lg uppercase tracking-wider disabled:opacity-50"
                      >
                        {isSubscribing ? (
                          <span className="flex items-center gap-2">
                            <motion.div
                              animate={{ rotate: 360 }}
                              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                              className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                            />
                            Subscribing...
                          </span>
                        ) : (
                          "Subscribe Now"
                        )}
                      </Button>
                    </motion.div>
                  </form>
                  
                  <p className="text-center text-white/40 text-sm mt-6 font-light">
                    No spam. Unsubscribe anytime. We respect your inbox.
                  </p>
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Blog;