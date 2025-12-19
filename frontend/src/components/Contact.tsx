import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Phone, MapPin, Send, CheckCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { AnimatedSection } from "./AnimatedSection";
import { useSubmitContactMutation } from "@/lib/api";

export const Contact = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { toast } = useToast();
  const [submitContact] = useSubmitContactMutation();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(e.currentTarget);
    const payload = {
      name: (formData.get("name") || "").toString().trim(),
      email: (formData.get("email") || "").toString().trim(),
      service: (formData.get("service") || "").toString(),
      message: (formData.get("message") || "").toString().trim(),
    };

    try {
      const result = await submitContact(payload).unwrap();

      setIsSubmitted(true);
      e.currentTarget.reset();
      toast({
        title: "Message sent!",
        description:
          result.message || "We'll get back to you within 24 hours.",
      });
    } catch (error) {
      console.error(error);
      setIsSubmitted(false);
      toast({
        title: "Something went wrong",
        description:
          "Please try again or reach us at codivrasolution@gmail.com.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-24">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16">
            {/* Left - Contact Info */}
            <AnimatedSection>
              <span className="inline-block text-accent font-semibold text-sm tracking-wider uppercase mb-4">
                Get In Touch
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                Let's Build Something{" "}
                <span className="text-gradient">Amazing Together</span>
              </h2>
              <p className="text-muted-foreground text-lg leading-relaxed mb-10">
                Ready to start your project? Contact us today for a free consultation 
                and quote. We're here to help turn your vision into reality.
              </p>

              {/* Contact Details */}
              <div className="space-y-6">
                {[
                  { icon: Mail, label: "Email Us", value: "codivrasolution@gmail.com", href: "mailto:codivrasolution@gmail.com" },
                  { icon: Phone, label: "Call Us", value: "+91 9452819739", href: "tel:+919452819739" },
                  { icon: MapPin, label: "Visit Us", value: "813, Vikas Nagar Colony, Khoobpur, Sitapur", href: null },
                ].map((item, index) => (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="flex items-center gap-4"
                  >
                    <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <item.icon className="w-5 h-5 text-accent" />
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground">{item.label}</div>
                      {item.href ? (
                        <a href={item.href} className="font-semibold text-foreground hover:text-accent transition-colors">
                          {item.value}
                        </a>
                      ) : (
                        <span className="font-semibold text-foreground">{item.value}</span>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            </AnimatedSection>

            {/* Right - Contact Form */}
            <AnimatedSection delay={0.2}>
              <div className="bg-card rounded-2xl p-8 shadow-card border border-border/50">
                {isSubmitted ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex flex-col items-center justify-center h-full py-12 text-center"
                  >
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-6">
                      <CheckCircle className="w-8 h-8 text-green-600" />
                    </div>
                    <h3 className="text-xl font-semibold text-foreground mb-2">Thank You!</h3>
                    <p className="text-muted-foreground">
                      We've received your message and will get back to you soon.
                    </p>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-medium text-foreground mb-2 block">
                          Full Name
                        </label>
                        <Input
                          name="name"
                          placeholder="John Doe"
                          required
                          className="bg-background"
                          disabled={isSubmitting}
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium text-foreground mb-2 block">
                          Email
                        </label>
                        <Input
                          type="email"
                          name="email"
                          placeholder="john@example.com"
                          required
                          className="bg-background"
                          disabled={isSubmitting}
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-sm font-medium text-foreground mb-2 block">
                        Service Interested In
                      </label>
                      <select
                        name="service"
                        className="w-full h-10 px-3 rounded-lg border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                        required
                        disabled={isSubmitting}
                      >
                        <option value="">Select a service</option>
                        <option value="web">Web Development</option>
                        <option value="software">Custom Software</option>
                        <option value="design">Graphic Design</option>
                        <option value="seo">SEO Optimization</option>
                        <option value="marketing">Digital Marketing</option>
                      </select>
                    </div>

                    <div>
                      <label className="text-sm font-medium text-foreground mb-2 block">
                        Project Details
                      </label>
                      <Textarea
                        name="message"
                        placeholder="Tell us about your project..."
                        rows={5}
                        required
                        className="bg-background resize-none"
                        disabled={isSubmitting}
                      />
                    </div>

                    <Button type="submit" variant="accent" size="lg" className="w-full" disabled={isSubmitting}>
                      {isSubmitting ? "Sending..." : (
                        <>
                          Send Message
                          <Send className="w-4 h-4" />
                        </>
                      )}
                    </Button>
                  </form>
                )}
              </div>
            </AnimatedSection>
          </div>
        </div>
      </div>
    </section>
  );
};
