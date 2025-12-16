import { useState } from "react";
import { MapPin, Clock, Briefcase, ArrowRight, Users, Heart, Zap, Trophy, ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { AnimatedSection, AnimatedStagger, AnimatedItem } from "@/components/AnimatedSection";

const benefits = [
  {
    icon: Heart,
    title: "Health & Wellness",
    description: "Comprehensive health insurance, mental health support, and wellness programs."
  },
  {
    icon: Zap,
    title: "Flexible Work",
    description: "Remote-first culture with flexible hours to maintain work-life balance."
  },
  {
    icon: Users,
    title: "Team Culture",
    description: "Collaborative environment with regular team events and knowledge sharing."
  },
  {
    icon: Trophy,
    title: "Growth & Learning",
    description: "Learning budget, mentorship programs, and career advancement opportunities."
  }
];

const jobListings = [
  {
    id: 1,
    title: "Senior Full Stack Developer",
    department: "Engineering",
    location: "Remote / Hybrid",
    type: "Full-time",
    description: "We're looking for an experienced Full Stack Developer to join our engineering team and help build scalable web applications.",
    requirements: [
      "5+ years of experience in web development",
      "Proficiency in React, Node.js, and TypeScript",
      "Experience with cloud platforms (AWS/GCP)",
      "Strong problem-solving skills"
    ],
    responsibilities: [
      "Design and implement new features",
      "Code review and mentoring junior developers",
      "Collaborate with product and design teams",
      "Optimize application performance"
    ]
  },
  {
    id: 2,
    title: "UI/UX Designer",
    department: "Design",
    location: "Remote",
    type: "Full-time",
    description: "Join our design team to create beautiful, user-centered interfaces for our clients' products.",
    requirements: [
      "3+ years of UI/UX design experience",
      "Proficiency in Figma and design systems",
      "Portfolio showcasing web and mobile designs",
      "Understanding of accessibility standards"
    ],
    responsibilities: [
      "Create wireframes, prototypes, and final designs",
      "Conduct user research and usability testing",
      "Maintain and evolve design systems",
      "Collaborate with developers on implementation"
    ]
  },
  {
    id: 3,
    title: "Digital Marketing Specialist",
    department: "Marketing",
    location: "Hybrid",
    type: "Full-time",
    description: "Help our clients grow their online presence through strategic digital marketing campaigns.",
    requirements: [
      "3+ years in digital marketing",
      "Experience with SEO, SEM, and social media",
      "Google Analytics and Ads certification",
      "Data-driven mindset"
    ],
    responsibilities: [
      "Develop and execute marketing strategies",
      "Manage paid advertising campaigns",
      "Analyze and report on campaign performance",
      "Optimize conversion rates"
    ]
  },
  {
    id: 4,
    title: "DevOps Engineer",
    department: "Engineering",
    location: "Remote",
    type: "Full-time",
    description: "Build and maintain our cloud infrastructure to ensure reliable and scalable deployments.",
    requirements: [
      "4+ years of DevOps experience",
      "Strong knowledge of Docker and Kubernetes",
      "Experience with CI/CD pipelines",
      "AWS or GCP certification preferred"
    ],
    responsibilities: [
      "Manage cloud infrastructure",
      "Implement and maintain CI/CD pipelines",
      "Monitor system performance and security",
      "Automate deployment processes"
    ]
  },
  {
    id: 5,
    title: "Project Manager",
    department: "Operations",
    location: "Hybrid",
    type: "Full-time",
    description: "Lead cross-functional teams to deliver successful projects on time and within budget.",
    requirements: [
      "5+ years of project management experience",
      "PMP or Agile certification",
      "Experience in software development projects",
      "Excellent communication skills"
    ],
    responsibilities: [
      "Plan and manage project timelines",
      "Coordinate with clients and stakeholders",
      "Identify and mitigate project risks",
      "Ensure quality deliverables"
    ]
  }
];

const JobCard = ({ job }: { job: typeof jobListings[0] }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <AnimatedItem>
      <div className="bg-card rounded-2xl p-6 shadow-soft hover:shadow-elevated transition-all duration-300 border border-border">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
          <div>
            <h3 className="text-xl font-bold text-foreground mb-2">{job.title}</h3>
            <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
              <span className="flex items-center gap-1">
                <Briefcase className="w-4 h-4" />
                {job.department}
              </span>
              <span className="flex items-center gap-1">
                <MapPin className="w-4 h-4" />
                {job.location}
              </span>
              <span className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                {job.type}
              </span>
            </div>
          </div>
          <Button variant="accent" asChild>
            <a href={`mailto:careers@codivra.com?subject=Application for ${job.title}`}>
              Apply Now
            </a>
          </Button>
        </div>
        
        <p className="text-muted-foreground mb-4">{job.description}</p>
        
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="flex items-center gap-2 text-accent font-semibold text-sm hover:underline"
        >
          {isExpanded ? "Hide Details" : "View Details"}
          {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </button>
        
        {isExpanded && (
          <div className="mt-6 pt-6 border-t border-border grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-foreground mb-3">Requirements</h4>
              <ul className="space-y-2">
                {job.requirements.map((req, index) => (
                  <li key={index} className="text-sm text-muted-foreground flex items-start gap-2">
                    <span className="w-1.5 h-1.5 bg-accent rounded-full mt-2 flex-shrink-0" />
                    {req}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-3">Responsibilities</h4>
              <ul className="space-y-2">
                {job.responsibilities.map((resp, index) => (
                  <li key={index} className="text-sm text-muted-foreground flex items-start gap-2">
                    <span className="w-1.5 h-1.5 bg-accent rounded-full mt-2 flex-shrink-0" />
                    {resp}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>
    </AnimatedItem>
  );
};

const Careers = () => {
  const [selectedDepartment, setSelectedDepartment] = useState("All");
  const departments = ["All", ...Array.from(new Set(jobListings.map(job => job.department)))];
  
  const filteredJobs = selectedDepartment === "All" 
    ? jobListings 
    : jobListings.filter(job => job.department === selectedDepartment);

  return (
    <div className="min-h-screen">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-gradient-to-b from-muted/50 to-background">
        <div className="container mx-auto px-4">
          <AnimatedSection className="text-center max-w-3xl mx-auto">
            <span className="text-accent font-semibold text-sm uppercase tracking-wider">Join Our Team</span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mt-2 mb-6">
              Build the Future With Us
            </h1>
            <p className="text-lg text-muted-foreground mb-8">
              Join a team of passionate innovators dedicated to creating exceptional digital experiences. 
              We're always looking for talented individuals who share our vision.
            </p>
            <Button variant="accent" size="lg" asChild>
              <a href="#openings">
                View Open Positions
                <ArrowRight className="w-4 h-4 ml-2" />
              </a>
            </Button>
          </AnimatedSection>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-card">
        <div className="container mx-auto px-4">
          <AnimatedSection className="text-center mb-16">
            <span className="text-accent font-semibold text-sm uppercase tracking-wider">Why Join Us</span>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mt-2 mb-4">
              Benefits & Perks
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              We believe in taking care of our team with comprehensive benefits and a supportive work environment.
            </p>
          </AnimatedSection>

          <AnimatedStagger className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit) => (
              <AnimatedItem key={benefit.title}>
                <div className="text-center p-6">
                  <div className="w-16 h-16 bg-accent/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <benefit.icon className="w-8 h-8 text-accent" />
                  </div>
                  <h3 className="text-lg font-bold text-foreground mb-2">{benefit.title}</h3>
                  <p className="text-muted-foreground text-sm">{benefit.description}</p>
                </div>
              </AnimatedItem>
            ))}
          </AnimatedStagger>
        </div>
      </section>

      {/* Culture Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <AnimatedSection>
              <span className="text-accent font-semibold text-sm uppercase tracking-wider">Our Culture</span>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mt-2 mb-6">
                A Place Where Ideas Thrive
              </h2>
              <p className="text-muted-foreground mb-6">
                At Codivra, we foster an environment of innovation, collaboration, and continuous learning. 
                We believe that great ideas can come from anywhere, and we encourage every team member to contribute their unique perspective.
              </p>
              <p className="text-muted-foreground mb-6">
                Our diverse team brings together expertise from various backgrounds, creating a rich tapestry of skills 
                and experiences that drives our success.
              </p>
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <div className="text-3xl font-bold text-accent mb-1">50+</div>
                  <div className="text-muted-foreground text-sm">Team Members</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-accent mb-1">12</div>
                  <div className="text-muted-foreground text-sm">Countries</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-accent mb-1">95%</div>
                  <div className="text-muted-foreground text-sm">Employee Satisfaction</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-accent mb-1">4.8</div>
                  <div className="text-muted-foreground text-sm">Glassdoor Rating</div>
                </div>
              </div>
            </AnimatedSection>
            <AnimatedSection delay={0.2}>
              <div className="grid grid-cols-2 gap-4">
                <img
                  src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=400&h=300&fit=crop"
                  alt="Team collaboration"
                  className="rounded-2xl shadow-soft"
                />
                <img
                  src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=400&h=300&fit=crop"
                  alt="Team meeting"
                  className="rounded-2xl shadow-soft mt-8"
                />
                <img
                  src="https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=400&h=300&fit=crop"
                  alt="Office workspace"
                  className="rounded-2xl shadow-soft"
                />
                <img
                  src="https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=300&fit=crop"
                  alt="Team event"
                  className="rounded-2xl shadow-soft mt-8"
                />
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Job Listings Section */}
      <section id="openings" className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <AnimatedSection className="text-center mb-12">
            <span className="text-accent font-semibold text-sm uppercase tracking-wider">Open Positions</span>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mt-2 mb-4">
              Current Openings
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Explore our open positions and find the perfect role for you.
            </p>
          </AnimatedSection>

          {/* Department Filter */}
          <AnimatedSection className="flex flex-wrap justify-center gap-3 mb-12">
            {departments.map((dept) => (
              <button
                key={dept}
                onClick={() => setSelectedDepartment(dept)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  selectedDepartment === dept
                    ? "bg-accent text-accent-foreground"
                    : "bg-card text-muted-foreground hover:bg-muted border border-border"
                }`}
              >
                {dept}
              </button>
            ))}
          </AnimatedSection>

          <AnimatedStagger className="space-y-6 max-w-4xl mx-auto">
            {filteredJobs.map((job) => (
              <JobCard key={job.id} job={job} />
            ))}
          </AnimatedStagger>

          {filteredJobs.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No open positions in this department at the moment.</p>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary to-accent">
        <div className="container mx-auto px-4 text-center">
          <AnimatedSection>
            <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
              Don't See the Right Fit?
            </h2>
            <p className="text-primary-foreground/80 max-w-2xl mx-auto mb-8">
              We're always looking for talented individuals. Send us your resume and let us know how you can contribute to our team.
            </p>
            <Button variant="secondary" size="lg" asChild>
              <a href="mailto:careers@codivra.com">
                Send Your Resume
                <ArrowRight className="w-4 h-4 ml-2" />
              </a>
            </Button>
          </AnimatedSection>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Careers;
