/* The 12-column layout grid, the chapter headline, and the reveal stagger. Shared by
   every view; kept out of the component files so Fast Refresh can treat those as pure. */

export const GRID = "grid grid-cols-12 gap-x-4 md:gap-x-8";
export const HEAD = "font-display font-medium text-[clamp(2.1rem,4.8vw,3.75rem)] leading-[1] tracking-[-.01em]";
export const delay = (i: number) => ({ ["--d" as string]: `${Math.min(i, 3) * 120}ms` }) as React.CSSProperties;
