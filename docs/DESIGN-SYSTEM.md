# Design system

Monochrome Noir is the foundation, with blush reserved for emphasis. Semantic tokens live at the root of `src/app/globals.css`; `.dark` swaps token values. Scenes may establish deliberate contrast independently of the selected theme.

Light: `#FFFFFF` background, `#111111` foreground, `#6B6B6B` muted, `#D8A7A0` accent, `#FBF5F2` surface, `#EADBD5` decorative, `#E5E5E5` border.

Dark: `#111111` background, `#FBF5F2` foreground, `#B5B5B5` muted, `#D8A7A0` accent, `#2B2B2E` surface, `#414145` border.

The reusable Origin glass surface layers a theme tint, saturated backdrop blur, radial light, specular edge, inner outline, and depth shadow. Filter intensity is reduced on smaller screens, and unsupported filters degrade to a translucent bordered surface. See `/lab/glass`; this is a web approximation of observed OriginOS glass, not a verified native-material reproduction. The cinematic hero and identity scenes deliberately establish their own noir contrast; the project and supporting scenes use the selected theme tokens.
