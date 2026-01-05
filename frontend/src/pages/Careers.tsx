import { useState, useMemo } from "react";
import { useTeamCount } from "@/hooks/use-team-count";
import { 
  MapPin, 
  Clock, 
  Briefcase, 
  ArrowRight, 
  Users, 
  Heart, 
  Zap, 
  Trophy, 
  ChevronDown, 
  ChevronUp, 
  X, 
  Loader2,
  Sparkles,
  Target,
  Rocket,
  Award,
  Coffee,
  Code,
  Laptop
} from "lucide-react";
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
    description: "Comprehensive health insurance mental health support and wellness programs",
    color: "from-pink-500 to-rose-500"
  },
  {
    icon: Zap,
    title: "Flexible Work",
    description: "Remote first culture with flexible hours ensuring sustainable worklife balance growth",
    color: "from-yellow-500 to-orange-500"
  },
  {
    icon: Trophy,
    title: "Growth & Learning",
    description: "Learning budget mentorship programs and clear career advancement opportunities",
    color: "from-purple-500 to-indigo-500"
  },
  {
    icon: Coffee,
    title: "Team Culture",
    description: "Collaborative environment with team bonding events and knowledge sharing",
    color: "from-[#00D9FF] to-[#0066FF]"
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
        title: "Application Submitted! 🎉",
        description: result.message || "Thank you for applying. We'll review your application and get back to you soon.",
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
        // Error handled by toast notification
        toast({
          title: "Submission Failed",
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
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        transition={{ type: "spring", duration: 0.5 }}
        className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-[#00D9FF]/30 rounded-2xl shadow-[0_0_40px_rgba(0,217,255,0.25)] max-w-lg w-full max-h-[85vh] overflow-hidden"
      >
        {/* Header */}
        <div className="sticky top-0 bg-gradient-to-r from-[#00D9FF]/10 to-[#0066FF]/10 backdrop-blur-xl p-5 border-b-2 border-[#00D9FF]/30 flex items-center justify-between z-10">
          <div>
            <h3 className="text-2xl font-black text-white uppercase tracking-wider" style={{ fontFamily: "'Oswald', sans-serif" }}>
              Apply Now
            </h3>
            <p className="text-sm text-white/70 font-semibold mt-1">{jobTitle}</p>
          </div>
          <motion.button
            onClick={onClose}
            whileHover={{ scale: 1.1, rotate: 90 }}
            whileTap={{ scale: 0.9 }}
            className="p-3 hover:bg-white/10 rounded-xl transition-colors border border-white/20"
          >
            <X className="w-6 h-6 text-white/80" />
          </motion.button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-5 space-y-4 overflow-y-auto max-h-[calc(85vh-90px)]">
          <div className="space-y-2">
            <Label htmlFor="name" className="text-white font-bold text-sm uppercase tracking-wider">
              Full Name
            </Label>
            <Input
              id="name"
              name="name"
              required
              placeholder="John Doe"
              value={formData.name}
              onChange={handleInputChange}
              onBlur={() => handleBlur("name")}
              className={`h-11 bg-white/5 border-2 border-white/20 text-white placeholder:text-white/40 focus:border-[#00D9FF] focus:bg-white/10 rounded-xl font-semibold transition-all ${
                errors.name && touchedFields.name ? "border-red-500" : ""
              }`}
              disabled={isSubmitting}
            />
            {errors.name && touchedFields.name && (
              <motion.p 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-red-400 text-xs font-semibold"
              >
                {errors.name}
              </motion.p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="email" className="text-white font-bold text-sm uppercase tracking-wider">
              Email Address
            </Label>
            <Input
              id="email"
              name="email"
              type="email"
              required
              placeholder="john@example.com"
              value={formData.email}
              onChange={handleInputChange}
              onBlur={() => handleBlur("email")}
              className={`h-11 bg-white/5 border-2 border-white/20 text-white placeholder:text-white/40 focus:border-[#00D9FF] focus:bg-white/10 rounded-xl font-semibold transition-all ${
                errors.email && touchedFields.email ? "border-red-500" : ""
              }`}
              disabled={isSubmitting}
            />
            {errors.email && touchedFields.email && (
              <motion.p 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-red-400 text-xs font-semibold"
              >
                {errors.email}
              </motion.p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone" className="text-white font-bold text-sm uppercase tracking-wider">
              Phone Number
            </Label>
            <Input
              id="phone"
              name="phone"
              type="tel"
              placeholder="1234567890"
              value={formData.phone}
              onChange={handleInputChange}
              onBlur={() => handleBlur("phone")}
              inputMode="numeric"
              className={`h-11 bg-white/5 border-2 border-white/20 text-white placeholder:text-white/40 focus:border-[#00D9FF] focus:bg-white/10 rounded-xl font-semibold transition-all ${
                errors.phone && touchedFields.phone ? "border-red-500" : ""
              }`}
              disabled={isSubmitting}
            />
            {errors.phone && touchedFields.phone && (
              <motion.p 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-red-400 text-xs font-semibold"
              >
                {errors.phone}
              </motion.p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="linkedin" className="text-white font-bold text-sm uppercase tracking-wider">
              LinkedIn Profile
            </Label>
            <Input
              id="linkedin"
              name="linkedinUrl"
              type="url"
              placeholder="https://linkedin.com/in/yourprofile"
              value={formData.linkedinUrl}
              onChange={handleInputChange}
              onBlur={() => handleBlur("linkedinUrl")}
              className={`h-11 bg-white/5 border-2 border-white/20 text-white placeholder:text-white/40 focus:border-[#00D9FF] focus:bg-white/10 rounded-xl font-semibold transition-all ${
                errors.linkedinUrl && touchedFields.linkedinUrl ? "border-red-500" : ""
              }`}
              disabled={isSubmitting}
            />
            {errors.linkedinUrl && touchedFields.linkedinUrl && (
              <motion.p 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-red-400 text-xs font-semibold"
              >
                {errors.linkedinUrl}
              </motion.p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="portfolio" className="text-white font-bold text-sm uppercase tracking-wider">
              Portfolio / Website
            </Label>
            <Input
              id="portfolio"
              name="portfolioUrl"
              type="url"
              placeholder="https://yourportfolio.com"
              value={formData.portfolioUrl}
              onChange={handleInputChange}
              onBlur={() => handleBlur("portfolioUrl")}
              className={`h-11 bg-white/5 border-2 border-white/20 text-white placeholder:text-white/40 focus:border-[#00D9FF] focus:bg-white/10 rounded-xl font-semibold transition-all ${
                errors.portfolioUrl && touchedFields.portfolioUrl ? "border-red-500" : ""
              }`}
              disabled={isSubmitting}
            />
            {errors.portfolioUrl && touchedFields.portfolioUrl && (
              <motion.p 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-red-400 text-xs font-semibold"
              >
                {errors.portfolioUrl}
              </motion.p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="coverLetter" className="text-white font-bold text-sm uppercase tracking-wider">
              Cover Letter
            </Label>
            <Textarea
              id="coverLetter"
              name="coverLetter"
              placeholder="Tell us why you're interested in this position..."
              rows={4}
              value={formData.coverLetter}
              onChange={handleInputChange}
              onBlur={() => handleBlur("coverLetter")}
              className={`bg-white/5 border-2 border-white/20 text-white placeholder:text-white/40 focus:border-[#00D9FF] focus:bg-white/10 resize-none rounded-xl font-semibold transition-all ${
                errors.coverLetter && touchedFields.coverLetter ? "border-red-500" : ""
              }`}
              disabled={isSubmitting}
            />
            {errors.coverLetter && touchedFields.coverLetter && (
              <motion.p 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-red-400 text-xs font-semibold"
              >
                {errors.coverLetter}
              </motion.p>
            )}
          </div>

          <div className="flex gap-4 pt-6">
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="flex-1">
              <Button 
                type="button" 
                onClick={onClose} 
                className="w-full h-11 bg-white/5 border-2 border-white/20 text-white hover:bg-white/10 font-bold text-base rounded-xl uppercase tracking-wider"
                disabled={isSubmitting}
              >
                Cancel
              </Button>
            </motion.div>
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="flex-1">
              <Button 
                type="submit" 
                disabled={isSubmitting} 
                className="w-full h-11 bg-gradient-to-r from-[#00D9FF] to-[#0066FF] text-white font-black text-base rounded-xl uppercase tracking-wider shadow-[0_0_30px_rgba(0,217,255,0.4)] hover:shadow-[0_0_50px_rgba(0,217,255,0.6)] transition-all"
              >
                {isSubmitting ? (
                  <span className="flex items-center gap-2">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                    />
                    Submitting...
                  </span>
                ) : (
                  "Submit Application"
                )}
              </Button>
            </motion.div>
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
        whileHover={{ y: -8 }}
        className="group relative"
      >
        {/* Glow effect */}
        <motion.div 
          className="absolute -inset-1 bg-gradient-to-br from-[#00D9FF]/20 to-[#0066FF]/20 rounded-3xl opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500"
        />
        
        <div className="relative bg-gradient-to-br from-white/[0.07] to-white/[0.02] backdrop-blur-sm border-2 border-white/10 rounded-3xl p-8 group-hover:border-[#00D9FF]/40 transition-all duration-500">
          {/* Header */}
          <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6 mb-6">
            <div className="flex-1">
              <h3 
                className="text-2xl lg:text-3xl font-black text-white mb-4 leading-tight group-hover:text-[#00D9FF] transition-colors"
                style={{ fontFamily: "'Oswald', sans-serif" }}
              >
                {job.title}
              </h3>
              <div className="flex flex-wrap items-center gap-4 text-sm text-white/60">
                <motion.span 
                  className="flex items-center gap-2 bg-white/5 px-4 py-2 rounded-full border border-white/10"
                  whileHover={{ scale: 1.05 }}
                >
                  <Briefcase className="w-4 h-4 text-[#00D9FF]" />
                  <span className="font-semibold">{job.department}</span>
                </motion.span>
                <motion.span 
                  className="flex items-center gap-2 bg-white/5 px-4 py-2 rounded-full border border-white/10"
                  whileHover={{ scale: 1.05 }}
                >
                  <MapPin className="w-4 h-4 text-[#00D9FF]" />
                  <span className="font-semibold">{job.location}</span>
                </motion.span>
                <motion.span 
                  className="flex items-center gap-2 bg-white/5 px-4 py-2 rounded-full border border-white/10"
                  whileHover={{ scale: 1.05 }}
                >
                  <Clock className="w-4 h-4 text-[#00D9FF]" />
                  <span className="font-semibold">{job.type}</span>
                </motion.span>
              </div>
            </div>
            
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                onClick={() => onApply(job.title)}
                className="bg-gradient-to-r from-[#00D9FF] to-[#0066FF] text-white font-black px-8 py-6 rounded-xl hover:shadow-[0_0_40px_rgba(0,217,255,0.6)] whitespace-nowrap uppercase tracking-wider text-sm transition-all"
              >
                Apply Now
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </motion.div>
          </div>
          
          {/* Description */}
          <p className="text-white/70 mb-6 leading-relaxed text-lg" style={{ fontFamily: "'Crimson Pro', serif" }}>
            {job.description}
          </p>
          
          {/* Toggle Details Button */}
          <motion.button
            onClick={() => setIsExpanded(!isExpanded)}
            whileHover={{ x: 5 }}
            className="flex items-center gap-2 text-[#00D9FF] font-bold text-sm hover:gap-3 transition-all uppercase tracking-wider"
          >
            {isExpanded ? "Hide Details" : "View Full Details"}
            {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
          </motion.button>
          
          {/* Expanded Details */}
          {isExpanded && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="mt-8 pt-8 border-t-2 border-white/10 grid md:grid-cols-2 gap-8"
            >
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#00D9FF] to-[#0066FF] flex items-center justify-center">
                    <Target className="w-5 h-5 text-white" />
                  </div>
                  <h4 className="font-black text-white text-xl uppercase tracking-wider" style={{ fontFamily: "'Oswald', sans-serif" }}>
                    Requirements
                  </h4>
                </div>
                <ul className="space-y-3">
                  {job.requirements.map((req, index) => (
                    <motion.li 
                      key={index} 
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="text-sm text-white/70 flex items-start gap-3 leading-relaxed"
                    >
                      <span className="w-2 h-2 bg-[#00D9FF] rounded-full mt-2 flex-shrink-0" />
                      <span className="font-semibold">{req}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#0066FF] to-[#00D9FF] flex items-center justify-center">
                    <Rocket className="w-5 h-5 text-white" />
                  </div>
                  <h4 className="font-black text-white text-xl uppercase tracking-wider" style={{ fontFamily: "'Oswald', sans-serif" }}>
                    Responsibilities
                  </h4>
                </div>
                <ul className="space-y-3">
                  {job.responsibilities.map((resp, index) => (
                    <motion.li 
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="text-sm text-white/70 flex items-start gap-3 leading-relaxed"
                    >
                      <span className="w-2 h-2 bg-[#0066FF] rounded-full mt-2 flex-shrink-0" />
                      <span className="font-semibold">{resp}</span>
                    </motion.li>
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

const normalizeDept = (name?: string) =>
  name && name.trim() ? name.trim().toLowerCase() : "other";

const Careers = () => {
  const { data, isLoading: isJobsLoading } = useGetJobsQuery();
  const [selectedDepartment, setSelectedDepartment] = useState<string>("all");
  const [applicationJob, setApplicationJob] = useState<string | null>(null);
  
  const jobsFromApi: JobCardData[] = useMemo(() => {
    return (
      data?.items?.map((job) => ({
        id: job._id,
        title: job.title,
        department: job.department,
        location: job.location,
        type: job.type,
        description: job.description,
        requirements: job.requirements || [],
        responsibilities: job.responsibilities || [],
      })) || []
    );
  }, [data?.items]);


  const departments = useMemo(() => {
    const map = new Map<string, string>();
    jobsFromApi.forEach((job) => {
      const norm = normalizeDept(job.department);
      if (!map.has(norm)) {
        map.set(norm, job.department?.trim() || "Other");
      }
    });
    return [{ value: "all", label: "All" }, ...Array.from(map.entries()).map(([value, label]) => ({ value, label }))];
  }, [jobsFromApi]);

  const filteredJobs =
    selectedDepartment === "all"
      ? jobsFromApi
      : jobsFromApi.filter(
          (job) => normalizeDept(job.department) === selectedDepartment
        );

  return (
    <div className="min-h-screen bg-[#0A0F1C] overflow-hidden">
      <Header />
      
      {applicationJob && (
        <ApplicationForm
          jobTitle={applicationJob}
          onClose={() => setApplicationJob(null)}
        />
      )}
      
      {/* Animated Background Elements */}
      <div className="fixed inset-0 pointer-events-none">
        <motion.div 
          className="absolute top-0 right-0 w-[800px] h-[800px] bg-[#00D9FF]/3 rounded-full blur-[150px]"
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.03, 0.05, 0.03]
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div 
          className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-[#0066FF]/3 rounded-full blur-[150px]"
          animate={{ 
            scale: [1.2, 1, 1.2],
            opacity: [0.03, 0.05, 0.03]
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>
      
      <main className="pt-20 relative z-10">
        <PageBreadcrumb />
      
        {/* Hero Section */}
        <section className="relative py-12 sm:py-16 md:py-20 lg:py-32">
          <div className="container mx-auto px-4 sm:px-6 lg:px-12">
            <div className="max-w-7xl mx-auto">
              <AnimatedSection>
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                  className="text-center mb-8"
                >
                  <motion.div 
                    className="inline-flex items-center gap-3 mb-6 bg-gradient-to-r from-[#00D9FF]/10 to-[#0066FF]/10 border border-[#00D9FF]/30 rounded-full px-6 py-3"
                    whileHover={{ scale: 1.05 }}
                  >
                    <Sparkles className="w-4 h-4 text-[#00D9FF]" />
                    <span className="text-[#00D9FF] font-bold text-sm tracking-[0.15em] uppercase">
                      Join Our Team
                    </span>
                    <Sparkles className="w-4 h-4 text-[#00D9FF]" />
                  </motion.div>
                  
                  <h1 
                    className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black text-white mb-4 sm:mb-6 leading-[0.9] tracking-tight px-2 sm:px-0"
                    style={{ fontFamily: "'Oswald', 'Impact', sans-serif" }}
                  >
                    BUILD THE{" "}
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00D9FF] to-[#0066FF]">
                      FUTURE
                    </span>
                  </h1>
                  
                  <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-white/70 max-w-3xl mx-auto leading-relaxed font-light mb-8 sm:mb-10 px-4 sm:px-0" style={{ fontFamily: "'Crimson Pro', serif" }}>
                    Join a team of passionate innovators dedicated to creating exceptional digital experiences that shape tomorrow
                  </p>

                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button
                      asChild
                      className="bg-gradient-to-r from-[#00D9FF] to-[#0066FF] text-white font-black px-10 py-7 text-lg rounded-2xl hover:shadow-[0_0_60px_rgba(0,217,255,0.6)] uppercase tracking-wider transition-all"
                    >
                      <a href="#openings" className="flex items-center gap-3">
                        View Openings
                        <ArrowRight className="w-6 h-6" />
                      </a>
                    </Button>
                  </motion.div>
                </motion.div>
              </AnimatedSection>
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-20 relative">
          <div className="container mx-auto px-4 sm:px-6 lg:px-12">
            <div className="max-w-7xl mx-auto">
              <AnimatedSection className="mb-16">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="flex items-center gap-4 mb-4"
                >
                  <Award className="w-7 h-7 text-[#00D9FF]" />
                  <h2 
                    className="text-3xl md:text-5xl font-black text-white uppercase tracking-wide"
                    style={{ fontFamily: "'Oswald', sans-serif" }}
                  >
                    Why Join <span className="text-[#00D9FF]">Us</span>
                  </h2>
                  <div className="flex-1 h-[2px] bg-gradient-to-r from-[#00D9FF] to-transparent" />
                </motion.div>
                <p className="text-white/60 text-lg max-w-3xl" style={{ fontFamily: "'Crimson Pro', serif" }}>
                  We believe in taking care of our team with comprehensive benefits and a culture that empowers growth
                </p>
              </AnimatedSection>

              <AnimatedStagger className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {benefits.map((benefit, idx) => (
                  <AnimatedItem key={benefit.title}>
                    <motion.div 
                      whileHover={{ y: -8 }}
                      initial={{ opacity: 0, y: 40 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.1 }}
                      className="relative group"
                    >
                      {/* Glow */}
                      <div className={`absolute -inset-1 bg-gradient-to-br ${benefit.color} opacity-0 group-hover:opacity-50 blur-xl transition-opacity duration-500 rounded-3xl`} />
                      
                      <div className="relative bg-gradient-to-br from-white/[0.07] to-white/[0.02] backdrop-blur-sm border-2 border-white/10 rounded-3xl p-8 group-hover:border-white/30 transition-all h-full">
                        <div className="mb-6">
                          <div className={`inline-flex w-16 h-16 bg-gradient-to-br ${benefit.color} rounded-2xl items-center justify-center shadow-[0_0_30px_rgba(0,217,255,0.3)]`}>
                            <benefit.icon className="w-8 h-8 text-white" />
                          </div>
                        </div>
                        <h3 
                          className="text-xl font-black text-white mb-3 uppercase tracking-wide" 
                          style={{ fontFamily: "'Oswald', sans-serif" }}
                        >
                          {benefit.title}
                        </h3>
                        <p className="text-white/70 leading-relaxed font-light" style={{ fontFamily: "'Crimson Pro', serif" }}>
                          {benefit.description}
                        </p>
                      </div>
                    </motion.div>
                  </AnimatedItem>
                ))}
              </AnimatedStagger>
            </div>
          </div>
        </section>

        {/* Job Listings Section */}
        <section id="openings" className="py-20 relative">
          <div className="container mx-auto px-4 sm:px-6 lg:px-12">
            <div className="max-w-7xl mx-auto">
              <AnimatedSection className="mb-12">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="flex items-center gap-4 mb-4"
                >
                  <Code className="w-7 h-7 text-[#00D9FF]" />
                  <h2 
                    className="text-3xl md:text-5xl font-black text-white uppercase tracking-wide"
                    style={{ fontFamily: "'Oswald', sans-serif" }}
                  >
                    Open <span className="text-[#00D9FF]">Positions</span>
                  </h2>
                  <div className="flex-1 h-[2px] bg-gradient-to-r from-[#00D9FF] to-transparent" />
                </motion.div>
                <p className="text-white/60 text-lg max-w-3xl" style={{ fontFamily: "'Crimson Pro', serif" }}>
                  Explore our current openings and find the perfect role to launch your career
                </p>
              </AnimatedSection>

              {/* Department Filter */}
              <AnimatedSection className="flex flex-wrap gap-3 mb-12">
                {departments.map((dept, idx) => (
                  <motion.button
                    key={dept.value}
                    onClick={() => setSelectedDepartment(dept.value)}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: idx * 0.05 }}
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className={`px-6 py-3 rounded-full font-bold text-sm transition-all uppercase tracking-wider ${
                      selectedDepartment === dept.value
                        ? "bg-gradient-to-r from-[#00D9FF] to-[#0066FF] text-white shadow-[0_0_30px_rgba(0,217,255,0.4)]"
                        : "bg-white/5 text-white/70 hover:bg-white/10 border-2 border-white/10 hover:border-[#00D9FF]/30"
                    }`}
                  >
                    {dept.label}
                  </motion.button>
                ))}
              </AnimatedSection>

              {/* Loading State */}
              {isJobsLoading && (
                <div className="flex flex-col items-center justify-center py-20">
                  <div className="relative w-20 h-20 mb-6">
                    <motion.div 
                      className="absolute inset-0 border-4 border-[#00D9FF]/30 rounded-full"
                      animate={{ rotate: 360, scale: [1, 1.2, 1] }}
                      transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    />
                    <motion.div 
                      className="absolute inset-2 border-4 border-[#0066FF] rounded-full border-t-transparent"
                      animate={{ rotate: -360 }}
                      transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                    />
                  </div>
                  <p className="text-white/60 font-semibold text-lg">Loading positions...</p>
                </div>
              )}

              {/* Empty State */}
              {!isJobsLoading && !jobsFromApi.length && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-center py-20"
                >
                  <div className="w-24 h-24 rounded-full bg-gradient-to-br from-[#00D9FF]/20 to-[#0066FF]/20 flex items-center justify-center mx-auto mb-6">
                    <Laptop className="w-12 h-12 text-[#00D9FF]" />
                  </div>
                  <h3 className="text-2xl font-black text-white mb-4" style={{ fontFamily: "'Oswald', sans-serif" }}>
                    NO OPENINGS RIGHT NOW
                  </h3>
                  <p className="text-white/60 text-lg max-w-md mx-auto" style={{ fontFamily: "'Crimson Pro', serif" }}>
                    We don't have any open positions at the moment, but we're always looking for exceptional talent. Check back soon!
                  </p>
                </motion.div>
              )}

              {/* Job Cards */}
              <AnimatedStagger key={selectedDepartment} className="space-y-6">
                {filteredJobs.map((job) => (
                  <JobCard key={job.id} job={job} onApply={setApplicationJob} />
                ))}
              </AnimatedStagger>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-12 sm:py-16 md:py-20 lg:py-24 relative">
          <div className="container mx-auto px-4 sm:px-6 lg:px-12">
            <AnimatedSection>
              <div className="max-w-5xl mx-auto relative">
                {/* Animated background */}
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-r from-[#00D9FF]/10 via-[#0066FF]/10 to-[#00D9FF]/10 rounded-[3rem] blur-3xl"
                  animate={{ 
                    scale: [1, 1.05, 1],
                    opacity: [0.5, 0.8, 0.5]
                  }}
                  transition={{ duration: 4, repeat: Infinity }}
                />
                
                <div className="relative bg-gradient-to-br from-[#00D9FF]/10 via-[#0066FF]/5 to-transparent backdrop-blur-xl border-2 border-[#00D9FF]/30 rounded-[3rem] p-12 md:p-20 overflow-hidden">
                  {/* Decorative elements */}
                  <div className="absolute top-0 right-0 w-64 h-64 bg-[#00D9FF]/5 rounded-full blur-[100px]" />
                  <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#0066FF]/5 rounded-full blur-[100px]" />
                  
                  <div className="relative z-10 text-center">
                    <motion.div
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      transition={{ type: "spring", duration: 0.8 }}
                      className="inline-flex items-center gap-2 bg-[#00D9FF]/10 border border-[#00D9FF]/30 rounded-full px-6 py-2 mb-8"
                    >
                      <Sparkles className="w-4 h-4 text-[#00D9FF]" />
                      <span className="text-[#00D9FF] font-bold text-sm uppercase tracking-wider">
                        Open Application
                      </span>
                    </motion.div>
                    
                    <h2 
                      className="text-4xl md:text-6xl font-black text-white mb-6 leading-tight"
                      style={{ fontFamily: "'Oswald', sans-serif" }}
                    >
                      DON'T SEE THE{" "}
                      <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00D9FF] to-[#0066FF]">
                        RIGHT FIT?
                      </span>
                    </h2>
                    
                    <p className="text-white/60 mb-12 max-w-2xl mx-auto text-lg leading-relaxed font-light" style={{ fontFamily: "'Crimson Pro', serif" }}>
                      We're always looking for exceptional talent. Send us your resume and let us know how you can contribute to our mission
                    </p>
                    
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                      <Button
                        onClick={() => setApplicationJob("General Application")}
                        className="bg-gradient-to-r from-[#00D9FF] to-[#0066FF] text-white font-black px-10 py-7 text-lg rounded-2xl hover:shadow-[0_0_60px_rgba(0,217,255,0.6)] uppercase tracking-wider transition-all"
                      >
                        Send Your Resume
                        <ArrowRight className="w-6 h-6 ml-2" />
                      </Button>
                    </motion.div>
                  </div>
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