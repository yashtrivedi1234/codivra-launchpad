import { ExternalLink } from "lucide-react";
import { AnimatedSection, AnimatedStagger, AnimatedItem } from "./AnimatedSection";

const projects = [
  {
    title: "Business Website",
    category: "Website Development",
    description: "Responsive business website built for a local startup with clean UI and fast performance.",
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=600&h=400&fit=crop",
  },
  {
    title: "Startup Landing Page",
    category: "UI/UX Design",
    description: "Conversion-focused landing page designed for a newly launched startup.",
    image: "https://images.unsplash.com/photo-1559028012-481c04fa702d?w=600&h=400&fit=crop",
  },
  {
    title: "Admin Dashboard",
    category: "Web App Development",
    description: "Custom admin dashboard for managing users, data, and reports.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop",
  },
  {
    title: "CRM / Management Panel",
    category: "Custom Software Development",
    description: "Web-based management system designed to handle users, records, and internal workflows.",
    image: "https://images.unsplash.com/photo-1553877522-43269d4ea984?w=600&h=400&fit=crop",
  },
  {
    title: "Brand Identity Design",
    category: "Graphic Design",
    description: "Logo and brand assets created for a small business.",
    image: "https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=600&h=400&fit=crop",
  },
  {
    title: "SEO Setup",
    category: "SEO & Optimization",
    description: "Basic SEO setup to improve visibility and search performance.",
    image: "https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?w=600&h=400&fit=crop",
  },
];

export const Portfolio = () => {
  return (
    <section id="portfolio" className="py-24">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <AnimatedSection className="text-center max-w-2xl mx-auto mb-16">
          <span className="inline-block text-accent font-semibold text-sm tracking-wider uppercase mb-4">
            Our Work
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Featured Projects
          </h2>
          <p className="text-muted-foreground text-lg">
            Sample work representing the type of services we provide to startups and growing businesses.
          </p>
        </AnimatedSection>

        {/* Projects Grid */}
        <AnimatedStagger className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {projects.map((project) => (
            <AnimatedItem key={project.title}>
              <div className="group relative bg-card rounded-2xl overflow-hidden shadow-soft hover-lift border border-border/50">
                {/* Image */}
                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
                
                {/* Content */}
                <div className="p-6">
                  <span className="text-xs font-medium text-accent uppercase tracking-wider">
                    {project.category}
                  </span>
                  <h3 className="text-lg font-semibold text-foreground mt-2 mb-2 flex items-center gap-2">
                    {project.title}
                    <ExternalLink className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    {project.description}
                  </p>
                </div>

                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-gradient-primary opacity-0 group-hover:opacity-90 transition-opacity duration-300 flex items-center justify-center">
                  <span className="text-primary-foreground font-semibold">Service Preview</span>
                </div>
              </div>
            </AnimatedItem>
          ))}
        </AnimatedStagger>
      </div>
    </section>
  );
};
