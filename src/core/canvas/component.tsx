import * as React from "react";
import { createContext, useEffect, useRef, useCallback } from "react";

import { ReactImageEditor } from "./canvas";

export const ReactImageEditorCanvasContext = createContext<
  ReactImageEditor | undefined
>(undefined);

export type ReactImageEditorCanvasProps = {
  reactImageEditor: ReactImageEditor;
  children?: React.ReactNode;
};

export const ReactImageEditorCanvas = ({
  children,
  ...props
}: ReactImageEditorCanvasProps) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const setContainerSize = useCallback(() => {
    containerRef.current!.style.width = `${props.reactImageEditor.canvasElement.width}px`;
    containerRef.current!.style.height = `${props.reactImageEditor.canvasElement.height}px`;
  }, []);

  const insertCanvas = useCallback(() => {
    setContainerSize();
    containerRef.current!.appendChild(props.reactImageEditor.canvasElement);
  }, []);

  useEffect(() => {
    insertCanvas();
  }, []);

  return (
    <ReactImageEditorCanvasContext.Provider value={props.reactImageEditor}>
      <div
        id={ReactImageEditor.REACT_IMAGE_EDITOR__CONTAINER_ID}
        ref={containerRef}
      ></div>
      {children}
    </ReactImageEditorCanvasContext.Provider>
  );
};
