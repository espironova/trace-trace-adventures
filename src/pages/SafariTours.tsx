import { Compass, UserCheck, MapPinned, CalendarRange, Sparkles, Globe2 } from "lucide-react";
import ServiceDetailPage from "@/components/ServiceDetailPage";
import hero from "@/assets/fleet-landcruiser.jpg";
import maasaiMara from "@/assets/maasai-mara.jpg";
import amboseli from "@/assets/amboseli.jpg";
import lakeNakuru from "@/assets/lake-nakuru.jpg";
import tsavo from "@/assets/tsavo.jpg";
import samburu from "@/assets/samburu.jpg";
import bwindi from "@/assets/bwindi.jpg";

const SafariTours = () => (
  <ServiceDetailPage
    serviceId="safari-tours"
    heroImage={hero}
    heroAlt="Toyota Land Cruiser safari vehicle on game drive in East Africa"
    heroKicker="Safari Tours"
    heroTitle="Safari Tours & Wildlife Packages, East Africa"
    heroSubtitle="Explore Kenya's iconic national parks and game reserves in our 4x4 Land Cruisers. Custom itineraries, experienced guides, unforgettable experiences."
    highlightsHeading="Crafted for Memorable Safaris"
    highlights={[
      { icon: Compass, title: "4x4 Land Cruisers with Pop-Up Roofs", body: "Purpose-built safari vehicles giving every passenger a clear view for game drives and photography." },
      { icon: UserCheck, title: "Experienced Safari Guides", body: "Knowledgeable local guides who know the parks, the wildlife, and the best routes." },
      { icon: MapPinned, title: "Custom Itineraries", body: "Every safari tailored to your interests, pace, budget, and preferred destinations." },
      { icon: CalendarRange, title: "2 to 7 Day Packages", body: "Short getaways or extended expeditions across multiple parks and reserves." },
      { icon: Sparkles, title: "All-Inclusive Options Available", body: "Accommodation, meals, park fees, and game drives bundled for a seamless experience." },
      { icon: Globe2, title: "Kenya & East Africa Coverage", body: "Safaris across Kenya, Tanzania, Uganda, and Rwanda with cross-border logistics handled." },
    ]}
    stepsHeading="Three Simple Steps to Your Safari"
    steps={[
      { n: "01", title: "Tell us your dates and interests", body: "Share your travel window, preferred parks, group size, and what you want to see." },
      { n: "02", title: "We build your custom safari itinerary", body: "Our team designs a day-by-day plan with vehicles, guides, lodging, and park fees included." },
      { n: "03", title: "Pick up from your hotel and begin your adventure", body: "Your guide collects you and your group, briefs you, and the safari begins." },
    ]}
    sections={[
      {
        kind: "image-cards",
        kicker: "Popular Destinations",
        heading: "Iconic Parks and Reserves",
        items: [
          { img: maasaiMara, title: "Maasai Mara", body: "World-famous for the Great Migration and abundant big cat sightings.", alt: "Wildlife on Maasai Mara safari plains" },
          { img: amboseli, title: "Amboseli", body: "Vast elephant herds with the stunning backdrop of Mount Kilimanjaro.", alt: "Elephants at Amboseli National Park with Kilimanjaro" },
          { img: lakeNakuru, title: "Lake Nakuru", body: "Famous for flamingos, rhinos, and dramatic Rift Valley landscapes.", alt: "Flamingos at Lake Nakuru National Park" },
          { img: tsavo, title: "Tsavo", body: "Kenya's largest park, known for red elephants and wild, untouched terrain.", alt: "Red elephants in Tsavo National Park" },
          { img: samburu, title: "Samburu", body: "Unique northern species and rugged beauty along the Ewaso Nyiro river.", alt: "Samburu National Reserve wildlife" },
          { img: bwindi, title: "Bwindi", body: "Gorilla trekking through the ancient Bwindi Impenetrable Forest in Uganda.", alt: "Bwindi Impenetrable Forest gorilla trekking" },
        ],
      },
    ]}
    coverage={{
      kicker: "Where We Go",
      heading: "Where We Go",
      body: "We operate safaris across Kenya, Tanzania, Uganda, and Rwanda. Popular routes include Maasai Mara, Amboseli, Serengeti, Bwindi Impenetrable Forest, and Akagera National Park.",
    }}
    ctaHeading="Ready to Plan Your Safari?"
  />
);

export default SafariTours;