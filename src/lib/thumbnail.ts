"use client";

/**
 * Generates a small JPEG thumbnail from a DOM element using html2canvas.
 * Returns a base64 data URL suitable for storing in the DB as thumbnailUrl.
 * Target width ~120px at 0.13× scale. JPEG quality 0.65 → ~10-18KB base64.
 */
export async function generateThumbnail(
  element: HTMLElement
): Promise<string | null> {
  try {
    const html2canvas = (await import("html2canvas")).default;
    const canvas = await html2canvas(element, {
      scale: 0.13,
      useCORS: true,
      allowTaint: true,
      backgroundColor: null,
      logging: false,
    });
    return canvas.toDataURL("image/jpeg", 0.65);
  } catch {
    return null;
  }
}
