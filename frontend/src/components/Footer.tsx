import { useState } from "react";
import { Link } from "react-router-dom";
import { Linkedin, Twitter, Facebook, Instagram } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useSubmitSubscriptionMutation, useGetServicesQuery } from "@/lib/api";

const footerLinks = {
  company: [
    { label: "About Us", href: "/about" },
    { label: "Our Work", href: "/portfolio" },
    { label: "Pricing", href: "/pricing" },
    { label: "Contact", href: "/contact" },
  ],
};


export const Footer = () => {
  // Fetch admin-added services
  const { data: servicesData, isLoading: servicesLoading, isError: servicesError } = useGetServicesQuery();
  const socialLinks = [
    { icon: Linkedin, href: "#", label: "LinkedIn" },
    { icon: Twitter, href: "#", label: "Twitter" },
    { icon: Facebook, href: "#", label: "Facebook" },
    { icon: Instagram, href: "#", label: "Instagram" },
  ];
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const { toast } = useToast();
  const [submitSubscription] = useSubmitSubscriptionMutation();

  const onSubscribe = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!email.trim()) return;
    setSubmitting(true);
    try {
      const res = await submitSubscription({ email: email.trim(), source: "footer" }).unwrap();
      setEmail("");
      toast({
        title: "Subscribed",
        description: res.message || "Thanks for subscribing!",
      });
    } catch (err) {
      toast({
        title: "Subscription failed",
        description: "Please try again later.",
        variant: "destructive",
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <footer className="bg-gradient-primary text-primary-foreground py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            {/* Brand */}
            <div className="md:col-span-1">
              <Link to="/" className="flex items-center gap-2 mb-4">
                <div className="w-10 h-10 bg-primary-foreground/10 rounded-lg flex items-center justify-center">
                  <span className="font-bold text-lg">C</span>
                </div>
                <span className="text-xl font-bold">
                  Codivra Solutions<span className="text-accent">.</span>
                </span>
              </Link>
              <p className="text-primary-foreground/70 text-sm leading-relaxed mb-6">
                Empowering businesses with innovative IT solutions since Dec 2025. 
                Your trusted partner in digital transformation.
              </p>
              <div className="flex gap-3">
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    aria-label={social.label}
                    className="w-10 h-10 bg-primary-foreground/10 rounded-lg flex items-center justify-center hover:bg-primary-foreground/20 transition-colors"
                  >
                    <social.icon className="w-5 h-5" />
                  </a>
                ))}
              </div>
            </div>

            {/* Services Links (dynamic) */}
            <div>
              <h4 className="font-semibold mb-4">Services</h4>
              <ul className="space-y-3">
                {servicesLoading ? (
                  <li className="text-primary-foreground/60 text-sm">Loading...</li>
                ) : servicesError ? (
                  <li className="text-primary-foreground/60 text-sm">Failed to load services</li>
                ) : servicesData?.items?.length > 0 ? (
                  servicesData.items.map((service) => (
                    <li key={service._id}>
                      <Link
                        to={"/services"}
                        className="text-primary-foreground/70 hover:text-primary-foreground text-sm transition-colors"
                      >
                        {service.title}
                      </Link>
                    </li>
                  ))
                ) : (
                  <li className="text-primary-foreground/60 text-sm">No services available</li>
                )}
              </ul>
            </div>

            {/* Company Links */}
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-3">
                {footerLinks.company.map((link) => (
                  <li key={link.label}>
                    <Link
                      to={link.href}
                      className="text-primary-foreground/70 hover:text-primary-foreground text-sm transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Newsletter */}
            <div>
              <h4 className="font-semibold mb-4">Stay Updated</h4>
              <p className="text-primary-foreground/70 text-sm mb-4">
                Subscribe to our newsletter for the latest insights and updates.
              </p>
              <form className="flex gap-2" onSubmit={onSubscribe}>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                  className="flex-1 h-10 px-4 rounded-lg bg-primary-foreground/10 text-primary-foreground placeholder:text-primary-foreground/50 text-sm focus:outline-none focus:ring-2 focus:ring-accent"
                />
                <button
                  type="submit"
                  disabled={submitting}
                  className="h-10 px-4 bg-accent text-accent-foreground rounded-lg text-sm font-semibold hover:opacity-90 transition-opacity disabled:opacity-60"
                >
                  {submitting ? "Subscribing..." : "Subscribe"}
                </button>
              </form>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="pt-8 border-t border-primary-foreground/10 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-primary-foreground/60 text-sm">
              © {new Date().getFullYear()} Codivra Solution. All rights reserved.
            </p>
            <div className="flex gap-6">
              <Link to="/privacy-policy" className="text-primary-foreground/60 hover:text-primary-foreground text-sm transition-colors">
                Privacy Policy
              </Link>
              <Link to="/terms-of-service" className="text-primary-foreground/60 hover:text-primary-foreground text-sm transition-colors">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
