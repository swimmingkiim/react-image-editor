import { KonvaEventObject } from "konva/lib/Node";
import React from "react";
import { DragSrc } from "../Drag";

export const onDragStart
  = (dataTransferType: DataTransfer["effectAllowed"]) => (e: React.DragEvent<HTMLElement>) => {
    if (!e.currentTarget.dataset.dragSrc) {
      return;
    }
    e.dataTransfer!.effectAllowed = dataTransferType;
    e.dataTransfer!.setData("text/plain", e.currentTarget.dataset.dragSrc);
  };

export const onDragOver = (dataTransferType: DataTransfer["dropEffect"]) => (e: DragEvent) => {
  e.preventDefault();
  if (!e.dataTransfer) {
    return;
  }
  e.dataTransfer.dropEffect = dataTransferType;
};

export type DropCallback = (dragSrc: DragSrc, e: DragEvent) => void;

export const onDrop = (callback: DropCallback) => (e: DragEvent) => {
  e.preventDefault();
  if (!e.dataTransfer) {
    return;
  }
  const dragSrc = e.dataTransfer.getData("text/plain");
  callback(JSON.parse(dragSrc), e);
};

export const defaultOnMouseDown = (e: KonvaEventObject<MouseEvent>) => {
  if (e.currentTarget.getStage()?.draggable()) {
    // true if user dragging background
    e.currentTarget.draggable(false);
  }
};

export const defaultOnMouseUp = (e: KonvaEventObject<MouseEvent>) => {
  e.currentTarget.draggable(true);
};
