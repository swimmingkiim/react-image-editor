import React, { useMemo, useState } from "react";
import { Col, Figure, Form, Row } from "react-bootstrap";
import iconList from "../../config/icon.json";
import alignStyles from "../../style/align.module.css";
import sizeStyles from "../../style/size.module.css";
import Drag from "../../util/Drag";
import TRIGGER from "../../config/trigger";
import { IconItemKind } from "../../view/object/icon";
import useI18n from "../../hook/usei18n";

const IconWidget: React.FC = () => {
  const [searchKeyword, setSearchKeyword] = useState("");
  const { getTranslation } = useI18n();

  const icons = useMemo(() => {
    if (searchKeyword === "") {
      return iconList.slice(0, 10);
    }
    return iconList.filter((_icon) => _icon.name.indexOf(searchKeyword) !== -1);
  }, [searchKeyword]);

  const changeKeyword = (e: React.BaseSyntheticEvent) => {
    setSearchKeyword(e.currentTarget.value as string);
  };

  return (
    <Col className={[sizeStyles["mx-h-30vh"]].join(" ")}>
      <Form>
        <Form.Group className="mb-3" controlId="iconKeyword">
          <Form.Label>{getTranslation("widget", "icon", "search", "title")}</Form.Label>
          <Form.Control
            onChange={changeKeyword}
            type="text"
            placeholder={getTranslation("widget", "icon", "search", "placeholder")}
          />
          <Form.Text className="text-muted">
            {getTranslation("widget", "icon", "search", "desc")}
          </Form.Text>
        </Form.Group>
      </Form>
      <Row xs={2}>
        {icons.map((_data) => (
          <IconThumbnail
            key={`icon-thumbnail-${_data.id}`}
            data={{
              id: _data.id,
              name: _data.name,
              icon: _data.icon,
              "data-item-type": _data.type,
            }}
            maxPx={80}
          />
        ))}
      </Row>
    </Col>
  );
};

export default IconWidget;

const IconThumbnail: React.FC<{
  maxPx: number;
  data: Omit<IconItemKind, "image">;
}> = ({ data: { id, ...data }, maxPx }) => (
  <Figure as={Col} className={[alignStyles.absoluteCenter, alignStyles.wrapTrue].join(" ")}>
    <Drag
      dragType="copyMove"
      dragSrc={{
        trigger: TRIGGER.INSERT.ICON,
        ...data,
      }}>
      <Figure.Image
        alt={data.icon}
        src={`${process.env.PUBLIC_URL}/assets/icon/bootstrap/${data.icon}`}
      />
    </Drag>
    {/* <Figure.Caption
        className={[fontStyles.fontHalf1em, "text-center"].join(" ")}
      >
        {data.name}
      </Figure.Caption> */}
  </Figure>
);
