import { RegularPolygon as RegularPolygonType } from "konva/lib/shapes/RegularPolygon";
import { Rect as RectType } from "konva/lib/shapes/Rect";
import React, { RefObject, useEffect, useRef } from "react";
import { Rect, RegularPolygon } from "react-konva";
import { OverrideItemProps } from "../../../hook/useItem";
import useTransformer from "../../../hook/useTransformer";
import { StageData } from "../../../redux/currentStageData";
import useDragAndDrop from "../../../hook/useDragAndDrop";
import useStage from "../../../hook/useStage";

export type ShapeItemKind = {
  "data-item-type": string;
  id: string;
  icon: string;
  x: number;
  y: number;
  sides: number;
  radius: number;
};

export type DecorationAreaItemProps = OverrideItemProps<{
  data: StageData;
  transformer: ReturnType<typeof useTransformer>;
  getCurrentDefaultBackground: () => StageData;
  e?: DragEvent;
}>;

const DecorationAreaItem: React.FC<DecorationAreaItemProps> = ({
  data,
  e,
  transformer,
  getCurrentDefaultBackground,
  onSelect,
}) => {
  const { attrs } = data;

  const shapeRef = useRef() as RefObject<RegularPolygonType | RectType>;
  const stage = useStage();
  const { onDragMoveFrame, onDragEndFrame, checkIsInFrame } = useDragAndDrop(
    stage.stageRef,
    stage.dragBackgroundOrigin,
  );
  const [position, setPos] = React.useState({ x: 0, y: 0 });

  useEffect(() => {
    if (shapeRef.current) {
      stage.setStageRef(shapeRef.current.getStage()!);
      checkIsInFrame(shapeRef.current);
    }

    setPos({
      x: getCurrentDefaultBackground()
        ? getCurrentDefaultBackground().attrs.x + attrs.x
        : attrs.x,
      y: getCurrentDefaultBackground()
        ? getCurrentDefaultBackground().attrs.y + attrs.y
        : attrs.y,
    });
  }, [data]);

  return (
    <Rect
      ref={shapeRef as RefObject<RectType>}
      onClick={onSelect}
      name="label-target"
      data-item-type="shape"
      id={data.id}
      x={position.x}
      y={position.y}
      width={attrs.width}
      height={attrs.height}
      sides={4}
      radius={0}
      scaleX={attrs.scaleX}
      scaleY={attrs.scaleY}
      fill={attrs.fill ?? "#CECECE"}
      stroke={"#000000"}
      strokeWidth={1}
      opacity={0.2}
    />
  );
};

export default DecorationAreaItem;
