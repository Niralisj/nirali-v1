import { useEffect, useRef } from "react";
import "./Blip.css";

// ---- sprite sheets (one per outfit, 4 cols x 6 rows of 32px cells) ----
const sheetLoaders = import.meta.glob("../assets/buddy/outfits/*_1x.png", {
  query: "?url",
  import: "default",
}) as Record<string, () => Promise<string>>;

type Hat = "none" | "beanie" | "party" | "cap";
type Glasses = "none" | "round" | "square";
type Tool = "none" | "pencil" | "wrench" | "magnifier";
type Outfit = { hat: Hat; glasses: Glasses; tool: Tool };

const HATS: Hat[] = ["none", "beanie", "party", "cap"];
const GLASSES: Glasses[] = ["none", "round", "square"];
const outfitKey = (o: Outfit) => `hat-${o.hat}_glasses-${o.glasses}_tool-${o.tool}`;

// frame id -> [col, row] on the sheet
const CELL: Record<string, [number, number]> = {
  idle_0: [0, 0], idle_1: [1, 0], idle_2: [2, 0], idle_3: [3, 0],
  blink_0: [0, 1],
  wave_0: [0, 2], wave_1: [1, 2], wave_2: [2, 2], wave_3: [3, 2],
  hop_0: [0, 3], hop_1: [1, 3], hop_2: [2, 3],
  sleep_0: [0, 4], sleep_1: [1, 4],
  look_left: [0, 5], look_right: [1, 5], look_up: [2, 5],
};

// which tool Blip picks up in which section of the page
const SECTION_TOOL: Record<string, Tool> = {
  about: "magnifier",
  projects: "wrench",
  creative: "pencil",
};

const SIZE = 64;
const HALF = SIZE / 2;
const FEET = HALF - 5; // centre -> feet distance (sprite has a little bottom padding)
const SELECTOR = "h1,h2,h3,h4,p,li,a,button,label";

type Plat = { el: Element | null }; // el === null -> bottom of viewport
type Rect = { left: number; right: number; top: number; bottom: number };
type End =
  | { kind: "top"; plat: Plat; ox: number }
  | { kind: "wall"; plat: Plat; side: -1 | 1; dy: number };
type Act = "idle" | "wave" | "look" | "sleep" | "surprise";

function rectOf(p: Plat): Rect {
  if (!p.el) {
    const y = window.scrollY + window.innerHeight - 4;
    return { left: 0, right: document.documentElement.clientWidth, top: y, bottom: y };
  }
  const r = p.el.getBoundingClientRect();
  return {
    left: r.left + window.scrollX,
    right: r.right + window.scrollX,
    top: r.top + window.scrollY,
    bottom: r.bottom + window.scrollY,
  };
}

function resolve(e: End): { cx: number; cy: number; rot: number } {
  const r = rectOf(e.plat);
  if (e.kind === "top") {
    const ox = Math.min(Math.max(e.ox, 14), Math.max(14, r.right - r.left - 14));
    return { cx: r.left + ox, cy: r.top - FEET, rot: 0 };
  }
  // clinging to a side wall: feet face the wall, sprite rotated 90deg
  return e.side === -1
    ? { cx: r.left - FEET, cy: r.top + e.dy, rot: -90 }
    : { cx: r.right + FEET, cy: r.top + e.dy, rot: 90 };
}

const rand = (a: number, b: number) => a + Math.random() * (b - a);
const pickOne = <T,>(list: T[]) => list[Math.floor(Math.random() * list.length)];
const isNight = () => {
  const h = new Date().getHours();
  return h >= 21 || h < 6;
};

