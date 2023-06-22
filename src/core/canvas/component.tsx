import * as React from "react";
import { createContext } from "react";

import { ReactImageEditor } from "./canvas";

export const ReactImageEditorCanvasContext = createContext<
  ReactImageEditor | undefined
>(undefined);

export type ReactImageEditorCanvasProps = {
  reactImageEditor: ReactImageEditor;
  children: React.ReactNode;
};

export const ReactImageEditorCanvas = ({
  children,
  ...props
}: ReactImageEditorCanvasProps) => {
  return (
    <ReactImageEditorCanvasContext.Provider value={props.reactImageEditor}>
      <canvas id={ReactImageEditor.REACT_IMAGE_EDITOR__CANVAS_ID} />
      {children}
    </ReactImageEditorCanvasContext.Provider>
  );
};
