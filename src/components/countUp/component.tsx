import { useEffect, useState } from "react";

type Props = {
  to: number;
  /** a contagem (re)começa sempre que `active` vira true */
  active: boolean;
  duration?: number;
  format?: (value: number) => string;
};

/** Número que sobe de 0 até `to` com desaceleração no final. */
export default function CountUp({
  to,
  active,
  duration = 1100,
  format = (v) => String(v),
}: Props) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!active) return;
    let frame = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3); // easeOutCubic
      setValue(Math.round(eased * to));
      if (t < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [active, to, duration]);

  return <>{format(active ? value : 0)}</>;
}
