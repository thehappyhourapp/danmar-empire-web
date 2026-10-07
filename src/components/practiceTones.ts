/** The page's own styling tokens, for custom blocks built outside the template. */
export function practiceTones(tone: "forest" | "cream") {
  const dark = tone === "forest";
  return {
    dark,
    body: dark ? "text-paper/80" : "text-ink/80",
    meta: dark ? "text-paper/70" : "text-ink/70",
    rule: dark ? "border-paper/12" : "border-forest/14",
    brass: dark ? "text-brass-light" : "text-brass",
    link: dark ? "text-paper" : "text-forest",
  };
}
