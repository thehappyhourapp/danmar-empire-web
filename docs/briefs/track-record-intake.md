# Brief: track record intake

The /track-record page and Home's track chapter show one line until real entries exist:
"Sold and leased properties appear here as consents are confirmed. Representative transactions
on request." The rendering code and the `Record_` type in `src/lib/data.ts` are kept, so an entry
drops in as one object in `TRACK` plus one photograph. Nothing is written for a property that
Daniel has not supplied.

## What Daniel supplies, per property

| Field | What it is | Goes where |
|---|---|---|
| Street and city | Street name (number optional) and the municipality or neighbourhood | `place`, `city` |
| Sold or leased | Which one | `kind` |
| Year | Year the transaction closed | `year` |
| Type | A few words: estate residence, lakefront residence, industrial, penthouse, and so on | `type` |
| Representation side | Vendor, purchaser, landlord, tenant, or both | folded into `note` |
| One-line note | One sentence Daniel is content to publish | `note` |
| Photo filename | The file dropped in `photos-inbox/track/`; processed to `public/photos/track/<id>.jpg` at 4:5 | `photo` |
| Consent on file | Yes or no. No means the entry is not added | not stored |
| List price | The list price at the time, if it is to be shown | `list` |

## Rules

- A price appears only with the party's written consent on file. Without consent the entry is
  not published at all; there is no price-free variant.
- Only list prices are shown, never sale prices (RECO: advertising a sold price needs consent,
  and the site does not do it even then).
- The note must not identify the client, the counterparty, their employer or the purpose of the
  tenancy (no "diplomatic", "bank secondment" or similar), unless the consent covers it.
- The photograph must be one the brokerage holds the rights to publish.
- The first candidate is already in the inbox: `photos-inbox/track/2185 grayson green court -
  leased 14,200:month .JPG`. It needs the fields above and the consent confirmation before it goes in.

## How an entry is added

1. Add the object to `TRACK` in `src/lib/data.ts` with a short id (`t1`, `t2`...), `hue` any
   integer, `photo` left `""`.
2. Run `scripts/photos.mjs` once it processes `photos-inbox/track/` (a small extension of the
   offices step: 4:5, 1200w, named by id).
3. Home shows the newest entries as rows again automatically once `TRACK` is non-empty; the
   consent footnote under the rows returns with them.
