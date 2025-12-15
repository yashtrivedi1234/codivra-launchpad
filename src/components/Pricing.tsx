import { Check, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AnimatedSection, AnimatedStagger, AnimatedItem } from "./AnimatedSection";

const plans = [
  {
    name: "Starter",
    description: "Perfect for small businesses getting started",
    price: "999",
    period: "project",
    features: [
      "5-page responsive website",
      "Basic SEO setup",
      "Mobile optimization",
      "Contact form integration",
      "2 rounds of revisions",
      "30-day support",
    ],
    highlighted: false,
    cta: "Get Started",
  },
  {
    name: "Professional",
    description: "Ideal for growing businesses",
    price: "2,499",
    period: "project",
    features: [
      "10-page custom website",
      "Advanced SEO optimization",
      "Custom UI/UX design",
      "CMS integration",
      "E-commerce ready",
      "Unlimited revisions",
      "90-day priority support",
      "Analytics dashboard",
    ],
    highlighted: true,
    cta: "Most Popular",
  },
  {
    name: "Enterprise",
    description: "Full-scale digital solutions",
    price: "Custom",
    period: "quote",
    features: [
      "Unlimited pages",
      "Custom software development",
      "Full-stack solutions",
      "API integrations",
      "Dedicated project manager",
      "24/7 premium support",
      "Performance optimization",
      "Security audits",
      "Ongoing maintenance",
    ],
    highlighted: false,
    cta: "Contact Sales",
  },
];

export const Pricing = () => {
  return (
    <section id="pricing" className="py-24">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <AnimatedSection className="text-center max-w-2xl mx-auto mb-16">
          <span className="inline-block text-accent font-semibold text-sm tracking-wider uppercase mb-4">
            Pricing Plans
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Transparent Pricing for Every Need
          </h2>
          <p className="text-muted-foreground text-lg">
            Choose the package that fits your business. No hidden fees, just results.
          </p>
        </AnimatedSection>

        {/* Pricing Cards */}
        <AnimatedStagger className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan) => (
            <AnimatedItem key={plan.name}>
              <div
                className={`relative rounded-2xl p-8 transition-all duration-300 h-full ${
                  plan.highlighted
                    ? "bg-gradient-primary text-primary-foreground shadow-elevated scale-105 border-0"
                    : "bg-card border border-border/50 shadow-soft hover-lift"
                }`}
              >
                {/* Popular Badge */}
                {plan.highlighted && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <div className="flex items-center gap-1 bg-accent text-accent-foreground px-4 py-1 rounded-full text-sm font-semibold">
                      <Star className="w-4 h-4 fill-current" />
                      Most Popular
                    </div>
                  </div>
                )}

                {/* Plan Header */}
                <div className="mb-6">
                  <h3 className={`text-xl font-bold mb-2 ${plan.highlighted ? "" : "text-foreground"}`}>
                    {plan.name}
                  </h3>
                  <p className={`text-sm ${plan.highlighted ? "text-primary-foreground/70" : "text-muted-foreground"}`}>
                    {plan.description}
                  </p>
                </div>

                {/* Price */}
                <div className="mb-8">
                  <div className="flex items-baseline gap-1">
                    {plan.price !== "Custom" && (
                      <span className={`text-lg ${plan.highlighted ? "text-primary-foreground/70" : "text-muted-foreground"}`}>
                        $
                      </span>
                    )}
                    <span className={`text-4xl font-bold ${plan.highlighted ? "" : "text-foreground"}`}>
                      {plan.price}
                    </span>
                  </div>
                  <span className={`text-sm ${plan.highlighted ? "text-primary-foreground/70" : "text-muted-foreground"}`}>
                    {plan.period === "project" ? "per project" : "Get a custom quote"}
                  </span>
                </div>

                {/* Features */}
                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3">
                      <div className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${
                        plan.highlighted ? "bg-primary-foreground/20" : "bg-accent/10"
                      }`}>
                        <Check className={`w-3 h-3 ${plan.highlighted ? "text-primary-foreground" : "text-accent"}`} />
                      </div>
                      <span className={`text-sm ${plan.highlighted ? "text-primary-foreground/90" : "text-muted-foreground"}`}>
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>

                {/* CTA Button */}
                <Button
                  variant={plan.highlighted ? "secondary" : "accent"}
                  size="lg"
                  className="w-full"
                >
                  {plan.cta}
                </Button>
              </div>
            </AnimatedItem>
          ))}
        </AnimatedStagger>

        {/* Bottom Note */}
        <AnimatedSection delay={0.3} className="text-center text-muted-foreground text-sm mt-12 max-w-2xl mx-auto">
          All plans include a free consultation. Need something custom? 
          <a href="#contact" className="text-accent hover:underline ml-1">
            Contact us
          </a> for a tailored solution.
        </AnimatedSection>
      </div>
    </section>
  );
};
