/// <reference types="react" />
declare const modules: {
    ReactImageEditorCanvasContext: import("react").Context<import("./core/canvas/canvas").ReactImageEditor | undefined>;
    ReactImageEditorCanvas: ({ children, ...props }: import("./core/canvas/component").ReactImageEditorCanvasProps) => import("react").JSX.Element;
    ReactImageEditor: typeof import("./core/canvas/canvas").ReactImageEditor;
};
export default modules;
