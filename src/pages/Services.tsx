import { Header } from "@/components/Header";
import { Services as ServicesSection } from "@/components/Services";
import { Footer } from "@/components/Footer";

const Services = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-20">
        <ServicesSection />
      </main>
      <Footer />
    </div>
  );
};

export default Services;
