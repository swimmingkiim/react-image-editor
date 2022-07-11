import { Context } from "konva/lib/Context";
import { Group as GroupType } from "konva/lib/Group";
import { KonvaEventObject } from "konva/lib/Node";
import { Shape as ShapeType, ShapeConfig } from "konva/lib/Shape";
import React, { RefObject, useCallback, useRef } from "react";
import { Group, Shape } from "react-konva";
import useItem, { OverrideItemProps } from "../../../hook/useItem";
import useTransformer from "../../../hook/useTransformer";
import { StageData } from "../../../redux/currentStageData";

export type LineItemKind = {
  "data-item-type": string;
  id: string;
  icon: string;
  x: number;
  y: number;
  sides: number;
  radius: number;
};

export type LineItemProps = OverrideItemProps<{
  data: StageData;
  transformer: ReturnType<typeof useTransformer>;
  e?: DragEvent;
}>;

const LineItem: React.FC<LineItemProps> = ({ data, e, transformer, onSelect }) => {
  const {
    attrs: { updatedAt, zIndex, points, ...attrs },
  } = data;
  const lineRef = useRef() as RefObject<GroupType>;
  const { updateItem } = useItem();

  const draw = (ctx: Context, shape: ShapeType<ShapeConfig>) => {
    ctx.beginPath();
    ctx.moveTo(points[0], points[1]);
    if (points.length === 4) {
      ctx.lineTo(points[2], points[3]);
    } else if (points.length === 6) {
      ctx.quadraticCurveTo(points[2], points[3], points[4], points[5]);
    } else {
      ctx.bezierCurveTo(points[2], points[3], points[4], points[5], points[6], points[7]);
    }
    shape.strokeWidth(4);
    ctx.fillStrokeShape(shape);
  };

  const onDragMoveFrame = useCallback((e: KonvaEventObject<DragEvent>) => {
    e.target.getLayer()?.batchDraw();
  }, []);

  const onDragEndFrame = useCallback(
    (e: KonvaEventObject<DragEvent>) => {
      e.evt.preventDefault();
      e.evt.stopPropagation();
      updateItem(e.target.id(), () => ({
        ...e.target.attrs,
      }));
      e.target.getLayer()?.batchDraw();
    },
    [data],
  );

  return (
    <Group>
      <Shape
        ref={lineRef}
        onClick={onSelect}
        sceneFunc={draw}
        name="label-target"
        data-item-type="line"
        id={data.id}
        {...attrs}
        draggable
        onDragMove={onDragMoveFrame}
        onDragEnd={onDragEndFrame}
      />
    </Group>
  );
};

export default LineItem;
