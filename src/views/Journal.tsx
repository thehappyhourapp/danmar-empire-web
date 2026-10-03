import { Reveal } from "@/components/Reveal";
import { EnquireButton } from "@/components/SiteShell";
import { JOURNAL } from "@/lib/data";
import { ImageFrame } from "@/components/ImageFrame";

export function Journal() {
  const [lead, ...rest] = JOURNAL;
  return (
    <div className="pt-[88px]">
      <section className="mx-auto max-w-[1560px] px-6 pb-16 pt-10 md:px-10 md:pb-24 md:pt-14">
        <div className="meta mb-6 text-brass">Journal</div>
        <h1 className="max-w-[22ch] font-display text-[clamp(2.4rem,5.6vw,4.8rem)] leading-[1] tracking-[-.015em]">
          Market reports, field notes, and the occasional argument.
        </h1>
      </section>

      <section className="mx-auto max-w-[1560px] px-6 pb-20 md:px-10">
        <Reveal>
          <button className="group grid w-full gap-10 border-y border-forest/14 py-12 text-left lg:grid-cols-[1.1fr_1fr] lg:gap-16">
            <ImageFrame hue={26} ratio="16/10" alt="" className="transition-transform duration-700 group-hover:scale-[1.01]" />
            <div className="self-center">
              <div className="meta flex items-center gap-3 text-brass">{lead.kind}<span className="text-mute">{lead.date}</span></div>
              <h2 className="mt-6 max-w-[22ch] font-display text-[clamp(1.9rem,3.8vw,3rem)] leading-[1.06] transition-colors group-hover:text-brass">
                {lead.title}
              </h2>
              <p className="mt-6 max-w-[52ch] text-[15px] leading-[1.85] text-ink/70">{lead.dek}</p>
              <div className="meta mt-8 text-mute">Read · {lead.read}</div>
            </div>
          </button>
        </Reveal>

        <div className="grid gap-px bg-forest/12 md:grid-cols-3">
          {rest.map((j, i) => (
            <Reveal key={j.id} delay={i * 80} className="bg-paper">
              <button className="group block h-full w-full p-8 text-left transition-colors hover:bg-paper-deep md:p-10">
                <div className="meta flex items-center gap-3 text-brass">{j.kind}<span className="text-mute">{j.date}</span></div>
                <h3 className="mt-5 max-w-[24ch] font-display text-[22px] leading-tight">{j.title}</h3>
                <p className="mt-4 max-w-[44ch] text-[14px] leading-[1.8] text-mute">{j.dek}</p>
                <div className="meta mt-7 text-mute transition-colors group-hover:text-ink">Read · {j.read}</div>
              </button>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="bg-forest-deep py-20 text-paper md:py-28">
        <div className="mx-auto grid max-w-[1560px] items-center gap-12 px-6 md:px-10 lg:grid-cols-[1.2fr_1fr]">
          <div>
            <div className="meta mb-5 text-brass-light">The Prime Report</div>
            <h2 className="max-w-[22ch] font-display text-[clamp(1.9rem,3.8vw,3rem)] leading-[1.08]">
              Twice a year we publish what we are actually seeing.
            </h2>
            <p className="mt-6 max-w-[54ch] text-[15px] leading-[1.9] text-paper/85">
              Written for owners rather than for headlines. Sent to the list, not posted to social.
            </p>
          </div>
          <div>
            <label className="meta mb-3 block text-paper/62">Email address</label>
            <div className="flex border border-paper/30">
              <input type="email" placeholder="you@company.com"
                className="w-full bg-transparent px-5 py-4 text-[14px] text-paper outline-none placeholder:text-paper/60" />
              <EnquireButton className="meta shrink-0 border-l border-paper/30 px-6 transition-colors hover:bg-paper hover:text-ink">Subscribe</EnquireButton>
            </div>
            <p className="meta mt-3 text-paper/55">Two emails a year. Unsubscribe in one click.</p>
          </div>
        </div>
      </section>
    </div>
  );
}
