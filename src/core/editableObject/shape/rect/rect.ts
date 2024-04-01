import { type Object as FabricObject, Rect } from "fabric";
import { v4 as uuid } from "uuid";

import {
  EditableObject,
  type EditableObjectParams,
} from "../../editableObject";

export interface RectParams extends EditableObjectParams {
  x: number;
  y: number;
  width: number;
  height: number;
}

export class ShapeRect extends EditableObject implements RectParams {
  x: number;
  y: number;
  width: number;
  height: number;

  constructor(params: RectParams) {
    super(params);

    this.id = uuid();

    this.x = params.x;
    this.y = params.y;
    this.width = params.width;
    this.height = params.height;

    this.fabricInstance = this.init();
  }

  init(): FabricObject {
    return new Rect({
      left: this.x,
      top: this.y,
      width: this.width,
      height: this.height,
      fill: this.fillColor,
      stroke: this.strokeColor,
    });
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
