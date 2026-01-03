import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { 
  Calendar, 
  Clock, 
  ArrowLeft, 
  Share2, 
  Bookmark,
  Facebook,
  Twitter,
  Linkedin,
  Link2,
  CheckCircle,
  User,
  Tag,
  TrendingUp,
  MessageCircle,
  Eye
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { AnimatedSection } from "@/components/AnimatedSection";
import PageBreadcrumb from "@/components/PageBreadcrumb";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { useParams, useNavigate } from "react-router-dom";
import { useGetBlogByIdQuery, useGetBlogQuery } from "@/lib/api";
import { useToast } from "@/hooks/use-toast";

const BlogDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { data, isLoading, error } = useGetBlogByIdQuery(id);
  const blogPost = data?.item;
  const { data: allBlogsData } = useGetBlogQuery();
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [showShareMenu, setShowShareMenu] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);

  // Calculate reading progress
  const [readingProgress, setReadingProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight - windowHeight;
      const scrolled = window.scrollY;
      const progress = (scrolled / documentHeight) * 100;
      setReadingProgress(Math.min(progress, 100));
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleShare = (platform) => {
    const url = window.location.href;
    const title = blogPost?.title || "Check out this article";
    
    const shareUrls = {
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
      twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
    };

    if (platform === "copy") {
      navigator.clipboard.writeText(url);
      setCopySuccess(true);
      toast({ title: "Link copied!", description: "Article URL copied to clipboard" });
      setTimeout(() => setCopySuccess(false), 2000);
    } else if (shareUrls[platform]) {
      window.open(shareUrls[platform], "_blank", "width=600,height=400");
    }
    
    setShowShareMenu(false);
  };

  const handleBookmark = () => {
    setIsBookmarked(!isBookmarked);
    toast({ 
      title: isBookmarked ? "Bookmark removed" : "Bookmarked!", 
      description: isBookmarked ? "Article removed from bookmarks" : "Article saved to your bookmarks" 
    });
  };

  // Get related posts (same category, excluding current post)
  const relatedPosts = allBlogsData?.items
    ?.filter(post => post.category === blogPost?.category && post._id !== blogPost?._id)
    ?.slice(0, 3) || [];

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
            Loading Article...
          </motion.p>
        </div>
      </div>
    );
  }

  if (error || !blogPost) {
    return (
      <div className="min-h-screen bg-[#0A0F1C]">
        <Header />
        <div className="flex items-center justify-center min-h-[60vh] px-6">
          <div className="text-center max-w-md">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="w-20 h-20 rounded-full bg-gradient-to-r from-red-500/20 to-orange-500/20 flex items-center justify-center mx-auto mb-6"
            >
              <span className="text-4xl">⚠️</span>
            </motion.div>
            <h2 className="text-3xl font-black text-white mb-4" style={{ fontFamily: "'Oswald', sans-serif" }}>
              Article Not Found
            </h2>
            <p className="text-white/60 mb-8">
              The article you're looking for doesn't exist or has been removed.
            </p>
            <Button
              onClick={() => navigate("/blog")}
              className="bg-gradient-to-r from-[#00D9FF] to-[#0066FF] text-white font-bold px-8 py-6 rounded-2xl hover:shadow-[0_0_40px_rgba(0,217,255,0.6)] transition-all"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back to Blog
            </Button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const readingTime = Math.ceil((blogPost.content?.split(" ") || []).length / 200);
  const publishDate = new Date(blogPost.created_at || "");

  return (
    <div className="min-h-screen bg-[#0A0F1C] overflow-hidden">
      <Header />
      

      {/* Animated Background Elements */}
      <div className="fixed inset-0 pointer-events-none">
        <motion.div 
          className="absolute top-1/4 right-0 w-[600px] h-[600px] bg-[#00D9FF]/3 rounded-full blur-[150px]"
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.03, 0.05, 0.03]
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div 
          className="absolute bottom-1/4 left-0 w-[600px] h-[600px] bg-[#0066FF]/3 rounded-full blur-[150px]"
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

      {/* Article Header */}
      <section className="relative py-12 md:py-20">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="max-w-4xl mx-auto">
            {/* Back Button */}
            <motion.button
              onClick={() => navigate("/blog")}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              whileHover={{ x: -5 }}
              className="inline-flex items-center gap-2 text-white/60 hover:text-[#00D9FF] transition-colors mb-8 font-semibold"
            >
              <ArrowLeft className="w-5 h-5" />
              <span className="uppercase tracking-wider text-sm">Back to Articles</span>
            </motion.button>

            <AnimatedSection>
              {/* Category Badge */}
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", duration: 0.6 }}
                className="inline-flex items-center gap-2 bg-gradient-to-r from-[#00D9FF] to-[#0066FF] text-white font-black px-6 py-3 rounded-full text-sm uppercase tracking-wider shadow-[0_0_30px_rgba(0,217,255,0.4)] mb-6"
              >
                <Tag className="w-4 h-4" />
                {blogPost.category}
              </motion.div>

              {/* Title */}
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-4xl md:text-6xl lg:text-7xl font-black text-white mb-8 leading-[1.1]"
                style={{ fontFamily: "'Oswald', sans-serif" }}
              >
                {blogPost.title}
              </motion.h1>

              {/* Meta Info */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="flex flex-wrap items-center gap-6 mb-8 text-white/60"
              >
                <div className="flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-[#00D9FF]" />
                  <span className="font-semibold">
                    {publishDate.toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </span>
                </div>
                <span className="text-white/30">•</span>
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5 text-[#00D9FF]" />
                  <span className="font-semibold">{readingTime} min read</span>
                </div>
                {blogPost.author && (
                  <>
                    <span className="text-white/30">•</span>
                    <div className="flex items-center gap-2">
                      <User className="w-5 h-5 text-[#00D9FF]" />
                      <span className="font-semibold">{blogPost.author}</span>
                    </div>
                  </>
                )}
              </motion.div>

              {/* Action Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="flex items-center gap-4 pb-8 border-b border-white/10"
              >
                {/* Share Button */}
                <div className="relative">
                  <motion.button
                    onClick={() => setShowShareMenu(!showShareMenu)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center gap-2 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-[#00D9FF]/30 text-white px-6 py-3 rounded-xl transition-all font-semibold"
                  >
                    <Share2 className="w-5 h-5" />
                    <span>Share</span>
                  </motion.button>

                  {/* Share Menu */}
                  {showShareMenu && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      className="absolute top-full mt-2 left-0 bg-[#0A0F1C] border border-white/20 rounded-2xl p-3 shadow-[0_0_40px_rgba(0,217,255,0.2)] min-w-[200px] z-20"
                    >
                      <button
                        onClick={() => handleShare("facebook")}
                        className="w-full flex items-center gap-3 px-4 py-3 hover:bg-white/5 rounded-xl transition-colors text-white text-left"
                      >
                        <Facebook className="w-5 h-5 text-[#1877F2]" />
                        <span className="font-semibold">Facebook</span>
                      </button>
                      <button
                        onClick={() => handleShare("twitter")}
                        className="w-full flex items-center gap-3 px-4 py-3 hover:bg-white/5 rounded-xl transition-colors text-white text-left"
                      >
                        <Twitter className="w-5 h-5 text-[#1DA1F2]" />
                        <span className="font-semibold">Twitter</span>
                      </button>
                      <button
                        onClick={() => handleShare("linkedin")}
                        className="w-full flex items-center gap-3 px-4 py-3 hover:bg-white/5 rounded-xl transition-colors text-white text-left"
                      >
                        <Linkedin className="w-5 h-5 text-[#0A66C2]" />
                        <span className="font-semibold">LinkedIn</span>
                      </button>
                      <div className="h-px bg-white/10 my-2" />
                      <button
                        onClick={() => handleShare("copy")}
                        className="w-full flex items-center gap-3 px-4 py-3 hover:bg-white/5 rounded-xl transition-colors text-white text-left"
                      >
                        {copySuccess ? (
                          <>
                            <CheckCircle className="w-5 h-5 text-green-400" />
                            <span className="font-semibold text-green-400">Copied!</span>
                          </>
                        ) : (
                          <>
                            <Link2 className="w-5 h-5 text-[#00D9FF]" />
                            <span className="font-semibold">Copy Link</span>
                          </>
                        )}
                      </button>
                    </motion.div>
                  )}
                </div>

                {/* Bookmark Button */}
                <motion.button
                  onClick={handleBookmark}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`flex items-center gap-2 px-6 py-3 rounded-xl transition-all font-semibold ${
                    isBookmarked
                      ? "bg-gradient-to-r from-[#00D9FF] to-[#0066FF] text-white shadow-[0_0_20px_rgba(0,217,255,0.4)]"
                      : "bg-white/5 hover:bg-white/10 border border-white/10 hover:border-[#00D9FF]/30 text-white"
                  }`}
                >
                  <Bookmark className={`w-5 h-5 ${isBookmarked ? "fill-white" : ""}`} />
                  <span>{isBookmarked ? "Saved" : "Save"}</span>
                </motion.button>
              </motion.div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Featured Image */}
      {blogPost.image && (
        <section className="relative py-8">
          <div className="container mx-auto px-6 lg:px-12">
            <AnimatedSection>
              <div className="max-w-5xl mx-auto">
                <motion.div
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                  className="relative rounded-3xl overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0A0F1C] via-transparent to-transparent z-10" />
                  <img
                    src={blogPost.image}
                    alt={blogPost.title}
                    className="w-full h-auto object-cover"
                  />
                </motion.div>
              </div>
            </AnimatedSection>
          </div>
        </section>
      )}

      {/* Article Content */}
      <section className="relative py-12 md:py-20">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="max-w-4xl mx-auto">
            <AnimatedSection>
              <motion.article
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="prose prose-invert prose-lg max-w-none"
                style={{ fontFamily: "'Crimson Pro', serif" }}
              >
                <div 
                  className="text-white/80 leading-relaxed text-lg space-y-6"
                  dangerouslySetInnerHTML={{ __html: blogPost.content || "" }}
                />
              </motion.article>
            </AnimatedSection>

            {/* Article Footer */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="mt-16 pt-8 border-t border-white/10"
            >
              <div className="flex items-center justify-between flex-wrap gap-4">
                <div className="flex items-center gap-6 text-white/60">
                  <div className="flex items-center gap-2">
                    <Eye className="w-5 h-5 text-[#00D9FF]" />
                    <span className="font-semibold">
                      {Math.floor(Math.random() * 1000) + 500} views
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MessageCircle className="w-5 h-5 text-[#00D9FF]" />
                    <span className="font-semibold">
                      {Math.floor(Math.random() * 50) + 10} comments
                    </span>
                  </div>
                </div>

                <motion.button
                  onClick={() => setShowShareMenu(!showShareMenu)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center gap-2 bg-gradient-to-r from-[#00D9FF] to-[#0066FF] text-white px-6 py-3 rounded-xl font-bold uppercase tracking-wider text-sm shadow-[0_0_30px_rgba(0,217,255,0.4)] hover:shadow-[0_0_50px_rgba(0,217,255,0.6)] transition-all"
                >
                  <Share2 className="w-5 h-5" />
                  Share Article
                </motion.button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Related Articles */}
      {relatedPosts.length > 0 && (
        <section className="py-20 relative">
          <div className="container mx-auto px-6 lg:px-12">
            <div className="max-w-7xl mx-auto">
              <AnimatedSection>
                <div className="flex items-center gap-4 mb-12">
                  <TrendingUp className="w-7 h-7 text-[#00D9FF]" />
                  <h2 
                    className="text-3xl md:text-4xl font-black text-white uppercase tracking-wide"
                    style={{ fontFamily: "'Oswald', sans-serif" }}
                  >
                    Related <span className="text-[#00D9FF]">Articles</span>
                  </h2>
                  <div className="flex-1 h-[2px] bg-gradient-to-r from-[#00D9FF] to-transparent" />
                </div>

                <div className="grid md:grid-cols-3 gap-6">
                  {relatedPosts.map((post, idx) => (
                    <motion.a
                      key={post._id}
                      href={`/blog/${post._id}`}
                      initial={{ opacity: 0, y: 40 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.1 }}
                      whileHover={{ y: -10 }}
                      className="group block"
                    >
                      <div className="relative">
                        <motion.div 
                          className="absolute -inset-1 bg-gradient-to-br from-[#00D9FF]/20 to-[#0066FF]/20 rounded-3xl opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500"
                        />
                        
                        <article className="relative bg-gradient-to-br from-white/[0.07] to-white/[0.02] backdrop-blur-sm border border-white/10 rounded-3xl overflow-hidden group-hover:border-[#00D9FF]/40 transition-all duration-500 h-full flex flex-col">
                          <div className="aspect-[16/10] overflow-hidden relative">
                            <motion.img
                              src={post.image || "https://images.unsplash.com/photo-1455849318169-8728d338c3f7?w=800&q=80"}
                              alt={post.title}
                              className="w-full h-full object-cover"
                              whileHover={{ scale: 1.15 }}
                              transition={{ duration: 0.6 }}
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-[#0A0F1C]/80 via-[#0A0F1C]/20 to-transparent" />
                            <motion.div 
                              className="absolute top-4 left-4"
                              whileHover={{ scale: 1.1, rotate: 5 }}
                            >
                              <span className="inline-block bg-gradient-to-r from-[#00D9FF] to-[#0066FF] text-white text-xs font-black px-4 py-2 rounded-full uppercase tracking-wider">
                                {post.category}
                              </span>
                            </motion.div>
                          </div>
                          
                          <div className="p-6 flex flex-col flex-1">
                            <div className="flex items-center gap-3 mb-3 text-xs text-white/50 font-semibold">
                              <span className="flex items-center gap-1.5">
                                <Calendar className="w-3.5 h-3.5" />
                                {new Date(post.created_at || "").toLocaleDateString("en-US", { 
                                  month: "short", 
                                  day: "numeric"
                                })}
                              </span>
                              <span className="text-white/30">•</span>
                              <span className="flex items-center gap-1.5">
                                <Clock className="w-3.5 h-3.5" />
                                {Math.ceil((post.content?.split(" ") || []).length / 200)} min
                              </span>
                            </div>
                            
                            <h3 
                              className="text-xl font-black text-white leading-tight group-hover:text-[#00D9FF] transition-colors duration-300 line-clamp-2 mb-4"
                              style={{ fontFamily: "'Oswald', sans-serif" }}
                            >
                              {post.title}
                            </h3>
                            
                            <div className="flex-1" />
                            
                            <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                              <span className="text-[#00D9FF] font-bold text-sm uppercase tracking-wider">
                                Read More
                              </span>
                              <motion.div
                                className="w-10 h-10 rounded-full bg-[#00D9FF]/10 group-hover:bg-[#00D9FF]/20 flex items-center justify-center border border-[#00D9FF]/30"
                                whileHover={{ rotate: 45 }}
                                transition={{ type: "spring", stiffness: 300 }}
                              >
                                <ArrowLeft className="w-5 h-5 text-[#00D9FF] rotate-180" />
                              </motion.div>
                            </div>
                          </div>
                        </article>
                      </div>
                    </motion.a>
                  ))}
                </div>
              </AnimatedSection>
            </div>
          </div>
        </section>
      )}

      <Footer />
      
      {/* Add Google Fonts */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Oswald:wght@400;600;700&family=Crimson+Pro:wght@300;400;600&display=swap');
        
        /* Custom Prose Styles */
        .prose-invert h2 {
          font-family: 'Oswald', sans-serif;
          font-weight: 700;
          font-size: 2rem;
          color: white;
          margin-top: 3rem;
          margin-bottom: 1.5rem;
          line-height: 1.2;
        }
        
        .prose-invert h3 {
          font-family: 'Oswald', sans-serif;
          font-weight: 600;
          font-size: 1.5rem;
          color: #00D9FF;
          margin-top: 2rem;
          margin-bottom: 1rem;
        }
        
        .prose-invert p {
          margin-bottom: 1.5rem;
          line-height: 1.8;
        }
        
        .prose-invert strong {
          color: #00D9FF;
          font-weight: 600;
        }
        
        .prose-invert a {
          color: #00D9FF;
          text-decoration: underline;
          text-decoration-color: rgba(0, 217, 255, 0.3);
          text-underline-offset: 4px;
          transition: all 0.3s;
        }
        
        .prose-invert a:hover {
          color: #0066FF;
          text-decoration-color: #0066FF;
        }
        
        .prose-invert ul, .prose-invert ol {
          margin: 1.5rem 0;
          padding-left: 2rem;
        }
        
        .prose-invert li {
          margin-bottom: 0.75rem;
          line-height: 1.7;
        }
        
        .prose-invert blockquote {
          border-left: 4px solid #00D9FF;
          padding-left: 1.5rem;
          margin: 2rem 0;
          font-style: italic;
          color: rgba(255, 255, 255, 0.7);
          background: rgba(0, 217, 255, 0.05);
          padding: 1.5rem;
          border-radius: 0.5rem;
        }
        
        .prose-invert code {
          background: rgba(0, 217, 255, 0.1);
          color: #00D9FF;
          padding: 0.25rem 0.5rem;
          border-radius: 0.25rem;
          font-size: 0.9em;
        }
        
        .prose-invert pre {
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 1rem;
          padding: 1.5rem;
          overflow-x: auto;
          margin: 2rem 0;
        }
      `}</style>
    </div>
  );
};

export default BlogDetail;