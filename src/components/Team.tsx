import { Linkedin, Twitter, Github } from "lucide-react";
import { AnimatedSection, AnimatedStagger, AnimatedItem } from "./AnimatedSection";

const teamMembers = [
  {
    name: "Yash Trivedi",
    role: "CEO & Founder",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face",
    bio: "Founder and strategic leader driving the company vision",
    social: { linkedin: "#", twitter: "#" },
  },
  {
    name: "Najeeba Begum",
    role: "HR Executive",
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=400&fit=crop&crop=face",
    bio: "Managing talent, culture, and people operations",
    social: { linkedin: "#" },
  },
  {
    name: "Preeti Yadav",
    role: "Business Development Executive",
    image: "https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?w=400&h=400&fit=crop&crop=face",
    bio: "Driving growth and building strong client relationships",
    social: { linkedin: "#" },
  },
  {
    name: "Sneha Pandey",
    role: "Team Lead",
    image: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=400&h=400&fit=crop&crop=face",
    bio: "Leading teams to deliver high-quality solutions",
    social: { linkedin: "#" },
  },
  {
    name: "Hardik Srivastava",
    role: "MERN Stack Developer",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face",
    bio: "Building scalable web applications using MERN stack",
    social: { linkedin: "#", github: "#" },
  },
  {
    name: "Sakshi Bhardwaj",
    role: ".NET Developer",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face",
    bio: "Developing robust applications with .NET technologies",
    social: { linkedin: "#" },
  },
  {
    name: "Shalu Kumari",
    role: ".NET Developer",
    image: "https://images.unsplash.com/photo-1548142813-c348350df52b?w=400&h=400&fit=crop&crop=face",
    bio: "Focused on backend development and system stability",
    social: { linkedin: "#" },
  },
  {
    name: "Ruchi Yadav",
    role: "PHP Developer",
    image: "https://images.unsplash.com/photo-1520813792240-56fc4a3765a7?w=400&h=400&fit=crop&crop=face",
    bio: "Experienced in PHP-based web application development",
    social: { linkedin: "#" },
  },
  {
    name: "Aditya Kumar",
    role: "Graphic Designer",
    image: "https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=400&h=400&fit=crop&crop=face",
    bio: "Creating visually engaging designs and brand assets",
    social: { linkedin: "#" },
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
