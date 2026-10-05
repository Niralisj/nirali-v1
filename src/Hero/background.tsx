import { useEffect, useRef } from "react";
import "./bg.css";

type Star = { x: number; y: number; r: number; depth: number; phase: number; speed: number };

const FPS_INTERVAL = 1000 / 30;

function makeStars(w: number, h: number): Star[] {
  const count = Math.round((w * h) / 9000);
  return Array.from({ length: count }, () => ({
    x: Math.random() * w,
    y: Math.random() * h,
    r: 0.4 + Math.random() * 1.1,
    depth: 0.2 + Math.random() * 0.8,
    phase: Math.random() * Math.PI * 2,
    speed: 0.4 + Math.random() * 0.9,
  }));
}

function Background() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let w = 0;
    let h = 0;
    let stars: Star[] = [];
    let raf = 0;
    let last = 0;
    let start = performance.now();
    let hiddenAt = 0;
    const target = { x: 0, y: 0 };
    const current = { x: 0, y: 0 };

    const render = (t: number) => {
      current.x += (target.x - current.x) * 0.05;
      current.y += (target.y - current.y) * 0.05;

      ctx.clearRect(0, 0, w, h);
      ctx.fillStyle = "#cfe0ff";
      for (const s of stars) {
        const twinkle = reduceMotion ? 0.8 : 0.55 + 0.45 * Math.sin(t * s.speed + s.phase);
        ctx.globalAlpha = (0.25 + s.depth * 0.55) * twinkle;
        ctx.beginPath();
        ctx.arc(
          s.x + current.x * s.depth * 24,
          s.y + current.y * s.depth * 24,
          s.r,
          0,
          Math.PI * 2
        );
        ctx.fill();
      }
      ctx.globalAlpha = 1;
    };

    const tick = (now: number) => {
      raf = requestAnimationFrame(tick);
      if (now - last < FPS_INTERVAL) return;
      last = now;
      render((now - start) / 1000);
    };

    const setup = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      stars = makeStars(w, h);
      if (reduceMotion) render(0);
    };

    let resizeTimer = 0;
    const onResize = () => {
      window.clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(setup, 150);
    };
    const onPointer = (e: PointerEvent) => {
      target.x = e.clientX / w - 0.5;
      target.y = e.clientY / h - 0.5;
    };
    const onVisibility = () => {
      if (document.hidden) {
        cancelAnimationFrame(raf);
        hiddenAt = performance.now();
      } else {
        start += performance.now() - hiddenAt;
        raf = requestAnimationFrame(tick);
      }
    };

    setup();
    window.addEventListener("resize", onResize);

    if (!reduceMotion) {
      window.addEventListener("pointermove", onPointer, { passive: true });
      document.addEventListener("visibilitychange", onVisibility);
      raf = requestAnimationFrame(tick);
    }

    return () => {
      cancelAnimationFrame(raf);
      window.clearTimeout(resizeTimer);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("pointermove", onPointer);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  return (
    <div className="bg" aria-hidden="true">
      <div className="glow glow-a" />
      <div className="glow glow-b" />
      <div className="glow glow-c" />
      <canvas ref={canvasRef} className="bg-stars" />
      <div className="grain" />
    </div>
  );
}

export default Background;