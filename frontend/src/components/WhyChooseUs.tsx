import { motion } from "framer-motion";
import { Shield, Clock, Headphones, Award, Zap, Heart } from "lucide-react";
import { AnimatedSection, AnimatedStagger, AnimatedItem } from "./AnimatedSection";
import { useTeamCount } from "@/hooks/use-team-count";

const reasons = [
  {
    icon: Heart,
    title: "Founder-Led Team",
    description: "Work directly with the founders and core team members who are personally involved in every project."
  },
  {
    icon: Zap,
    title: "Agile & Flexible",
    description: "As a young startup, we adapt quickly to your requirements and iterate fast without rigid processes."
  },
  {
    icon: Shield,
    title: "Honest Commitment",
    description: "We commit only to what we can deliver and focus on building long-term trust with our clients."
  },
  {
    icon: Clock,
    title: "On-Time Delivery",
    description: "Clear timelines, regular updates, and disciplined execution to ensure timely delivery."
  },
  {
    icon: Headphones,
    title: "Direct Communication",
    description: "No middle layers — you communicate directly with developers and decision-makers."
  },
  {
    icon: Award,
    title: "Quality-Focused Start",
    description: "We may be new, but we follow best practices to deliver clean, scalable, and maintainable solutions."
  },
];

// Dynamic stats, team count will be injected below
const staticStats = [
  { value: "Dec 2025", label: "Founded" },
  { value: "10+", label: "Projects Delivered" },
  { value: "100%", label: "Client Commitment" },
];

const services = [
  {
    title: "Website Development",
    description: "Modern, responsive websites tailored to your business needs.",
  },
  {
    title: "Web & App Development",
    description: "Custom web apps and dashboards built for performance and scale.",
  },
  {
    title: "UI/UX & Design",
    description: "Clean, user-friendly designs focused on usability and branding.",
  },
];

export const WhyChooseUs = () => {
  const { count, isLoading } = useTeamCount();
  // Insert the dynamic team count as the second stat
  const stats = [
    { value: "Dec 2025", label: "Founded" },
    { value: isLoading ? "..." : `${count}`, label: "Core Team Members" },
    ...staticStats,
  ].slice(0, 4); // Ensure only 4 stats
  return (
    <section id="why-us" className="py-24 bg-gradient-subtle">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <AnimatedSection className="text-center max-w-2xl mx-auto mb-16">
          <span className="inline-block text-accent font-semibold text-sm tracking-wider uppercase mb-4">
            Why Choose Us
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Why Clients Choose Our Startup
          </h2>
          <p className="text-muted-foreground text-lg">
            A small, dedicated service-based startup focused on quality, transparency, and long-term partnerships.
          </p>
        </AnimatedSection>

        {/* Stats Bar */}
        <AnimatedSection className="bg-gradient-primary rounded-2xl p-8 mb-16 max-w-4xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label + '-' + index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="text-3xl md:text-4xl font-bold text-primary-foreground mb-2">
                  {stat.value}
                </div>
                <div className="text-sm text-primary-foreground/70">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </AnimatedSection>

        {/* Services Cards */}
        <AnimatedStagger className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto mb-20">
          {services.map((service) => (
            <AnimatedItem key={service.title}>
              <div className="bg-card border border-border rounded-xl p-6 shadow-soft hover:shadow-medium transition-all duration-300 text-center">
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  {service.title}
                </h3>
                <p className="text-muted-foreground text-sm">
                  {service.description}
                </p>
              </div>
            </AnimatedItem>
          ))}
        </AnimatedStagger>

        {/* Reasons Grid */}
        <AnimatedStagger className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {reasons.map((reason) => (
            <AnimatedItem key={reason.title}>
              <div className="flex gap-4 p-6 rounded-xl hover:bg-card hover:shadow-soft transition-all duration-300">
                <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <reason.icon className="w-6 h-6 text-accent" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-2">{reason.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {reason.description}
                  </p>
                </div>
              </div>
            </AnimatedItem>
          ))}
        </AnimatedStagger>
      </div>
    </section>
  );
};
