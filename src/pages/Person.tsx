import { TEAM } from "@/lib/data";
import type { Person as P } from "@/lib/data";
import { ImageFrame } from "@/components/ImageFrame";

export function Person({ p, back, go, onEnquire }: {
  p: P; back: () => void; go: (id: string) => void; onEnquire: () => void;
}) {
  const others = TEAM.filter((t) => t.slug !== p.slug);
  return (
    <div className="pt-[88px]">
      <div className="mx-auto max-w-[1520px] px-6 md:px-12">
        <button onClick={back} className="meta py-8 text-mute link-u hover:text-forest">← The Firm</button>

        <div className="grid gap-14 lg:grid-cols-[420px_1fr] lg:gap-24">
          <div>
            <ImageFrame hue={(p.slug.length * 41) % 360} ratio="3/4" alt={p.name} />
          </div>

          <div className="pt-2">
            <div className="meta mb-6 text-brass">{p.role}</div>
            <h1 className="max-w-[16ch] font-display text-[clamp(2.1rem,4.6vw,3.6rem)] leading-[1.06]">{p.name}</h1>

            <div className="mt-10 max-w-[60ch] space-y-6 text-[15.5px] leading-[1.95] text-ink/80">
              {p.bio.map((b, i) => <p key={i}>{b}</p>)}
            </div>

            <div className="mt-12 grid gap-10 border-t border-forest/14 pt-10 sm:grid-cols-2">
              <div>
                <div className="meta mb-4 text-brass">Credentials</div>
                <ul className="space-y-2.5">
                  {p.creds.map((c) => (
                    <li key={c} className="flex items-baseline gap-3 text-[14px] text-ink/80">
                      <span className="mt-[7px] h-[4px] w-[4px] shrink-0 rounded-full bg-brass" />{c}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <div className="meta mb-4 text-brass">Practice</div>
                <ul className="space-y-2.5">
                  {p.focus.map((c) => (
                    <li key={c} className="flex items-baseline gap-3 text-[14px] text-ink/80">
                      <span className="mt-[7px] h-[4px] w-[4px] shrink-0 rounded-full bg-brass" />{c}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <dl className="mt-10 border-t border-forest/14">
              {([["Areas", p.areas], ["Telephone", p.tel], ["Email", p.email]] as [string, string | undefined][])
                .filter(([, v]) => v).map(([k, v]) => (
                <div key={k} className="flex flex-wrap items-baseline justify-between gap-x-8 gap-y-1 border-b border-forest/14 py-4">
                  <dt className="meta text-mute">{k}</dt>
                  <dd className="text-[13.5px] text-ink/85">{v}</dd>
                </div>
              ))}
            </dl>

            <button onClick={onEnquire}
              className="meta mt-10 border border-forest/25 px-8 py-4 transition-colors hover:bg-forest hover:text-paper">
              Speak with {p.name.split(" ")[0]}
            </button>
          </div>
        </div>
      </div>

      <section className="mt-20 border-t border-forest/14 bg-paper-deep py-20 md:py-24">
        <div className="mx-auto max-w-[1520px] px-6 md:px-12">
          <div className="meta mb-10 text-brass">The rest of the firm</div>
          <div className="grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
            {others.map((o) => (
              <button key={o.slug} onClick={() => go(o.slug)} className="group border-t border-forest/14 pt-5 text-left">
                <h3 className="font-display text-[20px] leading-tight transition-colors group-hover:text-brass">{o.name}</h3>
                <p className="meta mt-2.5 text-brass">{o.role}</p>
                <p className="mt-3 max-w-[38ch] text-[13.5px] leading-[1.85] text-mute">{o.line}</p>
              </button>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
