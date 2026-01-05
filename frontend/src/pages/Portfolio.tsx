import { Header } from "@/components/Header";
import { Portfolio as PortfolioSection } from "@/components/Portfolio";
import { Testimonials } from "@/components/Testimonials";
import { Footer } from "@/components/Footer";
import PageBreadcrumb from "@/components/PageBreadcrumb";

const Portfolio = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-20">
        <PageBreadcrumb />
        <h1 className="sr-only">Portfolio</h1>
        <PortfolioSection />
      </main>
      <Footer />
    </div>
  );
};

export default Portfolio;
