import type { ReactNode } from "react";
import { Check } from "lucide-react";
import { Reveal } from "../visual/Reveal";
import { Eyebrow } from "../visual/Eyebrow";

interface FeatureSplitProps {
  eyebrow: string;
  title: ReactNode;
  body: string;
  points?: string[];
  visual: ReactNode;
  /** "right" puts the visual on the right (default). "left" mirrors it. */
  visualSide?: "left" | "right";
  id?: string;
}

/**
 * Alternating text/visual row. Reversing `visualSide` between instances is
 * what keeps a long page from reading as a single column of paragraphs.
 *
 * Order is set with `md:order-*` so the DOM always keeps copy before visual —
 * on mobile the heading stays above its own image, and screen readers get a
 * sane reading order regardless of which side the visual lands on.
 */
export function FeatureSplit({
  eyebrow,
  title,
  body,
  points,
  visual,
  visualSide = "right",
  id,
}: FeatureSplitProps) {
  const visualFirst = visualSide === "left";

  return (
    <section id={id} className="bg-white py-20 md:py-28">
      <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-12 px-6 md:grid-cols-2 md:gap-16">
        <Reveal
          direction={visualFirst ? "left" : "right"}
          className={visualFirst ? "md:order-2" : "md:order-1"}
        >
          <Eyebrow>{eyebrow}</Eyebrow>

          <h2 className="mt-6 text-3xl font-bold leading-[1.08] tracking-[-0.03em] md:text-5xl">
            {title}
          </h2>

          <p className="mt-6 text-base font-light leading-relaxed text-black/60 md:text-lg">
            {body}
          </p>

          {points && (
            <ul className="mt-8 space-y-3.5">
              {points.map((p) => (
                <li key={p} className="flex items-start gap-3 text-sm text-black/70 md:text-base">
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-black">
                    <Check className="h-3 w-3 text-white" strokeWidth={3} />
                  </span>
                  {p}
                </li>
              ))}
            </ul>
          )}
        </Reveal>

        <Reveal
          direction={visualFirst ? "right" : "left"}
          delay={0.1}
          className={visualFirst ? "md:order-1" : "md:order-2"}
        >
          {visual}
        </Reveal>
      </div>
    </section>
  );
}
