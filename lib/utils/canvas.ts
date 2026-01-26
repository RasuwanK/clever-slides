export interface BaseElement {
  id: string;
  kind: "text" | "image" | "shape" | "line";
  x: number;
  y: number;
  width: number;
  height: number;
  rotation?: number; // degrees
  opacity?: number; // 0..1
  locked?: boolean;
  visible?: boolean;
  zIndex?: number;
};

export interface TextElement extends BaseElement {
  kind: "text";
  text: string;
  fontFamily: string;
  fontSize: number;
  fontWeight?: number | "normal" | "bold";
  color: string;
  align?: "left" | "center" | "right" | "justify";
  lineHeight?: number;
};

export interface ImageElement extends BaseElement {
  kind: "image";
  src: string;
  crop?: { x: number; y: number; width: number; height: number };
  fit?: "cover" | "contain" | "fill";
};

export interface ShapeElement extends BaseElement {
  kind: "shape";
  shape: "rect" | "ellipse" | "triangle" | "diamond";
  fill: string;
  stroke?: { color: string; width: number };
  radius?: number; // for rect
};

export interface LineElement extends BaseElement {
  kind: "line";
  x2: number;
  y2: number;
  stroke: { color: string; width: number; style?: "solid" | "dashed" };
};

// CanvasContent represents the content of a slide canvas
export interface CanvasContent {
  elements: (TextElement | ImageElement | ShapeElement | LineElement)[];
}