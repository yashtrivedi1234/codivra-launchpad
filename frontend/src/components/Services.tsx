import { Globe, Code, Palette, Search, Megaphone, ArrowUpRight, Loader2 } from "lucide-react";
import { AnimatedSection, AnimatedStagger, AnimatedItem } from "./AnimatedSection";
import { useGetServicesQuery } from "@/lib/api";

const iconMap: Record<string, React.ComponentType<any>> = {
  Globe,
  Code,
  Palette,
  Search,
  Megaphone,
};

export const Services = () => {
  const { data, isLoading } = useGetServicesQuery();

  return (
    <section id="services" className="py-24 bg-gradient-subtle">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <AnimatedSection className="text-center max-w-2xl mx-auto mb-16">
          <span className="inline-block text-accent font-semibold text-sm tracking-wider uppercase mb-4">
            Our Services
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Comprehensive IT Solutions
          </h2>
          <p className="text-muted-foreground text-lg">
            From concept to launch, we deliver end-to-end digital services that transform your business vision into reality.
          </p>
        </AnimatedSection>

        {/* Loading State */}
        {isLoading && (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="w-8 h-8 animate-spin text-accent" />
          </div>
        )}

        {/* Services Grid */}
        {!isLoading && data?.items && (
          <AnimatedStagger className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {data.items.map((service: any, index: number) => {
              const Icon = iconMap[service.icon as string] || Globe;
              return (
                <AnimatedItem
                  key={service._id}
                  className={index === 4 ? "lg:col-start-2" : ""}
                >
                  <div className="group bg-card rounded-2xl p-8 shadow-soft hover-lift border border-border/50 h-full">
                    <div className="w-14 h-14 bg-accent/10 rounded-xl flex items-center justify-center mb-6 group-hover:bg-accent/20 transition-colors">
                      {/* Show emoji if it's an emoji, otherwise show icon */}
                      {/\p{Emoji}/u.test(service.icon) ? (
                        <span className="text-3xl">{service.icon}</span>
                      ) : (
                        <Icon className="w-7 h-7 text-accent" />
                      )}
                    </div>
                    
                    <h3 className="text-xl font-semibold text-foreground mb-3 flex items-center gap-2">
                      {service.title}
                      <ArrowUpRight className="w-5 h-5 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                    </h3>
                    
                    <p className="text-muted-foreground mb-6 leading-relaxed">
                      {service.description}
                    </p>
                    
                    {service.features && service.features.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {service.features.map((feature: string, idx: number) => (
                          <span
                            key={idx}
                            className="text-xs font-medium bg-secondary text-secondary-foreground px-3 py-1 rounded-full"
                          >
                            {feature}
                          </span>
                        ))}
                      </div>
                    )}

                    {service.price && (
                      <div className="mt-4 pt-4 border-t border-border">
                        <p className="text-lg font-bold text-accent">
                          Starting at ${service.price.toLocaleString()}
                        </p>
                      </div>
                    )}
                  </div>
                </AnimatedItem>
              );
            })}
          </AnimatedStagger>
        )}

        {/* Empty State */}
        {!isLoading && (!data?.items || data.items.length === 0) && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No services available at the moment.</p>
          </div>
        )}
      </div>
    </section>
  );
};
