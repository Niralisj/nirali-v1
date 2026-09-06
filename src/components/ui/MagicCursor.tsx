"use client";
import { useEffect } from "react";
import "../style/MagicCursor.css";

export default function MagicCursor() {
  useEffect(() => {
    const move = (e: MouseEvent) => {
      const cursor = document.querySelector(".magic-cursor") as HTMLElement;
      if (!cursor) return;

      cursor.style.left = `${e.clientX}px`;
      cursor.style.top = `${e.clientY}px`;

      const spark = document.createElement("span");
      spark.className = "spark";
      spark.style.left = `${e.clientX}px`;
      spark.style.top = `${e.clientY}px`;
      document.body.appendChild(spark);

      setTimeout(() => spark.remove(), 600);
    };

    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);

  return <div className="magic-cursor">✦</div>;
}