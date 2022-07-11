import React from "react";
import { Col, Figure, Row } from "react-bootstrap";
import textList from "../../config/text.json";
import { TextItemKind } from "../../view/object/text";
import alignStyles from "../../style/align.module.css";
import sizeStyles from "../../style/size.module.css";
import Drag from "../../util/Drag";
import TRIGGER from "../../config/trigger";


const TextWidget: React.FC = () => (
  <Row xs={2} className={[sizeStyles["mx-h-30vh"]].join(" ")}>
    {textList.map(({ type, id, width, height, fontSize, fontFamily, text }) => (
      <TextThumbnail
        key={`text-thumbnail-${id}`}
        data={{
          id,
          name: text,
          width,
          height,
          fontSize,
          fontFamily,
          text,
          "data-item-type": type,
        }}
        maxPx={80}
      />
    ))}
  </Row>
);

export default TextWidget;

const TextThumbnail: React.FC<{ maxPx: number; data: TextItemKind }> = ({ data, maxPx }) => (
  <Figure as={Col} className={[alignStyles.absoluteCenter, alignStyles.wrapTrue].join(" ")}>
    <Drag
      dragType="copyMove"
      dragSrc={{
        trigger: TRIGGER.INSERT.TEXT,
        ...data,
      }}>
      <h6
        style={{
          width: "100%",
          fontFamily: data.fontFamily,
          fontSize: data.fontSize - 10,
          textAlign: "center",
        }}>
        {data.text}
      </h6>
    </Drag>
    {/* <Figure.Caption
        className={[fontStyles.fontHalf1em, "text-center"].join(" ")}
      >
        {`${data.text}`}
      </Figure.Caption> */}
  </Figure>
);
