import React from "react";
import { Col, Figure, Row } from "react-bootstrap";
import frameList from "../../config/frame.json";
import { FrameKind } from "../../view/frame";
import alignStyles from "../../style/align.module.css";
import fontStyles from "../../style/font.module.css";
import sizeStyles from "../../style/size.module.css";
import Drag from "../../util/Drag";
import TRIGGER from "../../config/trigger";
import useI18n from "../../hook/usei18n";

const FrameWidget: React.FC = () => (
  <Row xs={2} className={[sizeStyles["mx-h-30vh"]].join(" ")}>
    {frameList.map(({ type, id, width, height }) => (
      <FrameThumbnail
        key={`frame-thumbnail-${type}`}
        data={{
          id,
          width,
          height,
          "data-frame-type": type,
        }}
        maxPx={80}
      />
    ))}
  </Row>
);

export default FrameWidget;

const FrameThumbnail: React.FC<{ maxPx: number; data: FrameKind }> = ({
  data: { id, width, height, ...data },
  maxPx,
}) => {
  const { getTranslation } = useI18n();
  const size = getFigureSize({ width, height }, maxPx);

  return (
    <Figure as={Col} className={[alignStyles.absoluteCenter, alignStyles.wrapTrue].join(" ")}>
      <Drag
        dragType="copyMove"
        dragSrc={{
          trigger: TRIGGER.INSERT.FRAME,
          "data-frame-type": data["data-frame-type"],
          id,
          width,
          height,
        }}>
        <Figure.Image
          alt={`${width} X ${height}`}
          data-src={`holder.js/${size.width}x${size.height}?bg=e3e6e8&fg=ffffff&size=7&text=${width} \nX\n ${height}&amp;nowrap=true`}
        />
      </Drag>
      <Figure.Caption
        className={[fontStyles.font075em, sizeStyles.width100, "text-center"].join(" ")}>
        {getTranslation("widget", "frame", id, "name")}
      </Figure.Caption>
    </Figure>
  );
};

const getFigureSize = ({ width, height }: { width: number; height: number }, maxPx: number) => {
  if (width === height) {
    return {
      width: maxPx,
      height: maxPx,
    };
  }
  return width > height
    ? { width: maxPx, height: Math.floor((maxPx * height) / width) }
    : { width: Math.floor((maxPx * width) / height), height: maxPx };
};
