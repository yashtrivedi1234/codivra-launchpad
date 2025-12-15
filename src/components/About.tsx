import { motion } from "framer-motion";
import { Target, Users, Lightbulb } from "lucide-react";
import { AnimatedSection } from "./AnimatedSection";

export const About = () => {
  return (
    <section id="about" className="py-24">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-16 items-center max-w-6xl mx-auto">
          {/* Left Content */}
          <AnimatedSection>
            <span className="inline-block text-accent font-semibold text-sm tracking-wider uppercase mb-4">
              About Us
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
              Your Trusted Partner in{" "}
              <span className="text-gradient">Digital Innovation</span>
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed mb-6">
              Codivra Solutions is a young, service-based IT startup that began its journey in December.
              We help startups and growing businesses build reliable digital products with clarity and care.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-8">
              As a small and focused team, we work closely with our clients to understand their goals
              and deliver practical, scalable solutions without unnecessary complexity.
            </p>

            {/* Values */}
            <div className="space-y-6">
              {[
                { icon: Target, title: "Clear Mission", desc: "Delivering honest, practical technology solutions that help businesses grow." },
                { icon: Users, title: "Client Partnership", desc: "We work as an extended team, not just a service provider." },
                { icon: Lightbulb, title: "Smart Innovation", desc: "Using the right tools and technologies — not hype — to solve real problems." },
              ].map((item, index) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="flex gap-4"
                >
                  <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <item.icon className="w-6 h-6 text-accent" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-1">{item.title}</h4>
                    <p className="text-muted-foreground text-sm">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </AnimatedSection>

          {/* Right Visual */}
          <AnimatedSection delay={0.2}>
            <div className="bg-gradient-primary rounded-2xl p-8 aspect-square flex items-center justify-center relative overflow-hidden">
              {/* Decorative Elements */}
              <motion.div
                className="absolute top-0 right-0 w-40 h-40 bg-accent/20 rounded-full blur-3xl"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 5, repeat: Infinity }}
              />
              <motion.div
                className="absolute bottom-0 left-0 w-32 h-32 bg-primary-foreground/10 rounded-full blur-2xl"
                animate={{ scale: [1, 1.3, 1] }}
                transition={{ duration: 6, repeat: Infinity }}
              />
              
              {/* Stats Grid */}
              <div className="relative z-10 grid grid-cols-2 gap-6 text-primary-foreground">
                {[
                  { value: "Dec 2025", label: "Founded" },
                  { value: "9+", label: "Core Team" },
                  { value: "10+", label: "Projects Delivered" },
                  { value: "Direct", label: "Client Support" },
                ].map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                    className="text-center p-6 bg-primary-foreground/10 rounded-xl backdrop-blur-sm"
                  >
                    <div className="text-4xl font-bold mb-2">{stat.value}</div>
                    <div className="text-sm opacity-80">{stat.label}</div>
                  </motion.div>
                ))}
              </div>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
};
