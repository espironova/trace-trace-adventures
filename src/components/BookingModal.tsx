import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, User, Phone, MapPin, Calendar, Car, UserCheck, Wallet, Route, CalendarDays, Briefcase } from "lucide-react";
import WhatsAppIcon from "@/components/WhatsAppIcon";
import { serviceTypes, calculateEstimate, getServiceMeta, matchRateVehicle } from "@/data/rates";

interface BookingModalProps {
  open: boolean;
  onClose: () => void;
  /** Prefills vehicle type (e.g. from Fleet card: model + registration). */
  initialVehicleType?: string;
}

const vehicleTypes = [
  "Toyota Noah (Sedan)",
  "Toyota Hiace (Safari Van)",
  "Nissan NV350 (Van)",
  "Toyota Coaster (Bus)",
  "Isuzu Coaster (Bus)",
  "Ford Ranger 4x4",
  "Toyota Land Cruiser (Safari)",
  "Mercedes Tour Bus",
  "Golden Dragon Bus",
];

const BookingModal = ({ open, onClose, initialVehicleType }: BookingModalProps) => {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    pickup: "",
    dropoff: "",
    date: "",
    vehicleType: "",
    driver: "",
    serviceId: "",
    km: "",
    days: "1",
  });

  const vehicleOptions = useMemo(() => {
    if (initialVehicleType && !vehicleTypes.includes(initialVehicleType)) {
      return [initialVehicleType, ...vehicleTypes];
    }
    return vehicleTypes;
  }, [initialVehicleType]);

  useEffect(() => {
    if (!open || !initialVehicleType) return;
    setForm((prev) => ({ ...prev, vehicleType: initialVehicleType }));
  }, [open, initialVehicleType]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Map the chosen vehicle label to a rate-card id, then compute a live estimate.
  const rateVehicleId = useMemo(() => matchRateVehicle(form.vehicleType), [form.vehicleType]);
  const { needsKm, needsDays } = useMemo(
    () => getServiceMeta(rateVehicleId ?? "", form.serviceId),
    [rateVehicleId, form.serviceId],
  );
  const estimate = useMemo(
    () =>
      rateVehicleId
        ? calculateEstimate({
            vehicleId: rateVehicleId,
            serviceId: form.serviceId,
            km: form.km,
            days: form.days,
          })
        : null,
    [rateVehicleId, form.serviceId, form.km, form.days],
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const selectedService = serviceTypes.find((s) => s.id === form.serviceId);
    const lines: string[] = [
      `Hello Track & Trace Adventures!`,
      ``,
      `*Booking Request*`,
      `Name: ${form.name}`,
      `Phone: ${form.phone}`,
      `Pickup: ${form.pickup}`,
      `Drop-off: ${form.dropoff}`,
      `Date: ${form.date}`,
      `Vehicle: ${form.vehicleType}`,
    ];
    if (selectedService) lines.push(`Service: ${selectedService.name}`);
    if (needsKm && form.km) lines.push(`Distance: ${form.km} km`);
    if (needsDays && form.days) lines.push(`Days: ${form.days}`);
    lines.push(`Driver: ${form.driver}`);

    if (estimate) {
      lines.push(
        ``,
        `*Estimated Budget*`,
        `${estimate.breakdown}`,
        `Vehicle Cost: KES ${estimate.baseCost.toLocaleString()}`,
        `Driver Allowance: KES ${estimate.driverAllowance.toLocaleString()}`,
        `Estimated Total: KES ${estimate.total.toLocaleString()}`,
        `(Estimate excludes park entrance fees, parking, and accommodation.)`,
      );
    }

    const message = lines.join("\n");
    window.open(`https://wa.me/254721521009?text=${encodeURIComponent(message)}`, "_blank");
    onClose();
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
          onClick={onClose}
        >
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 30 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative w-full max-w-lg bg-card border border-border shadow-2xl overflow-hidden max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="bg-primary text-primary-foreground p-6 relative">
              <button
                onClick={onClose}
                className="absolute top-4 right-4 text-primary-foreground/60 hover:text-primary-foreground transition-colors"
                aria-label="Close booking form"
              >
                <X className="w-5 h-5" />
              </button>
              <p className="font-sans text-xs uppercase tracking-[0.3em] text-accent mb-1">Track & Trace Adventures</p>
              <h2 className="font-serif text-2xl">Book Your Ride</h2>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="p-6 space-y-5">
              {/* Name */}
              <div>
                <label className="flex items-center gap-2 font-sans text-xs uppercase tracking-[0.15em] text-muted-foreground mb-2 font-bold">
                  <User className="w-3.5 h-3.5 text-accent" /> Full Name
                </label>
                <input
                  type="text"
                  name="name"
                  required
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                  className="w-full border border-border bg-background px-4 py-3 font-sans text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-accent transition-colors"
                />
              </div>

              {/* Phone */}
              <div>
                <label className="flex items-center gap-2 font-sans text-xs uppercase tracking-[0.15em] text-muted-foreground mb-2 font-bold">
                  <Phone className="w-3.5 h-3.5 text-accent" /> Phone Number
                </label>
                <input
                  type="tel"
                  name="phone"
                  required
                  value={form.phone}
                  onChange={handleChange}
                  placeholder="+254 7XX XXX XXX"
                  className="w-full border border-border bg-background px-4 py-3 font-sans text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-accent transition-colors"
                />
              </div>

              {/* Pickup & Dropoff */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="flex items-center gap-2 font-sans text-xs uppercase tracking-[0.15em] text-muted-foreground mb-2 font-bold">
                    <MapPin className="w-3.5 h-3.5 text-accent" /> Pickup Location
                  </label>
                  <input
                    type="text"
                    name="pickup"
                    required
                    value={form.pickup}
                    onChange={handleChange}
                    placeholder="e.g. JKIA Airport"
                    className="w-full border border-border bg-background px-4 py-3 font-sans text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-accent transition-colors"
                  />
                </div>
                <div>
                  <label className="flex items-center gap-2 font-sans text-xs uppercase tracking-[0.15em] text-muted-foreground mb-2 font-bold">
                    <MapPin className="w-3.5 h-3.5 text-accent" /> Drop-off Location
                  </label>
                  <input
                    type="text"
                    name="dropoff"
                    required
                    value={form.dropoff}
                    onChange={handleChange}
                    placeholder="e.g. Nairobi CBD"
                    className="w-full border border-border bg-background px-4 py-3 font-sans text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-accent transition-colors"
                  />
                </div>
              </div>

              {/* Date */}
              <div>
                <label className="flex items-center gap-2 font-sans text-xs uppercase tracking-[0.15em] text-muted-foreground mb-2 font-bold">
                  <Calendar className="w-3.5 h-3.5 text-accent" /> Travel Date
                </label>
                <input
                  type="date"
                  name="date"
                  required
                  value={form.date}
                  onChange={handleChange}
                  className="w-full border border-border bg-background px-4 py-3 font-sans text-sm text-foreground focus:outline-none focus:border-accent transition-colors"
                />
              </div>

              {/* Vehicle Type */}
              <div>
                <label className="flex items-center gap-2 font-sans text-xs uppercase tracking-[0.15em] text-muted-foreground mb-2 font-bold">
                  <Car className="w-3.5 h-3.5 text-accent" /> Vehicle Type
                </label>
                <select
                  name="vehicleType"
                  required
                  value={form.vehicleType}
                  onChange={handleChange}
                  className="w-full border border-border bg-background px-4 py-3 font-sans text-sm text-foreground focus:outline-none focus:border-accent transition-colors appearance-none"
                >
                  <option value="">Select a vehicle</option>
                  {vehicleOptions.map((v) => (
                    <option key={v} value={v}>{v}</option>
                  ))}
                </select>
              </div>

              {/* Driver */}
              <div>
                <label className="flex items-center gap-2 font-sans text-xs uppercase tracking-[0.15em] text-muted-foreground mb-2 font-bold">
                  <UserCheck className="w-3.5 h-3.5 text-accent" /> Do You Need a Driver?
                </label>
                <div className="flex gap-4">
                  {["Yes", "No"].map((opt) => (
                    <label
                      key={opt}
                      className={`flex-1 border text-center py-3 font-sans text-sm font-bold uppercase tracking-wider cursor-pointer transition-all ${
                        form.driver === opt
                          ? "border-accent bg-accent text-accent-foreground"
                          : "border-border text-foreground hover:border-accent/50"
                      }`}
                    >
                      <input
                        type="radio"
                        name="driver"
                        value={opt}
                        checked={form.driver === opt}
                        onChange={handleChange}
                        className="sr-only"
                      />
                      {opt}
                    </label>
                  ))}
                </div>
              </div>

              <button
                type="submit"
                className="w-full inline-flex items-center justify-center gap-2 bg-accent text-accent-foreground py-4 font-sans text-sm uppercase tracking-[0.2em] font-bold hover:bg-accent/90 transition-colors"
              >
                <WhatsAppIcon className="w-5 h-5 shrink-0" />
                Send Booking via WhatsApp
              </button>

              <p className="text-center font-sans text-xs text-muted-foreground">
                Or call us directly: <a href="tel:+254721521009" className="text-accent font-bold">+254 721 521 009</a>
              </p>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default BookingModal;
