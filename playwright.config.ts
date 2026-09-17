import { defineConfig } from "@playwright/test";
import { ensureBrowser, launchArgs } from "./scripts/browser-setup.mjs";

/**
 * Real-browser gates: axe WITH color-contrast (uncomputable in jsdom),
 * responsive reflow, 200% zoom, visual baselines.
 *
 * Browser provisioning: Playwright's CDN is not always reachable, so the
 * Chromium binary comes from the npm-hosted @sparticuz/chromium package and
 * its bundled AL2023 system libs — `npm install` is all it takes. On machines
 * with a normal `npx playwright install chromium` setup you can delete the
 * launchOptions override below and run on the stock build.
 */
const { executablePath, libPath } = await ensureBrowser();

// --single-process (a Lambda tuning) makes the browser crash-prone under
// parallel workers locally; multi-process + --no-zygote is stable.
const args = launchArgs.filter((a) => a !== "--single-process");

export default defineConfig({
  testDir: "tests-browser",
  timeout: 60_000,
  expect: { timeout: 10_000 },
  retries: 1,
  workers: 3,
  reporter: [["list"]],
  use: {
    baseURL: "http://localhost:4173",
    headless: true,
    launchOptions: {
      executablePath,
      args,
      env: { ...process.env, LD_LIBRARY_PATH: `${libPath}:${process.env.LD_LIBRARY_PATH ?? ""}` },
    },
    // Deterministic rendering: no remote fonts/CDNs (also avoids 20s stalls —
    // unreachable hosts here fail silently). System fallbacks are fine for
    // layout, contrast and baseline purposes.
    serviceWorkers: "block",
    reducedMotion: "reduce",
  },
  webServer: {
    command: "npx vite preview --port 4173 --strictPort --host 127.0.0.1",
    url: "http://localhost:4173",
    timeout: 60_000,
    reuseExistingServer: true,
  },
});
