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
        <ServicesSection />
      </main>
      <Footer />
    </div>
  );
};

export default Services;
