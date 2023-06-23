import { Canvas } from 'fabric';
import { EditableObject } from '../editableObject/editableObject';

export interface CanvasParams {
    fabricCanvasOptions: {
        [key:string]: any;
    };
}

export class ReactImageEditor implements CanvasParams {

    fabricCanvasOptions: {
        [key:string]: any;
    };

    private _fabricCanvas: Canvas;
    private _canvasElement: HTMLCanvasElement;

    constructor(params:CanvasParams) {
        this.fabricCanvasOptions = params;
        this._canvasElement = document.createElement('canvas');
        this._canvasElement.id = ReactImageEditor.REACT_IMAGE_EDITOR__CANVAS_ID;
        this._fabricCanvas = new Canvas(
            this._canvasElement, 
            params.fabricCanvasOptions,
        );
    } 

    static REACT_IMAGE_EDITOR__CANVAS_ID = "__react-image-editor__canvas";
    static REACT_IMAGE_EDITOR__CONTAINER_ID = "__react-image-editor__container";

    get fabricCanvas() {
        return this._fabricCanvas;
    }

    get canvasElement() {
        return this._canvasElement;
    }

    addObject(object: EditableObject) {
            this.fabricCanvas.add(object.fabricInstance);
    }
}
