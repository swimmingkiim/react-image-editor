import React from "react";
import { Col, Figure, Row } from "react-bootstrap";
import shapeList from "../../config/shape.json";
import alignStyles from "../../style/align.module.css";
import sizeStyles from "../../style/size.module.css";
import Drag from "../../util/Drag";
import TRIGGER from "../../config/trigger";
import { ShapeItemKind } from "../../view/object/shape";


const ShapeWidget: React.FC = () => (
  <Row xs={2}>
    {shapeList.map(({ type, id, sides, radius, icon }) => (
      <ShapeThumbnail
        key={`shape-thumbnail-${id}`}
        data={{
          id,
          sides,
          radius,
          icon,
          "data-item-type": type,
        }}
        maxPx={80}
      />
    ))}
  </Row>
);

export default ShapeWidget;

const ShapeThumbnail: React.FC<{
  maxPx: number;
  data: Omit<Omit<ShapeItemKind, "x">, "y">;
}> = ({ data, maxPx }) => (
  <Figure
    as={Col}
    className={[alignStyles.absoluteCenter, alignStyles.wrapTrue, sizeStyles.width25].join(" ")}>
    <Drag
      dragType="copyMove"
      dragSrc={{
        trigger: TRIGGER.INSERT.SHAPE,
        ...data,
      }}>
      <i className={[`bi-${data.icon}`].join(" ")} style={{ fontSize: 20, width: 25 }} />
    </Drag>
    {/* <Figure.Caption
        className={[
          fontStyles.fontHalf1em,
          sizeStyles.width100,
          "text-center",
        ].join(" ")}
      >
        {`${data.id}`}
      </Figure.Caption> */}
  </Figure>
);
