import { Target, Users, Lightbulb } from "lucide-react";

export const About = () => {
  return (
    <section id="about" className="py-24">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-16 items-center max-w-6xl mx-auto">
          {/* Left Content */}
          <div>
            <span className="inline-block text-accent font-semibold text-sm tracking-wider uppercase mb-4">
              About Us
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
              Your Trusted Partner in{" "}
              <span className="text-gradient">Digital Innovation</span>
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed mb-6">
              Codivra Solution is a full-service IT company dedicated to helping businesses 
              thrive in the digital age. With years of expertise and a passion for innovation, 
              we deliver solutions that drive real results.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-8">
              Our team of skilled developers, designers, and strategists work collaboratively 
              to understand your unique challenges and craft tailored solutions that exceed expectations.
            </p>

            {/* Values */}
            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Target className="w-6 h-6 text-accent" />
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-1">Mission-Driven</h4>
                  <p className="text-muted-foreground text-sm">
                    Empowering businesses with technology solutions that make a real impact.
                  </p>
                </div>
              </div>
              
              <div className="flex gap-4">
                <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Users className="w-6 h-6 text-accent" />
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-1">Client-Focused</h4>
                  <p className="text-muted-foreground text-sm">
                    Your success is our priority. We build lasting partnerships, not just projects.
                  </p>
                </div>
              </div>
              
              <div className="flex gap-4">
                <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Lightbulb className="w-6 h-6 text-accent" />
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-1">Innovation-Led</h4>
                  <p className="text-muted-foreground text-sm">
                    Staying ahead with cutting-edge technologies and creative problem-solving.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Visual */}
          <div className="relative">
            <div className="bg-gradient-primary rounded-2xl p-8 aspect-square flex items-center justify-center relative overflow-hidden">
              {/* Decorative Elements */}
              <div className="absolute top-0 right-0 w-40 h-40 bg-accent/20 rounded-full blur-3xl" />
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-primary-foreground/10 rounded-full blur-2xl" />
              
              {/* Stats Grid */}
              <div className="relative z-10 grid grid-cols-2 gap-6 text-primary-foreground">
                <div className="text-center p-6 bg-primary-foreground/10 rounded-xl backdrop-blur-sm">
                  <div className="text-4xl font-bold mb-2">5+</div>
                  <div className="text-sm opacity-80">Years Experience</div>
                </div>
                <div className="text-center p-6 bg-primary-foreground/10 rounded-xl backdrop-blur-sm">
                  <div className="text-4xl font-bold mb-2">150+</div>
                  <div className="text-sm opacity-80">Projects Delivered</div>
                </div>
                <div className="text-center p-6 bg-primary-foreground/10 rounded-xl backdrop-blur-sm">
                  <div className="text-4xl font-bold mb-2">50+</div>
                  <div className="text-sm opacity-80">Happy Clients</div>
                </div>
                <div className="text-center p-6 bg-primary-foreground/10 rounded-xl backdrop-blur-sm">
                  <div className="text-4xl font-bold mb-2">24/7</div>
                  <div className="text-sm opacity-80">Support Available</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
