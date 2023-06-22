import * as React from 'react';
import { Canvas } from 'fabric';

type ReactImageEditorCanvasParams = {
    fabricCanvasOptions: {
        [key: string]: any;
    };
    enableDragAndDrop?: boolean;
    enableSelection?: boolean;
    enableZoom?: boolean;
    enableHotKey?: boolean;
};
declare class ReactImageEditor {
    _fabricCanvas: Canvas;
    constructor(params: ReactImageEditorCanvasParams);
    static REACT_IMAGE_EDITOR__CANVAS_ID: string;
}

type ReactImageEditorCanvasProps = {
    reactImageEditor: ReactImageEditor;
    children: React.ReactNode;
};

declare const modules: {
    ReactImageEditorCanvasContext: React.Context<ReactImageEditor | undefined>;
    ReactImageEditorCanvas: ({ children, ...props }: ReactImageEditorCanvasProps) => React.JSX.Element;
    ReactImageEditor: typeof ReactImageEditor;
};

export { modules as default };
