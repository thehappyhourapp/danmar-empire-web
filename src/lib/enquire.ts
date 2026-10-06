/* Client side of the one submission path. Every form posts here, shows its
   result inline, and never navigates. */

export const DESK_EMAIL = "daniel@danmarempire.com";

export type EnquiryKind = "enquiry" | "client-access" | "capital-review";

export interface EnquiryPayload {
  kind: EnquiryKind;
  name: string;
  email: string;
  firm?: string;
  note?: string;
  listingRef?: string;
  /** labelled extras from a structured form, in the order they should read */
  fields?: [label: string, value: string][];
  /** honeypot; left empty by people */
  website?: string;
}

export type SubmitResult = "sent" | "unavailable" | "failed";

export async function submitEnquiry(payload: EnquiryPayload): Promise<SubmitResult> {
  try {
    const res = await fetch("/api/enquire", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    if (res.ok) return "sent";
    if (res.status === 503) return "unavailable";
    return "failed";
  } catch {
    return "failed";
  }
}

/** The fallback shown when the route is unavailable or a send fails: the desk
 *  address as selectable text, deliberately not a mailto link. */
export const DESK_ADDRESS_CLASS = "select-all font-medium text-forest";
