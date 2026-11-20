export const CONTACT_EMAIL = "info@tracktraceadventures.co.ke";

export const serviceLabels: Record<string, string> = {
  "airport-transfer": "Airport Transfer",
  "safari-tour": "Safari Tour",
  "car-hire": "Car Hire / Van Hire",
  "long-distance": "Long Distance Transfer",
  "sgr-transfer": "SGR Transfers",
  "travel-consultation": "Travel Consultation",
  corporate: "Corporate Transport",
  "leave-review": "Leave a review",
  other: "Other",
};

export type ContactForm = {
  name: string;
  email: string;
  phone: string;
  service: string;
  message: string;
};

export type ContactPayload = {
  name: string;
  email: string;
  phone: string;
  service: string;
  service_label: string;
  message: string;
};

export function serviceLabelFor(service: string): string {
  if (!service) return "General inquiry";
  return serviceLabels[service] ?? service;
}

export function buildContactPayload(form: ContactForm): ContactPayload {
  return {
    name: form.name.trim().slice(0, 120),
    email: form.email.trim().slice(0, 200),
    phone: (form.phone || "").trim().slice(0, 40),
    service: form.service,
    service_label: serviceLabelFor(form.service).slice(0, 80),
    message: form.message.trim().slice(0, 4000),
  };
}
