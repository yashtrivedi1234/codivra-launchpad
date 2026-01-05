import { Header } from "@/components/Header";
import { Services as ServicesSection } from "@/components/Services";
import { Footer } from "@/components/Footer";
import PageBreadcrumb from "@/components/PageBreadcrumb";

const Services = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-20">
        <PageBreadcrumb />
        <h1 className="sr-only">Our Services</h1>
        <ServicesSection />
      </main>
      <Footer />
    </div>
  );
};

export default Services;