export default function Blip() {
  const root = useRef<HTMLButtonElement>(null);
  const sprite = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = root.current!;
    const spriteEl = sprite.current!;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const night = isNight();

    const floor: Plat = { el: null };
    let mouse = { x: -999, y: -999 }; // viewport coords
    let shown = "";

    // ---- outfit ----
    let outfit: Outfit = { hat: night ? "beanie" : "none", glasses: "none", tool: "none" };
    let appliedKey = "";
    let wantedKey = "";
    const applyOutfit = (o: Outfit) => {
      outfit = o;
      const key = outfitKey(o);
      if (key === wantedKey) return;
      wantedKey = key;
      const load = sheetLoaders[`../assets/buddy/outfits/${key}_1x.png`];
      if (!load) return;
      load().then((url) => {
        if (wantedKey !== key) return; // a newer outfit was requested meanwhile
        const pre = new Image();
        pre.onload = () => {
          if (wantedKey !== key) return;
          spriteEl.style.backgroundImage = `url(${url})`;
          appliedKey = key;
        };
        pre.src = url;
      });
    };

    // ---- state ----
    let mode: "sit" | "hop" | "cling" = "sit";
    let at: End = { kind: "top", plat: floor, ox: rand(80, window.innerWidth - 80) };
    let pos = resolve(at);
    let rot = 0;
    let flip = 1;
    let act: Act = "idle";
    let actUntil = performance.now() + 2000;
    let nextBlink = performance.now() + rand(2500, 5000);
    let offscreenSince = 0;
    let lastScroll = 0;
    let hoverWave = false;
    let hatBeforeNap: Hat | null = null;

    // hop
    let hopFrom = pos;
    let hopTo: End = at;
    let hopStart = 0;
    let crouch = 140;
    let flight = 500;
    let arc = 40;

    // cling
    let clingEnd: End | null = null;

    applyOutfit(outfit);

    const toolForHere = (): Tool => {
      let el: Element | null = at.plat.el;
      if (!el) el = document.elementFromPoint(window.innerWidth / 2, window.innerHeight / 2);
      const id = el?.closest("section[id]")?.id ?? "";
      return SECTION_TOOL[id] ?? "none";
    };

    const platforms = (): Plat[] => {
      const top = 70;
      const out: Plat[] = [];
      document.querySelectorAll(SELECTOR).forEach((el) => {
        if (node.contains(el) || out.length > 80) return;
        const r = el.getBoundingClientRect();
        if (r.width < 50 || r.height < 12 || r.height > 500) return;
        if (r.bottom < top || r.top < top || r.top > window.innerHeight - 30) return;
        if (r.right < 20 || r.left > window.innerWidth - 20) return;
        if (!el.textContent || el.textContent.trim().length < 3) return;
        for (let n: Element | null = el; n && n !== document.body; n = n.parentElement) {
          const p = getComputedStyle(n).position;
          if (p === "fixed" || p === "sticky") return;
        }
        out.push({ el });
      });
      return out;
    };

    const startHop = (to: End, skipCrouch = false) => {
      hopFrom = { cx: pos.cx, cy: pos.cy, rot };
      hopTo = to;
      hopStart = performance.now();
      const end = resolve(to);
      const dx = end.cx - hopFrom.cx;
      const dy = end.cy - hopFrom.cy;
      const dist = Math.hypot(dx, dy);
      if (Math.abs(dx) > 4) flip = dx > 0 ? 1 : -1;
      crouch = skipCrouch ? 0 : 140;
      flight = Math.min(900, 280 + dist * 0.9);
      arc = Math.min(130, 24 + dist * 0.25 + Math.max(0, -dy) * 0.3);
      mode = "hop";
    };

    const wakeUp = () => {
      if (hatBeforeNap !== null) {
        applyOutfit({ ...outfit, hat: hatBeforeNap });
        hatBeforeNap = null;
      }
    };

    const sitAct = (a: Act, ms: number) => {
      if (act === "sleep" && a !== "sleep") wakeUp();
      act = a;
      actUntil = performance.now() + ms;
    };

    const goTo = (p: Plat, r: Rect, ox?: number) => {
      const width = r.right - r.left;
      const x = ox ?? rand(Math.min(14, width / 2), Math.max(14, width - 14));
      if (r.top < pos.cy + FEET - 90) {
        // it's up high: go to the side of the text and climb it
        const leftOk = r.left - SIZE > 8;
        const rightOk = r.right + SIZE < document.documentElement.clientWidth - 8;
        let side: -1 | 1 = pos.cx < (r.left + r.right) / 2 ? -1 : 1;
        if (side === -1 && !leftOk) side = 1;
        if (side === 1 && !rightOk) side = -1;
        clingEnd = { kind: "top", plat: p, ox: x };
        const dy = Math.max(30, Math.min(r.bottom - r.top - 10, 260));
        return startHop({ kind: "wall", plat: p, side, dy });
      }
      startHop({ kind: "top", plat: p, ox: x });
    };

    const nearby = (list: Plat[]) =>
      list
        .map((p) => ({ p, r: rectOf(p) }))
        .filter(({ r }) => Math.abs(r.top - pos.cy) < 600)
        .sort(() => Math.random() - 0.5);

    // little walk: a few small hops along the current surface
    let walkLeft = 0;
    let walkDir = 1;
    const walkStep = () => {
      const r = rectOf(at.plat);
      const ox = pos.cx - r.left;
      let next = ox + walkDir * rand(40, 80);
      const max = r.right - r.left - 14;
      if (next > max || next < 14) {
        walkDir = -walkDir;
        next = Math.min(Math.max(ox + walkDir * rand(40, 80), 14), Math.max(14, max));
      }
      startHop({ kind: "top", plat: at.plat, ox: next });
    };

    // try a new look: surprised pose + new hat/glasses
    const dressUp = () => {
      let hat = pickOne(HATS);
      let glasses = pickOne(GLASSES);
      if (hat === outfit.hat && glasses === outfit.glasses) {
        hat = pickOne(HATS.filter((h) => h !== outfit.hat));
        glasses = pickOne(GLASSES);
      }
      applyOutfit({ ...outfit, hat, glasses });
      sitAct("surprise", 700);
    };

    // shuffle-bag so the same thing never happens twice in a row
    type Move =
      | "wave" | "look" | "nap" | "startle" | "rest" | "wander" | "walk"
      | "chase" | "link" | "floor" | "dress";
    let bag: Move[] = [];
    let lastMove: Move | null = null;
    const nextMove = (): Move => {
      if (bag.length === 0) {
        bag = ["wave", "look", "nap", "startle", "rest", "wander", "wander", "walk", "walk", "chase", "link", "floor", "dress"];
        if (night) bag.push("nap", "nap", "rest"); // sleepier after dark
        bag.sort(() => Math.random() - 0.5);
      }
      let i = bag.findIndex((m) => m !== lastMove);
      if (i < 0) i = 0;
      return (lastMove = bag.splice(i, 1)[0]);
    };

    const decide = () => {
      if (reduced) return sitAct("idle", 4000);
      if (walkLeft > 0) {
        walkLeft--;
        return walkStep();
      }
      const here = at.plat;
      const cands = platforms().filter((p) => p.el !== here.el);
      switch (nextMove()) {
        case "wave":
          return sitAct("wave", rand(1200, 2200));
        case "look":
          return sitAct("look", rand(2000, 4000));
        case "nap":
          // cosy beanie for the nap
          if (outfit.hat === "none") {
            hatBeforeNap = "none";
            applyOutfit({ ...outfit, hat: "beanie" });
          }
          return sitAct("sleep", rand(9000, 20000));
        case "startle":
          return sitAct("surprise", 700);
        case "rest":
          return sitAct("idle", rand(2500, 5000));
        case "dress":
          return dressUp();
        case "walk":
          walkLeft = Math.floor(rand(3, 6));
          walkDir = Math.random() < 0.5 ? -1 : 1;
          return walkStep();
        case "floor":
          if (here.el !== null) return startHop({ kind: "top", plat: floor, ox: rand(40, window.innerWidth - 40) });
          break;
        case "chase": {
          // go sit near the cursor
          const m = { x: mouse.x + window.scrollX, y: mouse.y + window.scrollY };
          const best = cands
            .map((p) => ({ p, r: rectOf(p) }))
            .sort((a, b) => Math.hypot(a.r.left - m.x, a.r.top - m.y) - Math.hypot(b.r.left - m.x, b.r.top - m.y))[0];
          if (best && mouse.x > 0) {
            return goTo(best.p, best.r, Math.min(Math.max(m.x - best.r.left, 14), best.r.right - best.r.left - 14));
          }
          break;
        }
        case "link": {
          const links = cands.filter((p) => p.el && p.el.matches("a,button"));
          if (links.length) {
            const p = pickOne(links);
            return goTo(p, rectOf(p));
          }
          break;
        }
      }
      // wander (also the fallback)
      if (cands.length === 0) {
        walkLeft = 2;
        return walkStep();
      }
      const pick = nearby(cands)[0] ?? { p: cands[0], r: rectOf(cands[0]) };
      goTo(pick.p, pick.r);
    };

    const land = () => {
      const end = hopTo;
      at = end;
      pos = resolve(end);
      rot = pos.rot;
      if (end.kind === "wall") {
        mode = "cling";
      } else {
        mode = "sit";
        // pick up the tool that fits this part of the page
        const tool = toolForHere();
        if (tool !== outfit.tool) applyOutfit({ ...outfit, tool });
        sitAct("idle", walkLeft > 0 ? 120 : rand(800, 2200));
      }
    };

    // ---- frame picking ----
    const frameFor = (now: number): string => {
      if (mode === "hop") {
        const t = now - hopStart;
        if (t < crouch) return "hop_0";
        if (t < crouch + flight) return `wave_${Math.floor(now / 120) % 4}`;
        return "hop_2";
      }
      if (mode === "cling") return `wave_${Math.floor(now / 170) % 4}`;
      if (hoverWave) return `wave_${Math.floor(now / 170) % 4}`;
      switch (act) {
        case "wave":
          return `wave_${Math.floor(now / 170) % 4}`;
        case "sleep":
          return `sleep_${Math.floor(now / 900) % 2}`;
        case "surprise": {
          const t = actUntil - now;
          return t > 450 ? "hop_0" : t > 150 ? "hop_1" : "hop_2";
        }
        case "look": {
          const dx = mouse.x - (pos.cx - window.scrollX);
          const dy = mouse.y - (pos.cy - window.scrollY);
          if (dy < -Math.abs(dx)) return "look_up";
          return dx < 0 ? "look_left" : "look_right";
        }
        default:
          if (now > nextBlink) {
            if (now > nextBlink + 130) nextBlink = now + rand(3000, 6000);
            return "blink_0";
          }
          return `idle_${Math.floor(now / 420) % 4}`;
      }
    };

    // ---- main loop ----
    let raf = 0;
    let last = performance.now();
    const tick = (now: number) => {
      const dt = Math.min(now - last, 50);
      last = now;

      if (mode === "sit") {
        if (at.kind === "top" && at.plat.el && !at.plat.el.isConnected) {
          at = { kind: "top", plat: floor, ox: pos.cx };
        }
        pos = resolve(at);
        rot = 0;
        if (act === "sleep") {
          const near = Math.hypot(mouse.x - (pos.cx - window.scrollX), mouse.y - (pos.cy - window.scrollY));
          if (near < 70) sitAct("surprise", 700);
        }
        if (now > actUntil) {
          if (act === "sleep" || act === "surprise") sitAct("idle", 600);
          else decide();
        }
      } else if (mode === "hop") {
        const t = now - hopStart;
        if (t >= crouch) {
          const k = Math.min(1, (t - crouch) / flight);
          const end = resolve(hopTo);
          pos = {
            cx: hopFrom.cx + (end.cx - hopFrom.cx) * k,
            cy: hopFrom.cy + (end.cy - hopFrom.cy) * k - arc * 4 * k * (1 - k),
            rot: 0,
          };
          rot = k < 0.5 ? hopFrom.rot : end.rot;
          if (k >= 1) {
            if (t > crouch + flight + 160) land();
            else pos = { cx: end.cx, cy: end.cy, rot: end.rot };
          }
        }
      } else if (mode === "cling" && at.kind === "wall") {
        at = { ...at, dy: at.dy - dt * 0.035 };
        pos = resolve(at);
        rot = pos.rot;
        if (at.dy <= 6 && clingEnd) {
          const next = clingEnd;
          clingEnd = null;
          startHop(next, true);
        }
      }

      // off-screen recovery: once the user stops scrolling, Blip drops in after them
      const vy = pos.cy - window.scrollY;
      if (vy < -60 || vy > window.innerHeight + 60) {
        if (!offscreenSince) offscreenSince = now;
        if (now - offscreenSince > 700 && now - lastScroll > 350 && mode !== "hop") {
          offscreenSince = 0;
          pos = { cx: rand(60, window.innerWidth - 60), cy: window.scrollY - 80, rot: 0 };
          rot = 0;
          wakeUp();
          act = "idle";
          const cands = platforms();
          const to: End = cands.length
            ? { kind: "top", plat: pickOne(cands), ox: rand(20, 120) }
            : { kind: "top", plat: floor, ox: pos.cx };
          startHop(to, true);
        }
      } else offscreenSince = 0;

      const maxX = document.documentElement.clientWidth - HALF;
      const x = Math.min(Math.max(pos.cx, HALF), maxX);
      node.style.transform = `translate3d(${x - HALF}px, ${pos.cy - HALF}px, 0) rotate(${rot}deg) scaleX(${flip})`;
      const f = frameFor(now);
      const key = f + appliedKey;
      if (key !== shown) {
        shown = key;
        const [c, r] = CELL[f];
        spriteEl.style.backgroundPosition = `${-c * SIZE}px ${-r * SIZE}px`;
      }
      raf = requestAnimationFrame(tick);
    };

    // ---- input ----
    let lastY = window.scrollY;
    let lastT = performance.now();
    const onScroll = () => {
      const now = performance.now();
      const speed = Math.abs(window.scrollY - lastY) / Math.max(1, now - lastT); // px per ms
      lastY = window.scrollY;
      lastT = now;
      lastScroll = now;
      // whoa, fast scroll
      if (speed > 2.5 && mode === "sit" && act !== "surprise") sitAct("surprise", 700);
    };
    const onMove = (e: MouseEvent) => {
      mouse = { x: e.clientX, y: e.clientY };
    };
    const onEnter = () => {
      hoverWave = mode === "sit" && act !== "sleep";
    };
    const onLeave = () => {
      hoverWave = false;
    };
    const onClick = () => {
      if (mode !== "sit") return;
      if (Math.random() < 0.3) dressUp();
      else sitAct("surprise", 700);
    };
    window.addEventListener("mousemove", onMove);
    window.addEventListener("scroll", onScroll, { passive: true });
    node.addEventListener("mouseenter", onEnter);
    node.addEventListener("mouseleave", onLeave);
    node.addEventListener("click", onClick);
    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("scroll", onScroll);
      node.removeEventListener("mouseenter", onEnter);
      node.removeEventListener("mouseleave", onLeave);
      node.removeEventListener("click", onClick);
    };
  }, []);

  return (
    <button ref={root} type="button" className="blip" aria-label="Blip, site mascot">
      <div ref={sprite} className="blip-sprite" />
    </button>
  );
}
