/// <reference types="react" />
import * as Canvas from "./canvas";
import * as Component from "./component";
declare const modules: {
    ReactImageEditorCanvasContext: import("react").Context<Canvas.ReactImageEditor | undefined>;
    ReactImageEditorCanvas: ({ children, ...props }: Component.ReactImageEditorCanvasProps) => import("react").JSX.Element;
    ReactImageEditor: typeof Canvas.ReactImageEditor;
};
export default modules;
