import { ExternalLink } from "lucide-react";
import { AnimatedSection, AnimatedStagger, AnimatedItem } from "./AnimatedSection";
import { useGetPortfolioQuery } from "@/lib/api";

export const Portfolio = () => {
  const { data, isLoading } = useGetPortfolioQuery();
  const projects = data?.items || [];

  if (isLoading) {
    return (
      <section id="portfolio" className="py-24">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center min-h-64">
            <div className="text-center">
              <div className="inline-block w-8 h-8 border-4 border-accent border-t-transparent rounded-full animate-spin mb-4"></div>
              <p className="text-muted-foreground">Loading portfolio...</p>
            </div>
          </div>
        </div>
      </section>
    );
  }

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
        {projects.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No portfolio items yet.</p>
          </div>
        ) : (
          <AnimatedStagger className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {projects.map((project) => (
              <AnimatedItem key={project._id}>
                <div className="group relative bg-card rounded-2xl overflow-hidden shadow-soft hover-lift border border-border/50">
                  {/* Image */}
                  <div className="aspect-[4/3] overflow-hidden bg-slate-200 dark:bg-slate-700">
                    {project.image ? (
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                        No image
                      </div>
                    )}
                  </div>
                  
                  {/* Content */}
                  <div className="p-6">
                    <span className="text-xs font-medium text-accent uppercase tracking-wider">
                      {project.category}
                    </span>
                    <h3 className="text-lg font-semibold text-foreground mt-2 mb-2 flex items-center gap-2">
                      {project.title}
                      {project.link && (
                        <ExternalLink className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                      )}
                    </h3>
                    <p className="text-muted-foreground text-sm">
                      {project.description}
                    </p>
                  </div>

                  {/* Hover Overlay */}
                  {project.link && (
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="absolute inset-0 bg-gradient-primary opacity-0 group-hover:opacity-90 transition-opacity duration-300 flex items-center justify-center cursor-pointer"
                    >
                      <span className="text-primary-foreground font-semibold">View Project</span>
                    </a>
                  )}
                </div>
              </AnimatedItem>
            ))}
          </AnimatedStagger>
        )}
      </div>
    </section>
  );
};
