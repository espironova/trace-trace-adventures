import { Crown, Users, UserCheck, Clock, Layers, RefreshCw, GlassWater, Users2, Plane, Mountain } from "lucide-react";
import ServiceDetailPage from "@/components/ServiceDetailPage";
import hero from "@/assets/corporate-transport-hero.png";
import fleetCoasterExt from "@/assets/fleet-coaster-ext.jpg";
import fleetBus from "@/assets/fleet-bus.jpg";
import fleetSedan from "@/assets/fleet-sedan.jpg";

const CorporateTransport = () => (
  <ServiceDetailPage
    serviceId="corporate-cocktail"
    heroImage={hero}
    heroAlt="Corporate group boarding a Toyota Coaster outside a Nairobi office complex"
    heroKicker="Corporate Transport"
    heroTitle="Corporate Transport Solutions, Nairobi"
    heroSubtitle="Professional transport for corporate events, conferences, cocktail evenings, and executive travel. Reliable, punctual, and smartly presented."
    highlightsHeading="Polished, Punctual, Professional"
    highlights={[
      { icon: Crown, title: "Executive & Luxury Vehicles", body: "Premium vehicles for executives, VIP clients, and high-profile occasions." },
      { icon: Users, title: "Group Transport Available", body: "Coasters and buses for team transport, conference shuttles, and large delegations." },
      { icon: UserCheck, title: "Uniformed Professional Drivers", body: "Smartly dressed drivers trained in corporate etiquette and discretion." },
      { icon: Clock, title: "On-Time Guaranteed", body: "We plan around traffic and event schedules so your team is never late." },
      { icon: Layers, title: "Flexible Multi-Vehicle Coordination", body: "Multiple vehicles dispatched and tracked together for seamless event logistics." },
      { icon: RefreshCw, title: "Recurring Corporate Contracts", body: "Long-term agreements with preferred rates for regular corporate transport needs." },
    ]}
    stepsHeading="Three Simple Steps for Your Corporate Event"
    steps={[
      { n: "01", title: "Share your event details and headcount", body: "Tell us the dates, venues, number of guests, and any special requirements." },
      { n: "02", title: "We assign the right vehicles and drivers", body: "We allocate the appropriate fleet mix and brief drivers on your itinerary." },
      { n: "03", title: "Seamless transport for your entire team or event", body: "Smooth pickups, on-time arrivals, and a coordinator on hand for large events." },
    ]}
    sections={[
      {
        kind: "icon-cards",
        kicker: "Services Covered",
        heading: "Corporate Services We Handle",
        items: [
          { icon: GlassWater, title: "Corporate Cocktail Events", body: "Elegant transport for cocktail evenings, gala dinners, and networking events." },
          { icon: Users2, title: "Conference & Seminar Transport", body: "Delegate shuttles, multi-day conference logistics, and venue-to-hotel transfers." },
          { icon: Plane, title: "Executive Airport Transfers", body: "VIP airport pickup and drop-off for visiting clients, executives, and partners." },
          { icon: Mountain, title: "Team Building & Offsite Travel", body: "Group transport for retreats, offsites, and team-building experiences." },
        ],
      },
      {
        kind: "vehicles",
        kicker: "Vehicles Available",
        heading: "Our Corporate Fleet",
        items: [
          { img: fleetCoasterExt, name: "Toyota Coaster", blurb: "22-seater coaster ideal for conference delegates and team shuttles.", alt: "Toyota Coaster shuttle for corporate events in Nairobi" },
          { img: fleetBus, name: "Mercedes Bus", blurb: "33 to 45 seater bus for large delegations and major corporate events.", alt: "Mercedes corporate event bus in Nairobi" },
          { img: fleetSedan, name: "Executive Sedan", blurb: "Premium sedans for VIP guests, executives, and discreet transfers.", alt: "Executive sedan for corporate VIP transport" },
        ],
      },
    ]}
    ctaHeading="Ready to Plan Your Corporate Transport?"
  />
);

export default CorporateTransport;