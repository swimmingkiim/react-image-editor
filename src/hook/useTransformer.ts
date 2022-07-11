import Konva from "konva";
import { KonvaEventObject } from "konva/lib/Node";
import { RefObject, useRef } from "react";
import transformerList from "../config/transformer.json";
import useItem from "./useItem";

const useTransformer = () => {
  const transformerRef = useRef() as RefObject<Konva.Transformer>;
  const { updateItem } = useItem();

  const onTransformEnd = (e: KonvaEventObject<Event>) => {
    updateItem(e.target.id(), () => ({
      ...e.target.attrs,
      updatedAt: Date.now(),
    }));
    e.target.getStage()?.batchDraw();
  };

  const setTransformerConfig = (transformer: Konva.Transformer) => {
    let nodeStatus = "default";
    if (transformer.nodes().length === 1) {
      nodeStatus = transformer.getNode().attrs["data-item-type"];
    }

    for (const field in (transformerList as Record<string, Konva.TransformerConfig>)[nodeStatus]) {
      transformer.attrs[field] = (transformerList as Record<string, Konva.TransformerConfig>)[
        nodeStatus
      ][field];
    }
    transformer.update();
  };

  return {
    transformerRef,
    onTransformEnd,
    setTransformerConfig,
  };
};

export default useTransformer;
