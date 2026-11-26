"use client";

import Image from "next/image";
import { useEffect, useRef, useSyncExternalStore } from "react";
import { ScrollTrigger } from "@/lib/gsap";
import type { CinematicMediaAsset, PortraitRole } from "@/data/assets";
import { portraitRegistry } from "@/data/assets";

type Props = {
  asset?: CinematicMediaAsset;
  portraitRole?: PortraitRole;
  alt?: string;
  priority?: boolean;
  className?: string;
  placeholderLabel: string;
};

function SequenceCanvas({ asset, className }: { asset: Extract<CinematicMediaAsset, { kind: "sequence" }>; className: string }) {
  const host = useRef<HTMLDivElement>(null);
  const canvas = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const node = host.current;
    const canvasNode = canvas.current;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const context = canvasNode?.getContext("2d", { alpha: true, desynchronized: true });
    if (!node || !canvasNode || !context || asset.frames.length < 2) return;
    const images = new Map<number, HTMLImageElement>();
    const pending = new Set<number>();
    let activeIndex = 0;
    let destroyed = false;
    let dpr = Math.min(window.devicePixelRatio || 1, 1.5);

    const draw = (index: number) => {
      const image = images.get(index);
      if (!image || destroyed) return;
      const rect = node.getBoundingClientRect();
      if (!rect.width || !rect.height) return;
      const width = Math.round(rect.width * dpr);
      const height = Math.round(rect.height * dpr);
      if (canvasNode.width !== width || canvasNode.height !== height) {
        canvasNode.width = width;
        canvasNode.height = height;
      }
      context.clearRect(0, 0, width, height);
      const scale = Math.max(width / image.naturalWidth, height / image.naturalHeight);
      const drawWidth = image.naturalWidth * scale;
      const drawHeight = image.naturalHeight * scale;
      context.drawImage(image, (width - drawWidth) / 2, (height - drawHeight) / 2, drawWidth, drawHeight);
      canvasNode.dataset.ready = "true";
    };
    const load = (index: number) => {
      const safeIndex = Math.max(0, Math.min(asset.frames.length - 1, index));
      if (images.has(safeIndex)) { draw(safeIndex); return; }
      if (pending.has(safeIndex)) return;
      pending.add(safeIndex);
      const image = new window.Image();
      image.decoding = "async";
      image.onload = () => { pending.delete(safeIndex); images.set(safeIndex, image); if (safeIndex === activeIndex) draw(safeIndex); };
      image.onerror = () => pending.delete(safeIndex);
      image.src = asset.frames[safeIndex];
    };
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) load(activeIndex);
    }, { rootMargin: "30%" });
    observer.observe(node);
    const trigger = ScrollTrigger.create({
      trigger: node,
      start: "top bottom",
      end: "bottom top",
      onUpdate: (self) => {
        activeIndex = Math.round(self.progress * (asset.frames.length - 1));
        load(activeIndex);
        const direction = self.direction || 1;
        for (let step = 1; step <= 2; step += 1) load(activeIndex + direction * step);
      },
    });
    const resize = () => { dpr = Math.min(window.devicePixelRatio || 1, 1.5); draw(activeIndex); };
    window.addEventListener("resize", resize, { passive: true });
    return () => {
      destroyed = true;
      observer.disconnect();
      trigger.kill();
      window.removeEventListener("resize", resize);
      for (const image of images.values()) image.src = "";
      images.clear();
      pending.clear();
    };
  }, [asset]);
  return <div ref={host} className={`cinematic-media__sequence ${className}`} role="img" aria-label={asset.alt}>
    <Image src={asset.poster} alt="" fill sizes="(max-width: 700px) 90vw, 60vw" className="cinematic-media__poster" />
    <canvas ref={canvas} className="cinematic-media__canvas" aria-hidden="true" />
  </div>;
}

export function CinematicMedia({ asset, portraitRole, alt, priority = false, className = "", placeholderLabel }: Props) {
  const reducedMotion = useSyncExternalStore(
    (notify) => {
      const media = window.matchMedia("(prefers-reduced-motion: reduce)");
      media.addEventListener("change", notify);
      return () => media.removeEventListener("change", notify);
    },
    () => window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    () => false,
  );
  const portrait = portraitRole ? portraitRegistry[portraitRole] : undefined;
  const selected = asset ?? (portrait?.status === "available" ? portrait.media : undefined);
  if (!selected) return <div className={`cinematic-media cinematic-media--placeholder ${className}`} role="img" aria-label={`${placeholderLabel}. Approved portrait asset pending.`}>
    <div className="cinematic-media__halo" />
    <div className="cinematic-media__silhouette-head" />
    <div className="cinematic-media__silhouette-body" />
    <span className="cinematic-media__label">{placeholderLabel} / PORTRAIT PENDING</span>
  </div>;

  if (selected.kind === "sequence") return <SequenceCanvas asset={selected} className={className} />;
  if (selected.kind === "video") return <div className={`cinematic-media ${className}`} role="img" aria-label={selected.alt || alt || "Cinematic character video"} data-reduced-motion={reducedMotion || undefined}>
    <Image src={selected.poster} alt="" fill sizes="(max-width: 700px) 90vw, 60vw" className="cinematic-media__poster" priority={priority} />
    <video className="cinematic-media__video" src={selected.src} poster={selected.poster} playsInline muted autoPlay={!reducedMotion} loop={!reducedMotion} preload={priority ? "auto" : "metadata"} aria-hidden="true" />
  </div>;
  return <div className={`cinematic-media ${className}`}>
    <Image src={selected.src} alt={selected.alt || alt || "Mukesh"} fill sizes="(max-width: 700px) 90vw, 60vw" priority={priority} className="cinematic-media__image" />
  </div>;
}
