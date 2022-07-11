import React from "react";
import { Col, Figure, Row } from "react-bootstrap";
import { Node, NodeConfig } from "konva/lib/Node";
import Konva from "konva";
import { Stage } from "konva/lib/Stage";
import alignList from "../../config/align.json";
import alignStyles from "../../style/align.module.css";
import fontStyles from "../../style/font.module.css";
import sizeStyles from "../../style/size.module.css";
import { WidgetKind } from "../Widget";
import { SettingBarProps } from "..";
import useItem from "../../hook/useItem";
import useI18n from "../../hook/usei18n";

export type AlignKind = {
  "data-item-type": string;
  id: string;
  icon: string;
  selectedItems: Node<NodeConfig>[];
};

type AlignWidgetProps = {
  data: WidgetKind & SettingBarProps;
};

const AlignWidget: React.FC<AlignWidgetProps> = ({ data }) => (
  <Col>
    <Row>
      {alignList.map((_data) => (
        <AlignThumbnail
          key={`align-thumbnail-${_data.id}`}
          data={{
            id: _data.id,
            icon: _data.icon,
            "data-item-type": "align",
            selectedItems: data.selectedItems,
          }}
        />
      ))}
    </Row>
  </Col>
);

export default AlignWidget;

const AlignThumbnail: React.FC<{
  data: AlignKind;
}> = ({ data }) => {
  const { updateItem } = useItem();
  const { getTranslation } = useI18n();

  const alignText = (item: Node<NodeConfig>, alignId: string) => {
    if (["left", "center", "right"].includes(alignId)) {
      (item as Konva.Text).align(alignId);
    } else {
      (item as Konva.Text).verticalAlign(alignId);
    }
    item.getStage()?.batchDraw();
  };

  const getAlignedPosition = (
    alignId: string,
    item: Node<NodeConfig>,
    relativeTo: Node<NodeConfig> | Stage,
  ) => {
    switch (alignId) {
      case "left":
        return getStart(item, relativeTo);
      case "center":
        return getCenter(item, relativeTo);
      case "right":
        return getEnd(item, relativeTo);
      case "top":
        return getTop(item, relativeTo);
      case "middle":
        return getMiddle(item, relativeTo);
      case "bottom":
        return getBottom(item, relativeTo);
      default:
        return {
          x: item.x(),
          y: item.y(),
        };
    }
  };

  const alignRelativeTo = (
    alignId: string,
    item: Node<NodeConfig>,
    relativeTo: Node<NodeConfig> | Stage,
  ) => {
    const { x, y } = getAlignedPosition(alignId, item, relativeTo);
    item.x(x);
    item.y(y);
    item.attrs.x = x;
    item.attrs.y = y;
    updateItem(item.id(), () => item.attrs);
  };

  const onClickAlign = (alignId: string) => () => {
    if (data.selectedItems.length === 0) {
      return;
    }
    if (data.selectedItems.length === 1 && data.selectedItems[0].className === "Text") {
      alignText(data.selectedItems[0], alignId);
      return;
    }
    const background = data.selectedItems.find((item) => item.attrs["data-item-type"] === "frame");
    if (background) {
      data.selectedItems
        .filter((item) => item.id() !== background.id())
        .forEach((item) => {
          alignRelativeTo(alignId, item, background);
        });
      data.selectedItems[0].getStage()?.batchDraw();
      return;
    }
    const stage = data.selectedItems[0].getStage();
    if (stage) {
      data.selectedItems.forEach((item) => {
        alignRelativeTo(alignId, item, stage);
      });
      data.selectedItems[0].getStage()?.batchDraw();
    }
  };

  return (
    <Figure
      as={Col}
      onClick={onClickAlign(data.id)}
      className={[alignStyles.absoluteCenter, alignStyles.wrapTrue].join(" ")}>
      <i className={`bi-${data.icon}`} style={{ fontSize: 20, width: 25 }} />
      <Figure.Caption
        className={[fontStyles.font075em, sizeStyles.width100, "text-center"].join(" ")}>
        {`${getTranslation("widget", "align", data.id, "name")}`}
      </Figure.Caption>
    </Figure>
  );
};

const getStart = (item: Node<NodeConfig>, relativeTo: Node<NodeConfig> | Stage) => {
  if (item.attrs["data-item-type"] === "shape" && item.attrs.sides !== 4) {
    return {
      x: relativeTo.position().x + item.attrs.radius,
      y: item.y(),
    };
  }
  return {
    x: relativeTo.position().x,
    y: item.y(),
  };
};

const getCenter = (item: Node<NodeConfig>, relativeTo: Node<NodeConfig> | Stage) => {
  if (item.attrs["data-item-type"] === "shape" && item.attrs.sides !== 4) {
    return {
      x: relativeTo.position().x + (relativeTo.size().width * relativeTo.scaleX()) / 2,
      y: item.y(),
    };
  }
  return {
    x:
      relativeTo.position().x
      + (relativeTo.size().width * relativeTo.scaleX()) / 2
      - (item.size().width * item.scaleX()) / 2,
    y: item.y(),
  };
};

const getEnd = (item: Node<NodeConfig>, relativeTo: Node<NodeConfig> | Stage) => {
  if (item.attrs["data-item-type"] === "shape" && item.attrs.sides !== 4) {
    return {
      x:
        relativeTo.position().x + relativeTo.size().width * relativeTo.scaleX() - item.attrs.radius,
      y: item.y(),
    };
  }
  return {
    x:
      relativeTo.position().x
      + relativeTo.size().width * relativeTo.scaleX()
      - item.size().width * item.scaleX(),
    y: item.y(),
  };
};

const getTop = (item: Node<NodeConfig>, relativeTo: Node<NodeConfig> | Stage) => {
  if (item.attrs["data-item-type"] === "shape" && item.attrs.sides !== 4) {
    return {
      x: item.x(),
      y: relativeTo.position().y + item.attrs.radius,
    };
  }
  return {
    x: item.x(),
    y: relativeTo.position().y,
  };
};

const getMiddle = (item: Node<NodeConfig>, relativeTo: Node<NodeConfig> | Stage) => {
  if (item.attrs["data-item-type"] === "shape" && item.attrs.sides !== 4) {
    return {
      x: item.x(),
      y: relativeTo.position().y + (relativeTo.size().height * relativeTo.scaleY()) / 2,
    };
  }
  return {
    x: item.x(),
    y:
      relativeTo.position().y
      + (relativeTo.size().height * relativeTo.scaleY()) / 2
      - (item.size().height * item.scaleY()) / 2,
  };
};

const getBottom = (item: Node<NodeConfig>, relativeTo: Node<NodeConfig> | Stage) => {
  if (item.attrs["data-item-type"] === "shape" && item.attrs.sides !== 4) {
    return {
      x: item.x(),
      y:
        relativeTo.position().y
        + relativeTo.size().height * relativeTo.scaleY()
        - item.attrs.radius,
    };
  }
  return {
    x: item.x(),
    y:
      relativeTo.position().y
      + relativeTo.size().height * relativeTo.scaleY()
      - item.size().height * item.scaleY(),
  };
};
