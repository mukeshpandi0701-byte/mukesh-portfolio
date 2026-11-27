# Cinematic video asset drop

No footage is included yet. Add approved media here only after reviewing it for identity, framing, rights, and web delivery.

- `entrance.webm` — silent VP9/WebM, approximately 2.5–3 seconds.
- `entrance.mp4` — silent H.264 fallback for browsers that do not support the WebM encode.
- Provide a matching still poster and configure both ordered sources plus the still fallback in `src/data/assets.ts` / the intro's `CinematicMedia` call.
- Match the final entrance frame to the hero subject's scale, position, and pose. The production hero portrait remains the handoff frame.
- Add head-turn, laptop transition, and rear-exit footage only when approved; keep it silent and provide a poster and still fallback for each.
- Test alpha-capable WebM on target browsers before relying on transparency. Provide a non-alpha MP4 or PNG fallback.

Do not add unrelated static poses as synthetic motion frames. If scroll seeking is unstable, use a curated AVIF/WebP image sequence with a poster instead.
