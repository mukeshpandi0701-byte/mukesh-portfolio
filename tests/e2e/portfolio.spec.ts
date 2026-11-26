import { expect, test, type Page } from "@playwright/test";
import { mkdirSync } from "node:fs";
import { resolve } from "node:path";

const screenshots = resolve(process.cwd(), "artifacts", "screenshots");
mkdirSync(screenshots, { recursive: true });

async function skipIntro(page: Page) {
  const intro = page.getByRole("region", { name: "Mukesh portfolio introduction" });
  await expect(page.locator("[data-cinematic-root]")).toHaveAttribute("data-motion-mode", "cinematic");
  if (await intro.isVisible().catch(() => false)) {
    await page.getByRole("button", { name: /skip introduction/i }).click();
  }
  await expect(intro).toHaveCount(0, { timeout: 6_000 });
  await page.evaluate(() => new Promise<void>((resolve) => requestAnimationFrame(() => requestAnimationFrame(() => resolve()))));
}

async function sceneProgress(page: Page) {
  const raw = await page.locator(".entry-scene").evaluate((node) => getComputedStyle(node).getPropertyValue("--scene-progress"));
  return Number.parseFloat(raw) || 0;
}

test("opening can be skipped and hands off to the approved hero assets", async ({ page }) => {
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  page.on("console", (message) => { if (message.type() === "error") errors.push(message.text()); });
  await page.setViewportSize({ width: 1920, height: 1080 });
  await page.goto("/");
  const intro = page.getByRole("region", { name: "Mukesh portfolio introduction" });
  await expect(intro).toBeVisible();
  await page.screenshot({ path: resolve(screenshots, "intro-1920x1080.png") });
  await expect(intro.locator(".intro-side-character .cinematic-media__image")).toHaveAttribute("src", /side-walking/);
  await page.getByRole("button", { name: /skip introduction/i }).click();
  await expect(intro).toBeHidden();
  await expect(page.locator("#hero-title")).toHaveText("MUKESH.");
  await expect(page.locator(".dock-wrap")).toBeVisible();
  await expect.poll(() => page.locator(".entry-character img").evaluate((img: HTMLImageElement) => img.complete && img.naturalWidth > 0)).toBe(true);
  await page.screenshot({ path: resolve(screenshots, "hero-1920x1080.png") });
  expect(errors.filter((error) => /hydration|uncaught|failed to hydrate/i.test(error))).toEqual([]);
});

test("opening completes naturally without a loading screen", async ({ browser }) => {
  const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await context.newPage();
  await page.goto("/");
  const intro = page.getByRole("region", { name: "Mukesh portfolio introduction" });
  await expect(intro).toBeVisible();
  await page.waitForFunction(() => {
    const side = document.querySelector<HTMLElement>(".intro-side-character");
    return Boolean(side && Number.parseFloat(getComputedStyle(side).opacity) > 0.85);
  }, { timeout: 5_000 });
  await page.screenshot({ path: resolve(screenshots, "intro-entrance-pose-1440x900.png") });
  await page.waitForFunction(() => {
    const side = document.querySelector<HTMLElement>(".intro-side-character");
    const turn = document.querySelector<HTMLElement>(".intro-three-quarter");
    return Boolean(side && turn && Number.parseFloat(getComputedStyle(side).opacity) < 0.05 && Number.parseFloat(getComputedStyle(turn).opacity) > 0.85);
  }, { timeout: 3_000 });
  await page.screenshot({ path: resolve(screenshots, "intro-pose-matchcut-1440x900.png") });
  await expect(intro).toBeHidden({ timeout: 6_000 });
  await expect(page.locator("#hero-title")).toBeVisible();
  await page.screenshot({ path: resolve(screenshots, "hero-after-intro-1440x900.png") });
  await context.close();
});

