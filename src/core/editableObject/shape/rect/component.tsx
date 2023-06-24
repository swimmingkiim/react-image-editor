import * as React from "react";
import { useContext } from "react";

import { ReactImageEditorCanvasContext } from "../../../canvas/component";
import { ShapeRect, RectParams } from "./rect";

export type RectProps = {
  children?: React.ReactNode;
} & Omit<RectParams, "editorController">;

export const Rect = ({ children, ...props }: RectProps) => {
  const reactImageEditor = useContext(ReactImageEditorCanvasContext);

  const newRect = new ShapeRect({
    ...props,
    editorController: reactImageEditor!,
  });
  reactImageEditor!.addObject(newRect);

  return <>{children}</>;
};
