import { useState } from "react";
import { useTeamCount } from "@/hooks/use-team-count";
import { MapPin, Clock, Briefcase, ArrowRight, Users, Heart, Zap, Trophy, ChevronDown, ChevronUp, X, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { AnimatedSection, AnimatedStagger, AnimatedItem } from "@/components/AnimatedSection";
import { useGetJobsQuery, useSubmitApplicationMutation } from "@/lib/api";
import { useToast } from "@/hooks/use-toast";
import PageBreadcrumb from "@/components/PageBreadcrumb";
import { motion } from "framer-motion";
import * as Yup from "yup";

type JobCardData = {
  id: string;
  title: string;
  department: string;
  location: string;
  type: string;
  description: string;
  requirements: string[];
  responsibilities: string[];
};

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

// Yup Validation Schema for Application Form
const applicationSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, "Name must be at least 2 characters long")
    .matches(/^[a-zA-Z\s]+$/, "Name should contain only letters")
    .required("Name is required"),
  email: Yup.string()
    .email("Please enter a valid email address")
    .required("Email is required"),
  phone: Yup.string()
    .matches(/^[0-9]+$/, "Phone number should contain only numbers")
    .min(10, "Phone number must be at least 10 digits")
    .max(13, "Phone number must not exceed 13 digits")
    .nullable(),
  linkedinUrl: Yup.string()
    .url("Please enter a valid URL")
    .nullable(),
  portfolioUrl: Yup.string()
    .url("Please enter a valid URL")
    .nullable(),
  coverLetter: Yup.string()
    .min(20, "Cover letter must be at least 20 characters")
    .nullable(),
});

interface ApplicationFormProps {
  jobTitle: string;
  onClose: () => void;
}

