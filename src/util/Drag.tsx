import React from "react";
import { onDragStart } from "./eventHandler/dragAndDrop";

export type DragSrc = {
  trigger: string;
} & {
  [key: string]: any;
};

type DragProps = {
  dragType: DataTransfer["effectAllowed"];
  dragSrc: DragSrc;
  children: React.ReactNode;
};

const Drag: React.FC<DragProps> = ({ dragType, dragSrc, children }) => {
  const extendedProps = {
    draggable: true,
    "data-drag-src": JSON.stringify(dragSrc),
    onDragStart: onDragStart(dragType),
  };

  const childrenWithProps = React.Children.map(children, (child) => {
    let newChild = child;
    if (React.isValidElement(child)) {
      newChild = React.cloneElement(child, extendedProps);
    }
    return newChild;
  });

  return <>{childrenWithProps}</>;
};

export default Drag;
