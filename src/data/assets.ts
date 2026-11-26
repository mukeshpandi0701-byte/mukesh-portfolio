export type StillMedia = { kind: "still"; src: string; alt: string; width: number; height: number };
export type VideoMedia = { kind: "video"; src: string; poster: string; alt: string; transparent?: boolean };
export type SequenceMedia = { kind: "sequence"; frames: string[]; poster: string; alt: string };
export type CinematicMediaAsset = StillMedia | VideoMedia | SequenceMedia;

export type PortraitRole = "master" | "architectural" | "studio" | "rooftop";
const portrait = (src: string, alt: string, width: number, height: number): StillMedia => ({ kind: "still", src, alt, width, height });

/** Approved supplied portraits. Public PNG originals remain unchanged; next/image serves optimized variants. */
export const portraitRegistry: Record<PortraitRole, { expectedFile: string; status: "available"; media: StillMedia }> = {
  master: { expectedFile: "/assets/portraits/master.png", status: "available", media: portrait("/assets/portraits/master.png", "Mukesh in a black blazer and white T-shirt", 1088, 1446) },
  architectural: { expectedFile: "/assets/portraits/architectural.png", status: "available", media: portrait("/assets/portraits/architectural.png", "Mukesh against a dramatic architectural wall", 1199, 1312) },
  studio: { expectedFile: "/assets/portraits/studio.png", status: "available", media: portrait("/assets/portraits/studio.png", "Mukesh in a warm, low-lit studio portrait", 1088, 1445) },
  rooftop: { expectedFile: "/assets/portraits/rooftop.png", status: "available", media: portrait("/assets/portraits/rooftop.png", "Mukesh on a rooftop at dusk", 1088, 1445) },
};

export const masterPortrait = portraitRegistry.master;

const characterStill = (name: string, alt: string): StillMedia => ({ kind: "still", src: `/assets/character/${name}.png`, alt, width: 1086, height: 1448 });

/** Static approved pose cutouts; these are match-cut assets, not animation frames. */
export const characterRegistry = {
  still: characterStill("front", "Mukesh, full length, facing forward"),
  poses: {
    front: characterStill("front", "Mukesh, full length, facing forward"),
    threeQuarter: characterStill("three-quarter", "Mukesh, full length, in three-quarter view"),
    sideWalking: characterStill("side-walking", "Mukesh, full length, facing to the side in a walking pose"),
    rearWalking: characterStill("rear-walking", "Mukesh, full length, seen from behind in a walking pose"),
  },
  motion: {
    walkingEntrance: null as CinematicMediaAsset | null,
    headTurn: null as CinematicMediaAsset | null,
    rearWalkingExit: null as CinematicMediaAsset | null,
    laptopTransition: null as CinematicMediaAsset | null,
  },
  transparentVideo: null as VideoMedia | null,
  sequence: null as SequenceMedia | null,
};
