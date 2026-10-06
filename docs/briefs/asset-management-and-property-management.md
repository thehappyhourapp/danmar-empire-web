# Brief: Asset Management page revision and new Property Management page

Source: Daniel, 6 Oct 2026, written up by Cowork. Design DNA and CLAUDE.md are binding.

## Purpose
/asset-management is the page Daniel sends to accountants, bankers and business owners who ask
"what do you do?". It must answer that in the first screen for someone who has never heard the
phrase, carry the capital-at-work argument with defensible numbers, lead with succession, and make
clear that property management is a separate service with its own page.

## /asset-management changes (keep the template, ground, H1 and italic line)

1. Definition row, directly under the hero, before the current mandate paragraph:
   Title: "What this is."
   Text: "Wealth and asset management is the numbers side of owning property: what each holding
   earns after tax, debt, repairs and vacancy; whether the capital in it could work harder
   elsewhere; and what the whole portfolio should look like in five years. It is not property
   management, which we also do, separately."

2. Succession row, as the first row after the definition (this is the lead message):
   Title: "Built over thirty years. Run by someone other than the family."
   Text: "Many of our mandates come from owners who built a portfolio over decades and would
   rather see it run professionally than handed to the next generation untested. We run it,
   report to the family in writing every quarter, and bring the family in when they want to be."

3. Lawyer-led row:
   Title: "Lawyer-led."
   Text: "Mandates are led by Daniel Sheikhan, a lawyer licensed in Ontario, New York and
   Minnesota, with a finance degree and a real estate licence. Danmar does not provide legal
   services; your own counsel, accountant and auditor stay in their seats. The training shows in
   how leases, financing and structures are read before money moves."

4. Capital-at-work illustration, as a numbers row set labelled "Illustrative example, not a
   client transaction." Three columns or three stacked rows:
   A. "Two condos, owned outright. $1,000,000 combined. About $30,000 a year net after fees, tax,
      insurance and vacancy. Roughly 3%."
   B. "The same $1,000,000 as the equity in $3,000,000 of property, three houses or one
      commercial building, at a 5.5 to 6% cap rate. Net operating income around $170,000; debt
      service on $2,000,000 around $130,000; cash left over much the same as the condos."
   C. "The difference: principal paydown and appreciation now work on $3,000,000 instead of
      $1,000,000. Leverage triples what works for you and what works against you. Whether to do
      it is the question we are paid to answer. This page does not recommend it."
   .meta footnote: "Illustration with rounded figures. Assumes 33% equity, a 5.5 to 6% capitalisation
   rate and roughly 6% debt cost. Not advice. Your numbers will differ."

5. Banking and diversification row:
   Title: "The rest of the table."
   Text: "When a portfolio is over-concentrated or under-financed we introduce lenders, private
   credit and advisers, and we sit on your side of the table. Danmar does not arrange mortgages."

6. Software row with three frames reserved for screenshots of the in-house platform (16:10,
   flat forest/10 until the images exist in public/photos/app/). Captions as .meta:
   "Every holding, its debt and its net equity on one page." / "Cash position projected thirty
   and ninety days out." / "Allocation by sector, owner and geography." Title: "Our own software."
   Text: "We built the reporting platform we use. Each family sees its own portfolio, nothing
   else, and the quarterly report is produced from it rather than from a spreadsheet."
   Never name the platform's domain or link to it.

7. FAQ rows (FAQPage JSON-LD), after the services list:
   - "What is the difference between asset management and property management?" Asset management
     is the financial side: what each property earns after everything, whether the capital should
     stay where it is, and what to buy, hold, refinance or sell. Property management is the
     operating side: tenants, rent, repairs and contractors. We offer both; they are separate
     engagements.
   - "Who is this for?" Families and holding companies with several properties, usually ten
     million dollars or more in total, who want one party accountable for the whole portfolio.
   - "How do you report?" In writing, every quarter: position by asset, income against budget,
     occupancy and lease expiries, debt and maturities, capital spent and committed, and a
     recommendation list with the reasoning attached, reconciled to the operating accounts.
   - "Do you take custody of funds?" No. Accounts stay in the client's name. We instruct and
     report; the client signs.
   - "How are you paid?" By a management fee agreed in writing, and in some mandates a success
     fee on transactions. Terms are set out before any work begins. (No percentages.)

8. Close row adds a second text link: "Property management, separately" to /property-management.
   Keep the existing Client access control.

UHNW may still appear once in body and in metadata on this page.

## New page: /property-management (cream, Practice template, in routes, seo.ts, sitemap, llms.txt,
footer practices column; NOT in the header nav)

H1 (locked): "The building, the tenants and the cheques."
Italic line under it (one): write one about the day to day.
Eyebrow: "Property Management".
Intro paragraph: "Day-to-day management for owners of rental units, buildings and small
portfolios across the GTA: rent collection, tenants, repairs, contractors and the paperwork, with
a monthly statement you can read in a minute. A separate service from asset management, run by
the same firm."

Numbered rows, what is included:
1. Rent collection and arrears. Collection, follow-up, N4 and N8 notices where needed, and
   Landlord and Tenant Board filings handled through to hearing.
2. Tenants. Screening, leases, move-in and move-out inspections, renewals and lawful rent
   increases on the statutory timetable.
3. Repairs and contractors. Trades we have used before, quotes for anything material, and work
   checked before it is paid for.
4. Payments and paperwork. Property tax, insurance renewals, utilities and condominium fees paid
   on time; one monthly statement per property.
5. Reporting. A monthly statement and an annual summary for your accountant.

Row: "Who it suits." Owners with one unit to a few buildings who want the phone to ring somewhere
else. Larger portfolios usually combine this with asset management.

Row: "How we are paid." A management fee set out in writing before we start, charged monthly.
(No percentage anywhere.)

Close row: enquire link, and "Asset management, for the numbers" linking to /asset-management.
JSON-LD: Service with provider the brokerage. Metadata via seo.ts.

Copy rules: Canadian spelling, no em dashes, no superlatives, nothing negative about other
managers, RTA/LTB terms used correctly (N4, N8, Landlord and Tenant Board).
