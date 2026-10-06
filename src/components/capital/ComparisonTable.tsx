import c from "./capital.module.css";

/* Sale-leaseback against refinance, row by row. At 390 the table scrolls inside
   its own container and the first column stays put. Server rendered. */

const ROWS: [string, string, string][] = [
  ["Capital released", "Up to the full market value, less costs", "Typically 50% to 70% of value"],
  ["Ongoing cost", "Rent, usually net, with set increases", "Interest and principal payments"],
  ["Lender covenants", "None from a bank; obligations sit in the lease", "Bank covenants and reporting"],
  ["Balance sheet", "Under IFRS 16, a lease liability is recorded. Private companies on ASPE may differ. Confirm with your auditor.", "Debt on the balance sheet"],
  ["Future appreciation", "Goes to the new owner", "You keep it"],
  ["Control of the site", "Long-term lease with renewal options", "Full ownership"],
  ["Tax on the transaction", "A sale can trigger capital gains and recapture of depreciation", "Generally none"],
];

export function ComparisonTable() {
  return (
    <div className="overflow-x-auto" tabIndex={0} role="region" aria-label="Sale-leaseback compared with refinancing">
      <table className={`${c.table} w-full min-w-[640px] border-collapse text-left`}>
        <thead>
          <tr className="border-b border-paper/12">
            <th scope="col" className="meta w-[32%] py-4 pr-6 font-medium text-paper/70"><span className="sr-only">Point of comparison</span></th>
            <th scope="col" className="w-[34%] py-4 pr-6 font-display text-[clamp(1.25rem,1.9vw,1.6rem)] font-medium leading-[1.1] text-paper">Sale-leaseback</th>
            <th scope="col" className="w-[34%] py-4 font-display text-[clamp(1.25rem,1.9vw,1.6rem)] font-medium leading-[1.1] text-paper">Refinance</th>
          </tr>
        </thead>
        <tbody>
          {ROWS.map(([k, a, b]) => (
            <tr key={k} className="border-b border-paper/12 align-top">
              <th scope="row" className="meta py-5 pr-6 font-medium leading-[1.8] text-paper/70">{k}</th>
              <td className="py-5 pr-6 text-[15px] leading-[1.7] text-paper/90">{a}</td>
              <td className="py-5 text-[15px] leading-[1.7] text-paper/90">{b}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
