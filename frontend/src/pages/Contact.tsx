import { Header } from "@/components/Header";
import { Contact as ContactSection } from "@/components/Contact";
import { Footer } from "@/components/Footer";
import PageBreadcrumb from "@/components/PageBreadcrumb";

const Contact = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-20">
        <PageBreadcrumb />
        <h1 className="sr-only">Contact Us</h1>
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
};

export default Contact;
