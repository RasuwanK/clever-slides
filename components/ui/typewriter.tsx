"use client";

import { motion, useInView } from "motion/react";
import { useRef } from "react";

export function Typewriter({
  text,
  className,
}: {
  text: string;
  className?: string;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <p ref={ref} className={className}>
      {text.split("").map((char, index) => {
        return (
          <motion.span
            key={index}
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 1, delay: index * 0.1 }}
          >{char}</motion.span>
        );
      })}
    </p>
  );
}
