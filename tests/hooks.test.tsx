import { act, fireEvent, render, renderHook, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useRef } from "react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { useCopy, useHashRoute, useOnClickOutside } from "@/lib/hooks";

describe("useCopy", () => {
  afterEach(() => {
    vi.unstubAllGlobals();
    vi.useRealTimers();
  });

  it("copies via the async clipboard API and auto-resets", async () => {
    // Fake timers must be active before copy() schedules its reset timer.
    vi.useFakeTimers();
    const writeText = vi.fn().mockResolvedValue(undefined);
    Object.assign(navigator, { clipboard: { writeText } });

    const { result } = renderHook(() => useCopy(1000));
    let ok: boolean | undefined;
    await act(async () => {
      ok = await result.current.copy("hello unseen");
    });

    expect(writeText).toHaveBeenCalledWith("hello unseen");
    expect(ok).toBe(true);
    expect(result.current.copied).toBe(true);
    expect(result.current.copyError).toBe(false);

    act(() => vi.advanceTimersByTime(1100));
    expect(result.current.copied).toBe(false);
  });

  it("reports an error when every copy path fails", async () => {
    const writeText = vi.fn().mockRejectedValue(new Error("denied"));
    Object.assign(navigator, { clipboard: { writeText } });
    // jsdom has no document.execCommand, so the legacy path also fails.

    const { result } = renderHook(() => useCopy(1000));
    let ok: boolean | undefined;
    await act(async () => {
      ok = await result.current.copy("blocked");
    });

    expect(ok).toBe(false);
    expect(result.current.copied).toBe(false);
    expect(result.current.copyError).toBe(true);
  });
});

describe("useHashRoute", () => {
  afterEach(() => {
    window.location.hash = "";
  });

  it("reflects hash changes and navigates", () => {
    const { result } = renderHook(() => useHashRoute());
    expect(result.current.route).toBe("");

    act(() => {
      result.current.navigate("components/button");
      window.dispatchEvent(new HashChangeEvent("hashchange"));
    });
    expect(window.location.hash).toBe("#/components/button");
    expect(result.current.route).toBe("components/button");

    act(() => {
      window.location.hash = "#/foundations/color";
      window.dispatchEvent(new HashChangeEvent("hashchange"));
    });
    expect(result.current.route).toBe("foundations/color");
  });
});

describe("useOnClickOutside", () => {
  function Probe({ onOutside }: { onOutside: () => void }) {
    const ref = useRef<HTMLDivElement>(null);
    useOnClickOutside(ref, onOutside);
    return (
      <div>
        <div ref={ref}>
          <button type="button">inside</button>
        </div>
        <button type="button">outside</button>
      </div>
    );
  }

  it("fires for outside pointers only", async () => {
    const user = userEvent.setup();
    const onOutside = vi.fn();
    render(<Probe onOutside={onOutside} />);

    await user.click(screen.getByText("inside"));
    expect(onOutside).not.toHaveBeenCalled();

    await user.click(screen.getByText("outside"));
    expect(onOutside).toHaveBeenCalledTimes(1);

    fireEvent.touchStart(document.body);
    expect(onOutside).toHaveBeenCalledTimes(2);
  });
});
