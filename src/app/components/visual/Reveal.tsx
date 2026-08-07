import { motion, useReducedMotion, type Variants } from "motion/react";
import type { ReactNode } from "react";

type Direction = "up" | "down" | "left" | "right" | "none";

const OFFSET: Record<Direction, { x: number; y: number }> = {
  up:    { x: 0,   y: 48 },
  down:  { x: 0,   y: -48 },
  left:  { x: 48,  y: 0 },
  right: { x: -48, y: 0 },
  none:  { x: 0,   y: 0 },
};

interface RevealProps {
  children: ReactNode;
  className?: string;
  direction?: Direction;
  delay?: number;
  duration?: number;
  /** Fraction of the element that must be visible before it animates. */
  amount?: number;
  as?: "div" | "section" | "span" | "li";
}

/**
 * Scroll reveal. Replaces the initial/whileInView/transition trio that was
 * copy-pasted in every section.
 *
 * Honours prefers-reduced-motion: the content renders in its final state with
 * no transform and no fade, instead of animating a "reduced" version of the
 * same thing.
 */
export function Reveal({
  children,
  className,
  direction = "up",
  delay = 0,
  duration = 0.7,
  amount = 0.3,
  as = "div",
}: RevealProps) {
  const reduced = useReducedMotion();
  const Tag = motion[as];

  if (reduced) return <Tag className={className}>{children}</Tag>;

  const { x, y } = OFFSET[direction];

  const variants: Variants = {
    hidden:  { opacity: 0, x, y },
    visible: { opacity: 1, x: 0, y: 0 },
  };

  return (
    <Tag
      className={className}
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount }}
      // Custom cubic-bezier: fast out of the gate, long soft landing. This is
      // what reads as "expensive" versus the default easeOut.
      transition={{ duration, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </Tag>
  );
}

interface RevealGroupProps {
  children: ReactNode;
  className?: string;
  stagger?: number;
  amount?: number;
}

/**
 * Staggers direct <RevealItem> children. Use instead of hand-computing
 * `delay: i * 0.15` at each call site.
 */
export function RevealGroup({
  children,
  className,
  stagger = 0.12,
  amount = 0.2,
}: RevealGroupProps) {
  const reduced = useReducedMotion();

  if (reduced) return <div className={className}>{children}</div>;

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount }}
      variants={{ visible: { transition: { staggerChildren: stagger } } }}
    >
      {children}
    </motion.div>
  );
}

export function RevealItem({
  children,
  className,
  direction = "up",
  duration = 0.7,
}: Omit<RevealProps, "delay" | "amount" | "as">) {
  const reduced = useReducedMotion();

  if (reduced) return <div className={className}>{children}</div>;

  const { x, y } = OFFSET[direction];

  return (
    <motion.div
      className={className}
      variants={{
        hidden:  { opacity: 0, x, y },
        visible: { opacity: 1, x: 0, y: 0, transition: { duration, ease: [0.16, 1, 0.3, 1] } },
      }}
    >
      {children}
    </motion.div>
  );
}
