import { Canvas } from 'fabric';
export type ReactImageEditorCanvasParams = {
    fabricCanvasOptions: {
        [key: string]: any;
    };
    enableDragAndDrop?: boolean;
    enableSelection?: boolean;
    enableZoom?: boolean;
    enableHotKey?: boolean;
};
export default class ReactImageEditor {
    _fabricCanvas: Canvas;
    constructor(params: ReactImageEditorCanvasParams);
    static REACT_IMAGE_EDITOR__CANVAS_ID: string;
}
