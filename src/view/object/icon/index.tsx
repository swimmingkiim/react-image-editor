import Konva from "konva";
import { KonvaEventObject } from "konva/lib/Node";
import React, { RefObject, useCallback, useEffect, useRef, useState } from "react";
import { Image as KonvaImage } from "react-konva";
import useItem, { OverrideItemProps } from "../../../hook/useItem";
import { StageData } from "../../../redux/currentStageData";

export type IconItemKind = {
  "data-item-type": string;
  id: string;
  name: string;
  icon: string;
};

export type IconItemProps = OverrideItemProps<{
  data: StageData;
  e?: DragEvent;
}>;

const IconItem: React.FC<IconItemProps> = ({ data, e, onSelect }) => {
  const { attrs } = data;
  const imageRef = useRef() as RefObject<Konva.Image>;
  const [imageSrc, setImageSrc] = useState<CanvasImageSource>(new Image());
  const { updateItem } = useItem();

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

  useEffect(() => {
    Konva.Image.fromURL(
      `${process.env.PUBLIC_URL}/assets/icon/bootstrap/${attrs.icon}`,
      (image: Konva.Image) => {
        setImageSrc(image.image()!);
      },
    );
  }, []);

  return (
    <KonvaImage
      ref={imageRef}
      image={imageSrc}
      onClick={onSelect}
      name="label-target"
      data-item-type="icon"
      data-frame-type="icon"
      id={data.id}
      x={attrs.x}
      y={attrs.y}
      width={attrs.width}
      height={attrs.height}
      scaleX={attrs.scaleX}
      scaleY={attrs.scaleY}
      fill="transparent"
      opacity={attrs.opacity ?? 1}
      rotation={attrs.rotation ?? 0}
      draggable
      onDragMove={onDragMoveFrame}
      onDragEnd={onDragEndFrame}
    />
  );
};

export default IconItem;
