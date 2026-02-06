// import { create } from "zustand";
// import { persist } from "zustand/middleware";

// export interface CanvasConfig {
//   width: number;
//   height: number;
//   backgroundColor: string;
// }

// export interface EditorState {
//   content: CanvasContent | null;
//   isDirty: boolean;
//   lastSavedAt: number | null;
//   canvasConfig: CanvasConfig | null;

//   setContent: (slides: CanvasContent) => void;
//   updateContent: (updater: (prev: CanvasContent) => CanvasContent) => void;
//   setCanvasConfig: (canvasConfig: CanvasConfig) => void;
//   markSaved: () => void;
//   reset: () => void;
// }

// // Whole editor wide state management with local saving
// export const useEditorStore = create<EditorState>()(
//   persist(
//     (set, get) => ({
//       canvasConfig: null,
//       content: null,
//       isDirty: false,
//       lastSavedAt: null,

//       setContent: (content) =>
//         set({ content, isDirty: false }),

//       updateContent: (updater) =>
//         set((state) => ({
//           content: state.content ? updater(state.content) : state.content,
//           isDirty: true,
//         })),

//       markSaved: () =>
//         set({
//           isDirty: false,
//           lastSavedAt: Date.now(),
//         }),

//       reset: () =>
//         set({
//           content: null,
//           isDirty: false,
//           lastSavedAt: null,
//         }),

//       setCanvasConfig: (canvasConfig) =>
//         set({
//           canvasConfig: {
//             width: canvasConfig.width,
//             height: canvasConfig.height,
//             backgroundColor: canvasConfig.backgroundColor,
//           }
//         })
//     }),
//     {
//       name: "editor-draft", // localStorage key
//       partialize: (state) => ({
//         slides: state.content,
//       }),
//     }
//   )
// );

