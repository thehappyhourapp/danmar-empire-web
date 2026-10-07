# Brief: /firm story, /firm/[slug] biography pages, team corrections, testimonials, first photos

Prompt "i". Read CLAUDE.md (Design DNA) and DESIGN.md first; they govern. This brief adds
content and two small data-model extensions. It does not change the templates' geometry.

## 0. Rule for this pass: nothing about a real person that Daniel did not supply

The current TEAM bios in src/lib/data.ts contain copywriting that no one confirmed
("knows which street a family actually wants", "sets the standard for how every Danmar
listing is presented", "handles the firm's new-construction practice", "Founded the firm in
2016", "three decades"). These are real, RECO-registered people; invented specifics about
them are an advertising-compliance problem, not a tone problem.

For every person: keep slug, name, role, email, tel. Keep only the creds Daniel supplied
(listed below). Delete every `line`, `focus`, `areas` and `bio` string that is not traceable
to this brief. The Person view already omits absent fields; a short page is correct, a
fabricated one is not. Move each deleted claim into docs/CONFIRM.md under "/firm/[slug]" so
Daniel can confirm or strike it.

## 1. /firm story

Danmar is a family firm. The name is the founders: **Dan** (Daniel Sheikhan) and **Mar**
(Martin Sheikhan), son and father. Say this plainly on /firm; it is the one story the page
has and it is true.

- H1 stays or tightens; the italic brass line should carry the name's origin or the
  father-and-son fact, not "Oakville first, since 2016" unless the founding year is
  confirmed (see CONFIRM). Suggested: "Dan and Mar. A father, a son, and the firm they named
  after themselves." Keep it to one italic line.
- Opening row (cols 7-12): the name, the two founders, what each brought. Martin: a career
  running large capital projects before real estate (facts in §3). Daniel: lawyer and broker.
  The firm's habit of running files like a practice comes from those two backgrounds. No
  invented dates, no invented office history.
- Facts strip: remove "Founded 2016, Oakville" unless confirmed; "Offices Oakville ·
  Vaughan" is fine (OFFICES data).
- Team grid stays, then a new **testimonials** block (§5), then the close.

## 2. Person data model

Extend `Person` in src/lib/data.ts (all optional):

```ts
background?: string[];     // paragraphs, plain prose
education?: string[];      // one line each: "J.D., <school>" — only what is supplied
certifications?: string[]; // replaces/extends creds for display; keep `creds` as alias if simpler
experience?: string[];     // one line each
achievements?: string[];   // one line each
links?: { label: string; href: string }[]; // LinkedIn, Instagram
portrait?: string;         // "/photos/people/<slug>.jpg"; absent = emblem filler
```

Person view: after the role line and the biography, render these as full-width rows in
this order, each only when present: **Background · Education · Certifications ·
Experience · Achievements**. Title cols 1-5, content cols 7-12, stacks at 390. One line per
item, no bullets glyphs, line-rise only. Links row last, text links, `rel="noopener"`,
external, no icons. Person JSON-LD: add `sameAs` from links, `alumniOf` from education if a
school is named, `hasCredential` from certifications.

Portrait frame: if `portrait` is set, `<Image>` 4:5, sized, `priority` on the person page
only. If absent, keep the flat frame and set the emblem (the 30px header mark, scaled, single
colour) centred at low opacity on the page ground: forest/8 on cream. This is deliberate for
Anna Shea (declines a published headshot) and temporary for Sara Sheikhan.

## 3. Team corrections and supplied facts

Order on /firm: Martin, Daniel, Sara, Anita, Anna, Mahmoud, Marion.

**Martin Sheikhan, PMP** — role: "Broker of Record · Real Estate Broker · Partner".
Supplied facts: Project Management Professional (PMP); published author; headed
multi-billion-dollar projects in the pharmaceutical industry; began about forty-five years
ago in tablet formulation. Write background from these only; "three decades" is wrong,
replace. Martin will supply a short snippet of his own; leave `background` with these facts
in plain prose until it arrives, and do not add a founding year.

**Daniel Sheikhan, B.Comm., J.D.** — role: "Partner · Barrister & Solicitor · Attorney ·
Real Estate Broker" (any order is acceptable; keep "Managing Partner" out unless Daniel
re-confirms it). Keep the creds already in data.ts (Ontario bar, New York, Minnesota,
B.Comm., J.D., 2021 International Negotiation Competition first place, Minnesota Qualified
Neutral) — these were supplied earlier. Keep the line "He acts for clients of the firm as a
real estate broker, not as their solicitor." Link: https://www.linkedin.com/in/danielsheikhan/.
Daniel will supply his own bio; the page carries creds and that line until then.

**Sara Sheikhan** — role: "Real Estate Salesperson · Property Manager". Delete the
photography/listing-presentation bio (unconfirmed). On /property-management, the "who runs
it" row may name Sara as Property Manager; do that.

