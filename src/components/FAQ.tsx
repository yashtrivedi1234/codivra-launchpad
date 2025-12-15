import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { AnimatedSection } from "./AnimatedSection";

const faqs = [
  {
    question: "What services does Codivra Solution offer?",
    answer: "We offer comprehensive IT services including Web Development, Custom Software Development, Graphic Design, SEO Optimization, and Digital Marketing. Each service is tailored to meet your specific business needs and goals.",
  },
  {
    question: "How long does a typical project take?",
    answer: "Project timelines vary based on complexity and scope. A standard website typically takes 4-6 weeks, while custom software projects can range from 2-6 months. During our initial consultation, we'll provide a detailed timeline specific to your project.",
  },
  {
    question: "What is your pricing structure?",
    answer: "We offer flexible pricing with three main tiers: Starter ($999), Professional ($2,499), and Enterprise (custom quote). Each tier includes different features and support levels. We also offer custom quotes for projects that don't fit standard packages.",
  },
  {
    question: "Do you offer ongoing support and maintenance?",
    answer: "Yes! All our packages include post-launch support (30-90 days depending on the tier). We also offer ongoing maintenance contracts for continuous updates, security patches, and technical support.",
  },
  {
    question: "Can you work with existing websites or systems?",
    answer: "Absolutely. We specialize in both building new solutions and improving existing ones. Whether you need a website redesign, system integration, or performance optimization, we can help.",
  },
  {
    question: "What technologies do you use?",
    answer: "We use modern, industry-standard technologies including React, Next.js, Node.js, Python, and various cloud platforms (AWS, Google Cloud). We select the best tech stack based on your project requirements.",
  },
  {
    question: "How do you handle project communication?",
    answer: "We believe in transparent communication. You'll have a dedicated project manager, access to our project management tools, and regular updates via your preferred channel (email, Slack, or video calls).",
  },
  {
    question: "What if I'm not satisfied with the results?",
    answer: "Your satisfaction is our priority. We include revision rounds in all packages and work closely with you throughout the project. If issues arise, we'll address them promptly to ensure the final deliverable meets your expectations.",
  },
];

export const FAQ = () => {
  return (
    <section id="faq" className="py-24 bg-gradient-subtle">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <AnimatedSection className="text-center max-w-2xl mx-auto mb-16">
          <span className="inline-block text-accent font-semibold text-sm tracking-wider uppercase mb-4">
            FAQ
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-muted-foreground text-lg">
            Got questions? We've got answers. Find everything you need to know about working with us.
          </p>
        </AnimatedSection>

        {/* Accordion */}
        <AnimatedSection delay={0.1} className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="bg-card border border-border/50 rounded-xl px-6 shadow-soft data-[state=open]:shadow-card transition-shadow"
              >
                <AccordionTrigger className="text-left text-foreground font-semibold hover:text-accent hover:no-underline py-5">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground pb-5 leading-relaxed">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </AnimatedSection>

        {/* Bottom CTA */}
        <AnimatedSection delay={0.2} className="text-center mt-12">
          <p className="text-muted-foreground">
            Still have questions?{" "}
            <a href="#contact" className="text-accent font-semibold hover:underline">
              Contact us
            </a>{" "}
            and we'll be happy to help.
          </p>
        </AnimatedSection>
      </div>
    </section>
  );
};
