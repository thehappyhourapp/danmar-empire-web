/* Until the site has a form backend, both the enquire drawer and the client
   access request hand off to the visitor's email app. This is on the
   launch-blocking list in docs/launch-blocking.md: replace it with a real
   submission path before launch. */

export const DESK_EMAIL = "daniel@danmarempire.com";

/** Opens the visitor's email app with a prefilled message to the desk. */
export function sendByMail(subject: string, fields: [string, string][]) {
  const body = fields
    .filter(([, v]) => v.trim())
    .map(([k, v]) => `${k}: ${v.trim()}`)
    .join("\n");
  window.location.href = `mailto:${DESK_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}
