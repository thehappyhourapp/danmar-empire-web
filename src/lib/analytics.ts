/* Analytics. The site has no provider yet (docs/launch-blocking.md), so track()
   is a no-op that keeps the event names and payloads in one place. When a
   provider is chosen, wire it here and nowhere else. Never send personal data:
   events carry categories (a value band, a question number), not names, emails
   or figures. */

export type EventName =
  | "capital_review_cta_click"
  | "estimator_interacted"
  | "estimator_completed"
  | "capital_form_submitted"
  | "faq_opened";

export type EventProps = Record<string, string | number | boolean | undefined>;

export function track(name: EventName, props: EventProps = {}): void {
  if (process.env.NODE_ENV === "development" && typeof window !== "undefined") {
    // visible while developing, silent in production until a provider exists
    console.debug("[track]", name, props);
  }
}
