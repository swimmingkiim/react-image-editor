import React, { useEffect } from "react";
import { DropCallback, onDragOver, onDrop } from "./eventHandler/dragAndDrop";

type DropProps = {
  callback: DropCallback;
  targetDOMElement: HTMLElement | null;
};

const Drop: React.FC<DropProps> = ({ callback, targetDOMElement }) => {
  useEffect(() => {
    if (!targetDOMElement) {
      console.log("pup");
      return;
    }
    targetDOMElement.addEventListener("dragover", (e) => {
      onDragOver("copy")(e);
    });
    targetDOMElement.addEventListener("drop", (e) => {
      onDrop(callback)(e);
    });
  }, [targetDOMElement]);
  return <></>;
};

export default Drop;
