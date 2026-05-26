"use client";
import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, User, Phone, MapPin, Calendar, Car, UserCheck, Wallet, Route, CalendarDays, Briefcase, Mail } from "lucide-react";
import WhatsAppIcon from "@/components/WhatsAppIcon";
import { serviceTypes, calculateEstimate, getServiceMeta, matchRateVehicle } from "@/data/rates";
import { useVehicleRates } from "@/hooks/useVehicleRates";

interface BookingModalProps {
  open: boolean;
  onClose: () => void;
  /** Prefills vehicle type (e.g. from Fleet card: model + registration). */
  initialVehicleType?: string;
  /** Prefills service type (e.g. from QR landing tile). Must match an id in serviceTypes. */
  initialServiceId?: string;
}

const vehicleTypes = [
  "5-Pax Toyota Noah Minivan",
  "8-Pax Safari Land Cruiser",
  "8-Pax Safari Van",
  "14-Pax Van",
  "22-Pax Coaster Shuttle",
  "33/37-Pax Mercedes Bus",
  "45-Pax Mercedes Bus",
];

const BookingModal = ({ open, onClose, initialVehicleType, initialServiceId }: BookingModalProps) => {
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

  useEffect(() => {
    if (!open || !initialServiceId) return;
    setForm((prev) => ({ ...prev, serviceId: initialServiceId }));
  }, [open, initialServiceId]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const { vehicles: rateVehicles } = useVehicleRates();

  // Map the chosen vehicle label to a rate-card id, then compute a live estimate.
  const rateVehicleId = useMemo(() => matchRateVehicle(form.vehicleType), [form.vehicleType]);
  const { needsKm, needsDays } = useMemo(
    () => getServiceMeta(rateVehicleId ?? "", form.serviceId, rateVehicles),
    [rateVehicleId, form.serviceId, rateVehicles],
  );
  const estimate = useMemo(
    () =>
      rateVehicleId
        ? calculateEstimate({
            vehicleId: rateVehicleId,
            serviceId: form.serviceId,
            km: form.km,
            days: form.days,
          }, rateVehicles)
        : null,
    [rateVehicleId, form.serviceId, form.km, form.days, rateVehicles],
  );

  const buildBookingMessage = () => {
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

    if (estimate && estimate.inquire) {
      lines.push(
        ``,
        `*Quote Request*`,
        `Pricing on inquiry for ${estimate.vehicleName}.`,
        `Indicative starting price: KES ${(estimate.startingFrom ?? 0).toLocaleString()} / day.`,
        `Please confirm a tailored quote.`,
      );
    } else if (estimate) {
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
    return lines.join("\n");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const message = buildBookingMessage();
    window.open(`https://wa.me/254721521009?text=${encodeURIComponent(message)}`, "_blank");
    onClose();
  };

  const mailtoHref = useMemo(() => {
    const subject = `Booking Request - ${form.name || "New Booking"}${form.vehicleType ? ` - ${form.vehicleType}` : ""}${form.date ? ` - ${form.date}` : ""}`;
    const body = buildBookingMessage();
    return `mailto:info@tracktraceadventures.co.ke?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [form, estimate, needsKm, needsDays]);

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

              {/* Service Type (drives budget estimate) */}
              <div>
                <label className="flex items-center gap-2 font-sans text-xs uppercase tracking-[0.15em] text-muted-foreground mb-2 font-bold">
                  <Briefcase className="w-3.5 h-3.5 text-accent" /> Service Type
                </label>
                <select
                  name="serviceId"
                  value={form.serviceId}
                  onChange={handleChange}
                  className="w-full border border-border bg-background px-4 py-3 font-sans text-sm text-foreground focus:outline-none focus:border-accent transition-colors appearance-none"
                >
                  <option value="">Select a service (for budget estimate)</option>
                  {serviceTypes.map((s) => (
                    <option key={s.id} value={s.id}>{s.name}</option>
                  ))}
                </select>
              </div>

              {(needsKm || needsDays) && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {needsKm && (
                    <div>
                      <label className="flex items-center gap-2 font-sans text-xs uppercase tracking-[0.15em] text-muted-foreground mb-2 font-bold">
                        <Route className="w-3.5 h-3.5 text-accent" /> Distance (km)
                      </label>
                      <input
                        type="number"
                        name="km"
                        min={0}
                        value={form.km}
                        onChange={handleChange}
                        placeholder="e.g. 140 (first 120 km included)"
                        className="w-full border border-border bg-background px-4 py-3 font-sans text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-accent transition-colors"
                      />
                    </div>
                  )}
                  {needsDays && (
                    <div>
                      <label className="flex items-center gap-2 font-sans text-xs uppercase tracking-[0.15em] text-muted-foreground mb-2 font-bold">
                        <CalendarDays className="w-3.5 h-3.5 text-accent" /> Number of Days
                      </label>
                      <input
                        type="number"
                        name="days"
                        min={1}
                        value={form.days}
                        onChange={handleChange}
                        className="w-full border border-border bg-background px-4 py-3 font-sans text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-accent transition-colors"
                      />
                    </div>
                  )}
                </div>
              )}

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

              {/* Live Budget Estimate */}
              {estimate && estimate.inquire && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="border border-accent/40 bg-accent/5 p-5 space-y-2"
                >
                  <div className="flex items-center gap-2 mb-1">
                    <Wallet className="w-4 h-4 text-accent" />
                    <p className="font-sans text-xs uppercase tracking-[0.2em] text-accent font-bold">Custom Quote</p>
                  </div>
                  <p className="font-sans text-sm text-foreground/80">
                    {estimate.vehicleName} pricing for full-day and long-distance is on inquiry. Starts from{" "}
                    <span className="text-accent font-bold">KES {(estimate.startingFrom ?? 0).toLocaleString()}</span> per day.
                  </p>
                  <p className="font-sans text-[11px] text-muted-foreground italic pt-1">
                    Send this booking and our team will confirm the exact quote on WhatsApp.
                  </p>
                </motion.div>
              )}

              {estimate && !estimate.inquire && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="border border-accent/40 bg-accent/5 p-5 space-y-2"
                >
                  <div className="flex items-center gap-2 mb-1">
                    <Wallet className="w-4 h-4 text-accent" />
                    <p className="font-sans text-xs uppercase tracking-[0.2em] text-accent font-bold">Estimated Budget</p>
                  </div>
                  <p className="font-sans text-xs text-muted-foreground">{estimate.breakdown}</p>
                  <div className="flex justify-between font-sans text-sm">
                    <span className="text-foreground/70">Vehicle Cost</span>
                    <span className="text-foreground font-bold">KES {estimate.baseCost.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between font-sans text-sm">
                    <span className="text-foreground/70">Driver Allowance</span>
                    <span className="text-foreground font-bold">KES {estimate.driverAllowance.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between font-sans text-base border-t border-accent/30 pt-2">
                    <span className="text-foreground font-bold">Estimated Total</span>
                    <span className="text-accent font-bold font-serif">KES {estimate.total.toLocaleString()}</span>
                  </div>
                  <p className="font-sans text-[11px] text-muted-foreground italic pt-1">
                    Excludes park entrance fees, parking, and accommodation. Final quote confirmed via WhatsApp.
                  </p>
                </motion.div>
              )}

              <p className="text-center font-sans text-xs text-muted-foreground">
                Corporate clients can also book via email.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <button
                  type="submit"
                  className="inline-flex items-center justify-center gap-2 bg-accent text-accent-foreground py-4 font-sans text-xs uppercase tracking-[0.18em] font-bold hover:bg-accent/90 transition-colors"
                >
                  <WhatsAppIcon className="w-5 h-5 shrink-0" />
                  Book via WhatsApp
                </button>
                <a
                  href={mailtoHref}
                  onClick={(e) => {
                    const formEl = (e.currentTarget.closest("form") as HTMLFormElement | null);
                    if (formEl && !formEl.checkValidity()) {
                      e.preventDefault();
                      formEl.reportValidity();
                      return;
                    }
                    setTimeout(() => onClose(), 100);
                  }}
                  className="inline-flex items-center justify-center gap-2 border border-accent text-accent bg-transparent py-4 font-sans text-xs uppercase tracking-[0.18em] font-bold hover:bg-accent/10 transition-colors"
                >
                  <Mail className="w-5 h-5 shrink-0" />
                  Book via Email
                </a>
              </div>

              <p className="text-center font-sans text-[11px] text-muted-foreground italic">
                If your email app does not open, write to{" "}
                <a href="mailto:info@tracktraceadventures.co.ke" className="text-accent font-bold not-italic">
                  info@tracktraceadventures.co.ke
                </a>
              </p>

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
