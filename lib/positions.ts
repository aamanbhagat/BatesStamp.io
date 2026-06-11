export type StampPosition =
  | "bottom-right"
  | "bottom-left"
  | "top-right"
  | "top-left"
  | "bottom-center"
  | "top-center";

export interface StampPositionCoords {
  x: number;
  y: number;
}

const MARGIN_PT = 36;

export function computePosition(
  pageWidth: number,
  pageHeight: number,
  textWidth: number,
  textHeight: number,
  position: StampPosition,
): StampPositionCoords {
  switch (position) {
    case "bottom-right":
      return { x: pageWidth - textWidth - MARGIN_PT, y: MARGIN_PT };
    case "bottom-left":
      return { x: MARGIN_PT, y: MARGIN_PT };
    case "top-right":
      return {
        x: pageWidth - textWidth - MARGIN_PT,
        y: pageHeight - textHeight - MARGIN_PT,
      };
    case "top-left":
      return { x: MARGIN_PT, y: pageHeight - textHeight - MARGIN_PT };
    case "bottom-center":
      return { x: (pageWidth - textWidth) / 2, y: MARGIN_PT };
    case "top-center":
      return {
        x: (pageWidth - textWidth) / 2,
        y: pageHeight - textHeight - MARGIN_PT,
      };
  }
}

export const POSITION_OPTIONS: { value: StampPosition; label: string }[] = [
  { value: "bottom-right", label: "Bottom Right" },
  { value: "bottom-left", label: "Bottom Left" },
  { value: "top-right", label: "Top Right" },
  { value: "top-left", label: "Top Left" },
  { value: "bottom-center", label: "Bottom Center" },
  { value: "top-center", label: "Top Center" },
];
