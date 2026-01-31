export const springTransition = { type: "spring" as const, stiffness: 100, damping: 20 };

// Skin URLs - proxied via API to avoid CORS when loading in canvas
// Bemnet: male, full beard, black glasses, orange t-shirt, grey shorts
// Nati: male, faded hair, olive green long-sleeve, black jeans, grey glasses
export const BEMNET_SKIN_URL =
  "/api/skin?url=" + encodeURIComponent("https://namemc.com/texture/6bd076ce1063f16e.png");
export const NATI_SKIN_URL =
  "/api/skin?url=" + encodeURIComponent("https://namemc.com/texture/94dd1475ee49235d.png");