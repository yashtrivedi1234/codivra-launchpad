import { Linkedin, Twitter, Github, Loader2 } from "lucide-react";
import { AnimatedSection, AnimatedStagger, AnimatedItem } from "./AnimatedSection";
import { useGetTeamQuery } from "@/lib/api";

// Fallback team members for display when API is unavailable
const fallbackTeamMembers = [
  {
    name: "Yash Trivedi",
    role: "CEO & Founder",
    bio: "Founder and strategic leader driving the company vision",
    social: { linkedin: "#", twitter: "#" },
  },
  {
    name: "Sneha Bajpai",
    role: "Team Lead",
    bio: "Leading teams to deliver high-quality solutions",
    social: { linkedin: "#" },
  },
  {
    name: "Preeti Yadav",
    role: "Business Development Executive",
    bio: "Driving growth and building strong client relationships",
    social: { linkedin: "#" },
  },
  {
    name: "Hardik Srivastava",
    role: "MERN Stack Developer",
    bio: "Building scalable web applications using MERN stack",
    social: { linkedin: "#", github: "#" },
  },
];

export const Team = () => {
  const { data, isLoading } = useGetTeamQuery();
  
  const teamMembers = data?.items && data.items.length > 0 
    ? data.items.map((member) => ({
        name: member.name,
        role: member.role,
        image: member.image,
        bio: member.bio,
        social: {
          linkedin: member.social_links?.linkedin || "",
          twitter: member.social_links?.twitter || "",
          github: member.social_links?.github || "",
        },
      }))
    : fallbackTeamMembers;

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

        {/* Loading State */}
        {isLoading && (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="w-8 h-8 animate-spin text-accent" />
          </div>
        )}

        {/* Team Grid */}
        {!isLoading && (
          <AnimatedStagger className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {teamMembers.map((member) => (
              <AnimatedItem key={member.name}>
                <div className="group text-center">
                  {/* Image */}
                  <div className="relative mb-6 mx-auto w-48 h-48 rounded-2xl overflow-hidden shadow-card">
                    {member.image ? (
                      <img
                        src={member.image}
                        alt={member.name}
                        className="w-full h-full object-cover bg-gray-100 transition-transform duration-500 group-hover:scale-105"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-slate-200 to-slate-300 flex items-center justify-center">
                        <span className="text-4xl font-bold text-slate-400">
                          {member.name.charAt(0)}
                        </span>
                      </div>
                    )}
                    {/* Overlay with social links */}
                    <div className="absolute inset-0 bg-gradient-primary opacity-0 group-hover:opacity-90 transition-opacity duration-300 flex items-center justify-center gap-3">
                      {member.social.linkedin && (
                        <a
                          href={member.social.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-10 h-10 bg-primary-foreground/20 rounded-full flex items-center justify-center text-primary-foreground hover:bg-primary-foreground/30 transition-colors"
                          aria-label={`${member.name} LinkedIn`}
                        >
                          <Linkedin className="w-5 h-5" />
                        </a>
                      )}
                      {member.social.twitter && (
                        <a
                          href={member.social.twitter}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-10 h-10 bg-primary-foreground/20 rounded-full flex items-center justify-center text-primary-foreground hover:bg-primary-foreground/30 transition-colors"
                          aria-label={`${member.name} Twitter`}
                        >
                          <Twitter className="w-5 h-5" />
                        </a>
                      )}
                      {member.social.github && (
                        <a
                          href={member.social.github}
                          target="_blank"
                          rel="noopener noreferrer"
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
        )}
      </div>
    </section>
  );
};
