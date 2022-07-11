import Konva from "konva";
import { Context } from "konva/lib/Context";
import { KonvaEventObject, Node, NodeConfig } from "konva/lib/Node";
import { Shape, ShapeConfig } from "konva/lib/Shape";
import React, { RefObject, useCallback, useEffect, useRef } from "react";
import { Group, Label, Rect, Tag, Text } from "react-konva";
import useDragAndDrop from "../../hook/useDragAndDrop";
import useItem, { OverrideItemProps } from "../../hook/useItem";
import useStage from "../../hook/useStage";
import { StageData } from "../../redux/currentStageData";
import { decimalUpToSeven } from "../../util/decimalUpToSeven";

export type FrameKind = {
  "data-frame-type": string;
  id: string;
  width: number;
  height: number;
};

export type FrameProps = OverrideItemProps<{
  data: StageData;
  e?: DragEvent;
}>;

const Frame: React.FC<FrameProps> = ({ data, e, onSelect }) => {
  const { id: stageId, attrs } = data;
  const { updateItem } = useItem();
  const stage = useStage();
  const { checkIsInFrame, moveToLayer, getItemsInThisFrame } = useDragAndDrop(
    stage.stageRef,
    stage.dragBackgroundOrigin,
  );
  const frameRef = useRef() as RefObject<Konva.Rect>;
  const initialPosition = {
    x: attrs.x,
    y: attrs.y,
  };

  const onMouseOverLabelText = useCallback((e: KonvaEventObject<MouseEvent>) => {
    (e.target as Konva.Text).fill("blue");
    e.target.getLayer().batchDraw();
  }, []);

  const onMouseLeaveLabelText = useCallback((e: KonvaEventObject<MouseEvent>) => {
    (e.target as Konva.Text).fill("#000000");
    e.target.getLayer().batchDraw();
  }, []);

  const clipFunc = (ctx: Context) => {
    const position = attrs;
    ctx.beginPath();
    ctx.fillText(attrs["data-frame-type"], position.x, position.y - 15);
    ctx.moveTo(position.x, position.y);
    ctx.lineTo(position.x + position.width, position.y);
    ctx.lineTo(position.x + position.width, position.y + position.height);
    ctx.lineTo(position.x, position.y + position.height);
    ctx.closePath();
  };

  const _onDragMoveFrame = useCallback((e: KonvaEventObject<DragEvent>) => {
    const group = e.target.getParent();
    group.findOne("Label").position(e.target.position());
    (group.children as Node<NodeConfig>[]).forEach((_item) => {
      if (checkIsInFrame(_item) === false) {
        moveToLayer(_item as Shape<ShapeConfig>);
      }
    });
    const newChildren = getItemsInThisFrame(e.target);
    newChildren?.forEach((_item) => checkIsInFrame(_item));
    group.clipFunc(e.target.getLayer().Context);
    e.target.getStage()?.batchDraw();
  }, []);

  const onDragEndFrame = useCallback(
    (e: KonvaEventObject<DragEvent>) => {
      updateItem(e.target.id(), () => ({
        ...e.target.attrs,
      }));
      e.target.getParent().clipFunc(e.target.getLayer().Context);
      e.target.getLayer()?.batchDraw();
    },
    [data],
  );

  useEffect(() => {
    if (frameRef.current) {
      stage.setStageRef(frameRef.current.getStage()!);
      frameRef.current.brightness(data.attrs.brightness);
      frameRef.current.findAncestor("Group").clipFunc(frameRef.current.getLayer()!.getContext());
      frameRef.current.cache();
    }
  }, [data]);

  return (
    <Group name="label-group" onClick={onSelect} clipFunc={clipFunc}>
      <Label
        x={frameRef.current?.x() ?? initialPosition.x}
        y={frameRef.current?.y() ?? initialPosition.y}
        onClick={onSelect}>
        <Tag name="label-tag" pointerDirection="left" />
        <Text
          text={attrs["data-frame-type"]}
          name="label-text"
          fontSize={10}
          height={50}
          lineHeight={1.2}
          padding={0}
          fill="#000000"
          onMouseOver={onMouseOverLabelText}
          onMouseLeave={onMouseLeaveLabelText}
        />
      </Label>
      <Rect
        ref={frameRef}
        name="label-target"
        data-item-type="frame"
        data-frame-type={attrs["data-frame-type"]}
        id={data.id}
        x={attrs.x}
        y={attrs.y}
        width={attrs.width}
        height={attrs.height}
        scaleX={attrs.scaleX}
        scaleY={attrs.scaleY}
        fill={attrs.fill ?? "#ffffff"}
        opacity={attrs.opacity ?? 1}
        filters={[Konva.Filters.Brighten]}
        draggable
        onDragMove={_onDragMoveFrame}
        onDragEnd={onDragEndFrame}
      />
    </Group>
  );
};

export default Frame;

export const getFramePos = (stage: Konva.Stage, e: DragEvent, width?: number, height?: number) => {
  stage.setPointersPositions(e);
  const stageOrigin = stage.getAbsolutePosition();
  const mousePosition = stage.getPointerPosition();
  if (!mousePosition) {
    return {
      x: 0,
      y: 0,
    };
  }
  if (!width || !height) {
    return {
      x: decimalUpToSeven(mousePosition.x - stageOrigin.x),
      y: decimalUpToSeven(mousePosition.y - stageOrigin.y),
    };
  }
  return {
    x: decimalUpToSeven((mousePosition.x - stageOrigin.x) / stage.scaleX() - width / 2),
    y: decimalUpToSeven((mousePosition.y - stageOrigin.y) / stage.scaleY() - height / 2),
  };
};
