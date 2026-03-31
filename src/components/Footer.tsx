import { Link } from "react-router-dom";
import { Phone, Mail, MapPin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          <div>
            <h3 className="font-serif text-2xl mb-4">
              Track & Trace <span className="text-accent italic">Adventures</span>
            </h3>
            <p className="text-sm leading-relaxed opacity-80 font-sans">
              Car Hire Company for Destination Lovers. Over 20 years of experience providing exceptional transportation solutions across East Africa: airport transfers, safari tours, car hire, and long-distance transport.
            </p>
          </div>

          <div>
            <h4 className="font-serif text-lg mb-4 text-accent">Quick Links</h4>
            <ul className="space-y-2 font-sans text-sm">
              {[
                { label: "Home", path: "/" },
                { label: "About Us", path: "/about" },
                { label: "Our Services", path: "/services" },
                { label: "Our Fleet", path: "/fleet" },
                { label: "Destinations", path: "/destinations" },
                { label: "Blogs & Reviews", path: "/blogs-reviews" },
                { label: "Contact Us", path: "/contact" },
              ].map((link) => (
                <li key={link.path}>
                  <Link to={link.path} className="opacity-80 hover:opacity-100 hover:text-accent transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-serif text-lg mb-4 text-accent">Our Services</h4>
            <ul className="space-y-2 font-sans text-sm">
              <li className="opacity-80">Airport Transfers (JKIA & Wilson)</li>
              <li className="opacity-80">Safari Tours & Packages</li>
              <li className="opacity-80">Car Hire & Van Hire</li>
              <li className="opacity-80">Long Distance Transfers</li>
              <li className="opacity-80">SGR Transfers (station pickup & drop-off)</li>
              <li className="opacity-80">Hotel-to-Hotel Transfers</li>
              <li className="opacity-80">Conference & Corporate Transport</li>
              <li className="opacity-80">International Schools Transport</li>
              <li className="opacity-80">Travel Consultations</li>
            </ul>
          </div>

          <div>
            <h4 className="font-serif text-lg mb-4 text-accent">Contact Us</h4>
            <ul className="space-y-3 font-sans text-sm">
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 mt-0.5 text-accent shrink-0" />
                <span className="opacity-80">Milestone Business Center, Northern Bypass Road, Nairobi, Kenya</span>
              </li>
              <li>
                <a href="tel:+254721521009" className="flex items-center gap-2 opacity-80 hover:opacity-100 hover:text-accent transition-colors">
                  <Phone className="w-4 h-4 text-accent" />
                  +254 721 521 009
                </a>
              </li>
              <li>
                <a href="tel:+254736257553" className="flex items-center gap-2 opacity-80 hover:opacity-100 hover:text-accent transition-colors pl-6">
                  0736 257 553
                </a>
              </li>
              <li>
                <a href="tel:+254722178334" className="flex items-center gap-2 opacity-80 hover:opacity-100 hover:text-accent transition-colors pl-6">
                  0722 178 334
                </a>
              </li>
              <li>
                <a href="mailto:info@tracktraceadventures.co.ke" className="flex items-center gap-2 opacity-80 hover:opacity-100 hover:text-accent transition-colors">
                  <Mail className="w-4 h-4 text-accent" />
                  info@tracktraceadventures.co.ke
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-primary-foreground/20 mt-12 pt-8 text-xs font-sans opacity-60">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center text-center">
            <p className="md:text-left">&copy; 2026 Track & Trace Adventures. All rights reserved.</p>
            <p className="md:text-center">Nairobi, Kenya · Serving All of East Africa · Available 24/7</p>
            <p className="md:text-right">
              Powered by{" "}
              <a
                href="https://www.espiranova.co.ke/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent hover:underline font-medium opacity-90"
              >
                Espiranova
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
