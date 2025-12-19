import { Linkedin, Twitter, Github } from "lucide-react";
import { AnimatedSection, AnimatedStagger, AnimatedItem } from "./AnimatedSection";
import preetiImg from "../assets/preeti.jpeg";
import hardikImg from "../assets/hardik.jpeg";
import sakshiImg from "../assets/sakshi.jpeg";
import ruchiImg from "../assets/ruchi.jpeg";
import aditya from "../assets/aditya.jpeg";
import yash from "../assets/yash.jpeg";
import shalu from "../assets/shalu.jpeg";
import sneha from "../assets/sneha.jpeg";

const teamMembers = [
  {
    name: "Yash Trivedi",
    role: "CEO & Founder",
    image: yash,
    bio: "Founder and strategic leader driving the company vision",
    social: { linkedin: "#", twitter: "#" },
  },
  {
    name: "Sneha Bajpai",
    role: "Team Lead",
    image: sneha,
    bio: "Leading teams to deliver high-quality solutions",
    social: { linkedin: "#" },
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
    image: preetiImg,
    bio: "Driving growth and building strong client relationships",
    social: { linkedin: "#" },
  },
  {
    name: "Hardik Srivastava",
    role: "MERN Stack Developer",
    image: hardikImg,
    bio: "Building scalable web applications using MERN stack",
    social: { linkedin: "#", github: "#" },
  },
  {
    name: "Shalu Kumari",
    role: ".NET Developer",
    image: shalu,
    bio: "Focused on backend development and system stability",
    social: { linkedin: "#" },
  },
  {
    name: "Sakshi Bhardwaj",
    role: ".NET Developer",
    image: sakshiImg,
    bio: "Developing robust applications with .NET technologies",
    social: { linkedin: "#" },
  },
  {
    name: "Ruchi Yadav",
    role: "PHP Developer",
    image: ruchiImg,
    bio: "Experienced in PHP-based web application development",
    social: { linkedin: "#" },
  },
  {
    name: "Aditya Kumar",
    role: "Graphic Designer",
    image: aditya,
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
                    className="w-full h-full object-contain bg-gray-100 transition-transform duration-500 group-hover:scale-105"
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
