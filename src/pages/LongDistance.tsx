import { Bus, Globe, Armchair, UserCheck, CalendarClock, Briefcase, Route } from "lucide-react";
import ServiceDetailPage from "@/components/ServiceDetailPage";
import hero from "@/assets/long-distance-hero.png";

const LongDistance = () => (
  <ServiceDetailPage
    serviceId="long-distance"
    heroImage={hero}
    heroAlt="Track and Trace Adventures coach on a long distance route in Kenya"
    heroKicker="Long Distance Transfers"
    heroTitle="Long Distance Transfers, Kenya & East Africa"
    heroSubtitle="Comfortable intercity and cross-border transfers connecting Nairobi to major towns and destinations across Kenya and East Africa."
    highlightsHeading="Comfort on Every Long Journey"
    highlights={[
      { icon: Bus, title: "Nairobi to Mombasa & Beyond", body: "Direct intercity transfers from Nairobi to Mombasa, Kisumu, Nakuru, Eldoret, and more." },
      { icon: Globe, title: "Cross-Border to Tanzania, Uganda, Rwanda", body: "Seamless cross-border journeys to Arusha, Kampala, Kigali, and other regional cities." },
      { icon: Armchair, title: "Comfortable Reclining Seats", body: "Modern vehicles fitted with comfortable reclining seats for long-distance travel." },
      { icon: UserCheck, title: "Professional Long-Haul Drivers", body: "Experienced drivers trained for long routes, road conditions, and border crossings." },
      { icon: CalendarClock, title: "Flexible Scheduling", body: "Choose your own departure time and route, with options for direct or multi-stop trips." },
      { icon: Briefcase, title: "Corporate & Group Packages", body: "Tailored rates and dedicated vehicles for corporate, event, and group bookings." },
    ]}
    stepsHeading="Three Simple Steps to a Smooth Long Distance Trip"
    steps={[
      { n: "01", title: "Book your route and travel date", body: "Send us your start point, destination, date, and number of passengers." },
      { n: "02", title: "Driver picks you up at your location", body: "Door-to-door pickup at the time and address you provide, on the day of travel." },
      { n: "03", title: "Comfortable journey to your destination", body: "Relax in a well-maintained vehicle while our driver handles the route and timing." },
    ]}
    sections={[
      {
        kind: "icon-cards",
        kicker: "Popular Routes",
        heading: "Routes We Frequently Cover",
        items: [
          { icon: Route, title: "Nairobi to Mombasa", body: "Coastal transfers along the Mombasa Highway with rest stops as needed." },
          { icon: Route, title: "Nairobi to Kisumu", body: "Direct transfers to the lakeside city via the A104 route." },
          { icon: Route, title: "Nairobi to Nakuru", body: "Comfortable trips to Nakuru, the Rift Valley, and surrounding towns." },
          { icon: Route, title: "Nairobi to Arusha", body: "Cross-border travel to northern Tanzania and the Serengeti gateway." },
          { icon: Route, title: "Nairobi to Kampala", body: "Long-haul transfers into Uganda via the Malaba or Busia border crossings." },
          { icon: Route, title: "Nairobi to Kigali", body: "Regional cross-border journeys to the Rwandan capital." },
        ],
      },
    ]}
    coverage={{
      kicker: "Routes We Cover",
      heading: "Routes We Cover",
      body: "We operate long distance transfers across Kenya and into East Africa. Whether travelling for business, tourism, or personal reasons, our professional drivers ensure a safe and comfortable journey.",
    }}
    ctaHeading="Ready to Book Your Long Distance Transfer?"
  />
);

export default LongDistance;