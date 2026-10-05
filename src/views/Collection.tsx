import { Chapter, Lines, HEAD } from "@/components/Chapter";
import { MotionController } from "@/components/MotionController";
import { listingPhotos } from "@/lib/photos";
import { CollectionList } from "./CollectionList";

/* Own listings only. The firm signs the TRREB DLA (its own listings with full
   agent detail) and deliberately not IDX or VOW: the curated book is the thing a
   boutique firm is judged on. One cream ground, no temperature cuts, line rise only.
   The full list is in the server HTML; the brief bar and the lenses only narrow it. */

export function Collection() {
  return (
    <div id="collection">
      <MotionController rootId="collection" />
      <Chapter inner="pb-24 pt-[calc(var(--nav-h)_+_64px)] lg:pt-[calc(var(--nav-h)_+_96px)] lg:pb-40">
        <div className="col-span-12 lg:col-span-5">
          <Lines as="h1" lines={["Our own listings,", "and nothing else."]} className={HEAD} />
        </div>
        <p className="col-span-12 mt-6 max-w-[48ch] text-[15px] leading-[1.85] text-ink/75 lg:col-span-6 lg:col-start-7 lg:mt-0 lg:self-end">
          Listed by Danmar Empire Real Estate Corp., Brokerage. Every one has been underwritten,
          photographed and written by us before it was priced. We do not republish the rest of the board,
          because a list of everything is not an opinion about anything.
        </p>
        <CollectionList photos={listingPhotos()} />
      </Chapter>
    </div>
  );
}
