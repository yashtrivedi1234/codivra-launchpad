import { Globe, Code, Palette, Search, Megaphone, ArrowUpRight } from "lucide-react";
import { AnimatedSection, AnimatedStagger, AnimatedItem } from "./AnimatedSection";
import { useGetPageQuery } from "@/lib/api";

const iconMap: Record<string, React.ComponentType<any>> = {
  Globe,
  Code,
  Palette,
  Search,
  Megaphone,
};

export const Services = () => {
  const { data } = useGetPageQuery("services");
  const servicesSection = data?.sections.find((s) => s.key === "list")?.data;

  const title: string =
    servicesSection?.title || "Comprehensive IT Solutions";
  const subtitle: string =
    servicesSection?.subtitle ||
    "From concept to launch, we deliver end-to-end digital services that transform your business vision into reality.";

  const services =
    servicesSection?.items || [
      {
        icon: "Globe",
        title: "Web Development",
        description:
          "Custom, responsive websites built with modern technologies for optimal performance and user experience.",
        features: ["React & Next.js", "E-commerce", "CMS Integration"],
      },
      {
        icon: "Code",
        title: "Custom Software",
        description:
          "Tailored software solutions designed to streamline operations and solve complex business challenges.",
        features: ["Enterprise Apps", "API Development", "Cloud Solutions"],
      },
      {
        icon: "Palette",
        title: "Graphic Design",
        description:
          "Compelling visual identities that communicate your brand's story and captivate your audience.",
        features: ["Brand Identity", "UI/UX Design", "Marketing Assets"],
      },
      {
        icon: "Search",
        title: "SEO Optimization",
        description:
          "Data-driven SEO strategies that improve visibility and drive organic traffic to your business.",
        features: ["Technical SEO", "Content Strategy", "Local SEO"],
      },
      {
        icon: "Megaphone",
        title: "Digital Marketing",
        description:
          "Comprehensive marketing campaigns that generate leads, conversions, and measurable ROI.",
        features: ["PPC Campaigns", "Social Media", "Email Marketing"],
      },
      {
        icon: "Globe",
        title: "Website Maintenance",
        description:
          "Ongoing support, updates, and performance monitoring to keep your website running smoothly.",
        features: ["Bug Fixes", "Content Updates", "Performance Checks"],
      },
    ];

  return (
    <section id="services" className="py-24 bg-gradient-subtle">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <AnimatedSection className="text-center max-w-2xl mx-auto mb-16">
          <span className="inline-block text-accent font-semibold text-sm tracking-wider uppercase mb-4">
            Our Services
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            {title}
          </h2>
          <p className="text-muted-foreground text-lg">
            {subtitle}
          </p>
        </AnimatedSection>

        {/* Services Grid */}
        <AnimatedStagger className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {services.map((service: any, index: number) => {
            const Icon = iconMap[service.icon as string] || Globe;
            return (
              <AnimatedItem
                key={service.title}
                className={index === 4 ? "lg:col-start-2" : ""}
              >
                <div className="group bg-card rounded-2xl p-8 shadow-soft hover-lift border border-border/50 h-full">
                  <div className="w-14 h-14 bg-accent/10 rounded-xl flex items-center justify-center mb-6 group-hover:bg-accent/20 transition-colors">
                    <Icon className="w-7 h-7 text-accent" />
                  </div>
                  
                  <h3 className="text-xl font-semibold text-foreground mb-3 flex items-center gap-2">
                    {service.title}
                    <ArrowUpRight className="w-5 h-5 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                  </h3>
                  
                  <p className="text-muted-foreground mb-6 leading-relaxed">
                    {service.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-2">
                    {service.features.map((feature: string) => (
                      <span
                        key={feature}
                        className="text-xs font-medium bg-secondary text-secondary-foreground px-3 py-1 rounded-full"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>
              </AnimatedItem>
            );
          })}
        </AnimatedStagger>
      </div>
    </section>
  );
};
