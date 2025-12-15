import { Linkedin, Twitter, Github } from "lucide-react";
import { AnimatedSection, AnimatedStagger, AnimatedItem } from "./AnimatedSection";

const teamMembers = [
  {
    name: "Alex Thompson",
    role: "CEO & Founder",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face",
    bio: "10+ years leading digital transformation projects",
    social: { linkedin: "#", twitter: "#" },
  },
  {
    name: "Sarah Chen",
    role: "Lead Developer",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop&crop=face",
    bio: "Full-stack expert specializing in React & Node.js",
    social: { linkedin: "#", github: "#" },
  },
  {
    name: "Marcus Johnson",
    role: "Creative Director",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face",
    bio: "Award-winning designer with a passion for UX",
    social: { linkedin: "#", twitter: "#" },
  },
  {
    name: "Emily Rodriguez",
    role: "Marketing Lead",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face",
    bio: "SEO & digital marketing strategist",
    social: { linkedin: "#", twitter: "#" },
  },
];

export const Team = () => {
  return (
    <section id="team" className="py-24">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <AnimatedSection className="text-center max-w-2xl mx-auto mb-16">
          <span className="inline-block text-accent font-semibold text-sm tracking-wider uppercase mb-4">
            Our Team
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Meet the Experts
          </h2>
          <p className="text-muted-foreground text-lg">
            A talented team of professionals dedicated to delivering exceptional results for your business.
          </p>
        </AnimatedSection>

        {/* Team Grid */}
        <AnimatedStagger className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
          {teamMembers.map((member) => (
            <AnimatedItem key={member.name}>
              <div className="group text-center">
                {/* Image */}
                <div className="relative mb-6 mx-auto w-48 h-48 rounded-2xl overflow-hidden shadow-card">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  {/* Overlay with social links */}
                  <div className="absolute inset-0 bg-gradient-primary opacity-0 group-hover:opacity-90 transition-opacity duration-300 flex items-center justify-center gap-3">
                    {member.social.linkedin && (
                      <a
                        href={member.social.linkedin}
                        className="w-10 h-10 bg-primary-foreground/20 rounded-full flex items-center justify-center text-primary-foreground hover:bg-primary-foreground/30 transition-colors"
                        aria-label={`${member.name} LinkedIn`}
                      >
                        <Linkedin className="w-5 h-5" />
                      </a>
                    )}
                    {member.social.twitter && (
                      <a
                        href={member.social.twitter}
                        className="w-10 h-10 bg-primary-foreground/20 rounded-full flex items-center justify-center text-primary-foreground hover:bg-primary-foreground/30 transition-colors"
                        aria-label={`${member.name} Twitter`}
                      >
                        <Twitter className="w-5 h-5" />
                      </a>
                    )}
                    {member.social.github && (
                      <a
                        href={member.social.github}
                        className="w-10 h-10 bg-primary-foreground/20 rounded-full flex items-center justify-center text-primary-foreground hover:bg-primary-foreground/30 transition-colors"
                        aria-label={`${member.name} GitHub`}
                      >
                        <Github className="w-5 h-5" />
                      </a>
                    )}
                  </div>
                </div>

                {/* Info */}
                <h3 className="text-lg font-semibold text-foreground mb-1">
                  {member.name}
                </h3>
                <p className="text-accent font-medium text-sm mb-2">
                  {member.role}
                </p>
                <p className="text-muted-foreground text-sm">
                  {member.bio}
                </p>
              </div>
            </AnimatedItem>
          ))}
        </AnimatedStagger>
      </div>
    </section>
  );
};
