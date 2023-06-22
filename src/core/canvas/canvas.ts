import { Canvas } from 'fabric';

export type ReactImageEditorCanvasParams = {
    fabricCanvasOptions: {
        [key:string]: any;
    };
}

export class ReactImageEditor {

    _fabricCanvas: Canvas;

    constructor(params:ReactImageEditorCanvasParams) {
        this._fabricCanvas = new Canvas(
            ReactImageEditor.REACT_IMAGE_EDITOR__CANVAS_ID, 
            params.fabricCanvasOptions,
        );
    } 

    static REACT_IMAGE_EDITOR__CANVAS_ID = "__react-image-editor__canvas";
}