test("pinned identity is reversible and themes persist while it is active", async ({ page }) => {
  await page.setViewportSize({ width: 1920, height: 1080 });
  await page.goto("/");
  await skipIntro(page);
  await expect(page.locator("[data-cinematic-root]")).toHaveAttribute("data-motion-mode", "cinematic");
  await expect(page.locator(".theme-label")).toHaveText("system");
  await page.evaluate(() => window.scrollTo({ top: 0, behavior: "instant" }));
  await page.waitForTimeout(200);
  const top = await sceneProgress(page);
  await page.evaluate(() => window.scrollTo({ top: Math.round(window.innerHeight * 0.78), behavior: "instant" }));
  await expect.poll(() => sceneProgress(page)).toBeGreaterThan(0.1);
  await page.screenshot({ path: resolve(screenshots, "identity-transition-1920x1080.png") });
  const forward = await sceneProgress(page);

  const themeButton = page.getByRole("button", { name: "Change color theme" });
  await themeButton.click(); // System -> Light
  await expect.poll(() => page.locator("html").evaluate((node) => node.classList.contains("dark"))).toBe(false);
  await themeButton.click(); // Light -> Dark, while pinned
  await expect(page.locator("html")).toHaveClass(/dark/);
  await expect.poll(() => page.evaluate(() => localStorage.getItem("theme"))).toBe("dark");
  await themeButton.click(); // Dark -> System
  await expect(page.locator(".theme-label")).toHaveText("system");
  await expect.poll(() => page.evaluate(() => localStorage.getItem("theme"))).toBe("system");
  await themeButton.click(); // System -> Light
  await expect(page.locator(".theme-label")).toHaveText("light");
  await themeButton.click(); // Light -> Dark for persistence check
  await expect(page.locator("html")).toHaveClass(/dark/);
  const pinnedAfterTheme = await sceneProgress(page);
  expect(pinnedAfterTheme).toBeGreaterThan(0.1);
  expect(Math.abs(pinnedAfterTheme - forward)).toBeLessThan(0.08);
  const scrollAtTheme = await page.evaluate(() => window.scrollY);
  await page.reload();
  await skipIntro(page);
  await expect(page.locator("html")).toHaveClass(/dark/);
  expect(await page.evaluate(() => window.localStorage.getItem("theme"))).toBe("dark");
  await page.evaluate(() => window.scrollTo({ top: Math.round(window.innerHeight * 0.2), behavior: "instant" }));
  await expect.poll(() => sceneProgress(page)).toBeLessThan(forward);
  expect(scrollAtTheme).toBeGreaterThan(0);
  expect(top).toBeLessThan(forward);
});

test("dock navigation, skill selection, and reversible horizontal projects work", async ({ page }) => {
  await page.goto("/");
  await skipIntro(page);
  const navigation = page.getByRole("navigation", { name: "Main navigation" });
  await expect(page.locator('a[href="/lab/glass"]')).toHaveCount(0);
  await navigation.getByRole("link", { name: "Work" }).click();
  await expect(page).toHaveURL(/#work$/);
  const practice = page.getByRole("button", { name: /02 \/ INTELLIGENCE/ });
  await practice.focus();
  await practice.press("Enter");
  await expect(practice).toHaveAttribute("aria-pressed", "true");
  await expect(page.locator(".universe-center")).toContainText("INTELLIGENCE");

  const projectScene = page.locator("[data-project-story]");
  await projectScene.evaluate((node) => {
    const top = node.getBoundingClientRect().top + window.scrollY;
    window.scrollTo({ top, behavior: "instant" });
  });
  await page.waitForTimeout(800);
  const track = page.locator(".project-story__track");
  const before = (await track.boundingBox())?.x ?? 0;
  await page.screenshot({ path: resolve(screenshots, "projects-panel-01-1440x900.png") });
  const viewport = await page.locator(".project-story__viewport").boundingBox();
  if (!viewport) throw new Error("Project viewport has no layout box");
  await page.mouse.move(viewport.x + viewport.width / 2, viewport.y + viewport.height / 2);
  await page.mouse.wheel(0, 700);
  await expect.poll(async () => (await track.boundingBox())?.x ?? 0).toBeLessThan(before - 60);
  await page.waitForTimeout(900);
  const after = (await track.boundingBox())?.x ?? 0;
  await page.screenshot({ path: resolve(screenshots, "projects-panel-02-1440x900.png") });
  await page.screenshot({ path: resolve(screenshots, "projects-horizontal-1440x900.png") });
  await page.mouse.wheel(0, -900);
  await expect.poll(async () => (await track.boundingBox())?.x ?? 0).toBeGreaterThan(after + 100);
  await page.waitForTimeout(900);
  await page.screenshot({ path: resolve(screenshots, "projects-reverse-1440x900.png") });
});

test("case studies and the glass comparison lab render", async ({ page }) => {
  const routes = [
    ["/projects/classygenz", "ClassyGenz"],
    ["/projects/resync", "ReSync"],
    ["/projects/invenzo-ai", "Invenzo AI Solutions"],
  ];
  for (const [route, heading] of routes) {
    const response = await page.goto(route);
    expect(response?.ok(), `${route} should respond successfully`).toBe(true);
    await expect(page.getByRole("heading", { name: new RegExp(heading, "i") }).first()).toBeVisible();
  }
  const labResponse = await page.goto("/lab/glass");
  expect(labResponse?.ok()).toBe(true);
  await expect(page.getByRole("heading", { name: /glass, in motion/i })).toBeVisible();
  await expect(page.locator(".sample")).toHaveCount(3);
  await page.screenshot({ path: resolve(screenshots, "glass-lab-1440x900.png") });
  await page.goto("/");
  await skipIntro(page);
  await page.locator("#contact").evaluate((node) => node.scrollIntoView({ block: "start", behavior: "instant" }));
  const finaleTitle = page.getByRole("heading", { name: "LET'S TALK." });
  await expect(finaleTitle).toBeVisible();
  await expect(page.getByRole("link", { name: /Contact email placeholder/ })).toBeVisible();
  const desktopFinale = await page.evaluate(() => {
    const note = document.querySelector(".finale-note")?.getBoundingClientRect();
    const title = document.querySelector(".finale-link")?.getBoundingClientRect();
    const footer = document.querySelector(".footer-line") && getComputedStyle(document.querySelector(".footer-line")!).fontSize;
    return { note: note?.toJSON(), title: title?.toJSON(), footer: Number.parseFloat(footer ?? "0") };
  });
  expect(desktopFinale.note && desktopFinale.title && (desktopFinale.note.right <= desktopFinale.title.left || desktopFinale.title.right <= desktopFinale.note.left || desktopFinale.note.bottom <= desktopFinale.title.top || desktopFinale.title.bottom <= desktopFinale.note.top)).toBe(true);
  expect(desktopFinale.footer).toBeGreaterThanOrEqual(9.5);
  await expect(page.locator('a[href="/lab/glass"]')).toHaveCount(0);
  await page.screenshot({ path: resolve(screenshots, "finale-1440x900.png") });
  await page.setViewportSize({ width: 390, height: 844 });
  await page.locator("#contact").evaluate((node) => node.scrollIntoView({ block: "start", behavior: "instant" }));
  await expect(page.getByRole("heading", { name: "LET'S TALK." })).toBeVisible();
  await expect(page.getByRole("link", { name: /Contact email placeholder/ })).toBeVisible();
  expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(391);
  await page.screenshot({ path: resolve(screenshots, "finale-390x844.png") });
});

test("mobile dock opens and navigates by keyboard and touch-sized controls", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  await skipIntro(page);
  const navigation = page.getByRole("navigation", { name: "Main navigation" });
  const menuButton = navigation.getByRole("button", { name: "Open menu" });
  await expect(menuButton).toBeVisible();
  await menuButton.click();
  await expect(navigation.getByRole("link", { name: "About" })).toBeVisible();
  await navigation.getByRole("link", { name: "About" }).click();
  await expect(page).toHaveURL(/#about$/);
  await expect(navigation.getByRole("button", { name: "Open menu" })).toBeVisible();
  await page.locator("#work").evaluate((node) => node.scrollIntoView({ block: "start", behavior: "instant" }));
  await page.waitForTimeout(200);
  await page.screenshot({ path: resolve(screenshots, "projects-mobile-390x844.png") });
  expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(391);
});

test("reduced motion removes pins and intro animation", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  await expect(page.getByRole("region", { name: "Mukesh portfolio introduction" })).toBeHidden();
  await expect(page.locator("[data-cinematic-root]")).toHaveAttribute("data-motion-mode", "static");
  await expect(page.locator("#hero-title")).toBeVisible();
  await expect(page.locator(".project-story__track")).toHaveCSS("display", "grid");
});

