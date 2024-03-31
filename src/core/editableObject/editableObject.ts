import { ActiveSelection, Object } from "fabric";
import { ReactImageEditor } from "../canvas/canvas";

export interface EditableObjectRequiredParams {
  editorController: ReactImageEditor;
}

export interface EditableObjectOptionalParams {
  fillColor?: string;
  strokeColor?: string;
}

export interface EditableObjectParams extends EditableObjectRequiredParams, EditableObjectOptionalParams {};

export interface EditableObjectProperties {
  id: string;
  fabricInstance: Object;
  selected: boolean;
  moving: boolean;
}

export interface EditableObjectMethods {
  init(): Object;
  draw(): void;
  select(): void;
  move(): void; 
  resize(): void;
  rotate(): void;
}

export class EditableObject implements EditableObjectParams, EditableObjectProperties, EditableObjectMethods {

  editorController: ReactImageEditor;

  fillColor?: string;
  strokeColor?: string;

  id: string;
  fabricInstance: Object;
  selected: boolean;
  moving: boolean;

  constructor(params: EditableObjectParams) {
    this.id = '';
    this.editorController = params.editorController;

    this.fillColor = params.fillColor ?? '#000000';
    this.strokeColor = params.strokeColor ?? '#000000';

    this.fabricInstance = new Object();
    this.selected = false;
    this.moving = false;
  }

  init(): Object {
    throw new Error("Method not implemented.");
  }
  draw(): void {
    throw new Error("Method not implemented.");
  }
  select(): void {
    // Step 1. get previously selected objects
    let activeObjects = this.editorController.fabricCanvas.getActiveObjects();

    let selectedObjects: Object[] = [];
    let selectedObjectInRightPos: Object[] = [];

    // Step 2. copy previously selected objects
    for (let i = 0; i < activeObjects.length; i++) {
      const item = activeObjects[i];

        const prevItem = (item as ActiveSelection);
      if (!prevItem._objects) {
          selectedObjects.push(prevItem);
      } else {
        for (let j = 0; j < prevItem._objects.length; j++) {
          const subItem = prevItem._objects[j];
          selectedObjects.push(subItem);
        }
      }
    }

    // Step 3. deselect previously selected objects
    this.editorController.fabricCanvas.discardActiveObject();

    for (let index = 0; index < selectedObjects.length; index++) {
      const item = selectedObjects[index];
      const currentItemIndex = this.editorController.fabricCanvas.getObjects().indexOf(item); 
      selectedObjectInRightPos.push(this.editorController.fabricCanvas.item(currentItemIndex) as ActiveSelection);
    }

    this.editorController.fabricCanvas.item(0);

    // Step 4. merge previously selected objects with this EditableObject
    if (selectedObjectInRightPos.length < 1) {
      // Step 5. activate selection
      this.editorController.fabricCanvas.setActiveObject(this.fabricInstance);
    } else {
      let newSelectedObjects = [...selectedObjectInRightPos];
      if (selectedObjectInRightPos.includes(this.fabricInstance)) {
        const targetIndex = selectedObjectInRightPos.indexOf(
          this.fabricInstance
        );
        newSelectedObjects = newSelectedObjects.splice(
          targetIndex,
          targetIndex + 1
        );
      } else {
        newSelectedObjects.push(this.fabricInstance);
      }
      // Step 5. activate selection
      const selection = new ActiveSelection(newSelectedObjects, {
        canvas: this.editorController.fabricCanvas,
      });
      this.editorController.fabricCanvas.setActiveObject(selection);
      this.editorController.fabricCanvas.requestRenderAll();
    }
  }
  move(): void {
    throw new Error("Method not implemented.");
  }
  resize(): void {
    throw new Error("Method not implemented.");
  }
  rotate(): void {
    throw new Error("Method not implemented.");
  }
}
