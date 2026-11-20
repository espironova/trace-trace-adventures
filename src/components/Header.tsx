"use client";
import Image from 'next/image'
import { useState } from "react";
import { Phone, Mail, Menu, X } from "lucide-react";
import WhatsAppIcon from "@/components/WhatsAppIcon";
import { motion, AnimatePresence } from "framer-motion";
import logo from "@/assets/logo.png";

const navLinks = [
  { label: "Home", path: "/" },
  { label: "About", path: "/about" },
  { label: "Services", path: "/services" },
  { label: "Fleet", path: "/fleet" },
  { label: "Destinations", path: "/destinations" },
  { label: "Blogs & Reviews", path: "/blogs-reviews" },
  { label: "Contact", path: "/contact" },
];

const Header = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = typeof window !== "undefined" ? window.location.pathname : "/";

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      {/* Top utility bar */}
      <div className="bg-primary text-primary-foreground">
        <div className="container mx-auto flex items-center justify-between py-2 px-4 text-xs tracking-widest uppercase font-sans">
          <div className="flex items-center gap-6">
            <a href="tel:+254721521009" className="flex items-center gap-1.5 hover:text-accent transition-colors">
              <Phone className="w-3 h-3" />
              <span>+254 721 521 009</span>
            </a>
            <a href="mailto:info@tracktraceadventures.co.ke" className="hidden sm:flex items-center gap-1.5 hover:text-accent transition-colors">
              <Mail className="w-3 h-3" />
              <span>info@tracktraceadventures.co.ke</span>
            </a>
          </div>
          <a
            href="https://wa.me/254721521009"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 hover:opacity-90 transition-opacity"
          >
            <WhatsAppIcon className="w-3.5 h-3.5" />
            <span className="text-primary-foreground">WhatsApp Us</span>
          </a>
        </div>
      </div>

      {/* Main navigation */}
      <nav className="bg-background/95 backdrop-blur-md border-b border-border">
        <div className="container mx-auto flex items-center justify-between py-3 px-4">
          <a href="/" className="flex items-center gap-3">
            <Image
          src={logo}
          alt="Track & Trace Adventures logo"
          width={180}
          height={64}
          className="h-12 w-auto w-auto"
        />
            <div className="hidden sm:block">
              <span className="font-serif text-lg md:text-xl font-bold text-primary tracking-tight leading-none block">
                Track & Trace
              </span>
              <span className="font-serif text-sm md:text-base font-light text-accent italic leading-none">
                Adventures
              </span>
            </div>
          </a>

          {/* Desktop nav */}
          <ul className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <li key={link.path}>
                <a
                  href={link.path}
                  className={`text-sm font-sans uppercase tracking-[0.15em] transition-colors hover:text-accent ${
                    pathname === link.path ? "text-accent font-bold" : "text-foreground"
                  }`}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden text-foreground"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="lg:hidden overflow-hidden bg-background border-t border-border"
            >
              <ul className="flex flex-col py-4">
                {navLinks.map((link) => (
                  <li key={link.path}>
                    <a
                      href={link.path}
                      onClick={() => setMobileOpen(false)}
                      className={`block px-6 py-3 text-sm font-sans uppercase tracking-[0.15em] transition-colors hover:bg-muted ${
                        pathname === link.path ? "text-accent font-bold" : "text-foreground"
                      }`}
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
};

export default Header;
