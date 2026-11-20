import { describe, it, expect } from "vitest";
import {
  buildContactPayload,
  serviceLabelFor,
} from "@/lib/contact-payload";

describe("contact form payload", () => {
  it("maps a known service key to its display label", () => {
    expect(serviceLabelFor("safari-tour")).toBe("Safari Tour");
  });

  it("falls back to General inquiry when no service is chosen", () => {
    expect(serviceLabelFor("")).toBe("General inquiry");
  });

  it("keeps a custom service value the visitor typed", () => {
    expect(serviceLabelFor("Wedding Shuttle")).toBe("Wedding Shuttle");
  });

  it("trims the saved fields and records the service label", () => {
    const payload = buildContactPayload({
      name: "  Jane Doe  ",
      email: "  jane@example.com ",
      phone: "",
      service: "safari-tour",
      message: "  Hello  ",
    });
    expect(payload.name).toBe("Jane Doe");
    expect(payload.email).toBe("jane@example.com");
    expect(payload.phone).toBe("");
    expect(payload.message).toBe("Hello");
    expect(payload.service_label).toBe("Safari Tour");
  });

  it("never stores more than 120 characters of name", () => {
    const payload = buildContactPayload({
      name: "a".repeat(500),
      email: "jane@example.com",
      phone: "+254700000000",
      service: "car-hire",
      message: "hi",
    });
    expect(payload.name).toHaveLength(120);
  });

  it("never stores more than 4000 characters of message", () => {
    const payload = buildContactPayload({
      name: "Jane",
      email: "jane@example.com",
      phone: "+254700000000",
      service: "car-hire",
      message: "x".repeat(9000),
    });
    expect(payload.message).toHaveLength(4000);
  });

  it("saves an empty phone as blank, not undefined", () => {
    const payload = buildContactPayload({
      name: "Jane",
      email: "jane@example.com",
      phone: "",
      service: "",
      message: "Hello",
    });
    expect(payload.phone).toBe("");
    expect(payload.service_label).toBe("General inquiry");
  });
});
