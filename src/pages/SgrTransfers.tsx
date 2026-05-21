import { Train, Building2, Luggage, Users, CalendarClock, Link2 } from "lucide-react";
import ServiceDetailPage from "@/components/ServiceDetailPage";
import hero from "@/assets/sgr-transfers-hero.png";
import fleetHiace from "@/assets/fleet-hiace.jpg";
import fleetNoahBoot from "@/assets/fleet-noah-boot.jpg";
import fleetVan from "@/assets/fleet-van.jpg";

const SgrTransfers = () => (
  <ServiceDetailPage
    serviceId="sgr-transfers"
    heroImage={hero}
    heroAlt="Track and Trace Adventures driver with welcome board at Nairobi SGR Terminus"
    heroKicker="SGR Transfers"
    heroTitle="SGR Station Transfers, Nairobi & Mombasa Terminus"
    heroSubtitle="Reliable road transfers timed around your SGR train schedule. Pickup and drop-off at Nairobi Terminus and Mombasa Terminus."
    highlightsHeading="Built Around Your Train Schedule"
    highlights={[
      { icon: CalendarClock, title: "Timed Around Train Schedule", body: "Pickup and drop-off planned around your exact SGR departure and arrival times." },
      { icon: Train, title: "Nairobi & Mombasa Terminus", body: "Coverage at Nairobi Terminus (Syokimau), Mombasa Terminus, and related station routes." },
      { icon: Luggage, title: "Luggage-Friendly Vehicles", body: "Sedans, vans, and minibuses with ample space for suitcases and travel gear." },
      { icon: Users, title: "Solo Travellers & Groups", body: "From single passengers to large families and corporate teams, we have the right vehicle." },
      { icon: Building2, title: "Advance Booking Available", body: "Reserve ahead for weekends, holidays, and peak travel periods for guaranteed availability." },
      { icon: Link2, title: "Connect to Hotel or Airport", body: "Combine your SGR transfer with onward airport, hotel, or long-distance services." },
    ]}
    stepsHeading="Three Simple Steps to a Smooth SGR Transfer"
    steps={[
      { n: "01", title: "Share your train time when booking", body: "Send us your SGR train number, station, and travel date so we can plan around it." },
      { n: "02", title: "Driver arrives before your train", body: "Your driver is on standby at the station entrance, ready well before your train arrives or departs." },
      { n: "03", title: "Comfortable transfer to your destination", body: "Relax in a clean, air-conditioned vehicle as we take you to your hotel, home, or next stop." },
    ]}
    sections={[
      {
        kind: "vehicles",
        kicker: "Vehicles Available",
        heading: "Choose the Right Vehicle for Your Trip",
        items: [
          { img: fleetHiace, name: "Toyota Hiace", blurb: "14-seater van for groups, families, and travellers with extra luggage.", alt: "Toyota Hiace van for SGR station transfers in Nairobi" },
          { img: fleetNoahBoot, name: "Toyota Noah", blurb: "Spacious 5-seater minivan with generous luggage space for small families.", alt: "Toyota Noah for SGR station transfers" },
          { img: fleetVan, name: "Nissan NV350 Van", blurb: "Comfortable van seating for medium-sized groups travelling together.", alt: "Nissan NV350 van for SGR transfers" },
        ],
      },
    ]}
    coverage={{
      kicker: "Stations We Cover",
      heading: "SGR Stations We Cover",
      body: "We serve Nairobi Terminus (Syokimau), Mombasa Terminus, and all connecting destinations across Kenya. Combine your SGR journey with our airport, hotel, or long-distance transfer services.",
    }}
    ctaHeading="Ready to Book Your SGR Transfer?"
  />
);

export default SgrTransfers;