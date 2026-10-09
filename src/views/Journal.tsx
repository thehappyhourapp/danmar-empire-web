import { Chapter } from "@/components/Chapter";
import { MotionController } from "@/components/MotionController";
import { EnquireButton } from "@/components/SiteShell";
import s from "@/components/motion.module.css";

/* The Journal: cream. The route answers, but it is out of the nav and the
   sitemap and marked noindex until the first article is published. No
   placeholder entries. */

export function Journal() {
  return (
    <div id="journal">
      <MotionController rootId="journal" />
      <Chapter inner="pb-24 pt-[calc(var(--nav-h)_+_64px)] lg:pt-[calc(var(--nav-h)_+_96px)] lg:pb-40">
        <div className="col-span-12 lg:col-span-8">
          <h1 className="max-w-[20ch] font-display text-[clamp(2.4rem,5.4vw,4.6rem)] font-medium leading-[1.02] tracking-[-.01em]">Writing from the firm appears here.</h1>
        </div>
        <div className="col-span-12 mt-10 flex flex-col items-start gap-6 lg:col-span-5 lg:col-start-8 lg:mt-16 lg:self-end">
          <p className="max-w-[48ch] text-[16px] leading-[1.85] text-ink/80">
            Nothing is published yet. If there is a question you would like the firm's view on, write to the desk.
          </p>
          <EnquireButton className={`${s.tlink} font-display text-[1.35rem] font-medium leading-tight text-forest`}>Write to the desk</EnquireButton>
        </div>
      </Chapter>
    </div>
  );
}
