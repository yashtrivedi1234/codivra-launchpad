import { Header } from "@/components/Header";
import { About as AboutSection } from "@/components/About";
import { WhyChooseUs } from "@/components/WhyChooseUs";
import { Team } from "@/components/Team";
import { Footer } from "@/components/Footer";
import PageBreadcrumb from "@/components/PageBreadcrumb";

const About = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-20">
        <PageBreadcrumb />
        <h1 className="sr-only">About Us</h1>
        <AboutSection />
        <WhyChooseUs />
        <Team />
      </main>
      <Footer />
    </div>
  );
};

export default About;
