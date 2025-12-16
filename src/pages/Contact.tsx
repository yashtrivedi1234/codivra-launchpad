import { Header } from "@/components/Header";
import { Contact as ContactSection } from "@/components/Contact";
import { Footer } from "@/components/Footer";

const Contact = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-20">
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
};

export default Contact;
