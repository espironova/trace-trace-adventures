import { KeyRound, ShieldCheck, Navigation, Truck, CalendarDays, Car } from "lucide-react";
import ServiceDetailPage from "@/components/ServiceDetailPage";
import hero from "@/assets/fleet-hiace.jpg";
import fleetSedan from "@/assets/fleet-sedan.jpg";
import fleetHiace from "@/assets/fleet-hiace.jpg";
import fleetLandcruiser from "@/assets/fleet-landcruiser.jpg";
import fleetVan from "@/assets/fleet-van.jpg";

const CarHire = () => (
  <ServiceDetailPage
    serviceId="car-hire"
    heroImage={hero}
    heroAlt="Toyota Hiace van available for car hire in Nairobi"
    heroKicker="Car Hire"
    heroTitle="Car Hire Nairobi, Self-Drive & Chauffeur-Driven"
    heroSubtitle="Premium vehicles for hire across Kenya. Sedans, 4x4s, safari vans, and minibuses. Daily, weekly, and monthly rates available."
    highlightsHeading="Drive or Be Driven, Your Choice"
    highlights={[
      { icon: KeyRound, title: "Self-Drive & Chauffeur Options", body: "Take the wheel yourself or let one of our professional drivers handle the journey." },
      { icon: ShieldCheck, title: "Comprehensive Insurance Included", body: "Every hire vehicle comes with full insurance cover for peace of mind on the road." },
      { icon: Navigation, title: "GPS Navigation Available", body: "Optional GPS units available on request for stress-free travel anywhere in Kenya." },
      { icon: Truck, title: "Free Delivery Within Nairobi", body: "Complimentary vehicle delivery within Nairobi for rentals over 3 days." },
      { icon: CalendarDays, title: "Daily, Weekly & Monthly Rates", body: "Flexible pricing with attractive discounts on longer rental periods." },
      { icon: Car, title: "Sedans, SUVs, Vans & Buses", body: "A diverse fleet to match any trip, from business meetings to family safaris." },
    ]}
    stepsHeading="Three Simple Steps to Hire a Vehicle"
    steps={[
      { n: "01", title: "Choose your vehicle and dates", body: "Tell us the type of vehicle you need, your pickup date, and how long you want it for." },
      { n: "02", title: "We deliver to your location", body: "Free delivery within Nairobi for rentals over 3 days, or collect from our office." },
      { n: "03", title: "Drive or be driven across Kenya", body: "Enjoy the freedom of your hire car anywhere in Kenya and East Africa." },
    ]}
    sections={[
      {
        kind: "vehicles",
        kicker: "Available Vehicles",
        heading: "Find the Right Vehicle for Your Trip",
        items: [
          { img: fleetSedan, name: "Executive Sedan", blurb: "Comfortable saloon perfect for business and city travel.", alt: "Executive sedan for hire in Nairobi" },
          { img: fleetHiace, name: "Toyota Hiace", blurb: "14-seater van ideal for groups, teams, and family travel.", alt: "Toyota Hiace 14 seater van for hire" },
          { img: fleetLandcruiser, name: "Land Cruiser 4x4", blurb: "Rugged 4x4 with pop-up roof, ready for safaris and off-road travel.", alt: "Land Cruiser 4x4 safari vehicle for hire" },
          { img: fleetVan, name: "Nissan NV350 Van", blurb: "Spacious van for medium groups and longer journeys.", alt: "Nissan NV350 van for hire" },
        ],
      },
    ]}
    coverage={{
      kicker: "Coverage",
      heading: "Available Across Kenya",
      body: "Our hire vehicles are available across Nairobi and for cross-country travel throughout Kenya and East Africa. Free delivery within Nairobi for rentals over 3 days.",
    }}
    ctaHeading="Ready to Hire a Vehicle?"
  />
);

export default CarHire;