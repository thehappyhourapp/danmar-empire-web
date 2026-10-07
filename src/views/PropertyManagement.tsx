import { href } from "@/lib/routes";
import { Practice, PracticeLink } from "@/components/Practice";

/* Property management: the operating side, a separate service from asset
   management, run by the same firm. Whole-page cream, the Practice template,
   no numbers strip because there is no figure in the data to put in one. */

const INCLUDED = [
  { title: "Rent collection and arrears", text: "Collection, follow-up, N4 and N8 notices where needed, and Landlord and Tenant Board filings handled through to hearing." },
  { title: "Tenants", text: "Screening, leases, move-in and move-out inspections, renewals and lawful rent increases on the statutory timetable." },
  { title: "Repairs and contractors", text: "Trades we have used before, quotes for anything material, and work checked before it is paid for." },
  { title: "Payments and paperwork", text: "Property tax, insurance renewals, utilities and condominium fees paid on time; one monthly statement per property." },
  { title: "Reporting", text: "A monthly statement and an annual summary for your accountant." },
];

const TERMS = [
  { title: "Who runs it.", text: "Sara Sheikhan, Real Estate Salesperson and Property Manager, with the brokerage's administration behind her." },
  { title: "Who it suits.", text: "Owners with one unit to a few buildings who want the phone to ring somewhere else. Larger portfolios usually combine this with asset management." },
  { title: "How we are paid.", text: "A management fee set out in writing before we start, charged monthly." },
];

export function PropertyManagement() {
  return (
    <Practice
      tone="cream"
      id="property"
      path={href("property")}
      eyebrow="Property Management"
      headline={["The building, the tenants and the cheques."]}
      italic="Rent in, repairs done, one statement a month."
      intro={[
        "Day-to-day management for owners of rental units, buildings and small portfolios across the GTA: rent collection, tenants, repairs, contractors and the paperwork, with a monthly statement you can read in a minute. A separate service from asset management, run by the same firm.",
      ]}
      sections={[
        { heading: "What is included.", items: INCLUDED },
        { items: TERMS, numbered: false },
      ]}
      close={{
        headline: "Hand us the building.",
        enquire: "Talk to us about the property",
        login: "Client login",
        aside: <PracticeLink href={href("management")}>Asset management, for the numbers</PracticeLink>,
      }}
      service={{ name: "Residential and commercial property management", type: "Property management", description: "Day-to-day management of rental units, buildings and small portfolios across the Greater Toronto Area: rent collection, tenants, repairs, contractors and paperwork, with a monthly statement." }}
    />
  );
}
