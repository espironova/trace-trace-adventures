import { useState } from "react";
import { motion } from "framer-motion";
import { Calculator, ChevronDown, Phone, MessageCircle } from "lucide-react";
import { vehicles, serviceTypes, calculateEstimate, getServiceMeta, INCLUDED_KM } from "@/data/rates";

type Result =
  | { kind: "calc"; baseCost: number; driverAllowance: number; total: number; breakdown: string }
  | { kind: "inquire"; vehicleName: string; startingFrom: number; breakdown: string }
  | null;

const RateCalculator = () => {
  const [vehicleId, setVehicleId] = useState("");
  const [serviceId, setServiceId] = useState("");
  const [km, setKm] = useState("");
  const [days, setDays] = useState("1");
  const [result, setResult] = useState<Result>(null);
  const [showRateSheet, setShowRateSheet] = useState(false);

  const { vehicle: selectedVehicle, needsKm, needsDays, inquire } = getServiceMeta(vehicleId, serviceId);

  const calculate = () => {
    const est = calculateEstimate({ vehicleId, serviceId, km, days });
    if (!est) return;
    if (est.inquire) {
      setResult({
        kind: "inquire",
        vehicleName: est.vehicleName,
        startingFrom: est.startingFrom ?? 0,
        breakdown: est.breakdown,
      });
    } else {
      setResult({
        kind: "calc",
        baseCost: est.baseCost,
        driverAllowance: est.driverAllowance,
        total: est.total,
        breakdown: est.breakdown,
      });
    }
  };

  return (
    <section id="rate-calculator" className="py-24 bg-muted scroll-mt-24">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
          className="text-center mb-12"
        >
          <p className="font-sans text-sm uppercase tracking-[0.3em] text-accent mb-3">Plan Your Budget</p>
          <h2 className="font-serif text-3xl md:text-5xl text-foreground mb-4">Rate Calculator</h2>
          <p className="font-sans text-muted-foreground max-w-2xl mx-auto">
            2027 rates. Day rate covers the first {INCLUDED_KM} km. Extra km is billed at each vehicle's per-km rate.
            Land Cruiser and 8-Pax Safari Van full-day and long-distance pricing is on inquiry.
          </p>
        </motion.div>

        <div className="max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-card border border-border p-8"
          >
            <div className="space-y-5">
              <div>
                <label className="block font-sans text-xs uppercase tracking-wider text-muted-foreground mb-2">Vehicle Type</label>
                <select value={vehicleId} onChange={(e) => { setVehicleId(e.target.value); setResult(null); }} className="w-full bg-background border border-border px-4 py-3 font-sans text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-accent">
                  <option value="">Select a vehicle...</option>
                  {vehicles.map((v) => <option key={v.id} value={v.id}>{v.name}</option>)}
                </select>
              </div>

              <div>
                <label className="block font-sans text-xs uppercase tracking-wider text-muted-foreground mb-2">Service Type</label>
                <select value={serviceId} onChange={(e) => { setServiceId(e.target.value); setResult(null); }} className="w-full bg-background border border-border px-4 py-3 font-sans text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-accent">
                  <option value="">Select a service...</option>
                  {serviceTypes.map((s) => <option key={s.id} value={s.id}>{s.name}</option>)}
                </select>
              </div>

              {needsKm && (
                <div>
                  <label className="block font-sans text-xs uppercase tracking-wider text-muted-foreground mb-2">
                    Distance (km) per day
                  </label>
                  <input type="number" min={0} value={km} onChange={(e) => { setKm(e.target.value); setResult(null); }} placeholder={`e.g. 140 (first ${INCLUDED_KM} km included)`} className="w-full bg-background border border-border px-4 py-3 font-sans text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-accent" />
                  <p className="mt-1.5 font-sans text-[11px] text-muted-foreground italic">
                    First {INCLUDED_KM} km included in the day rate. Extra km billed at this vehicle's per-km rate.
                  </p>
                </div>
              )}

              {needsDays && (
                <div>
                  <label className="block font-sans text-xs uppercase tracking-wider text-muted-foreground mb-2">Number of Days</label>
                  <input type="number" min={1} value={days} onChange={(e) => { setDays(e.target.value); setResult(null); }} className="w-full bg-background border border-border px-4 py-3 font-sans text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-accent" />
                </div>
              )}

              {inquire && selectedVehicle && (
                <div className="border border-accent/30 bg-accent/5 px-4 py-3">
                  <p className="font-sans text-xs text-foreground/80">
                    {selectedVehicle.name} day rate is on inquiry. Starts from{" "}
                    <span className="font-bold text-accent">
                      KES {selectedVehicle.dayRate.type === "inquire" ? selectedVehicle.dayRate.startingFrom.toLocaleString() : ""}
                    </span>{" "}
                    per day. Tap calculate to see contact options.
                  </p>
                </div>
              )}

              <button
                onClick={calculate}
                disabled={!vehicleId || !serviceId}
                className="w-full bg-accent text-accent-foreground px-8 py-4 font-sans text-sm uppercase tracking-[0.15em] font-bold hover:bg-accent/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                <Calculator className="w-4 h-4" /> {inquire ? "Get Quote Options" : "Calculate Estimate"}
              </button>
            </div>

            {result && result.kind === "calc" && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                className="mt-6 border-t border-border pt-6 space-y-3"
              >
                <p className="font-sans text-xs text-muted-foreground">{result.breakdown}</p>
                <div className="flex justify-between font-sans text-sm">
                  <span className="text-foreground/70">Vehicle Cost</span>
                  <span className="text-foreground font-bold">KES {result.baseCost.toLocaleString()}</span>
                </div>
                <div className="flex justify-between font-sans text-sm">
                  <span className="text-foreground/70">Driver Allowance</span>
                  <span className="text-foreground font-bold">KES {result.driverAllowance.toLocaleString()}</span>
                </div>
                <div className="flex justify-between font-sans text-lg border-t border-border pt-3">
                  <span className="text-foreground font-bold">Estimated Total</span>
                  <span className="text-accent font-bold font-serif">KES {result.total.toLocaleString()}</span>
                </div>
                <p className="font-sans text-xs text-muted-foreground italic">
                  * Excludes park entrance fees, parking fees, and accommodation. Contact us for a detailed quote.
                </p>
              </motion.div>
            )}

            {result && result.kind === "inquire" && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                className="mt-6 border-t border-border pt-6 space-y-4"
              >
                <div>
                  <p className="font-sans text-xs uppercase tracking-[0.2em] text-accent font-bold mb-2">Inquiry Required</p>
                  <p className="font-serif text-2xl text-foreground">
                    Starting from <span className="text-accent">KES {result.startingFrom.toLocaleString()}</span>
                    <span className="font-sans text-sm text-muted-foreground"> / day</span>
                  </p>
                  <p className="font-sans text-sm text-muted-foreground mt-2">
                    {result.vehicleName} pricing depends on route, season, and trip requirements. Reach out for a tailored quote.
                  </p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <a
                    href={`https://wa.me/254721521009?text=${encodeURIComponent(`Hello Track & Trace, I'd like a quote for the ${result.vehicleName} (full-day / long-distance).`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 bg-accent text-accent-foreground py-3 font-sans text-xs uppercase tracking-[0.15em] font-bold hover:bg-accent/90 transition-colors"
                  >
                    <MessageCircle className="w-4 h-4" /> WhatsApp Us
                  </a>
                  <a
                    href="tel:+254721521009"
                    className="inline-flex items-center justify-center gap-2 border border-accent text-accent py-3 font-sans text-xs uppercase tracking-[0.15em] font-bold hover:bg-accent/10 transition-colors"
                  >
                    <Phone className="w-4 h-4" /> +254 721 521 009
                  </a>
                </div>
                <p className="font-sans text-xs text-muted-foreground italic">
                  * Excludes park entrance fees, parking fees, and accommodation.
                </p>
              </motion.div>
            )}
          </motion.div>

          {/* Rate Sheet Toggle */}
          <div className="mt-8">
            <button
              onClick={() => setShowRateSheet(!showRateSheet)}
              className="w-full flex items-center justify-between bg-card border border-border px-6 py-4 font-sans text-sm uppercase tracking-wider text-foreground hover:bg-muted transition-colors"
            >
              <span className="font-bold">View Full Rate Sheet</span>
              <ChevronDown className={`w-5 h-5 transition-transform ${showRateSheet ? "rotate-180" : ""}`} />
            </button>

            {showRateSheet && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="bg-card border border-t-0 border-border overflow-x-auto"
              >
                <table className="w-full text-sm font-sans">
                  <thead>
                    <tr className="bg-primary text-primary-foreground">
                      <th className="text-left px-4 py-3 font-bold text-xs uppercase tracking-wider">Vehicle</th>
                      <th className="px-3 py-3 font-bold text-xs uppercase tracking-wider text-center">Day Rate (first 120 km)</th>
                      <th className="px-3 py-3 font-bold text-xs uppercase tracking-wider text-center">Extra km</th>
                      <th className="px-3 py-3 font-bold text-xs uppercase tracking-wider text-center">Airport</th>
                      <th className="px-3 py-3 font-bold text-xs uppercase tracking-wider text-center">Hotel</th>
                      <th className="px-3 py-3 font-bold text-xs uppercase tracking-wider text-center">Dinner</th>
                      <th className="px-3 py-3 font-bold text-xs uppercase tracking-wider text-center">Cocktail</th>
                      <th className="px-3 py-3 font-bold text-xs uppercase tracking-wider text-center">Standby</th>
                      <th className="px-3 py-3 font-bold text-xs uppercase tracking-wider text-center">Driver / day</th>
                    </tr>
                  </thead>
                  <tbody>
                    {vehicles.map((v, i) => (
                      <tr key={v.id} className={i % 2 === 0 ? "bg-background" : "bg-muted"}>
                        <td className="px-4 py-3 font-bold text-foreground whitespace-nowrap">{v.name}</td>
                        <td className="px-3 py-3 text-center text-foreground/80">
                          {v.dayRate.type === "fixed"
                            ? `${(v.dayRate.baseDay / 1000).toFixed(0)}k`
                            : `From ${(v.dayRate.startingFrom / 1000).toFixed(0)}k`}
                        </td>
                        <td className="px-3 py-3 text-center text-foreground/80">
                          {v.dayRate.type === "fixed" ? `${v.dayRate.perKmOverage}/km` : "Inquire"}
                        </td>
                        <td className="px-3 py-3 text-center text-foreground/80">{(v.airport / 1000).toFixed(0)}k</td>
                        <td className="px-3 py-3 text-center text-foreground/80">{(v.hotel / 1000).toFixed(0)}k</td>
                        <td className="px-3 py-3 text-center text-foreground/80">{(v.dinner / 1000).toFixed(0)}k</td>
                        <td className="px-3 py-3 text-center text-foreground/80">{(v.cocktail / 1000).toFixed(0)}k</td>
                        <td className="px-3 py-3 text-center text-foreground/80">{(v.standby / 1000).toFixed(0)}k</td>
                        <td className="px-3 py-3 text-center text-accent font-bold whitespace-nowrap">KES {v.driverAllowance.toLocaleString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <p className="px-4 py-3 text-xs text-muted-foreground italic border-t border-border">
                  All rates in KES. Day rate (Full-Day Disposal and Long Distance) covers the first 120 km. Extra km billed at the vehicle's per-km rate. Driver allowance charged per day. Park entrance fees, parking, and accommodation not included.
                </p>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default RateCalculator;
