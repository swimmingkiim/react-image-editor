import * as React from "react";
import ReactImageEditor from "./canvas";
export declare const ReactImageEditorCanvasContext: React.Context<ReactImageEditor | undefined>;
export type ReactImageEditorCanvasProps = {
    reactImageEditor: ReactImageEditor;
    children: React.ReactNode;
};
declare const ReactImageEditorCanvas: ({ children, ...props }: ReactImageEditorCanvasProps) => React.JSX.Element;
export default ReactImageEditorCanvas;
