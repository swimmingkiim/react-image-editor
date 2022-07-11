import React from "react";
import { Col, Figure, Row } from "react-bootstrap";
import lineList from "../../config/line.json";
import alignStyles from "../../style/align.module.css";
import Drag from "../../util/Drag";
import TRIGGER from "../../config/trigger";
import useItem from "../../hook/useItem";

export type LineKind = {
  "data-item-type": string;
  id: string;
  name: string;
  icon: string;
};

const LineWidget: React.FC = () => (
  <Col>
    <Row>
      {lineList.map((_data) => (
        <LineThumbnail
          key={`line-thumbnail-${_data.id}`}
          data={{
            id: _data.id,
            icon: _data.icon,
            name: _data.name,
            "data-item-type": "line",
          }}
        />
      ))}
    </Row>
  </Col>
);

export default LineWidget;

const LineThumbnail: React.FC<{
  data: LineKind;
}> = ({ data }) => {
  const { updateItem } = useItem();

  return (
    <Figure as={Col} className={[alignStyles.absoluteCenter, alignStyles.wrapTrue].join(" ")}>
      <Drag
        dragType="copyMove"
        dragSrc={{
          trigger: TRIGGER.INSERT.LINE,
          ...data,
        }}>
        <i className={`bi-${data.icon}`} style={{ fontSize: 20, width: 25 }} />
      </Drag>
    </Figure>
  );
};
