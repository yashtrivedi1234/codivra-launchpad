import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { 
  Mail, 
  Phone, 
  MapPin, 
  Send, 
  CheckCircle, 
  Sparkles,
  MessageSquare,
  Clock,
  Users,
  ArrowRight,
  Building2,
  FileText
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { AnimatedSection } from "./AnimatedSection";
import { useSubmitInquiryMutation, useGetServicesQuery } from "@/lib/api";
import * as Yup from "yup";

// Yup Validation Schema
const inquirySchema = Yup.object().shape({
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
    .optional(),
  company: Yup.string()
    .optional(),
  subject: Yup.string()
    .min(3, "Subject must be at least 3 characters long")
    .required("Subject is required"),
  message: Yup.string()
    .min(10, "Message must be at least 10 characters long")
    .required("Message is required"),
  service: Yup.string()
    .optional(),
});

export const Inquiry = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    subject: "",
    message: "",
    service: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touchedFields, setTouchedFields] = useState<Record<string, boolean>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { toast } = useToast();
  const [submitInquiry] = useSubmitInquiryMutation();
  const { data: servicesData, isLoading: servicesLoading, isError: servicesError } = useGetServicesQuery();

  // Live validation function
  const validateField = async (fieldName: string, value: string) => {
    try {
      await Yup.reach(inquirySchema, fieldName).validate(value);
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

  // Handle input change with live validation
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    let sanitizedValue = value;

    // Apply field-specific restrictions
    if (name === "name") {
      sanitizedValue = value.replace(/[^a-zA-Z\s]/g, "");
    } else if (name === "phone") {
      sanitizedValue = value.replace(/[^0-9]/g, "");
    } else if (name === "email") {
      sanitizedValue = value.replace(/\s/g, "");
    }

    setFormData((prev) => ({ ...prev, [name]: sanitizedValue }));
    
    if (touchedFields[name]) {
      validateField(name, sanitizedValue);
    }
  };

  // Handle field blur
  const handleBlur = (fieldName: string) => {
    setTouchedFields((prev) => ({ ...prev, [fieldName]: true }));
    validateField(fieldName, formData[fieldName as keyof typeof formData]);
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const allTouched = Object.keys(formData).reduce((acc, key) => {
      acc[key] = true;
      return acc;
    }, {} as Record<string, boolean>);
    setTouchedFields(allTouched);

    try {
      await inquirySchema.validate(formData, { abortEarly: false });
      setErrors({});

      // Remove empty optional fields
      const payload: any = { ...formData };
      if (!payload.phone) delete payload.phone;
      if (!payload.company) delete payload.company;
      if (!payload.service) delete payload.service;

      const result = await submitInquiry(payload).unwrap();
      setIsSubmitted(true);
      
      setFormData({
        name: "",
        email: "",
        phone: "",
        company: "",
        subject: "",
        message: "",
        service: "",
      });
      setTouchedFields({});
      
      toast({
        title: "Inquiry Sent Successfully! 🎉",
        description: result.message || "We'll get back to you within 24 hours.",
      });
    } catch (error: any) {
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
        setIsSubmitted(false);
        let errorMsg = "Please check your inputs or reach us at codivrasolutions@gmail.com.";
        const fieldErrors = error?.data?.issues?.fieldErrors;
        const firstFieldError = fieldErrors
          ? Object.values(fieldErrors).flat()[0]
          : null;
        if (firstFieldError) errorMsg = String(firstFieldError);
        else if (error?.data?.error) errorMsg = error.data.error;
        else if (error?.status) errorMsg = `Status: ${error.status}`;
        else if (error?.message) errorMsg = error.message;
        toast({
          title: "Submission Failed",
          description: errorMsg,
          variant: "destructive",
        });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    { 
      icon: Mail, 
      label: "Email Us", 
      value: "codivrasolutions@gmail.com", 
      href: "mailto:codivrasolutions@gmail.com",
      color: "from-blue-500 to-cyan-500"
    },
    { 
      icon: Phone, 
      label: "Call Us", 
      value: "+91 9452819739", 
      href: "tel:+919452819739",
      color: "from-green-500 to-emerald-500"
    },
    { 
      icon: MapPin, 
      label: "Visit Us", 
      value: "813, Vikas Nagar Colony, Khoobpur, Sitapur", 
      href: null,
      color: "from-purple-500 to-pink-500"
    },
  ];

  const stats = [
    { icon: Users, value: "50+", label: "Happy Clients" },
    { icon: Clock, value: "24hrs", label: "Response Time" },
    { icon: MessageSquare, value: "100%", label: "Satisfaction" },
  ];

  return (
    <section id="inquiry" className="relative py-12 sm:py-16 md:py-24 lg:py-32 bg-[#0A0F1C] overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div 
          className="absolute top-1/4 right-0 w-[800px] h-[800px] bg-[#00D9FF]/3 rounded-full blur-[150px]"
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.03, 0.05, 0.03]
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div 
          className="absolute bottom-1/4 left-0 w-[600px] h-[600px] bg-[#0066FF]/3 rounded-full blur-[150px]"
          animate={{ 
            scale: [1.2, 1, 1.2],
            opacity: [0.03, 0.05, 0.03]
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <AnimatedSection className="text-center mb-16">
            <motion.div 
              className="inline-flex items-center gap-3 mb-6 bg-gradient-to-r from-[#00D9FF]/10 to-[#0066FF]/10 border border-[#00D9FF]/30 rounded-full px-6 py-3"
              whileHover={{ scale: 1.05 }}
            >
              <Sparkles className="w-4 h-4 text-[#00D9FF]" />
              <span className="text-[#00D9FF] font-bold text-sm tracking-[0.15em] uppercase">
                Get In Touch
              </span>
              <Sparkles className="w-4 h-4 text-[#00D9FF]" />
            </motion.div>
            
            <h2 
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black text-white mb-4 sm:mb-6 leading-[0.95] tracking-tight px-2 sm:px-0 whitespace-nowrap"
              style={{ fontFamily: "'Oswald', 'Impact', sans-serif" }}
            >
              HAVE A{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00D9FF] to-[#0066FF]">
                QUESTION?
              </span>
            </h2>
            
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-white/70 max-w-3xl mx-auto leading-relaxed font-light px-4 sm:px-0" style={{ fontFamily: "'Crimson Pro', serif" }}>
              We're here to help! Send us your inquiry and we'll get back to you as soon as possible
            </p>
          </AnimatedSection>

          <div className="grid lg:grid-cols-5 gap-8 sm:gap-12 lg:gap-16 items-start">
            {/* Left - Contact Info */}
            <div className="lg:col-span-2 space-y-8">
              {/* Contact Cards */}
              <AnimatedSection className="space-y-4">
                {contactInfo.map((item, index) => (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, x: -40 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    whileHover={{ x: 5 }}
                    className="group relative"
                  >
                    {/* Glow effect */}
                    <div className={`absolute -inset-1 bg-gradient-to-br ${item.color} opacity-0 group-hover:opacity-30 blur-xl transition-opacity duration-500 rounded-2xl`} />
                    
                    <div className="relative bg-gradient-to-br from-white/[0.08] to-white/[0.02] backdrop-blur-sm border-2 border-white/10 rounded-xl sm:rounded-2xl p-4 sm:p-6 group-hover:border-white/30 transition-all">
                      <div className="flex items-start gap-3 sm:gap-5">
                        <div className={`w-14 h-14 bg-gradient-to-br ${item.color} rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg`}>
                          <item.icon className="w-7 h-7 text-white" />
                        </div>
                        <div className="flex-1 pt-1">
                          <div className="text-xs text-white/50 mb-1 font-bold uppercase tracking-wider">
                            {item.label}
                          </div>
                          {item.href ? (
                            <a 
                              href={item.href} 
                              className="text-white text-sm sm:text-base font-bold hover:text-[#00D9FF] transition-colors block leading-relaxed break-words"
                            >
                              {item.value}
                            </a>
                          ) : (
                            <span className="text-white text-sm sm:text-base font-bold leading-relaxed block break-words">
                              {item.value}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatedSection>

              {/* Stats */}
              <AnimatedSection>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 }}
                  className="bg-gradient-to-br from-[#00D9FF]/10 to-[#0066FF]/10 backdrop-blur-sm border-2 border-[#00D9FF]/30 rounded-xl sm:rounded-2xl p-4 sm:p-6"
                >
                  <div className="grid grid-cols-3 gap-4">
                    {stats.map((stat, idx) => (
                      <div key={stat.label} className="text-center">
                        <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-[#00D9FF]/20 to-[#0066FF]/20 rounded-lg sm:rounded-xl flex items-center justify-center mx-auto mb-2 sm:mb-3">
                          <stat.icon className="w-5 h-5 sm:w-6 sm:h-6 text-[#00D9FF]" />
                        </div>
                        <div 
                          className="text-xl sm:text-2xl font-black text-white mb-1" 
                          style={{ fontFamily: "'Oswald', sans-serif" }}
                        >
                          {stat.value}
                        </div>
                        <div className="text-xs text-white/60 font-semibold uppercase tracking-wider">
                          {stat.label}
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              </AnimatedSection>
            </div>

            {/* Right - Inquiry Form */}
            <div className="lg:col-span-3">
              <AnimatedSection delay={0.2}>
                <div className="relative">
                  {/* Glow Effect */}
                  <motion.div 
                    className="absolute inset-0 bg-gradient-to-br from-[#00D9FF]/10 to-[#0066FF]/10 rounded-[2rem] blur-2xl"
                    animate={{ 
                      scale: [1, 1.05, 1],
                      opacity: [0.5, 0.8, 0.5]
                    }}
                    transition={{ duration: 4, repeat: Infinity }}
                  />
                  
                  {/* Form Card */}
                  <div className="relative bg-gradient-to-br from-white/[0.08] to-white/[0.02] backdrop-blur-xl border-2 border-white/20 rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 lg:p-12">
                    {isSubmitted ? (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="flex flex-col items-center justify-center py-16 text-center"
                      >
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ type: "spring", duration: 0.6 }}
                          className="relative mb-8"
                        >
                          <div className="absolute inset-0 bg-gradient-to-br from-[#00D9FF] to-[#0066FF] rounded-full blur-2xl opacity-50" />
                          <div className="relative w-20 h-20 sm:w-24 sm:h-24 bg-gradient-to-br from-[#00D9FF] to-[#0066FF] rounded-full flex items-center justify-center shadow-[0_0_40px_rgba(0,217,255,0.5)]">
                            <CheckCircle className="w-10 h-10 sm:w-12 sm:h-12 text-white" strokeWidth={3} />
                          </div>
                        </motion.div>
                        
                        <h3 
                          className="text-2xl sm:text-3xl md:text-4xl font-black text-white mb-3 sm:mb-4 uppercase tracking-wide px-2 sm:px-0" 
                          style={{ fontFamily: "'Oswald', sans-serif" }}
                        >
                          Inquiry Sent!
                        </h3>
                        <p className="text-white/70 mb-6 sm:mb-8 text-base sm:text-lg max-w-md px-4 sm:px-0" style={{ fontFamily: "'Crimson Pro', serif" }}>
                          We've received your inquiry and will get back to you within 24 hours.
                        </p>
                        
                        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                          <Button
                            onClick={() => setIsSubmitted(false)}
                            className="bg-gradient-to-r from-[#00D9FF] to-[#0066FF] text-white font-black px-6 py-5 sm:px-8 sm:py-6 rounded-lg sm:rounded-xl text-sm sm:text-base uppercase tracking-wider shadow-[0_0_30px_rgba(0,217,255,0.4)] hover:shadow-[0_0_50px_rgba(0,217,255,0.6)]"
                          >
                            Send Another Inquiry
                            <ArrowRight className="w-5 h-5 ml-2" />
                          </Button>
                        </motion.div>
                      </motion.div>
                    ) : (
                      <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
                        <div className="grid sm:grid-cols-2 gap-6">
                          {/* Name Input */}
                          <div>
                            <label className="text-sm font-black text-white mb-3 block uppercase tracking-wider">
                              Full Name *
                            </label>
                            <Input
                              name="name"
                              value={formData.name}
                              onChange={handleInputChange}
                              onBlur={() => handleBlur("name")}
                              placeholder="John Doe"
                              className={`h-12 sm:h-14 bg-white/5 border-2 border-white/20 text-white placeholder:text-white/40 rounded-lg sm:rounded-xl focus:border-[#00D9FF] focus:bg-white/10 font-semibold transition-all text-sm sm:text-base ${
                                errors.name && touchedFields.name ? "border-red-500" : ""
                              }`}
                              disabled={isSubmitting}
                            />
                            {errors.name && touchedFields.name && (
                              <motion.p 
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="text-red-400 text-sm mt-2 font-semibold"
                              >
                                {errors.name}
                              </motion.p>
                            )}
                          </div>

                          {/* Email Input */}
                          <div>
                            <label className="text-sm font-black text-white mb-3 block uppercase tracking-wider">
                              Email Address *
                            </label>
                            <Input
                              type="email"
                              name="email"
                              value={formData.email}
                              onChange={handleInputChange}
                              onBlur={() => handleBlur("email")}
                              placeholder="john@example.com"
                              className={`h-12 sm:h-14 bg-white/5 border-2 border-white/20 text-white placeholder:text-white/40 rounded-lg sm:rounded-xl focus:border-[#00D9FF] focus:bg-white/10 font-semibold transition-all text-sm sm:text-base ${
                                errors.email && touchedFields.email ? "border-red-500" : ""
                              }`}
                              disabled={isSubmitting}
                            />
                            {errors.email && touchedFields.email && (
                              <motion.p 
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="text-red-400 text-sm mt-2 font-semibold"
                              >
                                {errors.email}
                              </motion.p>
                            )}
                          </div>
                        </div>

                        <div className="grid sm:grid-cols-2 gap-6">
                          {/* Phone Input */}
                          <div>
                            <label className="text-sm font-black text-white mb-3 block uppercase tracking-wider">
                              Phone Number
                            </label>
                            <Input
                              type="tel"
                              name="phone"
                              value={formData.phone}
                              onChange={handleInputChange}
                              onBlur={() => handleBlur("phone")}
                              placeholder="1234567890"
                              inputMode="numeric"
                              className={`h-12 sm:h-14 bg-white/5 border-2 border-white/20 text-white placeholder:text-white/40 rounded-lg sm:rounded-xl focus:border-[#00D9FF] focus:bg-white/10 font-semibold transition-all text-sm sm:text-base ${
                                errors.phone && touchedFields.phone ? "border-red-500" : ""
                              }`}
                              disabled={isSubmitting}
                            />
                            {errors.phone && touchedFields.phone && (
                              <motion.p 
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="text-red-400 text-sm mt-2 font-semibold"
                              >
                                {errors.phone}
                              </motion.p>
                            )}
                          </div>

                          {/* Company Input */}
                          <div>
                            <label className="text-sm font-black text-white mb-3 block uppercase tracking-wider">
                              Company
                            </label>
                            <Input
                              name="company"
                              value={formData.company}
                              onChange={handleInputChange}
                              onBlur={() => handleBlur("company")}
                              placeholder="Company Name"
                              className={`h-12 sm:h-14 bg-white/5 border-2 border-white/20 text-white placeholder:text-white/40 rounded-lg sm:rounded-xl focus:border-[#00D9FF] focus:bg-white/10 font-semibold transition-all text-sm sm:text-base ${
                                errors.company && touchedFields.company ? "border-red-500" : ""
                              }`}
                              disabled={isSubmitting}
                            />
                            {errors.company && touchedFields.company && (
                              <motion.p 
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="text-red-400 text-sm mt-2 font-semibold"
                              >
                                {errors.company}
                              </motion.p>
                            )}
                          </div>
                        </div>

                        {/* Subject Input */}
                        <div>
                          <label className="text-sm font-black text-white mb-3 block uppercase tracking-wider">
                            Subject *
                          </label>
                          <Input
                            name="subject"
                            value={formData.subject}
                            onChange={handleInputChange}
                            onBlur={() => handleBlur("subject")}
                            placeholder="What is your inquiry about?"
                            className={`h-14 bg-white/5 border-2 border-white/20 text-white placeholder:text-white/40 rounded-xl focus:border-[#00D9FF] focus:bg-white/10 font-semibold transition-all ${
                              errors.subject && touchedFields.subject ? "border-red-500" : ""
                            }`}
                            disabled={isSubmitting}
                          />
                          {errors.subject && touchedFields.subject && (
                            <motion.p 
                              initial={{ opacity: 0, y: -10 }}
                              animate={{ opacity: 1, y: 0 }}
                              className="text-red-400 text-sm mt-2 font-semibold"
                            >
                              {errors.subject}
                            </motion.p>
                          )}
                        </div>

                        {/* Service Select */}
                        <div>
                          <label className="text-sm font-black text-white mb-3 block uppercase tracking-wider">
                            Service Interested In
                          </label>
                          <select
                            name="service"
                            value={formData.service}
                            onChange={handleInputChange}
                            onBlur={() => handleBlur("service")}
                            className={`w-full h-12 sm:h-14 px-4 rounded-lg sm:rounded-xl bg-white/5 border-2 border-white/20 text-white font-semibold focus:border-[#00D9FF] focus:ring-0 focus:outline-none transition-all text-sm sm:text-base ${
                              errors.service && touchedFields.service ? "border-red-500" : ""
                            }`}
                            disabled={isSubmitting || servicesLoading || servicesError}
                          >
                            <option value="" className="bg-[#0A0F1C]">
                              {servicesLoading ? "Loading services..." : servicesError ? "Failed to load services" : "Select a service (optional)"}
                            </option>
                            {servicesData?.items?.length > 0 ? (
                              servicesData.items.map((service) => (
                                <option key={service._id} value={service.title} className="bg-[#0A0F1C]">
                                  {service.title}
                                </option>
                              ))
                            ) : null}
                          </select>
                          {errors.service && touchedFields.service && (
                            <motion.p 
                              initial={{ opacity: 0, y: -10 }}
                              animate={{ opacity: 1, y: 0 }}
                              className="text-red-400 text-sm mt-2 font-semibold"
                            >
                              {errors.service}
                            </motion.p>
                          )}
                        </div>

                        {/* Message Textarea */}
                        <div>
                          <label className="text-sm font-black text-white mb-3 block uppercase tracking-wider">
                            Your Inquiry *
                          </label>
                          <Textarea
                            name="message"
                            value={formData.message}
                            onChange={handleInputChange}
                            onBlur={() => handleBlur("message")}
                            placeholder="Tell us about your inquiry, questions, or how we can help you..."
                            rows={6}
                            className={`bg-white/5 border-2 border-white/20 text-white placeholder:text-white/40 rounded-lg sm:rounded-xl resize-none focus:border-[#00D9FF] focus:ring-0 focus:bg-white/10 font-semibold transition-all text-sm sm:text-base ${
                              errors.message && touchedFields.message ? "border-red-500" : ""
                            }`}
                            disabled={isSubmitting}
                          />
                          {errors.message && touchedFields.message && (
                            <motion.p 
                              initial={{ opacity: 0, y: -10 }}
                              animate={{ opacity: 1, y: 0 }}
                              className="text-red-400 text-sm mt-2 font-semibold"
                            >
                              {errors.message}
                            </motion.p>
                          )}
                        </div>

                        {/* Submit Button */}
                        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                          <Button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full bg-gradient-to-r from-[#00D9FF] to-[#0066FF] text-white font-black py-5 sm:py-6 md:py-7 text-base sm:text-lg rounded-lg sm:rounded-xl shadow-[0_0_30px_rgba(0,217,255,0.4)] hover:shadow-[0_0_50px_rgba(0,217,255,0.6)] transition-all duration-300 group uppercase tracking-wider"
                          >
                            {isSubmitting ? (
                              <span className="flex items-center justify-center gap-3">
                                <motion.div
                                  animate={{ rotate: 360 }}
                                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                  className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                                />
                                Sending...
                              </span>
                            ) : (
                              <span className="flex items-center justify-center gap-3">
                                Send Inquiry
                                <Send className="w-6 h-6 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                              </span>
                            )}
                          </Button>
                        </motion.div>

                        <p className="text-center text-white/40 text-xs font-semibold">
                          We'll respond within 24 hours • Your information is secure
                        </p>
                      </form>
                    )}
                  </div>
                </div>
              </AnimatedSection>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

