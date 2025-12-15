import { Shield, Clock, Headphones, Award, Zap, Heart } from "lucide-react";

const reasons = [
  {
    icon: Shield,
    title: "Proven Expertise",
    description: "Years of experience delivering successful projects across industries.",
  },
  {
    icon: Clock,
    title: "On-Time Delivery",
    description: "We respect deadlines and ensure projects launch when promised.",
  },
  {
    icon: Headphones,
    title: "Dedicated Support",
    description: "24/7 support team ready to assist you whenever you need help.",
  },
  {
    icon: Award,
    title: "Quality Assured",
    description: "Rigorous testing and quality checks for flawless deliverables.",
  },
  {
    icon: Zap,
    title: "Scalable Solutions",
    description: "Built to grow with your business, from startup to enterprise.",
  },
  {
    icon: Heart,
    title: "Client Success",
    description: "Your success is our measure of success. We're invested in your growth.",
  },
];

const stats = [
  { value: "98%", label: "Client Satisfaction" },
  { value: "150+", label: "Projects Completed" },
  { value: "50+", label: "Active Clients" },
  { value: "15+", label: "Team Experts" },
];

export const WhyChooseUs = () => {
  return (
    <section id="why-us" className="py-24 bg-gradient-subtle">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="inline-block text-accent font-semibold text-sm tracking-wider uppercase mb-4">
            Why Choose Us
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            The Codivra Advantage
          </h2>
          <p className="text-muted-foreground text-lg">
            We combine technical excellence with genuine care for your success.
          </p>
        </div>

        {/* Stats Bar */}
        <div className="bg-gradient-primary rounded-2xl p-8 mb-16 max-w-4xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-primary-foreground mb-2">
                  {stat.value}
                </div>
                <div className="text-sm text-primary-foreground/70">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Reasons Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {reasons.map((reason) => (
            <div
              key={reason.title}
              className="flex gap-4 p-6 rounded-xl hover:bg-card hover:shadow-soft transition-all duration-300"
            >
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
          ))}
        </div>
      </div>
    </section>
  );
};
