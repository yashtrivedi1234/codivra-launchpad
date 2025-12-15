import { ExternalLink } from "lucide-react";

const projects = [
  {
    title: "E-Commerce Platform",
    category: "Web Development",
    description: "Modern online store with seamless checkout experience",
    image: "https://images.unsplash.com/photo-1661956602116-aa6865609028?w=600&h=400&fit=crop",
  },
  {
    title: "Healthcare Dashboard",
    category: "Custom Software",
    description: "Patient management system for medical clinics",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop",
  },
  {
    title: "Brand Identity Suite",
    category: "Graphic Design",
    description: "Complete visual identity for a tech startup",
    image: "https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=600&h=400&fit=crop",
  },
  {
    title: "SEO Campaign",
    category: "SEO",
    description: "300% increase in organic traffic in 6 months",
    image: "https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?w=600&h=400&fit=crop",
  },
  {
    title: "Social Media Growth",
    category: "Digital Marketing",
    description: "Comprehensive social strategy for lifestyle brand",
    image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=600&h=400&fit=crop",
  },
  {
    title: "SaaS Application",
    category: "Custom Software",
    description: "Cloud-based project management tool",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop",
  },
];

export const Portfolio = () => {
  return (
    <section id="portfolio" className="py-24">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="inline-block text-accent font-semibold text-sm tracking-wider uppercase mb-4">
            Our Work
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Featured Projects
          </h2>
          <p className="text-muted-foreground text-lg">
            A showcase of our best work across various industries and services.
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {projects.map((project) => (
            <div
              key={project.title}
              className="group relative bg-card rounded-2xl overflow-hidden shadow-soft hover-lift border border-border/50"
            >
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
                <span className="text-primary-foreground font-semibold">View Project</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
