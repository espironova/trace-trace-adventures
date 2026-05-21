import { Trophy, BookOpen, Music, ShieldCheck, Bus, Handshake, Medal, Landmark, Users2, Drama } from "lucide-react";
import ServiceDetailPage from "@/components/ServiceDetailPage";
import hero from "@/assets/schools-transport-hero.png";
import fleetCoasterExt from "@/assets/fleet-coaster-ext.jpg";
import fleetBus from "@/assets/fleet-bus.jpg";
import fleetHiace from "@/assets/fleet-hiace.jpg";

const SchoolsTransport = () => (
  <ServiceDetailPage
    serviceId="schools-transport"
    heroImage={hero}
    heroAlt="International school children boarding a bus for an educational trip in Nairobi"
    heroKicker="Schools Transport"
    heroTitle="International Schools Transport, Nairobi"
    heroSubtitle="Trusted by leading international schools across Nairobi for sports tournaments, field trips, co-curricular activities, and inter-school events."
    highlightsHeading="Safe, Reliable, Punctual"
    highlights={[
      { icon: Trophy, title: "Sports Tournaments & Events", body: "Reliable transport for school teams to matches, leagues, and tournaments." },
      { icon: BookOpen, title: "Educational Field Trips", body: "Comfortable buses for trips to national parks, museums, reserves, and historic sites." },
      { icon: Music, title: "Co-Curricular Activities", body: "Transport for music, drama, art competitions, and inter-school events." },
      { icon: ShieldCheck, title: "Child Safety Trained Drivers", body: "Drivers trained in child safety protocols, with a calm, careful driving style." },
      { icon: Bus, title: "Coasters, Shuttles & Buses", body: "A fleet sized from small shuttles to full coaches to match every group." },
      { icon: Handshake, title: "Long-Term Contracts Available", body: "Termly or annual agreements with preferred rates for regular school transport." },
    ]}
    stepsHeading="Three Simple Steps for Your School"
    steps={[
      { n: "01", title: "Share your school's schedule and requirements", body: "Send us your dates, destinations, headcount, and any special needs." },
      { n: "02", title: "We assign experienced drivers and suitable vehicles", body: "We allocate appropriately sized vehicles and brief drivers on each trip." },
      { n: "03", title: "Safe and punctual transport for every trip", body: "Children travel safely and arrive on time, every time." },
    ]}
    sections={[
      {
        kind: "icon-cards",
        kicker: "Trip Types",
        heading: "What We Cover for Schools",
        items: [
          { icon: Medal, title: "Sports Events & Tournaments", body: "Home and away fixtures, sports days, and inter-school tournaments." },
          { icon: Landmark, title: "National Park & Museum Trips", body: "Educational outings to parks, reserves, museums, and heritage sites." },
          { icon: Users2, title: "Inter-School Competitions", body: "Transport for academic, debate, and co-curricular competitions across Nairobi." },
          { icon: Drama, title: "Drama, Music & Art Events", body: "Reliable rides for festivals, performances, and creative arts events." },
        ],
      },
      {
        kind: "vehicles",
        kicker: "Vehicles Available",
        heading: "Our Schools Fleet",
        items: [
          { img: fleetCoasterExt, name: "Toyota Coaster", blurb: "22-seater coaster for class trips, sports teams, and club outings.", alt: "Toyota Coaster for international school transport" },
          { img: fleetBus, name: "Mercedes Bus", blurb: "33 to 45 seater bus for whole-year groups and large school events.", alt: "Mercedes bus for school sports and field trips" },
          { img: fleetHiace, name: "Toyota Hiace", blurb: "14-seater van ideal for smaller teams, clubs, and co-curricular trips.", alt: "Toyota Hiace van for school co-curricular activities" },
        ],
      },
    ]}
    ctaHeading="Ready to Plan Your School's Transport?"
  />
);

export default SchoolsTransport;