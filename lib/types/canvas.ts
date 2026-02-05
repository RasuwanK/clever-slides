export type Document = {
  title: string;
  theme: {
    backgroundColor: string;
    foregroundColor: string;
  };
  resolution: {
    width: number; // Resolution in pixels
    height: number;
  };
  version: number;
  createdAt: string;
  updatedAt: string;
  slides: {
    slideNumber: number;
    comments: {
      position: {
        x: number;
        y: number;
      };
      message: string;
      isResolved: boolean;
    }[];
    content: RenderTree;
  }[];
};

// Refer to a single node in the render tree
export type Element = {
    id: string;
    name: string;
    cords: {
        x: number;
        y: number;
    };
    dimensions: {
        width: number;
        height: number;
    };
    padding: number;
    backgroundColor: string;
    foregroundColor: string;
    children?: Element[];
}

// Refer to the data structure which contains all the rendering elements in order
export type RenderTree = {
    root: Element;
}