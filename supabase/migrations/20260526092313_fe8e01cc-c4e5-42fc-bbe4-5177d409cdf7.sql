
CREATE TABLE public.vehicle_rates (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  vehicle_key TEXT NOT NULL UNIQUE,
  name TEXT NOT NULL,
  sort_order INTEGER NOT NULL DEFAULT 0,
  day_rate_type TEXT NOT NULL DEFAULT 'fixed' CHECK (day_rate_type IN ('fixed','inquire')),
  base_day INTEGER NOT NULL DEFAULT 0,
  per_km_overage INTEGER NOT NULL DEFAULT 0,
  included_km INTEGER NOT NULL DEFAULT 120,
  starting_from INTEGER NOT NULL DEFAULT 0,
  airport INTEGER NOT NULL DEFAULT 0,
  hotel INTEGER NOT NULL DEFAULT 0,
  dinner INTEGER NOT NULL DEFAULT 0,
  cocktail INTEGER NOT NULL DEFAULT 0,
  standby INTEGER NOT NULL DEFAULT 0,
  driver_allowance INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.vehicle_rates ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view vehicle_rates" ON public.vehicle_rates FOR SELECT USING (true);
CREATE POLICY "Admins manage vehicle_rates" ON public.vehicle_rates FOR ALL TO authenticated
  USING (has_role(auth.uid(), 'admin'::app_role))
  WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

CREATE TRIGGER vehicle_rates_updated_at BEFORE UPDATE ON public.vehicle_rates
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

INSERT INTO public.vehicle_rates (vehicle_key, name, sort_order, day_rate_type, base_day, per_km_overage, included_km, starting_from, airport, hotel, dinner, cocktail, standby, driver_allowance) VALUES
('noah-5','5-Pax Toyota Noah Minivan',1,'fixed',12000,60,120,0,6000,6000,8000,8000,8000,2000),
('safari-8','8-Pax Safari Land Cruiser',2,'inquire',0,0,120,25000,15000,10000,10000,10000,10000,2500),
('van-8','8-Pax Safari Van',3,'inquire',0,80,120,20000,10000,12000,10000,12000,12000,2000),
('coaster-14','14-Pax Van',4,'fixed',14000,80,120,0,7000,8000,8000,10000,10000,2000),
('mercedes-22','22-Pax Coaster Shuttle',5,'fixed',17000,100,120,0,12000,12000,12000,12000,12000,2500),
('bus-33','33/37-Pax Mercedes Bus',6,'fixed',23000,130,120,0,15000,15000,15000,15000,15000,3000),
('bus-45','45-Pax Mercedes Bus',7,'fixed',35000,150,120,0,18000,18000,18000,15000,25000,4000);
