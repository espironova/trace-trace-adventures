import { useState } from "react";
import { motion } from "framer-motion";
import { Calculator, ChevronDown } from "lucide-react";
import { vehicles, serviceTypes, calculateEstimate } from "@/data/rates";

type Result = { baseCost: number; driverAllowance: number; total: number; breakdown: string } | null;

const RateCalculator = () => {
  const [vehicleId, setVehicleId] = useState("");
  const [serviceId, setServiceId] = useState("");
  const [km, setKm] = useState("");
  const [days, setDays] = useState("1");
  const [result, setResult] = useState<Result>(null);
  const [showRateSheet, setShowRateSheet] = useState(false);

  const selectedVehicle = vehicles.find((v) => v.id === vehicleId);
  const isLongDist = serviceId === "longDist";
  const needsKm = isLongDist && selectedVehicle?.longDist.type === "perKm";
  const needsDays = isLongDist || serviceId === "fullDay" || serviceId === "standby";

  const calculate = () => {
    const est = calculateEstimate({ vehicleId, serviceId, km, days });
    if (!est) return;
    setResult({
      baseCost: est.baseCost,
      driverAllowance: est.driverAllowance,
      total: est.total,
      breakdown: est.breakdown,
    });
  };

  return (
    <section className="py-24 bg-muted">
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
            Get an instant cost estimate for your trip. Select your vehicle and service type to calculate.
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
                  <label className="block font-sans text-xs uppercase tracking-wider text-muted-foreground mb-2">Distance (km), minimum 120 km</label>
                  <input type="number" min={120} value={km} onChange={(e) => { setKm(e.target.value); setResult(null); }} placeholder="e.g. 250" className="w-full bg-background border border-border px-4 py-3 font-sans text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-accent" />
                </div>
              )}

              {needsDays && (
                <div>
                  <label className="block font-sans text-xs uppercase tracking-wider text-muted-foreground mb-2">Number of Days</label>
                  <input type="number" min={1} value={days} onChange={(e) => { setDays(e.target.value); setResult(null); }} className="w-full bg-background border border-border px-4 py-3 font-sans text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-accent" />
                </div>
              )}

              <button
                onClick={calculate}
                disabled={!vehicleId || !serviceId}
                className="w-full bg-accent text-accent-foreground px-8 py-4 font-sans text-sm uppercase tracking-[0.15em] font-bold hover:bg-accent/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                <Calculator className="w-4 h-4" /> Calculate Estimate
              </button>
            </div>

            {result && (
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
                      <th className="px-3 py-3 font-bold text-xs uppercase tracking-wider text-center">Long Dist.</th>
                      <th className="px-3 py-3 font-bold text-xs uppercase tracking-wider text-center">Full Day</th>
                      <th className="px-3 py-3 font-bold text-xs uppercase tracking-wider text-center">Airport</th>
                      <th className="px-3 py-3 font-bold text-xs uppercase tracking-wider text-center">Hotel</th>
                      <th className="px-3 py-3 font-bold text-xs uppercase tracking-wider text-center">Dinner</th>
                      <th className="px-3 py-3 font-bold text-xs uppercase tracking-wider text-center">Cocktail</th>
                      <th className="px-3 py-3 font-bold text-xs uppercase tracking-wider text-center">Standby</th>
                      <th className="px-3 py-3 font-bold text-xs uppercase tracking-wider text-center">Driver</th>
                    </tr>
                  </thead>
                  <tbody>
                    {vehicles.map((v, i) => (
                      <tr key={v.id} className={i % 2 === 0 ? "bg-background" : "bg-muted"}>
                        <td className="px-4 py-3 font-bold text-foreground whitespace-nowrap">{v.name}</td>
                        <td className="px-3 py-3 text-center text-foreground/80">
                          {v.longDist.type === "perKm" ? `${v.longDist.rate}/km` : `${(v.longDist.rate / 1000).toFixed(0)}k/day`}
                        </td>
                        <td className="px-3 py-3 text-center text-foreground/80">{(v.fullDay / 1000).toFixed(0)}k</td>
                        <td className="px-3 py-3 text-center text-foreground/80">{(v.airport / 1000).toFixed(0)}k</td>
                        <td className="px-3 py-3 text-center text-foreground/80">{(v.hotel / 1000).toFixed(0)}k</td>
                        <td className="px-3 py-3 text-center text-foreground/80">{(v.dinner / 1000).toFixed(0)}k</td>
                        <td className="px-3 py-3 text-center text-foreground/80">{(v.cocktail / 1000).toFixed(0)}k</td>
                        <td className="px-3 py-3 text-center text-foreground/80">{(v.standby / 1000).toFixed(0)}k</td>
                        <td className="px-3 py-3 text-center text-accent font-bold">{(v.driverAllowance / 1000).toFixed(1)}k</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <p className="px-4 py-3 text-xs text-muted-foreground italic border-t border-border">
                  All rates in KES. Long distance minimum 120 km. Driver allowance charged per day. Park entrance fees, parking fees, and accommodation not included.
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
