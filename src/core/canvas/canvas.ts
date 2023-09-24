import { Canvas } from 'fabric';
import { EditableObject } from '../editableObject/editableObject';
import { Tab } from '../tab/tab';

export type CanvasState = Tab[];

export interface CanvasParams {
    fabricCanvasOptions: {
        [key:string]: any;
    };
    initialState?: CanvasState;
    initialTabId?: Tab['id'];
}

export interface CanvasProperties {
    fabricCanvasOptions: {
        [key:string]: any;
    };

    _fabricCanvas: Canvas;
    _canvasElement: HTMLCanvasElement;
    _state: CanvasState;
    tabId: Tab['id'];
}

export interface CanvasMethods {
    import(json: ReturnType<JSON["parse"]>): Promise<void>;
    export(): ReturnType<JSON["parse"]>;
    addObject(object: EditableObject): void;
}

export class ReactImageEditor implements CanvasProperties, CanvasMethods {

    fabricCanvasOptions: {
        [key:string]: any;
    };

    _fabricCanvas: Canvas;
    _canvasElement: HTMLCanvasElement;
    _state: CanvasState;
    tabId: Tab['id'];

    constructor(params:CanvasParams) {
        this.fabricCanvasOptions = params.fabricCanvasOptions;
        this._state = params.initialState ?? [Tab.empty()];
        this.tabId = params.initialTabId ?? this._state[0].id;
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

    get state() {
        return this._state;
    }

    get currentTab() {
        const currentTab = this.state.find((tab) => tab.id === this.tabId);
        if (!currentTab) {
            throw Error('ReactImageEditor:currentTab: Can\'t find current tab with given current tab id');
        }
        return currentTab;
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

      const newSnapshot = this.fabricCanvas.toJSON();
      this.currentTab.addHistory(newSnapshot);
    }
}