**Anita Tayi** — role: "Sales Representative". Daniel supplied a full bio in his own words;
it is held in photos-inbox/copy/anita-bio.txt when he drops it [PASTE — not yet in the
repo]. Until that file exists, `bio` is empty. Links:
https://www.instagram.com/anitatayi/ and https://www.linkedin.com/in/anita-tayi-61168912a/.
Delete the current invented bio and focus.

**Anna Shea** — role: "Sales Representative". No headshot, by her choice: emblem filler.
Delete the new-construction bio and focus (unconfirmed).

**Mahmoud Abu Hudra** — role: "Sales Representative". Delete the leasing/industrial bio and
focus (unconfirmed). Headshot supplied.

**Marion Miral** — role: "Administration". Headshot supplied. No bio.

Lailyn / Leyland Chusan: confirm absent everywhere (grep).

Emails unchanged. Phones: keep only numbers already in data.ts.

## 4. Photos (first pass of the pipeline)

Source: photos-inbox/ (gitignored). Output: public/photos/, committed. Use sharp (add as a
devDependency if absent) in a script at scripts/photos.mjs, idempotent, re-runnable.

- people/<slug>/*.png → public/photos/people/<slug>.jpg, crop to 4:5 centred on the upper
  third, 800w and 1600w (`<slug>.jpg`, `<slug>@2x.jpg`), sRGB, quality 82, EXIF stripped.
  Set `portrait` for martin-sheikhan, daniel-sheikhan, anita-tayi, mahmoud-abu-hudra,
  marion-miral. Not anna-shea, not sara-sheikhan.
- offices/ → one image per office: Oakville.jpg → public/photos/offices/oakville.jpg,
  Vaughan.jpg → public/photos/offices/vaughan.jpg (pick "Oakville 2.png" instead only if
  Oakville.jpg is interior or lower quality; say which you chose). 16:10, 1600w, same
  export rules. Show them on /contact beside the OFFICES rows (one frame per city; the two
  Oakville addresses share one photo) and nowhere else for now.
- listings/2193 Grayson Green Court/: leave untouched this pass. It is a listing, it will
  come through the feed or get its own entry later.
- Add `public/photos/people/README.md` and `offices/README.md` one-liners matching the
  existing public/photos/README.md.

## 5. Testimonials

Source: the live page https://www.danmarempire.com/testimonials. Fetch it and lift all seven
quotes verbatim, with attribution exactly as published (Mark B.; Neil D.; Holly & Rafael M.;
Min G.; Judy S, Realtor; Nasir M, Realtor®; Mala & Bunnie N.). Do not edit the words; trim
only with an ellipsis if a quote runs past ~70 words, and prefer the full quote.

Data: `TESTIMONIALS: { quote: string; name: string; about?: "martin-sheikhan" }[]` in data.ts.
The Neil D., Holly & Rafael M. and Mala & Bunnie N. quotes name Martin; tag them.

Placement: a row block on /firm titled "What clients say", after the team grid. Rows, not
cards: quote in the display face at body-plus size (cols 7-12), name in brass meta beneath,
hairline rules between rows. No stars, no photos, no logos. On Martin's person page, one pull
row with the Mala & Bunnie N. quote (trimmed to its first two sentences) above the
Background row. No testimonials on Home this pass.

Compliance: these are client statements, not claims by the brokerage. Do not add "Top 1%",
"#1", or any ranking language around them. Add a small meta line under the block:
"Statements from clients of the brokerage, reproduced with permission." only if Daniel
confirms permission — until then omit the line and list it in CONFIRM.md.

## 6. Redirects (launch blocker; none exist today)

next.config.ts has no `redirects()`. Twenty old URLs are indexed. Add permanent (301)
redirects in next.config.ts for every one, case-sensitive where the old URL was:

| Old | New |
|---|---|
| /about-us | /firm |
| /our-team | /firm |
| /testimonials | /firm |
| /daniel-sheikhan | /firm/daniel-sheikhan |
| /contactus | /contact |
| /copy-of-our-locations | /contact |
| /copy-of-send-us-a-message | /contact |
| /Listings | /collection |
| /properties | /collection |
| /properties-1 | /collection |
| /mls-listings | /collection |
| /lease | /executive-leasing |
| /commercial | /investments |
| /copy-of-commercial | /investments |
| /development-corp | /investments |
| /marketing | /contact |
| /copy-of-home | / |
| /53-woodstream | /track-record |
| /2800keelest | /collection |

Also add trailing-slash and `www` behaviour notes to docs/launch-blocking.md if either is
unhandled. Verify each with `curl -sI` against the dev server (expect 308 from Next for
permanent redirects; that is correct for Next and acceptable for search engines).

## 7. Done means

Build clean, lint clean, zero broken links, axe clean on /firm and two person pages (one with
portrait, one with emblem filler), reduced-motion check, 390/768/1440 screenshots of /firm,
/firm/martin-sheikhan, /firm/anna-shea, /contact. Commit "v2: firm story, people pages,
testimonials, first photos". Report: what was deleted as unconfirmed (per person), which
Oakville office photo you chose and why, the testimonials count and any you trimmed, and the
full CONFIRM.md additions.
