import { useLayoutEffect, useRef, useState, type ReactNode } from "react";

/**
 * Renders fixed-`designWidth` content scaled to fit the available width,
 * measuring both width and natural height so the layout box never overflows
 * and never reserves untransformed space.
 */
export function ScaledFrame({
  children,
  designWidth = 440,
  minScale = 0.4,
  maxScale = 1,
  className,
  innerClassName,
}: {
  children: ReactNode;
  designWidth?: number;
  minScale?: number;
  maxScale?: number;
  className?: string;
  innerClassName?: string;
}) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);
  const [h, setH] = useState(0);

  useLayoutEffect(() => {
    const wrap = wrapRef.current;
    const inner = innerRef.current;
    if (!wrap || !inner) return;
    const update = () => {
      const w = wrap.clientWidth;
      const naturalH = inner.offsetHeight;
      const next = Math.max(minScale, Math.min(maxScale, w / designWidth));
      setScale(next);
      setH(naturalH * next);
    };
    update();
    const ro = new ResizeObserver(update);
    ro.observe(wrap);
    ro.observe(inner);
    const mo = new MutationObserver(update);
    mo.observe(inner, { subtree: true, childList: true, characterData: true });
    return () => { ro.disconnect(); mo.disconnect(); };
  }, [designWidth, minScale, maxScale]);

  return (
    <div ref={wrapRef} className={className} style={{ height: h || undefined }}>
      <div className="relative mx-auto overflow-hidden" style={{ width: designWidth * scale, height: h || undefined }}>
        <div
          ref={innerRef}
          className={innerClassName}
          style={{ position: "absolute", top: 0, left: 0, width: designWidth, transform: `scale(${scale})`, transformOrigin: "top left" }}
        >
          {children}
        </div>
      </div>
    </div>
  );
}
