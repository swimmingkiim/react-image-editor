import { Canvas } from 'fabric';
import { EditableObject } from '../editableObject/editableObject';

export interface CanvasParams {
    fabricCanvasOptions: {
        [key:string]: any;
    };
}

export interface CanvasMethods {
    import(json: ReturnType<JSON["parse"]>): Promise<void>;
    export(): ReturnType<JSON["parse"]>;
    addObject(object: EditableObject): void;
}

export class ReactImageEditor implements CanvasParams, CanvasMethods {

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

    async import(json: any): Promise<void> {
        await this.fabricCanvas.loadFromJSON(json);
        this.fabricCanvas.renderAll();
    }
    export() {
        return this.fabricCanvas.toJSON();
    }

    addObject(object: EditableObject) {
            this.fabricCanvas.add(object.fabricInstance);
    }
}
