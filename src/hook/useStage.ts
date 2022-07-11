import Konva from "konva";
import { Vector2d } from "konva/lib/types";
import { MutableRefObject, useRef } from "react";

export const STAGE_POSITION = "stagePosition";
export const STAGE_SCALE = "stageScale";

const useStage = () => {
  const stageRef = useRef() as MutableRefObject<Konva.Stage>;
  const dragBackgroundOrigin = useRef<Vector2d>({ x: 0, y: 0 });

  const setStageRef = (stage: Konva.Stage) => {
    stageRef.current = stage;
  };

  return {
    setStageRef,
    stageRef,
    dragBackgroundOrigin,
  };
};

export default useStage;
