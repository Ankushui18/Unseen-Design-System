import { useCallback, useEffect, useRef, useState } from "react";

/** Adds `.in` to every [data-reveal] node as it scrolls into view. */
export function useReveal(deps: unknown[] = []) {
  useEffect(() => {
    if (!("IntersectionObserver" in window)) {
      document.querySelectorAll<HTMLElement>("[data-reveal]").forEach((n) => n.classList.add("in"));
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            io.unobserve(e.target);
          }
        });
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.05 },
    );
    const register = () =>
      document.querySelectorAll<HTMLElement>("[data-reveal]:not(.in)").forEach((n) => io.observe(n));
    register();
    const mo = new MutationObserver((records) => {
      if (records.some((r) => r.addedNodes.length > 0)) register();
    });
    mo.observe(document.body, { childList: true, subtree: true });
    const failsafe = window.setTimeout(() => {
      document.querySelectorAll<HTMLElement>("[data-reveal]:not(.in)").forEach((n) => {
        if (n.getBoundingClientRect().top < window.innerHeight) n.classList.add("in");
      });
    }, 1200);
    return () => {
      io.disconnect();
      mo.disconnect();
      window.clearTimeout(failsafe);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}

export function useCopy(timeout = 1600) {
  const [copied, setCopied] = useState(false);
  const [copyError, setCopyError] = useState(false);
  const timer = useRef<number | null>(null);

  const copy = useCallback(
    async (text: string) => {
      let success = false;
      try {
        await navigator.clipboard.writeText(text);
        success = true;
      } catch {
        const ta = document.createElement("textarea");
        ta.value = text;
        ta.style.position = "fixed";
        ta.style.opacity = "0";
        document.body.appendChild(ta);
        ta.select();
        try {
          success = document.execCommand("copy");
        } catch {
          /* noop */
        }
        document.body.removeChild(ta);
      }
      setCopied(success);
      setCopyError(!success);
      if (timer.current) window.clearTimeout(timer.current);
      timer.current = window.setTimeout(() => { setCopied(false); setCopyError(false); }, timeout);
      return success;
    },
    [timeout],
  );

  useEffect(() => () => { if (timer.current) window.clearTimeout(timer.current); }, []);

  return { copied, copy, copyError };
}

// Only the topmost dialog handles focus and Escape; nested popovers remain usable.
const dialogStack: HTMLElement[] = [];

export function useDialogFocus(open: boolean, ref: React.RefObject<HTMLElement | null>, onClose: () => void) {
  const close = useRef(onClose);
  close.current = onClose;
  useEffect(() => {
    if (!open || !ref.current) return;
    const el = ref.current;
    const previous = document.activeElement as HTMLElement | null;
    dialogStack.push(el);
    const focusable = () => Array.from(el.querySelectorAll<HTMLElement>(
      'button:not([disabled]),a[href],input:not([disabled]),select:not([disabled]),textarea:not([disabled]),[tabindex="0"]',
    )).filter((node) => !node.closest('[hidden],[inert]') && node.getClientRects().length > 0);
    const timer = window.setTimeout(() => (focusable()[0] ?? el).focus(), 0);
    const onKey = (e: KeyboardEvent) => {
      if (dialogStack[dialogStack.length - 1] !== el) return;
      if (e.key === "Escape") { e.preventDefault(); close.current(); }
      if (e.key !== "Tab") return;
      const nodes = focusable();
      const first = nodes[0];
      const last = nodes[nodes.length - 1];
      if (!first) { e.preventDefault(); el.focus(); return; }
      if (e.shiftKey && (document.activeElement === first || document.activeElement === el)) { e.preventDefault(); last?.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      window.clearTimeout(timer);
      document.removeEventListener("keydown", onKey);
      const index = dialogStack.lastIndexOf(el);
      if (index >= 0) dialogStack.splice(index, 1);
      if (previous?.isConnected) previous.focus();
    };
  }, [open, ref]);
}

export function useOnClickOutside<T extends HTMLElement>(
  ref: React.RefObject<T | null>,
  handler: () => void,
  enabled = true,
) {
  useEffect(() => {
    if (!enabled) return;
    const listener = (e: MouseEvent | TouchEvent) => {
      const el = ref.current;
      if (!el || el.contains(e.target as Node)) return;
      handler();
    };
    document.addEventListener("mousedown", listener);
    document.addEventListener("touchstart", listener);
    return () => {
      document.removeEventListener("mousedown", listener);
      document.removeEventListener("touchstart", listener);
    };
  }, [ref, handler, enabled]);
}

export function useHashRoute() {
  const get = () => {
    const h = window.location.hash.replace(/^#\/?/, "");
    return h || "";
  };
  const [route, setRoute] = useState(get);

  useEffect(() => {
    const onHash = () => {
      setRoute(get());
      window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
    };
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  const navigate = useCallback((to: string) => {
    window.location.hash = `/${to}`.replace(/^\/+/, "/");
  }, []);

  return { route, navigate };
}

let scrollLocks = 0;
let originalOverflow = "";

export function useLockBody(locked: boolean) {
  useEffect(() => {
    if (!locked) return;
    if (scrollLocks === 0) originalOverflow = document.body.style.overflow;
    scrollLocks++;
    document.body.style.overflow = "hidden";
    return () => {
      scrollLocks = Math.max(0, scrollLocks - 1);
      if (scrollLocks === 0) document.body.style.overflow = originalOverflow;
    };
  }, [locked]);
}

export function useScrollSpy(ids: string[], offset = 120) {
  const [active, setActive] = useState<string>(ids[0] ?? "");
  useEffect(() => {
    if (!ids.length) return;
    const onScroll = () => {
      let current = ids[0];
      for (const id of ids) {
        const el = document.getElementById(id);
        if (!el) continue;
        if (el.getBoundingClientRect().top - offset <= 0) current = id;
      }
      setActive(current);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [ids.join("|"), offset]);
  return active;
}
