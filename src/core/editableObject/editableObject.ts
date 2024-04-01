import { Object as FabricObject } from "fabric";
import { type ReactImageEditor } from "../canvas/canvas";

export interface EditableObjectRequiredParams {
  editorController: ReactImageEditor;
}

export interface EditableObjectOptionalParams {
  fillColor?: string;
  strokeColor?: string;
}

export interface EditableObjectParams
  extends EditableObjectRequiredParams,
    EditableObjectOptionalParams {}

export interface EditableObjectProperties {
  id: string;
  fabricInstance: FabricObject;
  selected: boolean;
  moving: boolean;
}

export interface EditableObjectMethods {
  init: () => FabricObject;
  draw: () => void;
  select: () => void;
  move: () => void;
  resize: () => void;
  rotate: () => void;
}

export class EditableObject
  implements
    EditableObjectParams,
    EditableObjectProperties,
    EditableObjectMethods
{
  editorController: ReactImageEditor;

  fillColor?: string;
  strokeColor?: string;

  id: string;
  fabricInstance: FabricObject;
  selected: boolean;
  moving: boolean;

  constructor(params: EditableObjectParams) {
    this.id = "";
    this.editorController = params.editorController;

    this.fillColor = params.fillColor ?? "#000000";
    this.strokeColor = params.strokeColor ?? "#000000";

    this.fabricInstance = new FabricObject();
    this.selected = false;
    this.moving = false;
  }

  init(): FabricObject {
    throw new Error("Method not implemented.");
  }

  draw(): void {
    throw new Error("Method not implemented.");
  }

  select(): void {
    throw new Error("Method not implemented.");
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