const ApplicationForm = ({ jobTitle, onClose }: ApplicationFormProps) => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    linkedinUrl: "",
    portfolioUrl: "",
    coverLetter: ""
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touchedFields, setTouchedFields] = useState<Record<string, boolean>>({});
  const [submitApplication] = useSubmitApplicationMutation();

  // Live validation function
  const validateField = async (fieldName: string, value: string) => {
    try {
      await Yup.reach(applicationSchema, fieldName).validate(value);
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[fieldName];
        return newErrors;
      });
    } catch (error: any) {
      if (touchedFields[fieldName]) {
        setErrors((prev) => ({
          ...prev,
          [fieldName]: error.message,
        }));
      }
    }
  };

  // Handle input change with live validation and restrictions
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    let sanitizedValue = value;

    // Apply field-specific restrictions
    if (name === "name") {
      // Only allow letters and spaces
      sanitizedValue = value.replace(/[^a-zA-Z\s]/g, "");
    } else if (name === "phone") {
      // Only allow numbers
      sanitizedValue = value.replace(/[^0-9]/g, "");
    } else if (name === "email") {
      // Remove spaces from email
      sanitizedValue = value.replace(/\s/g, "");
    }

    setFormData((prev) => ({ ...prev, [name]: sanitizedValue }));
    
    // Validate field if it has been touched
    if (touchedFields[name]) {
      validateField(name, sanitizedValue);
    }
  };

  // Handle field blur
  const handleBlur = (fieldName: string) => {
    setTouchedFields((prev) => ({ ...prev, [fieldName]: true }));
    validateField(fieldName, formData[fieldName as keyof typeof formData]);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Mark all fields as touched
    const allTouched = Object.keys(formData).reduce((acc, key) => {
      acc[key] = true;
      return acc;
    }, {} as Record<string, boolean>);
    setTouchedFields(allTouched);

    try {
      // Validate all fields
      await applicationSchema.validate(formData, { abortEarly: false });
      
      // Clear errors if validation passes
      setErrors({});

      const result = await submitApplication({
        job_title: jobTitle,
        name: formData.name.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim() || null,
        linkedin_url: formData.linkedinUrl.trim() || null,
        portfolio_url: formData.portfolioUrl.trim() || null,
        cover_letter: formData.coverLetter.trim() || null,
      }).unwrap();

      toast({
        title: "Career Application Submitted!",
        description: result.message || "Thank you for applying to Codivra Solutions Careers. We'll review your application and get back to you soon.",
      });
      onClose();
    } catch (error: any) {
      // Handle Yup validation errors
      if (error.name === "ValidationError") {
        const validationErrors: Record<string, string> = {};
        error.inner.forEach((err: any) => {
          if (err.path) {
            validationErrors[err.path] = err.message;
          }
        });
        setErrors(validationErrors);
        toast({
          title: "Validation Error",
          description: "Please fix the highlighted errors.",
          variant: "destructive",
        });
      } else {
        console.error("Error submitting application:", error);
        toast({
          title: "Career Application Failed",
          description: "There was an error submitting your application. Please try again.",
          variant: "destructive",
        });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0A0F1C]/95 backdrop-blur-xl">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl shadow-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto"
      >
        <div className="sticky top-0 bg-white/5 backdrop-blur-xl p-6 border-b border-white/10 flex items-center justify-between z-10">
          <div>
            <h3 className="text-xl font-bold text-white">Apply for Position</h3>
            <p className="text-sm text-white/60">{jobTitle}</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white/10 rounded-xl transition-colors"
          >
            <X className="w-5 h-5 text-white/60" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          <div className="space-y-2">
            <Label htmlFor="name" className="text-white font-semibold">Full Name *</Label>
            <Input
              id="name"
              name="name"
              required
              placeholder="John Doe"
              value={formData.name}
              onChange={handleInputChange}
              onBlur={() => handleBlur("name")}
              className={`bg-white/5 border-white/10 text-white placeholder:text-white/40 focus:border-[#00D9FF] ${
                errors.name && touchedFields.name ? "border-red-500" : ""
              }`}
              disabled={isSubmitting}
            />
            {errors.name && touchedFields.name && (
              <p className="text-red-400 text-sm mt-1">{errors.name}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="email" className="text-white font-semibold">Email Address *</Label>
            <Input
              id="email"
              name="email"
              type="email"
              required
              placeholder="john@example.com"
              value={formData.email}
              onChange={handleInputChange}
              onBlur={() => handleBlur("email")}
              className={`bg-white/5 border-white/10 text-white placeholder:text-white/40 focus:border-[#00D9FF] ${
                errors.email && touchedFields.email ? "border-red-500" : ""
              }`}
              disabled={isSubmitting}
            />
            {errors.email && touchedFields.email && (
              <p className="text-red-400 text-sm mt-1">{errors.email}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone" className="text-white font-semibold">Phone Number</Label>
            <Input
              id="phone"
              name="phone"
              type="tel"
              placeholder="Enter your phone number"
              value={formData.phone}
              onChange={handleInputChange}
              onBlur={() => handleBlur("phone")}
              inputMode="numeric"
              className={`bg-white/5 border-white/10 text-white placeholder:text-white/40 focus:border-[#00D9FF] ${
                errors.phone && touchedFields.phone ? "border-red-500" : ""
              }`}
              disabled={isSubmitting}
            />
            {errors.phone && touchedFields.phone && (
              <p className="text-red-400 text-sm mt-1">{errors.phone}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="linkedin" className="text-white font-semibold">LinkedIn Profile</Label>
            <Input
              id="linkedin"
              name="linkedinUrl"
              type="url"
              placeholder="https://linkedin.com/in/yourprofile"
              value={formData.linkedinUrl}
              onChange={handleInputChange}
              onBlur={() => handleBlur("linkedinUrl")}
              className={`bg-white/5 border-white/10 text-white placeholder:text-white/40 focus:border-[#00D9FF] ${
                errors.linkedinUrl && touchedFields.linkedinUrl ? "border-red-500" : ""
              }`}
              disabled={isSubmitting}
            />
            {errors.linkedinUrl && touchedFields.linkedinUrl && (
              <p className="text-red-400 text-sm mt-1">{errors.linkedinUrl}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="portfolio" className="text-white font-semibold">Portfolio / Website</Label>
            <Input
              id="portfolio"
              name="portfolioUrl"
              type="url"
              placeholder="https://yourportfolio.com"
              value={formData.portfolioUrl}
              onChange={handleInputChange}
              onBlur={() => handleBlur("portfolioUrl")}
              className={`bg-white/5 border-white/10 text-white placeholder:text-white/40 focus:border-[#00D9FF] ${
                errors.portfolioUrl && touchedFields.portfolioUrl ? "border-red-500" : ""
              }`}
              disabled={isSubmitting}
            />
            {errors.portfolioUrl && touchedFields.portfolioUrl && (
              <p className="text-red-400 text-sm mt-1">{errors.portfolioUrl}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="coverLetter" className="text-white font-semibold">Cover Letter</Label>
            <Textarea
              id="coverLetter"
              name="coverLetter"
              placeholder="Tell us why you're interested in this position..."
              rows={5}
              value={formData.coverLetter}
              onChange={handleInputChange}
              onBlur={() => handleBlur("coverLetter")}
              className={`bg-white/5 border-white/10 text-white placeholder:text-white/40 focus:border-[#00D9FF] resize-none ${
                errors.coverLetter && touchedFields.coverLetter ? "border-red-500" : ""
              }`}
              disabled={isSubmitting}
            />
            {errors.coverLetter && touchedFields.coverLetter && (
              <p className="text-red-400 text-sm mt-1">{errors.coverLetter}</p>
            )}
          </div>

          <div className="flex gap-3 pt-4">
            <Button 
              type="button" 
              onClick={onClose} 
              className="flex-1 bg-white/5 border border-white/10 text-white hover:bg-white/10"
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button 
              type="submit" 
              disabled={isSubmitting} 
              className="flex-1 bg-gradient-to-r from-[#00D9FF] to-[#0066FF] text-white font-bold"
            >
              {isSubmitting ? "Submitting..." : "Submit Application"}
            </Button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

const JobCard = ({ job, onApply }: { job: JobCardData; onApply: (title: string) => void }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <AnimatedItem>
      <motion.div
        whileHover={{ y: -4 }}
        className="relative group"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-[#00D9FF]/10 to-[#0066FF]/10 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        <div className="relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-8 hover:bg-white/10 hover:border-white/20 transition-all duration-500">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-6">
            <div>
              <h3 className="text-2xl font-bold text-white mb-3">{job.title}</h3>
              <div className="flex flex-wrap items-center gap-4 text-sm text-white/60">
                <span className="flex items-center gap-2">
                  <Briefcase className="w-4 h-4 text-[#00D9FF]" />
                  {job.department}
                </span>
                <span className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-[#00D9FF]" />
                  {job.location}
                </span>
                <span className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-[#00D9FF]" />
                  {job.type}
                </span>
              </div>
            </div>
            <Button
              onClick={() => onApply(job.title)}
              className="bg-gradient-to-r from-[#00D9FF] to-[#0066FF] text-white font-bold px-6 rounded-xl hover:shadow-[0_0_30px_rgba(0,217,255,0.5)] whitespace-nowrap"
            >
              Apply Now
            </Button>
          </div>
          
          <p className="text-white/70 mb-6 leading-relaxed">{job.description}</p>
          
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="flex items-center gap-2 text-[#00D9FF] font-bold text-sm hover:gap-3 transition-all"
          >
            {isExpanded ? "Hide Details" : "View Details"}
            {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>
          
          {isExpanded && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              className="mt-6 pt-6 border-t border-white/10 grid md:grid-cols-2 gap-8"
            >
              <div>
                <h4 className="font-bold text-white mb-4 text-lg">Requirements</h4>
                <ul className="space-y-3">
                  {job.requirements.map((req, index) => (
                    <li key={index} className="text-sm text-white/70 flex items-start gap-3">
                      <span className="w-1.5 h-1.5 bg-[#00D9FF] rounded-full mt-2 flex-shrink-0" />
                      {req}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="font-bold text-white mb-4 text-lg">Responsibilities</h4>
                <ul className="space-y-3">
                  {job.responsibilities.map((resp, index) => (
                    <li key={index} className="text-sm text-white/70 flex items-start gap-3">
                      <span className="w-1.5 h-1.5 bg-[#00D9FF] rounded-full mt-2 flex-shrink-0" />
                      {resp}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          )}
        </div>
      </motion.div>
    </AnimatedItem>
  );
};

const Careers = () => {
  const { data, isLoading: isJobsLoading } = useGetJobsQuery();
  const [selectedDepartment, setSelectedDepartment] = useState("All");
  const [applicationJob, setApplicationJob] = useState<string | null>(null);
  
  const jobsFromApi: JobCardData[] =
    data?.items?.map((job) => ({
      id: job._id,
      title: job.title,
      department: job.department,
      location: job.location,
      type: job.type,
      description: job.description,
      requirements: job.requirements || [],
      responsibilities: job.responsibilities || [],
    })) || [];

  const jobs = jobsFromApi;
  const departments = ["All", ...Array.from(new Set(jobs.map((job) => job.department)))].filter(Boolean);

  const filteredJobs = selectedDepartment === "All"
    ? jobs
    : jobs.filter((job) => job.department === selectedDepartment);

  return (
    <div className="min-h-screen bg-[#0A0F1C]">
      <Header />
      
      {applicationJob && (
        <ApplicationForm
          jobTitle={applicationJob}
          onClose={() => setApplicationJob(null)}
        />
      )}
      
      <main className="pt-20">
        <PageBreadcrumb />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#00D9FF]/10 rounded-full blur-[120px]" />
        </div>
        <div className="container mx-auto px-6 lg:px-12 relative z-10">
          <AnimatedSection className="text-center max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-block mb-4"
            >
              <span className="inline-flex items-center gap-2 text-[#00D9FF] font-bold text-sm tracking-[0.2em] uppercase">
                <span className="w-8 h-[2px] bg-gradient-to-r from-transparent to-[#00D9FF]" />
                Join Our Team
                <span className="w-8 h-[2px] bg-gradient-to-l from-transparent to-[#00D9FF]" />
              </span>
            </motion.div>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-black text-white mb-6" style={{ fontFamily: "'Outfit', sans-serif" }}>
              Build the Future <span className="text-[#00D9FF]">With Us</span>
            </h1>
            <p className="text-lg text-white/60 mb-10 leading-relaxed">
              Join a team of passionate innovators dedicated to creating exceptional digital experiences. 
              We're always looking for talented individuals who share our vision.
            </p>
            <Button
              asChild
              className="bg-gradient-to-r from-[#00D9FF] to-[#0066FF] text-white font-bold px-8 py-6 text-lg rounded-xl hover:shadow-[0_0_40px_rgba(0,217,255,0.6)]"
            >
              <a href="#openings" className="flex items-center gap-2">
                View Open Positions
                <ArrowRight className="w-5 h-5" />
              </a>
            </Button>
          </AnimatedSection>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 relative">
        <div className="container mx-auto px-6 lg:px-12">
          <AnimatedSection className="text-center mb-16">
            <span className="text-[#00D9FF] font-bold text-sm uppercase tracking-[0.2em]">Why Join Us</span>
            <h2 className="text-4xl md:text-5xl font-black text-white mt-2 mb-4" style={{ fontFamily: "'Outfit', sans-serif" }}>
              Benefits & Perks
            </h2>
            <p className="text-white/60 max-w-2xl mx-auto">
              We believe in taking care of our team with comprehensive benefits and a supportive work environment.
            </p>
          </AnimatedSection>

          <AnimatedStagger className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit) => (
              <AnimatedItem key={benefit.title}>
                <motion.div whileHover={{ y: -4 }} className="text-center">
                  <div className="relative mx-auto mb-6 w-20 h-20">
                    <div className="absolute inset-0 bg-gradient-to-br from-[#00D9FF] to-[#0066FF] rounded-2xl blur-lg opacity-50" />
                    <div className="relative w-full h-full bg-gradient-to-br from-[#00D9FF] to-[#0066FF] rounded-2xl flex items-center justify-center">
                      <benefit.icon className="w-10 h-10 text-white" />
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">{benefit.title}</h3>
                  <p className="text-white/60 leading-relaxed">{benefit.description}</p>
                </motion.div>
              </AnimatedItem>
            ))}
          </AnimatedStagger>
        </div>
      </section>

      {/* Job Listings Section */}
      <section id="openings" className="py-20 relative">
        <div className="absolute inset-0">
          <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-[#0066FF]/5 rounded-full blur-[120px]" />
        </div>
        <div className="container mx-auto px-6 lg:px-12 relative z-10">
          <AnimatedSection className="text-center mb-12">
            <span className="text-[#00D9FF] font-bold text-sm uppercase tracking-[0.2em]">Open Positions</span>
            <h2 className="text-4xl md:text-5xl font-black text-white mt-2 mb-4" style={{ fontFamily: "'Outfit', sans-serif" }}>
              Current Openings
            </h2>
            <p className="text-white/60 max-w-2xl mx-auto">
              Explore our open positions and find the perfect role for you.
            </p>
          </AnimatedSection>

          {/* Department Filter */}
          <AnimatedSection className="flex flex-wrap justify-center gap-3 mb-12">
            {departments.map((dept) => (
              <motion.button
                key={dept}
                onClick={() => setSelectedDepartment(dept)}
                whileHover={{ scale: 1.05 }}
                className={`px-5 py-2.5 rounded-xl text-sm font-bold transition-all ${
                  selectedDepartment === dept
                    ? "bg-gradient-to-r from-[#00D9FF] to-[#0066FF] text-white"
                    : "bg-white/5 text-white/60 hover:bg-white/10 border border-white/10"
                }`}
              >
                {dept}
              </motion.button>
            ))}
          </AnimatedSection>

          {isJobsLoading && (
            <div className="flex justify-center py-12">
              <Loader2 className="w-10 h-10 animate-spin text-[#00D9FF]" />
            </div>
          )}

          {!isJobsLoading && !jobsFromApi.length && (
            <p className="text-center text-white/50 text-lg py-12">
              No openings are live right now. Please check back soon.
            </p>
          )}

          <AnimatedStagger className="space-y-8 max-w-5xl mx-auto">
            {filteredJobs.map((job) => (
              <JobCard key={job.id} job={job} onApply={setApplicationJob} />
            ))}
          </AnimatedStagger>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 relative">
        <div className="container mx-auto px-6 lg:px-12">
          <AnimatedSection>
            <div className="relative max-w-4xl mx-auto">
              <div className="absolute inset-0 bg-gradient-to-r from-[#00D9FF]/10 to-[#0066FF]/10 rounded-3xl blur-2xl" />
              <div className="relative bg-gradient-to-br from-[#00D9FF]/10 to-[#0066FF]/10 backdrop-blur-sm border border-white/10 rounded-3xl p-12 text-center">
                <h2 className="text-3xl md:text-4xl font-black text-white mb-4" style={{ fontFamily: "'Outfit', sans-serif" }}>
                  Don't See the Right Fit?
                </h2>
                <p className="text-white/60 max-w-2xl mx-auto mb-8 text-lg leading-relaxed">
                  We're always looking for talented individuals. Send us your resume and let us know how you can contribute to our team.
                </p>
                <Button
                  onClick={() => setApplicationJob("General Application")}
                  className="bg-gradient-to-r from-[#00D9FF] to-[#0066FF] text-white font-bold px-8 py-6 text-lg rounded-xl hover:shadow-[0_0_40px_rgba(0,217,255,0.6)]"
                >
                  Send Your Resume
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>
      </main>

      <Footer />
    </div>
  );
};

export default Careers;