test("required viewport set has no horizontal overflow or clipped hero title", async ({ page }) => {
  const sizes = [
    [1920, 1080], [1440, 900], [1366, 768], [1024, 768], [768, 1024], [390, 844], [360, 800],
  ] as const;
  await page.goto("/");
  await skipIntro(page);
  for (const [width, height] of sizes) {
    await page.setViewportSize({ width, height });
    await page.evaluate(() => { window.scrollTo({ top: 0, behavior: "instant" }); window.dispatchEvent(new Event("resize")); });
    await page.waitForTimeout(150);
    const dimensions = await page.evaluate(() => ({
      viewport: document.documentElement.clientWidth,
      document: document.documentElement.scrollWidth,
      scrollY: window.scrollY,
      hero: document.querySelector("#hero-title")?.getBoundingClientRect().toJSON(),
      characterImageLoaded: (() => { const image = document.querySelector<HTMLImageElement>(".entry-character .cinematic-media__image"); return Boolean(image?.complete && image.naturalWidth > 0); })(),
      navigation: document.querySelector(".dock-wrap")?.getBoundingClientRect().toJSON(),
    }));
    expect(dimensions.document, `${width}x${height} should not scroll horizontally`).toBeLessThanOrEqual(dimensions.viewport + 1);
    expect(dimensions.hero?.left ?? -1, `${width}x${height} hero title should not clip on the left`).toBeGreaterThanOrEqual(-1);
    expect(dimensions.hero?.right ?? width + 1, `${width}x${height} hero title should remain inside the viewport`).toBeLessThanOrEqual(width + 1);
    expect(dimensions.characterImageLoaded, `${width}x${height} approved hero character asset should load`).toBe(true);
    const character = await page.locator(".entry-character").boundingBox();
    expect(character?.top ?? 0, `${width}x${height} character head safe zone should clear navigation`).toBeGreaterThan((dimensions.navigation?.bottom ?? 0) + 4);
    await page.screenshot({ path: resolve(screenshots, `viewport-${width}x${height}.png`) });
  }
});
