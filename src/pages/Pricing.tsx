import { Header } from "@/components/Header";
import { Pricing as PricingSection } from "@/components/Pricing";
import { FAQ } from "@/components/FAQ";
import { Footer } from "@/components/Footer";
import PageBreadcrumb from "@/components/PageBreadcrumb";

const Pricing = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-20">
        <PageBreadcrumb />
        <PricingSection />
        <FAQ />
      </main>
      <Footer />
    </div>
  );
};

export default Pricing;
