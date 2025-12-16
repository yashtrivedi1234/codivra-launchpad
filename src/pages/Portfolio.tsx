import { Header } from "@/components/Header";
import { Portfolio as PortfolioSection } from "@/components/Portfolio";
import { Testimonials } from "@/components/Testimonials";
import { Footer } from "@/components/Footer";

const Portfolio = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-20">
        <PortfolioSection />
        <Testimonials />
      </main>
      <Footer />
    </div>
  );
};

export default Portfolio;
