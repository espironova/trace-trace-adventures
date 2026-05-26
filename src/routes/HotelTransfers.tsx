import { DoorOpen, BadgeDollarSign, UserCheck, Car, Users, Briefcase } from "lucide-react";
import ServiceDetailPage from "@/components/ServiceDetailPage";
import hero from "@/assets/hotel-transfers-hero.png";
import fleetSedan from "@/assets/fleet-sedan.jpg";
import fleetNoahBoot from "@/assets/fleet-noah-boot.jpg";
import fleetVan from "@/assets/fleet-van.jpg";

const HotelTransfers = () => (
  <ServiceDetailPage
    serviceId="hotel-transfers"
    heroImage={hero}
    heroAlt="Smartly dressed driver assisting guests at a Nairobi hotel entrance"
    heroKicker="Hotel Transfers"
    heroTitle="Hotel Transfers Nairobi, Door to Door"
    heroSubtitle="Comfortable and reliable transfers between hotels, restaurants, meeting venues, and attractions across Nairobi. Fixed pricing, professional drivers."
    highlightsHeading="Effortless City Transfers"
    highlights={[
      { icon: DoorOpen, title: "Door-to-Door Service", body: "Pickup right at the hotel entrance and drop-off at your exact destination." },
      { icon: BadgeDollarSign, title: "Fixed Transparent Pricing", body: "Agreed up-front fares with no metered surprises or hidden charges." },
      { icon: UserCheck, title: "Smartly Dressed Drivers", body: "Professional, well-presented drivers familiar with Nairobi hotels and venues." },
      { icon: Car, title: "Sedans, Vans & Minibuses", body: "A range of vehicles for singles, couples, families, and larger groups." },
      { icon: Users, title: "Individuals, Couples & Groups", body: "Comfortable transfers whatever the size and shape of your party." },
      { icon: Briefcase, title: "Business & Leisure Travel", body: "Equally suited to business meetings, leisure outings, and dinner runs." },
    ]}
    stepsHeading="Three Simple Steps to Your Transfer"
    steps={[
      { n: "01", title: "Book your pickup location and destination", body: "Send us your hotel, destination, and preferred time via WhatsApp or our form." },
      { n: "02", title: "Driver arrives on time at your door", body: "A smartly dressed driver meets you at the hotel entrance, ready to depart." },
      { n: "03", title: "Comfortable transfer to your next destination", body: "Relax in a clean, air-conditioned vehicle as we handle the route and traffic." },
    ]}
    sections={[
      {
        kind: "vehicles",
        kicker: "Vehicles Available",
        heading: "Choose the Right Vehicle for Your Transfer",
        items: [
          { img: fleetSedan, name: "Executive Sedan", blurb: "Perfect for solo travellers, couples, and quick business transfers.", alt: "Executive sedan for Nairobi hotel transfer" },
          { img: fleetNoahBoot, name: "Toyota Noah", blurb: "Spacious 5-seater minivan with generous luggage space for families.", alt: "Toyota Noah minivan for hotel transfers" },
          { img: fleetVan, name: "Nissan NV350 Van", blurb: "Comfortable van for medium groups travelling together.", alt: "Nissan NV350 van for hotel transfers" },
        ],
      },
    ]}
    coverage={{
      kicker: "Coverage",
      heading: "City-Wide Coverage",
      body: "We transfer between any hotels, restaurants, event venues, and attractions across Nairobi and its environs. Available for individuals, couples, families, and corporate groups.",
    }}
    ctaHeading="Ready to Book Your Hotel Transfer?"
  />
);

export default HotelTransfers;