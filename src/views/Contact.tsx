import Link from "next/link";
import { OFFICES } from "@/lib/data";
import { ORG_ID, REGISTERED_NAME, SITE, officeAddresses } from "@/lib/metadata";
import { href } from "@/lib/routes";
import { Chapter, GRID, HEAD, Lines, delay } from "@/components/Chapter";
import { EnquiryForm } from "@/components/EnquiryForm";
import { MotionController } from "@/components/MotionController";
import s from "@/components/motion.module.css";

/* Contact: cream, line rise only. The offices as rows, then the enquiry form
   inline, posting through the same path and states as the drawer. */

const EMAIL = "info@danmarempire.com";

const telHref = (t: string) => `tel:+1${t.replace(/\D/g, "")}`;

export function Contact() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "RealEstateAgent",
    "@id": ORG_ID,
    name: "Danmar Empire",
    legalName: REGISTERED_NAME,
    url: SITE,
    email: EMAIL,
    telephone: `+1 ${OFFICES[0].tel}`,
    address: officeAddresses(),
  };

  return (
    <div id="contact">
      <MotionController rootId="contact" />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />
      <Chapter inner="pb-24 pt-[calc(var(--nav-h)_+_64px)] lg:pt-[calc(var(--nav-h)_+_96px)] lg:pb-40">
        {/* ── head */}
        <div className="col-span-12 lg:col-span-8">
          <h1 className="max-w-[18ch] font-display text-[clamp(2.4rem,5.4vw,4.6rem)] font-medium leading-[1.02] tracking-[-.01em]">Three offices. One desk.</h1>
        </div>
        <p className="col-span-12 mt-10 max-w-[48ch] text-[16px] leading-[1.85] text-ink/80 lg:col-span-5 lg:col-start-8 lg:mt-16 lg:self-end">
          Call any office, write to the desk, or use the form below. Someone from the desk replies inside one
          business day.
        </p>

        {/* ── offices, as rows */}
        <div className="col-span-12 mt-16 lg:mt-24">
          {OFFICES.map((o, i) => (
            <div key={o.addr} data-reveal className={`${s.rise} ${GRID} border-t border-forest/14 py-8 last:border-b md:py-10`} style={delay(i)}>
              <h2 className="col-span-12 font-display text-[clamp(1.4rem,2.2vw,1.9rem)] font-medium leading-[1.1] md:col-span-5">{o.city}</h2>
              <address className="col-span-12 mt-4 text-[15px] not-italic leading-[1.8] text-ink/80 md:col-span-3 md:col-start-7 md:mt-0">
                {o.addr}<br />{o.post}
              </address>
              <p className="col-span-12 mt-4 md:col-span-3 md:col-start-10 md:mt-0 md:text-right">
                <a href={telHref(o.tel)} className={`${s.tlink} text-[15px] text-ink/80 hover:text-forest`}>{o.tel}</a>
              </p>
            </div>
          ))}
        </div>

        {/* ── enquiry */}
        <div className={`col-span-12 mt-20 ${GRID} border-t border-forest/14 pt-12 lg:mt-28 lg:pt-16`}>
          <div className="col-span-12 lg:col-span-5">
            <Lines lines={["Tell us what you", "are trying to do."]} className={`${HEAD} max-w-[16ch]`} />
            <p className="mt-8 max-w-[40ch] text-[15px] leading-[1.8] text-ink/80">
              Or write to the desk directly.
            </p>
            <a href={`mailto:${EMAIL}`} className={`${s.tlink} mt-4 inline-block font-display text-[1.3rem] font-medium leading-tight text-forest`}>{EMAIL}</a>
            <p className="mt-8">
              <Link href={href("relocating")} className={`${s.tlink} meta text-ink/70 hover:text-forest`}>Relocating from abroad</Link>
            </p>
          </div>
          <EnquiryForm className="col-span-12 mt-12 lg:col-span-6 lg:col-start-7 lg:mt-2" />
        </div>
      </Chapter>
    </div>
  );
}
