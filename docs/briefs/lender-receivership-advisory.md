# Brief: /lender-receivership-advisory (prompt l, after launch)

Daniel's original build prompt is reproduced in full below the line. It was written for a generic
site (buttons, cards, grids, an /advisory/ parent, accordions, "dark mode", a $750M proof figure).
This reconciliation layer overrides it wherever the two conflict; the Design DNA in CLAUDE.md and
the Corporate Real Estate Capital build (commit 2a7fdc3) are the reference for everything.

## Reconciliation (overrides the original)

1. **Route and nav.** `/lender-receivership-advisory`, forest ground, Practice template, like
   /corporate-real-estate-capital. There is no /advisory/ parent and no card grid; the "parent
   advisory page card" becomes a row on /investments and in the footer's practice list ("Lender and
   Receivership Advisory"), one line as the brief gives it. Not in the header nav. Both advisory
   pages cross-link in a one-row "Related advisory" block above the close.
2. **No buttons, cards, icons, grids, accordions.** Text links; full-width rows (title cols 1-5,
   text cols 7-12, stack at 390); services as six numbered rows, each a sentence plus three short
   lines; the FAQ as the site's FaqRow (details/summary, answers in HTML); the "Who does what"
   timeline as six stage rows with two labelled columns (Your lawyer / Danmar) at ≥768 and stacked
   at 390. One italic brass line under the H1, written by you. No imagery until photography exists;
   reserve nothing.
3. **Proof strip:** reuse the Capital strip. Cells: "$1B+" with the confirmed basis line
   ("Aggregate value of sale and lease transactions in which the principals have acted over their
   careers. Methodology on request."), and "Ontario brokerage with a lead advisor trained in law and
   finance". The "3 business days" cell and the "receivership experience" cell are [CONFIRM] and
   omitted until confirmed.
4. **Advisor row:** "Daniel Sheikhan, Broker" is confirmed (8 Oct). Omit the "~$100M family office"
   line and all four representative-experience lines until Daniel confirms consent and anonymity;
   list them in CONFIRM.md under this page.
5. **Estimator:** reuse src/components/capital/{Estimator,Bars} and src/lib/estimator.ts patterns;
   new `src/lib/recovery.ts` with the brief's formulas and the test case pinned in
   `recovery.test.ts` (3 months: A 504,000, K 484,100, surplus 19,900; 12 months: A 441,000,
   K 526,400, shortfall 85,400; delay cost 7,000 a month). Semantic colour for shortfall and surplus
   must pass 4.5:1 on forest and never be the only signal. Bars animate on the interface clock only.
6. **Form:** post to /api/enquire with `kind: "recovery-file"`; subject "Recovery file: [city],
   [stage]"; recipient is the enquire route's configured address (daniel@ for now); no CRM. CASL
   consent unticked, link to /privacy. Field-level errors as the Capital form.
7. **Disclosure:** the page's own disclosure block as in the brief, plus the site footer. Add
   "Danmar does not administer mortgages" to the Capital page's disclosure too, since the two pages
   are a family.
8. **Analytics:** through the no-op track() helper with the brief's event names.
9. **Copy rules that stand unchanged:** every compliance rule (no "enforce/collect/recover your
   loan/debt recovery", "broker opinion of value" never "appraisal" for our own work, no borrower
   details, no outcome promises, conflict-check line), Canadian spelling, no em dashes, no hype.
   Replace the brief's "maximize" anywhere it slipped in. H1 and section headings as written.
10. **Skills:** run /impeccable on the finished page, the Emil Kowalski animation review on the
    estimator and timeline, and Playwright screenshots at 1440 and 390 before reporting.
11. **CONFIRM.md** gains a "## /lender-receivership-advisory" section with: the 3-business-day
    promise, the receivership-experience wording, the ~$100M line, each representative-experience
    line, loan-book fixed fee, cost-consultant partners, land sales capability, same-day conflict
    check, FAQ 9 policy, property types and areas, all fee wording, estimator defaults.

---

## Original prompt from Daniel (8 Oct 2026), verbatim

(See docs/briefs/source/lender-receivership-original.md)
